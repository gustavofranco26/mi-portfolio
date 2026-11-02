'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GITHUB_URL, LINKEDIN_URL, SITE_NAME } from '@/lib/site';
import { reveal } from '@/lib/motion';

const LINKS = [
  { label: 'GitHub', href: GITHUB_URL },
  { label: 'LinkedIn', href: LINKEDIN_URL },
];

export function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <motion.footer
      {...reveal()}
      className="border-t border-border px-8 md:px-16 py-10 text-sm text-muted"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 md:flex-row md:justify-between">
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
      </div>
    </motion.footer>
  );
}
