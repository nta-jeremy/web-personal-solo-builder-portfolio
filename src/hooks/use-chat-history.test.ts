import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createChatHistoryStore, type ChatMessage } from './use-chat-history';

let mockStorage: Record<string, string> = {};

beforeEach(() => {
  mockStorage = {};

  global.sessionStorage = {
    getItem: (key: string) => mockStorage[key] ?? null,
    setItem: (key: string, value: string) => {
      mockStorage[key] = value;
    },
    removeItem: (key: string) => {
      delete mockStorage[key];
    },
    clear: () => {
      mockStorage = {};
    },
    length: 0,
    key: () => null,
  } as Storage;
});

afterEach(() => {
  vi.restoreAllMocks();
});

function makeStore(opts?: { maxMessages?: number; storageKey?: string }) {
  return createChatHistoryStore({ storageKey: 'test-chat', ...opts });
}

function seedMessages(count: number): ChatMessage[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `msg-${i}`,
    role: i % 2 === 0 ? 'user' : 'assistant',
    content: `content-${i}`,
  }));
}

describe('createChatHistoryStore', () => {
  describe('mount / load', () => {
    it('reads existing messages from sessionStorage on creation', () => {
      const existing = seedMessages(2);
      mockStorage['test-chat'] = JSON.stringify(existing);
      const store = makeStore();
      expect(store.getSnapshot()).toEqual(existing);
    });

    it('returns empty array when sessionStorage is empty', () => {
      const store = makeStore();
      expect(store.getSnapshot()).toEqual([]);
    });

    it('returns empty array on parse error (corrupted data)', () => {
      mockStorage['test-chat'] = 'not-json';
      const store = makeStore();
      expect(store.getSnapshot()).toEqual([]);
    });
  });

  describe('appendMessage', () => {
    it('appends a message and saves to sessionStorage', () => {
      const store = makeStore();
      const id = store.appendMessage({ role: 'user', content: 'hi' });
      expect(id).toBeTruthy();
      const snap = store.getSnapshot();
      expect(snap).toHaveLength(1);
      expect(snap[0]).toMatchObject({ role: 'user', content: 'hi' });
      expect(mockStorage['test-chat']).toContain('hi');
    });

    it('caps messages at maxMessages default (50)', () => {
      const store = makeStore();
      for (let i = 0; i < 55; i++) {
        store.appendMessage({ role: 'user', content: `msg-${i}` });
      }
      expect(store.getSnapshot()).toHaveLength(50);
    });

    it('caps messages at custom maxMessages', () => {
      const store = makeStore({ maxMessages: 3 });
      store.appendMessage({ role: 'user', content: 'a' });
      store.appendMessage({ role: 'assistant', content: 'b' });
      store.appendMessage({ role: 'user', content: 'c' });
      store.appendMessage({ role: 'assistant', content: 'd' });
      expect(store.getSnapshot()).toHaveLength(3);
      expect(store.getSnapshot()[0].content).toBe('b');
      expect(store.getSnapshot()[2].content).toBe('d');
    });
  });

  describe('updateMessageContent', () => {
    it('updates content in-memory without writing to sessionStorage', () => {
      const store = makeStore();
      const id = store.appendMessage({ role: 'assistant', content: '' });
      mockStorage['test-chat'] = ''; // clear to detect writes
      store.updateMessageContent(id, 'chunk1');
      expect(store.getSnapshot()[0].content).toBe('chunk1');
      expect(mockStorage['test-chat']).toBe(''); // no write
    });

    it('throws if id not found', () => {
      const store = makeStore();
      expect(() => store.updateMessageContent('fake-id', 'x')).toThrow('Message not found');
    });
  });

  describe('persist', () => {
    it('writes current state to sessionStorage', () => {
      const store = makeStore();
      const id = store.appendMessage({ role: 'assistant', content: '' });
      mockStorage['test-chat'] = '';
      store.updateMessageContent(id, 'final');
      store.persist();
      const saved = JSON.parse(mockStorage['test-chat']);
      expect(saved[0].content).toBe('final');
    });
  });

  describe('clearHistory', () => {
    it('removes all messages and sessionStorage key', () => {
      const store = makeStore();
      store.appendMessage({ role: 'user', content: 'hello' });
      store.clearHistory();
      expect(store.getSnapshot()).toEqual([]);
      expect(mockStorage['test-chat']).toBeUndefined();
    });
  });

  describe('subscribe / notify', () => {
    it('notifies listeners on append, persist, clear', () => {
      const store = makeStore();
      const cb = vi.fn();
      store.subscribe(cb);

      store.appendMessage({ role: 'user', content: 'a' });
      expect(cb).toHaveBeenCalledTimes(1);

      store.persist();
      expect(cb).toHaveBeenCalledTimes(2);

      store.clearHistory();
      expect(cb).toHaveBeenCalledTimes(3);
    });

    it('unsubscribe removes listener', () => {
      const store = makeStore();
      const cb = vi.fn();
      const unsub = store.subscribe(cb);
      unsub();
      store.appendMessage({ role: 'user', content: 'a' });
      expect(cb).not.toHaveBeenCalled();
    });
  });

  describe('destroy', () => {
    it('prevents further operations after destroy', () => {
      const store = makeStore();
      store.destroy();
      expect(store.appendMessage({ role: 'user', content: 'x' })).toBe('');
      expect(store.getSnapshot()).toEqual([]);
    });

    it('allows resubscribe after destroy (Astro ClientRouter swap simulation)', () => {
      const store = makeStore();
      store.appendMessage({ role: 'user', content: 'hello' });
      store.appendMessage({ role: 'assistant', content: 'hi' });

      // Simulate Astro ClientRouter unmount: destroy then resubscribe
      store.destroy();
      const cb = vi.fn();
      store.subscribe(cb);

      // Store should be usable again
      const id = store.appendMessage({ role: 'user', content: 'again' });
      expect(id).toBeTruthy();
      expect(store.getSnapshot()).toHaveLength(3);
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateMessages', () => {
    it('ignores corrupt entries missing required fields', () => {
      makeStore();
      mockStorage['test-chat'] = JSON.stringify([
        { id: 'a', role: 'user', content: 'ok' },
        { id: 'b', role: 'user' },
        { role: 'assistant', content: 'no-id' },
        'not-an-object',
        null,
      ]);
      const freshStore = makeStore();
      expect(freshStore.getSnapshot()).toEqual([{ id: 'a', role: 'user', content: 'ok' }]);
    });
  });

  describe('server snapshot', () => {
    it('returns empty array for SSR', () => {
      const store = makeStore();
      expect(store.getServerSnapshot()).toEqual([]);
    });
  });
});
