'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { stack } from '@/content/stack';
import { MaskHeading } from '@/components/MaskHeading';
import { reveal, STAGGER } from '@/lib/motion';

export function Stack() {
  const t = useTranslations('Stack');

  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="px-8 md:px-16 py-24 md:py-32 border-t border-border"
    >
      <MaskHeading
        id="stack-heading"
        text={t('heading')}
        className="mx-auto mb-16 max-w-6xl text-center font-display text-3xl font-bold text-accent md:text-5xl"
      />

      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((group, index) => (
          <motion.div
            key={group.category}
            {...reveal(index * STAGGER)}
            whileHover={{ y: -4 }}
            className="border border-border bg-surface p-6 text-center hover:border-border-strong"
          >
            <h3 className="text-sm uppercase tracking-wide text-accent mb-4">
              {t(`categories.${group.category}`)}
            </h3>
            <ul className="flex flex-wrap justify-center gap-2">
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
