import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

const THEME_CYCLE: Theme[] = ['light', 'dark', 'system'];

function getEffectiveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored && THEME_CYCLE.includes(stored)) {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const effective = getEffectiveTheme(theme);
    document.documentElement.setAttribute('data-theme', effective);
    localStorage.setItem('theme', theme);

    // Notify window.theme listeners
    if ((window as any).theme && (window as any).theme._listeners) {
      (window as any).theme._listeners.forEach((fn: (t: string) => void) => fn(theme));
    }
  }, [theme, mounted]);

  const cycleTheme = () => {
    const idx = THEME_CYCLE.indexOf(theme);
    const next = THEME_CYCLE[(idx + 1) % THEME_CYCLE.length];
    setThemeState(next);
  };

  if (!mounted) {
    return (
      <button
        className="side-mini"
        aria-label="Toggle theme"
        style={{ visibility: 'hidden' }}
      >
        <span>Theme</span>
      </button>
    );
  }

  const label = theme === 'system' ? 'Auto' : theme === 'light' ? 'Light' : 'Dark';

  return (
    <button
      className="side-mini"
      onClick={cycleTheme}
      aria-label={`Theme: ${label}. Click to cycle.`}
      title={`Theme: ${label}`}
    >
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="13" height="13">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="13" height="13">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>
        </svg>
      )}
      <span>{label}</span>
    </button>
  );
}
