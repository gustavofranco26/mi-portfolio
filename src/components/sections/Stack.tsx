'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { stack } from '@/content/stack';

export function Stack() {
  const t = useTranslations('Stack');

  return (
    <section id="stack" className="px-8 md:px-16 py-32 border-t border-border">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-3xl md:text-5xl font-display font-bold text-accent mb-16"
      >
        {t('heading')}
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((group, index) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            className="border border-border bg-surface p-6"
          >
            <h3 className="text-sm uppercase tracking-wide text-accent mb-4">
              {t(`categories.${group.category}`)}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((tech) => (
                <li
                  key={tech}
                  className="text-xs border border-border px-2 py-1 text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
