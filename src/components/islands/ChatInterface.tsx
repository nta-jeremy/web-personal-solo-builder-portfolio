import { useState, useRef, useEffect, useCallback } from 'react';
import { useChatHistory } from '../../hooks/use-chat-history';

interface Props {
  placeholder?: string;
  locale?: 'en' | 'vi';
  fullScreen?: boolean;
  onClose?: () => void;
  isPanel?: boolean;
}

export default function ChatInterface({
  placeholder = "Ask anything about my work…",
  locale = 'en',
  fullScreen = false,
  onClose,
  isPanel = false,
}: Props) {
  const { messages, appendMessage, updateMessageContent, persist } = useChatHistory();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    setInput('');
    setLoading(true);

    appendMessage({ role: 'user', content: text });

    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lang: locale }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      if (!res.body) {
        throw new Error('No response body');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let assistantContent = '';

      const assistantId = appendMessage({ role: 'assistant', content: '' });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data: ')) continue;
          const data = trimmed.slice(6).trim();
          if (data === '[DONE]') continue;

          assistantContent += data + ' ';
          try {
            updateMessageContent(assistantId, assistantContent.trim());
          } catch {
            // ignore race / stale ID
          }
        }
      }

      persist();
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        const msg =
          locale === 'vi'
            ? 'Không thể gửi tin nhắn. Vui lòng thử lại.'
            : 'Failed to send message. Please try again.';
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const wrapperClass = fullScreen
    ? 'fixed inset-0 z-[60] flex flex-col bg-[var(--bg)]'
    : isPanel
      ? 'flex flex-col h-full overflow-hidden'
      : 'absolute bottom-[16px] left-1/2 -translate-x-1/2 w-[calc(100%-80px)] max-w-[640px] flex flex-col';

  return (
    <div className={wrapperClass}>
      {fullScreen && onClose && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
            {locale === 'vi' ? 'Trợ lý AI' : 'AI Assistant'}
          </span>
          <button
            onClick={onClose}
            className="text-[var(--subtle)] hover:text-[var(--ink)] transition-colors"
            style={{ minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
        style={{
          maxHeight: fullScreen || isPanel ? '100%' : '320px',
          background: fullScreen || isPanel ? 'var(--bg)' : 'var(--surface)',
          border: fullScreen || isPanel ? 'none' : '1px solid var(--border)',
          borderRadius: fullScreen || isPanel ? '0' : '16px',
          boxShadow: fullScreen || isPanel ? 'none' : '0 8px 32px rgba(0,0,0,0.06)',
          marginBottom: fullScreen || isPanel ? '0' : '8px',
        }}
      >
        {messages.length === 0 && !loading && (
          <div className="text-center py-8 text-[var(--subtle)] text-sm">
            {locale === 'vi' ? 'Hỏi tôi bất cứ điều gì về Jeremy…' : 'Ask me anything about Jeremy…'}
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed"
              style={{
                borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: msg.role === 'user' ? 'var(--accent)' : 'var(--sand)',
                color: msg.role === 'user' ? '#fff' : 'var(--ink)',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div
              className="max-w-[85%] px-4 py-3 text-[13px]"
              style={{
                borderRadius: '14px 14px 14px 4px',
                background: 'var(--sand)',
                color: 'var(--ink)',
              }}
            >
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--subtle)] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--subtle)] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--subtle)] animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="text-xs text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1.5 rounded-full">
              {error}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className={fullScreen ? 'mobile-chat-form' : isPanel ? 'chatbar chatbar-panel' : 'chatbar'}
        style={fullScreen ? undefined : isPanel ? { position: 'relative', margin: '0 12px 12px', width: 'auto' } : { position: 'relative' }}
      >
        <div className="chatbar-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6z" />
          </svg>
        </div>
        <input
          type="text"
          className="chatbar-input"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          aria-label="Chat input"
        />
        <div className="chatbar-meta">Privacy</div>
        <button
          type="submit"
          className="chatbar-send"
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
}
