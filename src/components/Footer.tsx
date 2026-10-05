'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GITHUB_URL, LINKEDIN_URL, SITE_NAME } from '@/lib/site';

const LINKS = [
  { label: 'GitHub', href: GITHUB_URL },
  { label: 'LinkedIn', href: LINKEDIN_URL },
];

export function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="border-t border-border px-8 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted"
    >
      <p>
        © {year} {SITE_NAME}
      </p>

      <ul className="flex items-center gap-6">
        {LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center hover:text-foreground transition-colors"
            >
              {label}
              <span className="sr-only"> {t('newTab')}</span>
            </a>
          </li>
        ))}
      </ul>
    </motion.footer>
  );
}
