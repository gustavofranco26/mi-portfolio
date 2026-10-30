@AGENTS.md

# mi-portfolio

Portfolio personal de Franco Cardenas: una sola página bilingüe (es/en) con secciones Hero, About, Projects, Stack y Contact, desplegada en Vercel. Convenciones generales del stack: skill `nextjs-supabase`; para decisiones de diseño, skill `web-design-pro`. Aquí va solo lo propio de este proyecto.

## Comandos

- `npm run dev` (configurado en `.claude/launch.json`)
- `npx tsc --noEmit` · `npm run lint` · `npm run build`
- Sin tests automáticos. Rama principal `main`.

## Estructura

- Todo el código vive en `src/` (el alias `@/` apunta a `src/`).
- `src/app/[locale]/`: `layout.tsx` (fuentes, metadata, `NextIntlClientProvider`), `page.tsx` (arma las secciones), `globals.css` (tokens) y `opengraph-image.tsx`. En `src/app/`: `api/contact`, `icon`, `apple-icon`, `robots`, `sitemap`.
- `src/components/sections/`: una sección por archivo. `src/components/`: `Header`, `Footer` y piezas de movimiento (`MotionProvider`, `SmoothScroll`, `ScrollProgress`, `ParallaxLayer`).
- `src/content/`: datos estructurados (`projects.ts`, `stack.ts`): ids, stack y links. Los textos visibles no van aquí.
- `messages/es.json` y `messages/en.json`: todos los textos de la página, agrupados por sección (`Nav`, `Hero`, `About`, `Projects.items.<id>`, `Stack`, `Contact`…).
- `src/lib/`: `site.ts` (URL, nombre, redes), `motion.ts` (tiempos y variantes de animación), `supabase.ts`, `useLenis.ts`.
- `supabase/contact_messages.sql`: tabla del formulario de contacto.

## i18n (next-intl)

- Locales `es` (por defecto) y `en`, definidos en `src/i18n/routing.ts`. `src/proxy.ts` es el middleware de next-intl.
- Ningún texto visible va escrito en el componente: todo sale de `useTranslations('<Sección>')` (o `getTranslations` en servidor).
- Cada texto nuevo se agrega **en los dos** archivos de `messages/`, con la misma clave.
- Para links internos, usá `Link`, `useRouter` y `usePathname` de `@/i18n/navigation`, no los de `next/link` ni `next/navigation`.
- Proyecto nuevo: agregalo en `src/content/projects.ts` (amplía el tipo `id`) y sus textos en `Projects.items.<id>` de ambos idiomas.

## Diseño y movimiento

- Tema oscuro fijo. Los tokens están en `@theme` de `globals.css` (`background`, `surface`, `foreground`, `muted`, `accent`, `border`, `border-strong`, `ease-soft`). Usá esos tokens, no hex sueltos.
- Fuentes: Fraunces (`font-display`, titulares) e Inter (`font-sans`), cargadas en el layout.
- Animaciones con framer-motion usando `reveal()`, `STAGGER` y `EASE_SOFT` de `src/lib/motion.ts`. No inventes tiempos nuevos en el componente.
- Respetá `prefers-reduced-motion` (ya está en `globals.css` y en `ParallaxLayer`). Scroll suave con Lenis (`SmoothScroll`, `useLenis`).
- Las secciones con animación o estado son `'use client'`; si una no lo necesita (como `Hero`), dejala como componente de servidor.

## Contacto

- `POST /api/contact`: valida nombre, email y mensaje, descarta en silencio si viene el campo trampa `company` (honeypot) e inserta en `contact_messages`. Responde `{ ok, error }`; mantené ese formato.
- Usa `getSupabaseServerClient()` con la anon key y RLS: la política solo permite `insert` a `anon`. No hace falta service role.
- Variables de entorno: `SUPABASE_URL`, `SUPABASE_ANON_KEY` (sin prefijo `NEXT_PUBLIC_`, solo servidor) y `NEXT_PUBLIC_SITE_URL`.

## SEO

- La metadata se genera por idioma en `generateMetadata` del layout. `sitemap.ts`, `robots.ts` y `opengraph-image.tsx` usan `SITE_URL` de `src/lib/site.ts`; no hardcodees la URL en otro lado.
