import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Fraunces, Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { GITHUB_URL, LINKEDIN_URL, SITE_NAME, SITE_URL } from '@/lib/site';
import { SmoothScroll } from '@/components/SmoothScroll';
import { MotionProvider } from '@/components/MotionProvider';
import './globals.css';
import { Header } from '@/components/Header';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const OG_LOCALES: Record<string, string> = { es: 'es_ES', en: 'en_US' };

export const viewport: Viewport = {
  themeColor: '#0B0B0C',
  colorScheme: 'dark',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const path = `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    alternates: {
      canonical: path,
      languages: { es: '/es', en: '/en', 'x-default': '/' },
    },
    openGraph: {
      type: 'website',
      url: path,
      siteName: SITE_NAME,
      title: t('title'),
      description: t('description'),
      locale: OG_LOCALES[locale],
      alternateLocale: Object.entries(OG_LOCALES)
        .filter(([key]) => key !== locale)
        .map(([, value]) => value),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  jobTitle: 'Full Stack Developer',
  url: SITE_URL,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  knowsAbout: ['Next.js', 'TypeScript', 'Supabase', 'Python', 'Flask'],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Nav' });

  return (
    <html lang={locale} className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider>
          <MotionProvider>
            <SmoothScroll>
              <a
                href="#main"
                className="sr-only focus:not-sr-only fixed top-4 left-4 z-[60] border border-accent bg-surface px-4 py-2 text-accent"
              >
                {t('skip')}
              </a>
              <Header />
              {children}
            </SmoothScroll>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
