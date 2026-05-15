import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  createProviderChain,
  sendMessageWithFallback,
  YescaleProvider,
  DeepseekProvider,
  GeminiProvider,
  OpenAIProvider,
  ClaudeProvider,
} from '../../src/domains/chat/infrastructure/ai-provider-adapter';
import { createMockSSEResponse } from './mock-sse-helper';

describe('createProviderChain', () => {
  it('returns providers in priority order', () => {
    const chain = createProviderChain({
      AI_PROVIDER_PRIORITY: 'deepseek,yescale',
      DEEPSEEK_API_KEY: 'dk',
      YESCALE_API_KEY: 'yk',
    });

    expect(chain.length).toBe(2);
    expect(chain[0]).toBeInstanceOf(DeepseekProvider);
    expect(chain[1]).toBeInstanceOf(YescaleProvider);
  });

  it('skips providers without API key', () => {
    const chain = createProviderChain({
      AI_PROVIDER_PRIORITY: 'yescale,deepseek,gemini',
      GEMINI_API_KEY: 'gk',
    });

    expect(chain.length).toBe(1);
    expect(chain[0]).toBeInstanceOf(GeminiProvider);
  });

  it('returns empty array when no keys configured', () => {
    const chain = createProviderChain({
      AI_PROVIDER_PRIORITY: 'yescale,deepseek',
    });

    expect(chain).toEqual([]);
  });

  it('uses default priority when env missing', () => {
    const chain = createProviderChain({
      YESCALE_API_KEY: 'yk',
      DEEPSEEK_API_KEY: 'dk',
      GEMINI_API_KEY: 'gk',
      OPENAI_API_KEY: 'ok',
      ANTHROPIC_API_KEY: 'ak',
    });

    expect(chain.length).toBe(5);
    expect(chain[0]).toBeInstanceOf(YescaleProvider);
    expect(chain[1]).toBeInstanceOf(DeepseekProvider);
    expect(chain[2]).toBeInstanceOf(GeminiProvider);
    expect(chain[3]).toBeInstanceOf(OpenAIProvider);
    expect(chain[4]).toBeInstanceOf(ClaudeProvider);
  });
});

describe('sendMessageWithFallback', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('uses first provider when it succeeds', async () => {
    const env = {
      AI_PROVIDER_PRIORITY: 'yescale,deepseek',
      YESCALE_API_KEY: 'yk',
      DEEPSEEK_API_KEY: 'dk',
    };

    vi.mocked(global.fetch).mockResolvedValue(
      createMockSSEResponse([
        'data: {"id":"1","choices":[{"delta":{"content":"OK"}}]}',
        'data: [DONE]',
      ])
    );

    const chunks: string[] = [];
    for await (const chunk of sendMessageWithFallback({ message: 'hi', context: 'ctx', lang: 'en' }, env)) {
      chunks.push(chunk);
    }

    expect(chunks).toEqual(['OK']);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(vi.mocked(global.fetch).mock.calls[0][0]).toBe('https://api.yescale.io/v1/chat/completions');
  });

  it('falls back to next provider when first fails', async () => {
    const env = {
      AI_PROVIDER_PRIORITY: 'yescale,deepseek',
      YESCALE_API_KEY: 'yk',
      DEEPSEEK_API_KEY: 'dk',
    };

    vi.mocked(global.fetch)
      .mockResolvedValueOnce(new Response('Error', { status: 500 }))
      .mockResolvedValueOnce(
        createMockSSEResponse([
          'data: {"id":"1","choices":[{"delta":{"content":"Fallback"}}]}',
          'data: [DONE]',
        ])
      );

    const chunks: string[] = [];
    for await (const chunk of sendMessageWithFallback({ message: 'hi', context: 'ctx', lang: 'en' }, env)) {
      chunks.push(chunk);
    }

    expect(chunks).toEqual(['Fallback']);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(vi.mocked(global.fetch).mock.calls[1][0]).toBe('https://api.deepseek.com/chat/completions');
  });

  it('throws when all providers fail', async () => {
    const env = {
      AI_PROVIDER_PRIORITY: 'yescale,deepseek',
      YESCALE_API_KEY: 'yk',
      DEEPSEEK_API_KEY: 'dk',
    };

    vi.mocked(global.fetch).mockResolvedValue(new Response('Error', { status: 500 }));

    await expect(async () => {
      for await (const _ of sendMessageWithFallback({ message: 'hi', context: 'ctx', lang: 'en' }, env)) {
        // consume
      }
    }).rejects.toThrow('All AI providers failed');

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
