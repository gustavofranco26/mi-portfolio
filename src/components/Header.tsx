'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { EASE_SOFT } from '@/lib/motion';

const NAV_LINKS = ['about', 'projects', 'stack', 'contact'] as const;
const OBSERVED_SECTIONS = ['top', ...NAV_LINKS] as const;
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
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24));

  useEffect(() => {
    const elements = OBSERVED_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id === 'top' ? null : entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
      transition={{ duration: 0.5, ease: EASE_SOFT }}
      className={`fixed top-0 left-0 right-0 z-50 border-b px-8 md:px-16 py-3 md:py-5 transition-[background-color,border-color,backdrop-filter] ${
        scrolled || menuOpen
          ? 'border-border bg-background/80 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <a
          href="#top"
          aria-label={t('home')}
          className="inline-flex min-h-11 items-center font-display text-xl font-bold"
        >
          FC
        </a>

        <nav
          aria-label={t('label')}
          className="hidden md:flex items-center gap-8 text-sm text-muted"
        >
          {NAV_LINKS.map((id) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`relative py-2 hover:text-foreground transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:bg-accent after:transition-transform hover:after:scale-x-100 focus-visible:after:scale-x-100 ${
                  isActive ? 'text-foreground after:scale-x-100' : 'after:scale-x-0'
                }`}
              >
                {t(id)}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 md:gap-3 md:justify-self-end text-sm">
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
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label={t('label')}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_SOFT }}
            className="md:hidden absolute top-full left-0 right-0 flex flex-col border-b border-border bg-background px-8 py-2"
          >
            {NAV_LINKS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-lg transition-colors hover:text-foreground ${
                  activeSection === id ? 'text-accent' : 'text-muted'
                }`}
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
