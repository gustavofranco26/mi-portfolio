'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const EMAIL = 'guscodigo@gmail.com';
const PHONE_DISPLAY = '+51 904 845 087';
const PHONE_HREF = '+51904845087';

export function Contact() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="min-h-screen flex items-center px-8 md:px-16 border-t border-border">
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
        <p className="text-lg md:text-xl text-foreground leading-relaxed mb-10">
          {t('body')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex w-fit items-center border border-border px-6 py-3 text-accent hover:bg-surface transition-colors"
          >
            {EMAIL}
          </a>
          <a
            href={`tel:${PHONE_HREF}`}
            className="inline-flex w-fit items-center border border-border px-6 py-3 text-accent hover:bg-surface transition-colors"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
