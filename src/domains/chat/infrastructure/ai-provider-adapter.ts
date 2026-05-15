import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

export interface SendMessageParams {
  message: string;
  context: string;
  lang: 'en' | 'vi';
}

export type StreamChunk = string;

export interface AIProvider {
  sendMessage(params: SendMessageParams): AsyncIterable<StreamChunk>;
}

const MAX_TOKENS = 800;

function buildSystemPrompt(context: string, lang: 'en' | 'vi'): string {
  const instruction =
    lang === 'vi'
      ? 'Bạn là trợ lý của Jeremy. Chỉ trả lời dựa trên ngữ cảnh bên dưới. Nếu không biết, hãy nói rõ. Trả lời bằng tiếng Việt.'
      : "You are Jeremy's assistant. Answer ONLY from the context below. If unknown, say so. Respond in English.";
  return `${instruction}\n\nContext:\n${context}`;
}

async function* parseSSEStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  extractContent: (parsed: unknown) => string | undefined
): AsyncIterable<string> {
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data: ')) continue;
        const json = trimmed.slice(6).trim();
        if (json === '[DONE]') return;
        if (!json) continue;

        try {
          const parsed = JSON.parse(json);
          const content = extractContent(parsed);
          if (content) yield content;
        } catch {
          // ignore malformed JSON
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export class OpenAIProvider implements AIProvider {
  private client: OpenAI | null = null;

  constructor(apiKey: string | undefined) {
    if (apiKey) {
      this.client = new OpenAI({ apiKey });
    }
  }

  async *sendMessage(params: SendMessageParams): AsyncIterable<StreamChunk> {
    if (!this.client) {
      throw new Error('OpenAI API key not configured');
    }

    const stream = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: buildSystemPrompt(params.context, params.lang) },
        { role: 'user', content: params.message },
      ],
      max_tokens: MAX_TOKENS,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  }
}

export class GeminiProvider implements AIProvider {
  private apiKey: string | undefined;

  constructor(apiKey: string | undefined) {
    this.apiKey = apiKey;
  }

  async *sendMessage(params: SendMessageParams): AsyncIterable<StreamChunk> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured');
    }

    const model = 'gemini-2.0-flash-lite';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`;

    const body = {
      contents: [
        { role: 'user', parts: [{ text: buildSystemPrompt(params.context, params.lang) }] },
        { role: 'user', parts: [{ text: params.message }] },
      ],
      generationConfig: { maxOutputTokens: MAX_TOKENS },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': this.apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok || !response.body) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data: ')) continue;
          const json = trimmed.slice(6).trim();
          if (json === '[DONE]') return;
          if (!json) continue;

          try {
            const parsed = JSON.parse(json);
            const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) yield text;
          } catch {
            // ignore malformed JSON
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}

export class ClaudeProvider implements AIProvider {
  private client: Anthropic | null = null;

  constructor(apiKey: string | undefined) {
    if (apiKey) {
      this.client = new Anthropic({ apiKey });
    }
  }

  async *sendMessage(params: SendMessageParams): AsyncIterable<StreamChunk> {
    if (!this.client) {
      throw new Error('Anthropic API key not configured');
    }

    const stream = await this.client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: MAX_TOKENS,
      system: buildSystemPrompt(params.context, params.lang),
      messages: [{ role: 'user', content: params.message }],
      stream: true,
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta') {
        const delta = event.delta as { text?: string };
        if (delta.text) {
          yield delta.text;
        }
      }
    }
  }
}

export class YescaleProvider implements AIProvider {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = 'gemini-2.5-flash-lite') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async *sendMessage(params: SendMessageParams): AsyncIterable<StreamChunk> {
    const url = 'https://api.yescale.io/v1/chat/completions';
    const body = {
      model: this.model,
      messages: [
        { role: 'system', content: buildSystemPrompt(params.context, params.lang) },
        { role: 'user', content: params.message },
      ],
      max_tokens: MAX_TOKENS,
      stream: true,
      temperature: 0.7,
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok || !response.body) {
      throw new Error(`Yescale API error: ${response.status}`);
    }

    yield* parseSSEStream(response.body.getReader(), (parsed) => {
      return (parsed as { choices?: [{ delta?: { content?: string } }] })?.choices?.[0]?.delta?.content;
    });
  }
}

export class DeepseekProvider implements AIProvider {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model = 'deepseek-v4-flash') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async *sendMessage(params: SendMessageParams): AsyncIterable<StreamChunk> {
    const url = 'https://api.deepseek.com/chat/completions';
    const body = {
      model: this.model,
      messages: [
        { role: 'system', content: buildSystemPrompt(params.context, params.lang) },
        { role: 'user', content: params.message },
      ],
      max_tokens: MAX_TOKENS,
      stream: true,
      temperature: 0.7,
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok || !response.body) {
      throw new Error(`Deepseek API error: ${response.status}`);
    }

    yield* parseSSEStream(response.body.getReader(), (parsed) => {
      return (parsed as { choices?: [{ delta?: { content?: string } }] })?.choices?.[0]?.delta?.content;
    });
  }
}

export function parseProviderPriority(env?: string): string[] {
  const defaultOrder = ['yescale', 'deepseek', 'gemini', 'openai', 'anthropic'];
  if (!env) return defaultOrder;

  const order = env.split(',').map((s) => s.trim().toLowerCase());
  const valid = new Set(defaultOrder);
  return order.filter((p) => valid.has(p));
}

export function createProviderChain(env: Record<string, string | undefined>): AIProvider[] {
  const priority = parseProviderPriority(env.AI_PROVIDER_PRIORITY);

  const factories: Record<string, () => AIProvider | null> = {
    yescale: () => (env.YESCALE_API_KEY ? new YescaleProvider(env.YESCALE_API_KEY, env.YESCALE_MODEL) : null),
    deepseek: () => (env.DEEPSEEK_API_KEY ? new DeepseekProvider(env.DEEPSEEK_API_KEY, env.DEEPSEEK_MODEL) : null),
    gemini: () => (env.GEMINI_API_KEY ? new GeminiProvider(env.GEMINI_API_KEY) : null),
    openai: () => (env.OPENAI_API_KEY ? new OpenAIProvider(env.OPENAI_API_KEY) : null),
    anthropic: () => (env.ANTHROPIC_API_KEY ? new ClaudeProvider(env.ANTHROPIC_API_KEY) : null),
  };

  return priority
    .map((name) => factories[name]?.())
    .filter((p): p is AIProvider => p !== null);
}

export async function* sendMessageWithFallback(
  params: SendMessageParams,
  env: Record<string, string | undefined>
): AsyncIterable<StreamChunk> {
  const providers = createProviderChain(env);
  let lastError: Error | undefined;

  for (const provider of providers) {
    let hasYielded = false;
    try {
      for await (const chunk of provider.sendMessage(params)) {
        hasYielded = true;
        yield chunk;
      }
      return;
    } catch (err) {
      if (hasYielded) {
        throw err instanceof Error ? err : new Error(String(err));
      }
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  throw new Error(`All AI providers failed${lastError ? ': ' + lastError.message : ''}`);
}
