'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function Header() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 backdrop-blur-sm"
    >
      <a href="#" className="font-display text-xl font-bold">
        FC
      </a>

      <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
        <a href="#about" className="hover:text-foreground transition-colors">
          {t('about')}
        </a>
        <a href="#projects" className="hover:text-foreground transition-colors">
          {t('projects')}
        </a>
        <a href="#contact" className="hover:text-foreground transition-colors">
          {t('contact')}
        </a>
      </nav>

      <div className="flex items-center gap-3 text-sm">
        <button
          onClick={() => switchLocale('es')}
          className={locale === 'es' ? 'text-accent' : 'text-muted hover:text-foreground transition-colors'}
        >
          ES
        </button>
        <span className="text-border">/</span>
        <button
          onClick={() => switchLocale('en')}
          className={locale === 'en' ? 'text-accent' : 'text-muted hover:text-foreground transition-colors'}
        >
          EN
        </button>
      </div>
    </motion.header>
  );
}