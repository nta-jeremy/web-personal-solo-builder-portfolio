import { useState, useCallback, useEffect, useRef } from 'react';
import ChatInterface from './ChatInterface';

export interface Props {
  placeholder?: string;
  locale?: 'en' | 'vi';
}

export default function DesktopChatWidget({
  placeholder = "Ask anything about my work…",
  locale = 'en',
}: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (open) {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
  }, [open, handleClose]);

  // Warn on page reload/close while chat is open
  useEffect(() => {
    if (!open) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [open]);

  // Close on click outside panel
  const onBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) handleClose();
    },
    [handleClose]
  );

  const fabLabel = locale === 'vi' ? 'Hỏi AI' : 'Ask AI';

  return (
    <>
      {/* Floating Action Button */}
      <button
        className="fab-button"
        onClick={handleOpen}
        aria-label={fabLabel}
        title={fabLabel}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="22"
          height="22"
        >
          <path d="M12 2l2.4 5.8L21 9l-5.4 1.2L12 17l-1.8-5.4L5 9l5.4-1.2z" />
          <path d="M17 14l1.5 3.5L22 19l-3.5 1.5L17 24l-1.5-3.5L12 19l3.5-1.5z" opacity="0.6" />
        </svg>
        <span className="fab-tooltip">{fabLabel}</span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="chat-panel-backdrop open"
          onClick={onBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Floating Panel */}
      <div
        ref={panelRef}
        className={`chat-panel ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={locale === 'vi' ? 'Trợ lý AI' : 'AI Assistant'}
      >
        <div className="chat-panel-header">
          <span className="chat-panel-title">
            {locale === 'vi' ? 'Trợ lý AI' : 'AI Assistant'}
          </span>
          <button
            onClick={handleClose}
            className="chat-panel-close"
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="18"
              height="18"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="chat-panel-body">
          <ChatInterface
            placeholder={placeholder}
            locale={locale}
            isPanel={true}
            onClose={handleClose}
          />
        </div>
      </div>
    </>
  );
}
