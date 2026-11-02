import { useTranslations } from 'next-intl';
import { MaskHeading } from '@/components/MaskHeading';
import { ScrollHighlight } from '@/components/ScrollHighlight';

export function About() {
  const t = useTranslations('About');

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="min-h-screen flex items-center justify-center px-8 md:px-16 py-24 border-t border-border"
    >
      <div className="w-full max-w-3xl">
        <MaskHeading
          id="about-heading"
          text={t('heading')}
          className="mb-10 text-center font-display text-3xl font-bold text-accent md:text-5xl"
        />
        <ScrollHighlight
          paragraphs={[t('body'), t('passion'), t('mission')]}
          className="space-y-6 text-left text-lg leading-relaxed md:text-xl"
        />
      </div>
    </section>
  );
}
