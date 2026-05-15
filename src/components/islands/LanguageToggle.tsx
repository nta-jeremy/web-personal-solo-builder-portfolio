import { useState, useEffect } from 'react';
import { getRelativeLocaleUrl } from 'astro:i18n';

export default function LanguageToggle() {
  const [locale, setLocale] = useState<'en' | 'vi'>('vi');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const path = window.location.pathname;
    if (path.startsWith('/en/') || path === '/en') {
      setLocale('en');
    } else {
      setLocale('vi');
    }
  }, []);

  const switchLocale = () => {
    const path = window.location.pathname;

    // Strip current locale prefix to get the base path
    let basePath = path;
    if (basePath.startsWith('/en/')) {
      basePath = basePath.slice(3) || '/';
    } else if (basePath === '/en') {
      basePath = '/';
    }

    const targetLocale = locale === 'vi' ? 'en' : 'vi';
    const newPath = getRelativeLocaleUrl(targetLocale, basePath);
    window.location.href = newPath;
  };

  if (!mounted) {
    return (
      <button className="side-mini" style={{ visibility: 'hidden' }}>
        <span>EN · VI</span>
      </button>
    );
  }

  return (
    <button
      className="side-mini"
      onClick={switchLocale}
      aria-label={`Switch language to ${locale === 'en' ? 'Vietnamese' : 'English'}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="13" height="13">
        <circle cx="12" cy="12" r="9"/>
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
      </svg>
      <span>{locale === 'en' ? 'EN · VI' : 'VI · EN'}</span>
    </button>
  );
}
