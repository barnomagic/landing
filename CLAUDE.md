@AGENTS.md

# Proyecto: Landing Pausa

Cuando trabajes en este proyecto, usá siempre la skill **design-agent** para guiar decisiones visuales.
La brújula de diseño está en `docs/BRAND_BOOK_v0.3.md` en la raíz de este proyecto.

## Stack actual

- **Next.js 16** (App Router, Turbopack, Fluid Compute) + **React 19** + **TypeScript 5**
- **Tailwind CSS 4** (tokens en `app/globals.css`, sintaxis v4: `bg-linear-to-*`, `@theme inline`)
- **MDX** vía `next-mdx-remote` + `gray-matter` para el catálogo
- **Resend** para email transaccional del form de contacto
- **react-hook-form** + **zod** para validación
- **motion** v12 (Framer Motion) — `useReducedMotion` respetado
- **@vercel/analytics** para tracking (GDPR-safe)
- **next/image** para hero, cards, fichas — AVIF/WebP automático
- **Gemini 2.5 Flash Image** (Nano Banana) vía skill `pausa-image` para renders del catálogo
- Deploy: **Vercel** desde `github.com/barnomagic/landing`

Sin UI libraries pesadas (Radix, MUI, Headless UI). Composición con Tailwind puro + Motion.

## Estructura de carpetas

```
app/
  page.tsx                        → Home: hero cinematic oxblood + catálogo destacado + manifesto + CTA
  layout.tsx                      → RootLayout: fonts (Fraunces + Inter), Navbar, Footer, WhatsAppButton
  globals.css                     → Tokens @theme inline + preflight overrides
  catalogo/page.tsx               → Grid de modelos (SSG desde MDX, kicker de categoría)
  catalogo/[slug]/page.tsx        → Detalle: galería 5 shots + ficha sticky + Customizable
  pedi-a-medida/page.tsx          → Dos caminos (catálogo customizable + bespoke)
  nosotros/page.tsx               → Hero invertido + manifiesto + cómo trabajamos
  contacto/page.tsx               → Form + canales + horarios
  api/contact/route.ts            → POST: Zod + Resend
  components/
    Navbar.tsx                    → Sticky, wordmark con dot oxblood
    Footer.tsx                    → Wordmark con dot oxblood + cols nav/contacto/estudio
    WhatsAppButton.tsx            → Floating FAB (oculto si número en placeholder)
    CtaWhatsApp.tsx               → Wrapper de ButtonLink con detección de placeholder
    ImagePlaceholder.tsx          → next/image con fallback textual + aspect helpers
    system/
      Container.tsx               → max-w-7xl + padding lateral progresivo
      Section.tsx                 → 5 tones: hero / standard / pulmon / cta / compact
      Typography.tsx              → Kicker, Heading (4 tones), Body (4 tones)
      Buttons.tsx                 → Button, ButtonLink — variants: oxblood, outline, outline-cream, ghost-cream
      Card.tsx                    → CardLink, PilarCard, TierCard, StepCard
      Motion.tsx                  → FadeIn, FadeInOnView, ImageReveal
      Divider.tsx                 → Filete oxblood-tick + hairlines
content/modelos/                  → sofa-pausa.mdx, cubo.mdx, linea.mdx
lib/
  modelos.ts                      → Parser MDX + types + formatPriceArs
  whatsapp.ts                     → Helper de WhatsApp con detección de placeholder
public/
  hero-home.png                   → Hero del home (sofá bouclé sobre cyclorama oxblood)
  nosotros-estudio.jpg            → Foto del estudio
  modelos/{slug}/01..05.png       → 5 shots por modelo (hero/perfil/angular/detalle/oxblood)
  og-default.png                  → OG global
docs/
  BRAND_BOOK_v0.3.md              → Documento maestro de marca (vigente)
```

## Componentes clave

- **`<Section tone="hero|standard|pulmon|cta|compact">`** — ritmo vertical canónico. `hero` reservado solo para subheros restantes; el hero del home es `<section>` custom para escapar el Container.
- **`<Container>`** — `max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-24`. Toda sección pasa por acá excepto los assets full-bleed (hero home).
- **`<Heading level tone>`** — H1 hero (8xl lg), H2 section (6xl lg), H3 card, manifesto-closer (9xl lg).
- **`<Kicker>`** — `text-xs uppercase tracking-[0.25em] text-stone`. Override `!text-offwhite/70` sobre fondo oxblood.
- **`<Body tone="editorial|lead|standard|caption">`** — escala tipográfica de cuerpo. Override `!text-offwhite/85` sobre fondo oxblood.
- **`<Button>` / `<ButtonLink>`** — variants: `oxblood` (sólido brand), `outline` (ink sobre off-white), `outline-cream` (cream sobre oxblood), `ghost-cream` (texto cream con underline en hover).
- **`<CardLink>` + `<PilarCard>` + `<TierCard>` + `<StepCard>`** — primitivas del catálogo y manifiesto.
- **`<ImagePlaceholder src? alt? aspect>`** — wrapper de `next/image` con fallback textual; usado en cards del catálogo. Hero del home y `/nosotros` usan `next/image` directo para layouts custom.

## Brand colors (tokens en `app/globals.css`)

| Token | Hex | Uso |
|---|---|---|
| `offwhite` | `#F5F2EC` | Fondo dominante de toda la web. Texto sobre oxblood (`!text-offwhite`). |
| `ink` | `#1A1A1A` | Tipografía principal y estructura. Nunca `#000`. |
| `stone` | `#8C8579` | Texto secundario, kickers, separadores. |
| `cement` | `#3B3B3B` | Cuerpo de texto sobre off-white. |
| `oxblood` | `#5A1F1F` | Acento autoral + fondo del hero cinematic. Un punto por composición fuera del hero. |

## Estado de cada página

### `/` — Home
- **Hero v0.8.1 (cinematic oxblood full-bleed)**: `<section min-h-screen bg-oxblood>` con imagen `/hero-home.png` `object-cover object-[75%_center] lg:object-[80%_center]` + scrim horizontal `bg-linear-to-r from-oxblood/85 via-oxblood/30 to-transparent`. Bloque editorial `justify-center` con kicker/H1/body/CTAs en off-white (CTA primario `outline-cream`, secundario `ghost-cream`). H1 con "Tu pausa." regular + "A medida." en `font-light italic`.
- **Catálogo destacado**: H2 "Una primera mirada." + grid 3 cards (Sofá Pausa → Cubo → Linea por `order` del MDX).
- **Manifesto closer**: pulmón con kicker "Por qué Pausa" + H2 "Diseñamos pausas." (oxblood en "pausas") + 3 pilares (A tu medida / Detalle obsesivo / Modelo o bespoke).
- **CTA cierre**: H2 "Hablemos. Tu sofá viene después." + WhatsApp + mail.

### `/catalogo`
- Subhero `min-h-[40vh]` con kicker + H1 "Piezas con punto de partida."
- Grid 1/2/3 cols con cards: kicker categoría (mb-1) + nombre + tagline + línea "A medida de tu espacio". Sin dimensiones ni "Desde $" (cada modelo es punto de partida, no producto con ficha).
- Imágenes reales por modelo desde `public/modelos/{slug}/01-hero.png`.

### `/catalogo/[slug]`
- **Modelo = punto de partida configurable, no producto con ficha técnica.** La página responde "qué es y cómo se vuelve tuyo", no "qué medidas tiene". Decisión de marca: ver chat de rediseño (jun 2026).
- Estática (`dynamicParams = false`) desde `generateStaticParams()`.
- Galería col-7: hero `priority` + grid 3 (perfil/angular/detalle) + sección "En otras telas" (oxblood).
- Identidad sticky col-5: kicker categoría + H1 + tagline + **carácter** (frontmatter `caracter`, sin números) + CtaWhatsApp + nota "No tiene medidas fijas. Nace acá y se diseña con vos."
- Sección "Cómo se vuelve tuyo": 4 `StepCard` compartidos (`PROCESO_PASOS` en la page) — el gancho de conversión es el proceso de personalización.
- Sección "Lo que variás / Lo que siempre está": 2 cols hairline desde frontmatter `varias` / `invariante`. Reemplaza a la vieja "Customizable".
- Descripción MDX en `max-w-3xl` ("Sobre la pieza").
- `dimensions` / `materials` / `price_from_ars` siguen en el MDX para uso interno (cotización) pero **no se renderizan**. Copy editable (`caracter`/`varias`/`invariante`) marcado con `# EDITABLE` en cada MDX.
- `generateMetadata` dinámico con `og:image` apuntando a `hero_image`.

### `/pedi-a-medida`
- Subhero `min-h-[50vh]` con H1 "Vos lo soñás. Nosotros lo hacemos." + intro "Dos caminos. Uno se elige. El otro se imagina. Los dos terminan en tu casa."
- 2 TierCards (Catálogo customizable / Diseño bespoke) — sin "Plazo" expuesto.
- CTA cierre alineado al H2 del home.

### `/nosotros`
- Hero invertido (imagen `/nosotros-estudio.jpg` aspect-square izq, texto der): kicker + H1 "Pausa = tu momento." + body manifest.
- Manifiesto: 4 párrafos exactos del brand book §1 + cierre "Diseñamos pausas." en oxblood.
- "Cómo trabajamos": 4 StepCards (Briefing / Propuesta / Construcción / Entrega).
- CTA cierre con WhatsApp + ver catálogo.

### `/contacto`
- Subhero `min-h-[40vh]` "Hablemos."
- Form (Zod + Resend) con campos: nombre, email, tipo (catalogo-customizable / bespoke / otro), mensaje + honeypot.
- Aside: WhatsApp + email + estudio + horarios. Sin promesas de tiempo de respuesta.

## Pendientes (Fase 3 — pre-lanzamiento público)

- [x] **Precios fuera del front público**: decisión de marca (jun 2026) — sin precio en cards ni en detalle, todo va a la conversación. `price_from_ars` queda en el MDX solo como referencia interna de cotización (no se renderiza). El flag `showPrices` ya no afecta a `/catalogo` ni `/catalogo/[slug]`.
- [ ] **WhatsApp**: setear `NEXT_PUBLIC_WHATSAPP_NUMBER` con el número real (formato internacional sin `+`, ej. `5491134567890`) en `.env.local` y en Vercel Environment Variables. Mientras contenga `X`, el `CtaWhatsApp` redirige a `/contacto` y el FAB se oculta.
- [ ] **Instagram**: completar handle real en footer (`lg:col-span-2` "Estudio") y agregar enlace. Hoy dice "Instagram · próximamente".
- [ ] **Imágenes finales**: revisar 5 shots por modelo (regenerables con la skill `pausa-image`).
- [ ] **OG images por ruta**: considerar dinámicas con `next/og` para `/catalogo`, `/pedi-a-medida`, `/nosotros`. Hoy comparten `og-default.png`.
- [ ] **Dominio `.com.ar`**: registrado ✅ — migración en curso (DNS, Vercel, Google, Resend + backoffice/Clerk). Plan maestro: `docs/domain-migration.md`.

## Reglas operativas

1. **Sistema de diseño**: no instanciar `<section>` sin `<Container>` adentro (excepción: hero home full-bleed con escape intencional). No `py-*` arbitrarios — pasa por `<Section tone>`.
2. **Tipografía**: nunca crear escalas paralelas. Si falta un tone, extender `Heading` o `Body`.
3. **Colores**: solo utilities del theme (`text-ink`, `bg-oxblood`, etc.). Nada de hex literales en componentes.
4. **Imágenes**: convención fija para modelos (`01-hero` → `05-oxblood`). Terracota retirada (antitarget rural — ver `pausa-agents/knowledge/palette-rules.md`). Cambiar la convención rompe el schema MDX + galería del detalle.
5. **Brand book**: cualquier cambio compositivo o de copy se argumenta contra el manifiesto (§1) y los antitargets (§2.4). Las decisiones quedan reflejadas en `docs/BRAND_BOOK_v0.3.md`.
6. **Skill `pausa-image`**: para generar/regenerar renders del catálogo desde 1 imagen de referencia. Output respeta la convención de 5 shots y fondo `#F5F2EC` directo desde Gemini (sin post-procesamiento).
