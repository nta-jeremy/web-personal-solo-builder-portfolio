import { useState, useCallback, useEffect } from 'react';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { getTranslations, t } from '@/i18n/utils';

interface Props {
  title?: string;
}

function isActive(pathname: string, href: string) {
  const normalized = pathname.replace(/^\/en/, '') || '/';
  if (href === '/about') {
    return normalized === '/' || normalized === '/about' || normalized.startsWith('/about');
  }
  return normalized === href || normalized.startsWith(href + '/');
}

export default function MobileHeader({ title = 'Jeremy Tech' }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    const update = () => setPathname(window.location.pathname);
    update();
    document.addEventListener('astro:after-swap', update);
    return () => document.removeEventListener('astro:after-swap', update);
  }, []);

  const locale = pathname.startsWith('/en') ? 'en' : 'vi';
  const translations = getTranslations(locale);

  const navItems = [
    { href: '/about', label: t(translations, 'nav.about') },
    { href: '/projects', label: t(translations, 'nav.projects') },
    { href: '/blog', label: t(translations, 'nav.blog') },
    { href: '/contact', label: t(translations, 'nav.contact') },
  ];

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const mainScroll = document.querySelector('.main-scroll') as HTMLElement | null;
    if (!mainScroll) return;

    const preventTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.mobile-menu')) return;
      e.preventDefault();
    };

    const count = Number(document.body.dataset.scrollLock || 0);
    if (menuOpen) {
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
      if (menuOpen) {
        const c = Number(document.body.dataset.scrollLock || 0);
        const n = Math.max(0, c - 1);
        document.body.dataset.scrollLock = String(n);
        if (n === 0 && mainScroll) {
          mainScroll.style.overflowY = '';
          document.removeEventListener('touchmove', preventTouchMove);
        }
      }
    };
  }, [menuOpen]);

  return (
    <>
      <div className="mtop md:hidden">
        <button
          onClick={toggleMenu}
          className="p-2 -ml-2 flex items-center justify-center"
          style={{ minWidth: 44, minHeight: 44 }}
          aria-label={menuOpen ? t(translations, 'mobile.menuClose') : t(translations, 'mobile.menuOpen')}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
        <a href="/" className="mtop-title">{title}</a>
        <a href="/">
          <img src="/logo/logo_2.svg" alt="Jeremy Tech" width="28" height="28" className="rounded-md" />
        </a>
      </div>

      {menuOpen && (
        <>
          <div className="mobile-menu-overlay md:hidden" onClick={closeMenu} />
          <div className="mobile-menu md:hidden">
            <nav className="mobile-menu-nav">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`mobile-menu-item ${isActive(pathname, item.href) ? 'active' : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mobile-menu-actions">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </>
      )}
    </>
  );
}
