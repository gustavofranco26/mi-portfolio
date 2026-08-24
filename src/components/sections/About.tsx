'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function About() {
  const t = useTranslations('About');

  return (
    <section className="min-h-screen flex items-center px-8 md:px-16 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-2xl"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-accent mb-8">
          {t('heading')}
        </h2>
        <p className="text-lg md:text-xl text-foreground leading-relaxed">
          {t('body')}
        </p>
      </motion.div>
    </section>
  );
}