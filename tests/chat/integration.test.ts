import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendMessageWithFallback, createProviderChain } from '../../src/domains/chat/infrastructure/ai-provider-adapter';
import { createMockSSEResponse } from './mock-sse-helper';

describe('Integration: AI Provider Fallback Chain', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('full chain: yescale → deepseek → gemini fallback', async () => {
    const env = {
      AI_PROVIDER_PRIORITY: 'yescale,deepseek,gemini',
      YESCALE_API_KEY: 'yk',
      DEEPSEEK_API_KEY: 'dk',
      GEMINI_API_KEY: 'gk',
    };

    vi.mocked(global.fetch)
      .mockResolvedValueOnce(new Response('Error', { status: 500 }))
      .mockResolvedValueOnce(new Response('Error', { status: 500 }))
      .mockResolvedValueOnce(
        createMockSSEResponse([
          'data: {"candidates":[{"content":{"parts":[{"text":"Gemini OK"}]}}]}',
          'data: [DONE]',
        ])
      );

    const chunks: string[] = [];
    for await (const chunk of sendMessageWithFallback({ message: 'hi', context: 'ctx', lang: 'en' }, env)) {
      chunks.push(chunk);
    }

    expect(chunks).toEqual(['Gemini OK']);
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it('no regression: gemini provider still works when selected', async () => {
    const env = {
      AI_PROVIDER_PRIORITY: 'gemini',
      GEMINI_API_KEY: 'gk',
    };

    vi.mocked(global.fetch).mockResolvedValue(
      createMockSSEResponse([
        'data: {"candidates":[{"content":{"parts":[{"text":"Gemini"}]}}]}',
        'data: [DONE]',
      ])
    );

    const chunks: string[] = [];
    for await (const chunk of sendMessageWithFallback({ message: 'hi', context: 'ctx', lang: 'en' }, env)) {
      chunks.push(chunk);
    }

    expect(chunks).toEqual(['Gemini']);
  });

  it('empty chain when no keys configured throws All AI providers failed', async () => {
    const env = {
      AI_PROVIDER_PRIORITY: 'yescale,deepseek',
    };

    await expect(async () => {
      for await (const _ of sendMessageWithFallback({ message: 'hi', context: 'ctx', lang: 'en' }, env)) {
        // consume
      }
    }).rejects.toThrow('All AI providers failed');

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
