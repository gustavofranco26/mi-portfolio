import { useTranslations } from 'next-intl';
import { ParallaxLayer } from '@/components/ParallaxLayer';
import { SITE_NAME } from '@/lib/site';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="min-h-screen flex flex-col items-center justify-center text-center px-8 md:px-16 pt-24 pb-16"
    >
      <ParallaxLayer speed={0.06} className="mb-4 w-full">
        <p className="animate-fade-up motion-reduce:animate-none text-sm uppercase tracking-wide text-accent">
          {SITE_NAME}
        </p>
      </ParallaxLayer>

      <ParallaxLayer speed={0.12} className="w-full">
        <h1
          id="hero-heading"
          className="animate-slide-up motion-reduce:animate-none mx-auto max-w-3xl text-4xl sm:text-5xl md:text-7xl font-display font-bold text-balance"
        >
          {t('title')}
        </h1>
      </ParallaxLayer>

      <ParallaxLayer speed={0.2} className="mt-6 w-full">
        <p className="animate-fade-up motion-reduce:animate-none [animation-delay:120ms] mx-auto max-w-xl text-lg md:text-xl text-muted text-balance">
          {t('subtitle')}
        </p>
      </ParallaxLayer>

      <ParallaxLayer speed={0.28} className="mt-10 w-full">
        <div className="animate-fade-up motion-reduce:animate-none [animation-delay:240ms] flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <a href="#projects" className="btn-outline">
            {t('cta')}
          </a>
          <a
            href="#contact"
            className="group inline-flex min-h-11 items-center text-foreground hover:text-accent transition-colors"
          >
            {t('ctaSecondary')}
            <span
              aria-hidden="true"
              className="ml-1 inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </ParallaxLayer>
    </section>
  );
}
