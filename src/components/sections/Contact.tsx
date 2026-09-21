'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

const EMAIL = 'guscodigo@gmail.com';
const PHONE_DISPLAY = '+51 904 845 087';
const PHONE_HREF = '+51904845087';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const t = useTranslations('Contact');
  const locale = useLocale();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (name.trim().length < 2 || name.trim().length > 100) {
      next.name = t('form.errors.name');
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      next.email = t('form.errors.email');
    }
    if (message.trim().length < 10 || message.trim().length > 2000) {
      next.message = t('form.errors.message');
    }
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, locale, company }),
      });

      if (!res.ok) throw new Error('request_failed');

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  }

  const isSending = status === 'sending';

  return (
    <section id="contact" className="min-h-screen flex items-center px-8 md:px-16 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-accent mb-8">
          {t('heading')}
        </h2>
        <p className="text-lg md:text-xl text-foreground leading-relaxed mb-10">
          {t('body')}
        </p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm text-muted mb-2">
              {t('form.name')}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('form.namePlaceholder')}
              className="w-full bg-surface border border-border px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-2">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-muted mb-2">
              {t('form.email')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('form.emailPlaceholder')}
              className="w-full bg-surface border border-border px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-muted mb-2">
              {t('form.message')}
            </label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('form.messagePlaceholder')}
              className="w-full bg-surface border border-border px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
            />
            {errors.message && (
              <p className="text-red-400 text-sm mt-2">{errors.message}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex w-fit items-center border border-border px-6 py-3 text-accent hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? t('form.sending') : t('form.submit')}
            </button>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-accent text-sm"
              >
                {t('form.success')}
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm"
              >
                {t('form.error')}
              </motion.p>
            )}
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted mb-4">{t('orDirect')}</p>
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
        </div>
      </motion.div>
    </section>
  );
}
