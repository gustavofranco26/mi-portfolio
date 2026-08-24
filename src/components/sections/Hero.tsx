'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-16">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-5xl md:text-7xl font-display font-bold max-w-3xl"
      >
        {t('title')}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        className="text-lg md:text-xl text-muted mt-6 max-w-xl"
      >
        {t('subtitle')}
      </motion.p>

      <motion.a
        href="#projects"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="mt-10 inline-flex w-fit items-center border border-border px-6 py-3 text-accent hover:bg-surface transition-colors"
      >
        {t('cta')}
      </motion.a>
    </section>
  );
}