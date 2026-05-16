import type { APIContext } from 'astro';
import { z } from 'zod';
import { checkRateLimit } from '@domains/chat/infrastructure/rate-limit-adapter';
import { sendMessageWithFallback } from '@domains/chat/infrastructure/ai-provider-adapter';
import contextEn from '@data/jeremy.json';
import contextVi from '@data/jeremy-vi.json';

export const prerender = false;

const RequestSchema = z.object({
  message: z.string().min(1).max(500),
  lang: z.enum(['en', 'vi']),
});

function getClientIP(request: Request): string {
  const cfIP = request.headers.get('cf-connecting-ip');
  if (cfIP) return cfIP;
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return 'unknown';
}

function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

function blocklistCheck(input: string): boolean {
  const patterns = [
    /ignore previous instructions/gi,
    /disregard (the )?context/gi,
    /you are now/gi,
    /pretend (you are|to be)/gi,
    /system prompt/gi,
    /DAN/gi,
    /jailbreak/gi,
  ];
  return patterns.some((p) => p.test(input));
}

function buildContext(lang: 'en' | 'vi'): string {
  const raw = lang === 'vi' ? contextVi : contextEn;
  const data = raw.context;
  const projects = data.projects
    .map(
      (p) =>
        `- ${p.title}: ${p.description} (Tech: ${p.tech.join(', ')})`
    )
    .join('\n');

  return [
    `Name: ${data.name}`,
    `Title: ${data.title}`,
    `Bio: ${data.bio}`,
    `Philosophy: ${data.philosophy}`,
    `Career:`,
    ...data.career.map((c) => `  ${c.year} - ${c.role}: ${c.summary}`),
    `Technical Domains: ${data.domains.join(', ')}`,
    `Projects:`,
    projects,
    `Contact: Website ${data.contact.website}, GitHub ${data.contact.github}, Location ${data.contact.location}`,
  ].join('\n');
}

export async function POST(context: APIContext): Promise<Response> {
  const { request } = context;

  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > 10000) {
    return new Response(
      JSON.stringify({ error: 'Payload too large' }),
      { status: 413, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: 'Validation failed', details: parsed.error.format() }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { message, lang } = parsed.data;
  const sanitized = sanitizeInput(message);

  if (blocklistCheck(sanitized)) {
    return new Response(
      JSON.stringify({ error: 'Message blocked by security policy' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const ip = getClientIP(request);
  const rate = checkRateLimit(ip);

  if (!rate.allowed) {
    return new Response(
      JSON.stringify({
        error: 'Rate limit exceeded',
        retryAfter: Math.ceil((rate.resetAt - Date.now()) / 1000),
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((rate.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  const runtime = (context.locals as Record<string, unknown>)?.runtime;
  const runtimeEnv =
    typeof runtime === 'object' && runtime !== null
      ? (runtime as Record<string, unknown>).env
      : undefined;
  const envMap =
    typeof runtimeEnv === 'object' && runtimeEnv !== null
      ? (runtimeEnv as Record<string, string>)
      : {};
  const env = {
    AI_PROVIDER_PRIORITY: envMap.AI_PROVIDER_PRIORITY,
    YESCALE_API_KEY: envMap.YESCALE_API_KEY,
    YESCALE_MODEL: envMap.YESCALE_MODEL,
    DEEPSEEK_API_KEY: envMap.DEEPSEEK_API_KEY,
    DEEPSEEK_MODEL: envMap.DEEPSEEK_MODEL,
    OPENAI_API_KEY: envMap.OPENAI_API_KEY,
    GEMINI_API_KEY: envMap.GEMINI_API_KEY,
    ANTHROPIC_API_KEY: envMap.ANTHROPIC_API_KEY,
  };

  const contextText = buildContext(lang);

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      try {
        for await (const chunk of sendMessageWithFallback(
          { message: sanitized, context: contextText, lang },
          env
        )) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (err) {
        const errorMessage =
          lang === 'vi'
            ? 'Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.'
            : "Sorry, I'm having trouble connecting right now. Please try again later.";
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: errorMessage })}\n\n`));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
