# Pausa studio — Landing

Web pública de [pausastudio.com.ar](https://pausastudio.com.ar). Sofás y sillones a medida, diseñados y fabricados en Buenos Aires.

## Stack

- **Next.js 16** (App Router, Turbopack, Fluid Compute)
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4** (tokens en `app/globals.css`)
- **MDX** vía `next-mdx-remote` + `gray-matter` para el catálogo
- **Resend** para email transaccional del form de contacto
- **react-hook-form** + **zod** para validación de forms
- **@vercel/analytics** para tracking de visitas (GDPR-safe)
- Deploy en **Vercel**

Sin UI libraries pesadas (Radix, MUI, etc). Composición con Tailwind puro.

## Estructura

```
app/
  /                     → Home: hero + 3 modelos destacados + CTA WhatsApp
  /catalogo             → Grid de modelos (SSG desde MDX)
  /catalogo/[slug]      → Detalle del modelo (SSG por modelo)
  /pedi-a-medida        → Los 3 tiers (base / adaptado / bespoke)
  /nosotros             → Manifiesto + cómo trabajamos
  /contacto             → Form + WhatsApp + email + horarios
  /api/contact          → POST: valida con Zod + envía via Resend
  components/           → Navbar, Footer, WhatsAppButton, CtaWhatsApp, ImagePlaceholder
content/
  modelos/              → MDX de cada modelo del catálogo
lib/
  modelos.ts            → Parser y helpers de catálogo
  whatsapp.ts           → Helper de WhatsApp con detección de placeholder
public/
  og-default.png        → OG image global
docs/
  BRAND_BOOK_v0.3.md    → Documento maestro de marca (vigente)
```

## Sistema de diseño (v0.3)

### Tokens de color

- `#F5F2EC` — `offwhite`. Fondo dominante.
- `#1A1A1A` — `ink`. Tipografía y estructura. Nunca `#000`.
- `#8C8579` — `stone`. Texto secundario, kickers, separadores.
- `#3B3B3B` — `cement`. Cuerpo de texto sobre off-white.
- `#5A1F1F` — `oxblood`. Acento autoral. Un punto por composición.

### Escala tipográfica

Usar `<Kicker>`, `<Heading level tone>` y `<Body tone>` en vez de tipear classes:

- **H1 hero** — `font-display text-5xl md:text-7xl lg:text-8xl tracking-[-0.02em] leading-[1.02] text-ink`
- **H2 sección** — `font-display text-3xl md:text-5xl lg:text-6xl tracking-[-0.015em] leading-[1.05] text-ink`
- **H3 card** — `font-display text-xl md:text-2xl lg:text-3xl tracking-tight leading-[1.15] text-ink`
- **Body editorial** — `text-lg md:text-xl leading-[1.65] text-cement`
- **Body estándar** — `text-base md:text-lg leading-[1.7] text-cement`
- **Kicker** — `text-xs font-medium uppercase tracking-[0.25em] text-stone`

### `<Container>` y `<Section>`

`<Container>` aplica `max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-24` — 1280 px máx, padding lateral progresivo. Nada pegado al borde.

`<Section tone="...">` envuelve un `<Container>` y aplica ritmo vertical:

- `hero` — `min-h-[85vh] flex items-center py-24 lg:py-32` (primera sección; soporta `minHeightOverride="min-h-[40vh]"` para subheros).
- `standard` — `py-24 md:py-32 lg:py-40` (contenido regular).
- `pulmon` — `py-32 md:py-48 lg:py-56` (manifiesto, secciones de respiración).
- `cta` — `py-24 md:py-32 lg:py-40` (cierre de página).
- `compact` — `py-16 md:py-20` (solo con restricción concreta).

```tsx
<Section tone="hero">
  <Kicker>Pausa studio</Kicker>
  <Heading level="h1" tone="hero">Tu pausa. A medida.</Heading>
</Section>
```

### Composición por ruta

- **`/`** — hero split 50/50 (texto + imagen 4:5 dominante) → catálogo destacado grid 3 cols → manifesto pulmón "Diseñamos pausas." con 3 pilares → CTA quieter.
- **`/catalogo`** — subhero 40vh → grid 3 cols con gap generoso.
- **`/catalogo/[slug]`** — galería col-7 + ficha sticky col-5 (estilo Cassina) → descripción centrada max-w-3xl + tags de telas/configs.
- **`/pedi-a-medida`** — subhero 50vh → 3 tiers en pulmón con filete oxblood → CTA cierre.
- **`/nosotros`** — hero invertido (imagen izq, texto der) → manifiesto centrado pulmón → grid 2x2 "Cómo trabajamos" → CTA.
- **`/contacto`** — subhero 40vh "Hablemos." → form + aside con divisores hairline entre canales.

### Anti-patterns

- **NO** usar `py-*` arbitrarios sueltos en `<section>` — todo ritmo vertical pasa por `<Section tone="...">`.
- **NO** instanciar `<section>` sin `<Container>` adentro — el padding lateral es responsabilidad del Container.
- **NO** escribir hex literales en componentes ni `style={{ color: '#...' }}` — usar siempre las utilities (`text-ink`, `bg-oxblood`, etc.).
- **NO** agregar UI libraries (Radix, MUI, Headless UI) ni nuevas dependencias sin justificación — el sistema se sostiene con Tailwind puro + Motion.
- **NO** crear escalas tipográficas paralelas — extender `Heading` / `Body` con un tone nuevo si hace falta.

Para el contexto completo de marca ver `docs/BRAND_BOOK_v0.3.md`.

## Variables de entorno

Copiá `.env.local.example` a `.env.local` y completá:

| Variable | Para qué |
|---|---|
| `RESEND_API_KEY` | Email transaccional. Obtener gratis en [resend.com](https://resend.com) (3.000 emails/mes incluidos). |
| `CONTACT_EMAIL_TO` | Destinatario del form de contacto. Default `hola@pausastudio.com.ar`. |
| `CONTACT_EMAIL_FROM` | Remitente. Debe ser de un dominio verificado en Resend. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número WhatsApp en formato internacional sin `+` (ej: `5491134567890`). Mientras contenga `X`, el botón se renderiza pero queda deshabilitado. |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (para OG tags, sitemap). |

### Verificar dominio en Resend

Para que los mails salgan como `hola@pausastudio.com.ar` y no `via resend.dev`:

1. Resend dashboard → **Domains** → **Add Domain** → `pausastudio.com.ar`.
2. Resend te muestra registros DNS (SPF, DKIM, DMARC).
3. Agregarlos en el panel DNS donde se gestione el dominio (ver `docs/domain-migration.md`).
4. Esperar verificación (5–30 min) — Resend marca el dominio como **Verified**.
5. Setear `CONTACT_EMAIL_FROM=Pausa studio <hola@pausastudio.com.ar>` en `.env.local` y en Vercel Project Settings → Environment Variables.

## ⚠️ Antes del lanzamiento público

- [ ] **Reemplazar `NEXT_PUBLIC_WHATSAPP_NUMBER`** por el número real (chip dedicado) en `.env.local` y en Vercel.
- [ ] **Verificar dominio en Resend** y confirmar que llegan los mails.
- [ ] **Generar imágenes IA del catálogo** (ver `docs/BRAND_BOOK_v0.3.md` §6) y reemplazar los placeholders.
- [ ] Probar el form de contacto en producción.

## Desarrollo

```bash
# Instalar
npm install

# Dev server
npm run dev          # http://localhost:3000

# Build de producción
npm run build
npm run start

# Lint
npm run lint
```

## Cómo agregar un modelo al catálogo

1. Crear un archivo nuevo en `content/modelos/<slug>.mdx`.
2. Usar este schema en el frontmatter:

```mdx
---
slug: nombre-del-modelo
name: Nombre del modelo
tagline: Una línea sensorial corta.
category: Sofá | Sillón | Daybed | Almohadón | Pie de cama | Otro
tier: base | adaptado | bespoke
order: 4
hero_image: /modelos/<slug>/01.jpg
images:
  - /modelos/<slug>/01.jpg
  - /modelos/<slug>/02-detalle.jpg
dimensions:
  width_cm: 200
  depth_cm: 90
  height_cm: 70
  seat_height_cm: 40
materials:
  upholstery: Lino-algodón 380 g/m²
  filling_seat: Espuma alta densidad
  filling_back: Espuma media + plumón
  structure: Estructura reforzada en uniones
price_from_ars: 1800000
delivery_days: "30 a 40"
config_options:
  - Lineal 200 cm
  - L de 200 × 170 cm
upholstery_options:
  - Lino crudo
  - Terciopelo oxblood
---

Cuerpo en markdown. Usar `###` para secciones de la ficha
(Materiales, Tiempos, etc) y `>` para notas de estudio en blockquote.
```

3. El modelo aparece automáticamente en `/catalogo` (ordenado por `order`) y como ruta `/catalogo/<slug>`.
4. Las imágenes se buscan en `public/modelos/<slug>/`. Si no existen, se renderiza el placeholder `Foto pendiente` (off-white sobre cement) manteniendo el aspect ratio.

## Cómo testear el form de contacto en local

1. Crear cuenta en [resend.com](https://resend.com).
2. **Para testing rápido** (sin dominio verificado): podés mandar a tu propio mail usando `onboarding@resend.dev` como `CONTACT_EMAIL_FROM`. Solo funciona para el mail asociado a la cuenta Resend.
3. **Para producción**: verificar el dominio (ver arriba) y setear `CONTACT_EMAIL_FROM=Pausa studio <hola@pausastudio.com.ar>`.
4. Levantar el dev server: `npm run dev`.
5. Ir a `/contacto`, completar el form y enviar.
6. Verificar que el mail llegue. Si falla, el form muestra el error inline.

El endpoint está en [`app/api/contact/route.ts`](app/api/contact/route.ts) — Zod valida primero, después se llama a Resend.

## Decisiones técnicas

- **Server components por default.** Solo `ContactForm` y `WhatsAppButton` son client (el button por la condicional de placeholder; podría volverse server si nunca cambia).
- **`dynamicParams = false`** en `/catalogo/[slug]` — slug fuera del MDX devuelve 404 sin SSR.
- **Honeypot** en el form de contacto (campo `website` oculto fuera de pantalla).
- **`replyTo`** seteado al email del usuario para responder fácil desde la inbox.
- **Sin localStorage/sessionStorage** ni tracking de terceros más allá de Vercel Analytics.
- **Próxima auditoría de seguridad**: queda una vulnerabilidad `moderate` transitiva (`postcss < 8.5.10` via Next.js). El "fix" de `npm audit` downgradea Next a v9, así que esperamos a que Next ship parche en el branch 16.x.

## Próximas fases (Fase 3)

- [ ] Generar imágenes IA de los 3 modelos del catálogo siguiendo prompts de `docs/BRAND_BOOK_v0.3.md` §6.
- [ ] Reemplazar placeholders en `public/modelos/<slug>/`.
- [ ] Escribir copy final de cada modelo (las descripciones actuales son placeholder).
- [ ] Generar los primeros 9 posts de Instagram (60% detalle, 30% pieza completa, 10% caption-card) siguiendo §5.2 del brand book.
- [x] Comprar `pausastudio.com.ar` en NIC.ar — registrado. Migración completa en curso: ver `docs/domain-migration.md`.
- [ ] Considerar OG images dinámicas por ruta con `next/og`.
