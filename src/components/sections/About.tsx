'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { reveal } from '@/lib/motion';

export function About() {
  const t = useTranslations('About');

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="min-h-screen flex items-center justify-center px-8 md:px-16 py-24 border-t border-border"
    >
      <motion.div {...reveal()} className="w-full max-w-3xl">
        <h2
          id="about-heading"
          className="text-center text-3xl md:text-5xl font-display font-bold text-accent mb-10"
        >
          {t('heading')}
        </h2>
        <div className="space-y-6 text-left text-lg md:text-xl text-foreground leading-relaxed">
          <p>{t('body')}</p>
          <p>{t('passion')}</p>
          <p>{t('mission')}</p>
        </div>
      </motion.div>
    </section>
  );
}
