import { ImageResponse } from 'next/og';
import { routing } from '@/i18n/routing';

export const alt = 'Franco Cardenas — Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#0B0B0C',
          color: '#EDEDED',
          borderTop: '12px solid #5EEAD4',
        }}
      >
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, color: '#5EEAD4' }}>FC</div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 104, fontWeight: 800, lineHeight: 1.05 }}>
            Franco Cardenas
          </div>
          <div style={{ display: 'flex', fontSize: 48, color: '#5EEAD4', marginTop: 16 }}>
            Full Stack Developer
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 30, color: '#8A8A8E' }}>
          Next.js · TypeScript · Supabase
        </div>
      </div>
    ),
    { ...size },
  );
}
