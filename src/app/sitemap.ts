import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const languages = {
  es: `${SITE_URL}/es`,
  en: `${SITE_URL}/en`,
  'x-default': SITE_URL,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: languages.es, alternates: { languages } },
    { url: languages.en, alternates: { languages } },
  ];
}
