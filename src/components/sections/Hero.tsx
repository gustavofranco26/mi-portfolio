import { useTranslations } from 'next-intl';
import { ParallaxLayer } from '@/components/ParallaxLayer';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section
      aria-labelledby="hero-heading"
      className="min-h-screen flex flex-col justify-center px-8 md:px-16 pt-24 pb-16"
    >
      <ParallaxLayer speed={0.12}>
        <h1
          id="hero-heading"
          className="animate-slide-up motion-reduce:animate-none text-4xl sm:text-5xl md:text-7xl font-display font-bold max-w-3xl text-balance"
        >
          {t('title')}
        </h1>
      </ParallaxLayer>

      <ParallaxLayer speed={0.2} className="mt-6">
        <p className="animate-fade-up motion-reduce:animate-none [animation-delay:120ms] text-lg md:text-xl text-muted max-w-xl">
          {t('subtitle')}
        </p>
      </ParallaxLayer>

      <ParallaxLayer speed={0.28} className="mt-10">
        <a
          href="#projects"
          className="btn-outline animate-fade-up motion-reduce:animate-none [animation-delay:240ms]"
        >
          {t('cta')}
        </a>
      </ParallaxLayer>
    </section>
  );
}
