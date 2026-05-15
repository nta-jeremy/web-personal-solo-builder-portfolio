import { useRef, useEffect, useSyncExternalStore } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface StoreOptions {
  maxMessages?: number;
  storageKey?: string;
}

interface StoreReturn {
  getSnapshot: () => ChatMessage[];
  getServerSnapshot: () => ChatMessage[];
  subscribe: (cb: () => void) => () => void;
  appendMessage: (msg: Omit<ChatMessage, 'id'>) => string;
  updateMessageContent: (id: string, content: string) => void;
  persist: () => void;
  clearHistory: () => void;
  destroy: () => void;
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function isValidChatMessage(v: unknown): v is ChatMessage {
  if (!v || typeof v !== 'object') return false;
  const msg = v as Record<string, unknown>;
  return (
    typeof msg.id === 'string' &&
    (msg.role === 'user' || msg.role === 'assistant') &&
    typeof msg.content === 'string'
  );
}

function validateMessages(v: unknown): ChatMessage[] {
  if (!Array.isArray(v)) return [];
  return v.filter(isValidChatMessage);
}

const storeCache = new Map<string, StoreReturn>();

export function createChatHistoryStore(options: StoreOptions = {}): StoreReturn {
  const maxMessages = options.maxMessages ?? 50;
  const storageKey = options.storageKey ?? 'jeremy-chat-history';

  let messages: ChatMessage[] = [];
  let listeners: (() => void)[] = [];
  let destroyed = false;

  function load() {
    if (typeof sessionStorage === 'undefined') return;
    const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const nav = entries.length > 0 ? entries[entries.length - 1] : undefined;
    if (nav?.type === 'reload') {
      try {
        sessionStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
      messages = [];
      return;
    }
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw) {
        messages = validateMessages(JSON.parse(raw));
      }
    } catch {
      messages = [];
    }
  }

  function notify() {
    listeners.forEach((l) => l());
  }

  function save() {
    if (typeof sessionStorage === 'undefined' || destroyed) return;
    const trimmed = messages.slice(-maxMessages);
    messages = trimmed;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {
      // Storage quota exceeded or disabled
    }
    notify();
  }

  function appendMessage(msg: Omit<ChatMessage, 'id'>): string {
    if (destroyed) return '';
    const id = generateId();
    messages = [...messages, { ...msg, id }];
    save();
    return id;
  }

  function updateMessageContent(id: string, content: string) {
    if (destroyed) return;
    const idx = messages.findIndex((m) => m.id === id);
    if (idx === -1) {
      throw new Error('Message not found');
    }
    messages = messages.map((m, i) => (i === idx ? { ...m, content } : m));
    notify();
  }

  function persist() {
    save();
  }

  function clearHistory() {
    messages = [];
    if (typeof sessionStorage !== 'undefined') {
      try {
        sessionStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }
    notify();
  }

  function subscribe(cb: () => void): () => void {
    // Reset destroyed so the store can be reused after an Astro ClientRouter
    // swap unmounts and then remounts the island.
    destroyed = false;
    listeners = [...listeners, cb];
    return () => {
      listeners = listeners.filter((l) => l !== cb);
    };
  }

  function destroy() {
    destroyed = true;
    listeners = [];
  }

  // Load on creation
  load();

  return {
    getSnapshot: () => messages,
    getServerSnapshot: () => [],
    subscribe,
    appendMessage,
    updateMessageContent,
    persist,
    clearHistory,
    destroy,
  };
}

export function useChatHistory(options: StoreOptions = {}) {
  const storageKey = options.storageKey ?? 'jeremy-chat-history';

  // Singleton per key within a tab to avoid duplicate listeners
  const storeRef = useRef<StoreReturn | null>(null);
  if (!storeRef.current) {
    if (storeCache.has(storageKey)) {
      storeRef.current = storeCache.get(storageKey)!;
    } else {
      const store = createChatHistoryStore(options);
      storeCache.set(storageKey, store);
      storeRef.current = store;
    }
  }
  const store = storeRef.current;

  useEffect(() => {
    return () => {
      // Astro ClientRouter swaps unmount/remount islands across soft
      // navigations. Keep the cached store alive so chat history survives
      // route changes; only clear listeners. The next mount will re-subscribe
      // via useSyncExternalStore, which also resets the destroyed flag.
      store.destroy();
    };
  }, [storageKey, store]);

  const messages = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  return {
    messages,
    appendMessage: store.appendMessage,
    updateMessageContent: store.updateMessageContent,
    persist: store.persist,
    clearHistory: store.clearHistory,
  };
}
