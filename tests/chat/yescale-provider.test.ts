import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { YescaleProvider } from '../../src/domains/chat/infrastructure/ai-provider-adapter';
import { createMockSSEResponse } from './mock-sse-helper';

describe('YescaleProvider', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('yields content from SSE stream', async () => {
    const provider = new YescaleProvider('test-key', 'gemini-2.5-flash-lite');
    const lines = [
      'data: {"id":"1","choices":[{"delta":{"content":"Hello"}}]}',
      'data: {"id":"1","choices":[{"delta":{"content":" world"}}]}',
      'data: [DONE]',
    ];
    vi.mocked(global.fetch).mockResolvedValue(createMockSSEResponse(lines));

    const chunks: string[] = [];
    for await (const chunk of provider.sendMessage({ message: 'hi', context: 'ctx', lang: 'en' })) {
      chunks.push(chunk);
    }

    expect(chunks).toEqual(['Hello', ' world']);
  });

  it('throws when response is not ok', async () => {
    const provider = new YescaleProvider('test-key');
    vi.mocked(global.fetch).mockResolvedValue(new Response('Server Error', { status: 500 }));

    await expect(async () => {
      for await (const _ of provider.sendMessage({ message: 'hi', context: 'ctx', lang: 'en' })) {
        // consume
      }
    }).rejects.toThrow('Yescale API error');
  });

  it('uses default model when not specified', async () => {
    const provider = new YescaleProvider('test-key');
    const lines = ['data: [DONE]'];
    vi.mocked(global.fetch).mockResolvedValue(createMockSSEResponse(lines));

    for await (const _ of provider.sendMessage({ message: 'hi', context: 'ctx', lang: 'en' })) {
      // consume
    }

    const body = JSON.parse(vi.mocked(global.fetch).mock.calls[0][1]!.body as string);
    expect(body.model).toBe('gemini-2.5-flash-lite');
  });

  it('sends correct request format', async () => {
    const provider = new YescaleProvider('test-key', 'custom-model');
    const lines = ['data: [DONE]'];
    vi.mocked(global.fetch).mockResolvedValue(createMockSSEResponse(lines));

    for await (const _ of provider.sendMessage({ message: 'hi', context: 'ctx', lang: 'en' })) {
      // consume
    }

    const [url, options] = vi.mocked(global.fetch).mock.calls[0];
    expect(url).toBe('https://api.yescale.io/v1/chat/completions');
    expect(options?.method).toBe('POST');

    const body = JSON.parse(options!.body as string);
    expect(body.model).toBe('custom-model');
    expect(body.stream).toBe(true);
    expect(body.max_tokens).toBeDefined();
    expect(body.messages).toEqual([
      { role: 'system', content: expect.any(String) },
      { role: 'user', content: 'hi' },
    ]);
  });
});
