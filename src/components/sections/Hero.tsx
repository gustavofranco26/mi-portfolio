import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section
      aria-labelledby="hero-heading"
      className="min-h-screen flex flex-col justify-center px-8 md:px-16 pt-24 pb-16"
    >
      <h1
        id="hero-heading"
        className="animate-slide-up motion-reduce:animate-none text-4xl sm:text-5xl md:text-7xl font-display font-bold max-w-3xl text-balance"
      >
        {t('title')}
      </h1>

      <p className="animate-fade-up motion-reduce:animate-none [animation-delay:150ms] text-lg md:text-xl text-muted mt-6 max-w-xl">
        {t('subtitle')}
      </p>

      <a
        href="#projects"
        className="animate-fade-up motion-reduce:animate-none [animation-delay:300ms] mt-10 inline-flex w-fit items-center border border-border px-6 py-3 text-accent hover:bg-surface transition-colors"
      >
        {t('cta')}
      </a>
    </section>
  );
}
