# Pausa studio — Landing

Web pública de [pausastudio.rest](https://pausastudio.rest). Sofás y sillones a medida, diseñados y fabricados en Buenos Aires.

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
  BRAND_BOOK_v0.2.md    → Documento maestro de marca (vigente)
```

## Variables de entorno

Copiá `.env.local.example` a `.env.local` y completá:

| Variable | Para qué |
|---|---|
| `RESEND_API_KEY` | Email transaccional. Obtener gratis en [resend.com](https://resend.com) (3.000 emails/mes incluidos). |
| `CONTACT_EMAIL_TO` | Destinatario del form de contacto. Default `hola@pausastudio.rest`. |
| `CONTACT_EMAIL_FROM` | Remitente. Debe ser de un dominio verificado en Resend. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número WhatsApp en formato internacional sin `+` (ej: `5491134567890`). Mientras contenga `X`, el botón se renderiza pero queda deshabilitado. |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (para OG tags, sitemap). |

### Verificar dominio en Resend

Para que los mails salgan como `hola@pausastudio.rest` y no `via resend.dev`:

1. Resend dashboard → **Domains** → **Add Domain** → `pausastudio.rest`.
2. Resend te muestra registros DNS (SPF, DKIM, DMARC).
3. Agregarlos en el panel DNS de NIC.ar o donde tengas el dominio.
4. Esperar verificación (5–30 min) — Resend marca el dominio como **Verified**.
5. Setear `CONTACT_EMAIL_FROM=Pausa studio <hola@pausastudio.rest>` en `.env.local` y en Vercel Project Settings → Environment Variables.

## ⚠️ Antes del lanzamiento público

- [ ] **Reemplazar `NEXT_PUBLIC_WHATSAPP_NUMBER`** por el número real (chip dedicado) en `.env.local` y en Vercel.
- [ ] **Verificar dominio en Resend** y confirmar que llegan los mails.
- [ ] **Generar imágenes IA del catálogo** (ver `docs/BRAND_BOOK_v0.2.md` §6) y reemplazar los placeholders.
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
  structure: Pino macizo
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
3. **Para producción**: verificar el dominio (ver arriba) y setear `CONTACT_EMAIL_FROM=Pausa studio <hola@pausastudio.rest>`.
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

- [ ] Generar imágenes IA de los 3 modelos del catálogo siguiendo prompts de `docs/BRAND_BOOK_v0.2.md` §6.
- [ ] Reemplazar placeholders en `public/modelos/<slug>/`.
- [ ] Escribir copy final de cada modelo (las descripciones actuales son placeholder).
- [ ] Generar los primeros 9 posts de Instagram (60% detalle, 30% pieza completa, 10% caption-card) siguiendo §5.2 del brand book.
- [ ] Comprar `pausastudio.com.ar` en NIC.ar y redirigir al `.rest`.
- [ ] Considerar OG images dinámicas por ruta con `next/og`.
