'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

const NAV_LINKS = ['about', 'projects', 'stack', 'contact'] as const;
const LOCALES = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
] as const;

export function Header() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  function switchLocale(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-3 md:py-6 bg-background/80 backdrop-blur-md"
    >
      <a
        href="#"
        aria-label={t('home')}
        className="inline-flex min-h-11 items-center font-display text-xl font-bold"
      >
        FC
      </a>

      <nav
        aria-label={t('label')}
        className="hidden md:flex items-center gap-8 text-sm text-muted"
      >
        {NAV_LINKS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="py-2 hover:text-foreground transition-colors"
          >
            {t(id)}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-1 md:gap-3 text-sm">
        <div role="group" aria-label={t('language')} className="flex items-center">
          {LOCALES.map(({ code, label }, index) => (
            <Fragment key={code}>
              {index > 0 && (
                <span aria-hidden="true" className="text-border-strong">
                  /
                </span>
              )}
              <button
                type="button"
                lang={code}
                aria-label={`${code.toUpperCase()} — ${label}`}
                aria-pressed={locale === code}
                onClick={() => switchLocale(code)}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center md:min-h-0 md:min-w-0 md:px-2 md:py-1 transition-colors ${
                  locale === code ? 'text-accent' : 'text-muted hover:text-foreground'
                }`}
              >
                {code.toUpperCase()}
              </button>
            </Fragment>
          ))}
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center text-foreground"
        >
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label={t('label')}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 right-0 flex flex-col border-b border-border bg-background px-8 py-2"
          >
            {NAV_LINKS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-lg text-muted hover:text-foreground transition-colors"
              >
                {t(id)}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
