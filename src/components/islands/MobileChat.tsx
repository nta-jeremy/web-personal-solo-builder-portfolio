import { useState, useCallback, useEffect } from 'react';
import ChatInterface from './ChatInterface';

export interface Props {
  placeholder?: string;
  locale?: 'en' | 'vi';
}

export default function MobileChat({
  placeholder = "Ask about Jeremy's work…",
  locale = 'en',
}: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const mainScroll = document.querySelector('.main-scroll') as HTMLElement | null;
    if (!mainScroll) return;

    const preventTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.mobile-menu') || target.closest('.chat-panel') || target.closest('.fixed.inset-0')) return;
      e.preventDefault();
    };

    const count = Number(document.body.dataset.scrollLock || 0);
    if (open) {
      document.body.dataset.scrollLock = String(count + 1);
      mainScroll.style.overflowY = 'hidden';
      document.addEventListener('touchmove', preventTouchMove, { passive: false });
    } else {
      const next = Math.max(0, count - 1);
      document.body.dataset.scrollLock = String(next);
      if (next === 0) {
        mainScroll.style.overflowY = '';
        document.removeEventListener('touchmove', preventTouchMove);
      }
    }
    return () => {
      if (open) {
        const c = Number(document.body.dataset.scrollLock || 0);
        const n = Math.max(0, c - 1);
        document.body.dataset.scrollLock = String(n);
        if (n === 0 && mainScroll) {
          mainScroll.style.overflowY = '';
          document.removeEventListener('touchmove', preventTouchMove);
        }
      }
    };
  }, [open]);

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

  if (open) {
    return (
      <div className="fixed inset-0 z-[60] flex flex-col bg-[var(--bg)]">
        <ChatInterface
          placeholder={placeholder}
          locale={locale}
          fullScreen={true}
          onClose={handleClose}
        />
      </div>
    );
  }

  return (
    <div className="mchatbar" onClick={handleOpen} role="button" aria-label={placeholder}>
      <div style={{ color: 'var(--subtle)', display: 'flex' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
          <circle cx="11" cy="11" r="6"/>
          <path d="M20 20l-4.5-4.5"/>
        </svg>
      </div>
      <span className="mchatbar-input" style={{ color: 'var(--subtle)' }}>
        {placeholder}
      </span>
      <button className="mchatbar-send" aria-label={placeholder}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
    </div>
  );
}
