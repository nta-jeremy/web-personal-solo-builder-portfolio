import type { APIContext } from 'astro';
import { z } from 'zod';

export const prerender = false;

const RequestSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  topic: z.string().min(1).max(2000),
  lang: z.enum(['en', 'vi']).default('en'),
});

export async function POST(context: APIContext): Promise<Response> {
  const { request } = context;

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

  const { name, email, topic, lang } = parsed.data;

  // Log the contact form submission (replace with actual email service later)
  console.log('[Contact Form]', { name, email, topic, lang, timestamp: new Date().toISOString() });

  // TODO: Integrate with email service (Resend, SendGrid, etc.)
  // For now, return success so the UI can show confirmation

  return new Response(
    JSON.stringify({ success: true, message: lang === 'vi' ? 'Đã gửi thành công' : 'Sent successfully' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
