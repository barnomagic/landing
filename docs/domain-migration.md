# Migración de dominio — pausastudio.rest → pausastudio.com.ar

**Decidido 2026-05-23.** Estrategia: montar `.com.ar` en paralelo, redirect 301 del `.rest` durante su año restante, abandono del `.rest` al vencer (no se renueva).

> **Plan maestro único** — cubre **landing** Y **backoffice** (auditado 2026-06-10).
> El backoffice se migra en la FASE BO (abajo).

## Contexto del setup actual

- **Web (landing):** Next.js en Vercel, dominio `pausastudio.rest`. El código lee `NEXT_PUBLIC_SITE_URL` (env var) con fallback hardcoded.
- **Backoffice:** Next.js en Vercel (proyecto `backoffice`), dominio `backoffice.pausastudio.rest`. Auth con **Clerk** (instancia de producción atada al dominio) + Google OAuth con credenciales propias (GCP `Pausa Studio Backoffice`). **Sin dominios hardcodeados en código** — la migración es 100% configuración externa (Vercel + Clerk + GCP).
- **Mail bandeja:** Google Workspace con dominio propio `pausastudio.rest` (buzón `hola@`).
- **Mail transaccional:** Resend manda los mails del form de contacto como `hola@pausastudio.rest`.
- **Registrar nuevo:** NIC.ar (requiere CUIT — Ivan lo tiene).

## Inventario DNS actual (`.rest` en Porkbun) → qué va en `.com.ar`

Auditado 2026-06-10 contra el panel de Porkbun. **Ningún registro está muerto** — todos mapean a servicios activos. Los valores de Clerk y Resend NO se copian: cada servicio genera registros nuevos al agregar el dominio `.com.ar` en su dashboard.

| Registro en `.rest` | Servicio | En `.com.ar` |
|---|---|---|
| A `@` → `216.198.79.1` | Vercel (landing apex) | Recrear — Vercel da el valor al agregar el dominio (B3) |
| CNAME `www` | Vercel (landing) | Recrear → `cname.vercel-dns.com` (B3) |
| CNAME `backoffice` | Vercel (backoffice) | Recrear — Vercel da el valor (BO1) |
| CNAME `clerk.backoffice` | Clerk Frontend API | Recrear — **valor nuevo de Clerk** (BO2) |
| CNAME `accounts.backoffice` | Clerk Account Portal | Recrear — valor nuevo de Clerk (BO2) |
| CNAME `clk._domainkey.backoffice` | Clerk DKIM 1 | Recrear — valor nuevo de Clerk (BO2) |
| CNAME `clk2._domainkey.backoffice` | Clerk DKIM 2 | Recrear — valor nuevo de Clerk (BO2) |
| CNAME `clkmail.backoffice` | Clerk mail | Recrear — valor nuevo de Clerk (BO2) |
| TXT `_dmarc.backoffice` | DMARC mails de Clerk | Recrear (BO2) |
| MX `@` | Google Workspace (`hola@`) | Recrear → `smtp.google.com` (B4) |
| TXT `@` | Verificación Google + SPF | Recrear — TXT de verificación nuevo + `v=spf1 include:_spf.google.com ~all` (B4) |
| TXT `_dmarc` | DMARC raíz | Recrear — mismo valor sirve (B4) |
| MX `send` | Resend (bounces) | Recrear — valor que da Resend (B6) |
| TXT `send` | Resend SPF | Recrear — valor de Resend (B6) |
| TXT `resend._domainkey` | Resend DKIM | Recrear — **clave DKIM nueva**, no copiar la vieja (B6) |

## Regla de oro

**No dejar expirar el `.rest` hasta que el `.com.ar` esté 100% funcionando + redirect armado.** Todo el plan se basa en solapar ambos dominios durante la transición. El `.rest` ya está pago por ~1 año, hay tiempo de sobra.

---

## FASE A — Adquisición

- [x] **A1.** Registrar `pausastudio.com.ar` en [nic.ar](https://nic.ar) con CUIT/CUIL. ✅ Registrado (verificado 2026-06-11).
- [x] **A2.** Esperar a que el registro propague. ✅ El TLD `.ar` ya delega a `ns1.donweb.com` / `ns2.donweb.com`.

> **Estado verificado 2026-06-11:** el dominio está registrado y delegado a los nameservers de **DonWeb**, pero la zona DNS NO existe ahí (los NS responden `REFUSED` → el dominio da SERVFAIL y no resuelve nada). **B1 es el paso bloqueante**: o se crea/activa la zona en el panel de DonWeb, o se cambian los nameservers (en el panel de DonWeb/NIC.ar) a Cloudflare o Vercel.

## FASE B — Configurar `.com.ar` en paralelo (ambos dominios vivos)

### DNS
- [x] **B1.** Decidir dónde se gestiona el DNS del `.com.ar`. ✅ **Decisión 2026-06-11: Vercel DNS.** Pasos: (1) agregar `pausastudio.com.ar` en Vercel (team `barnomagic`), (2) en el panel de DonWeb cambiar la delegación a `ns1.vercel-dns.com` / `ns2.vercel-dns.com`, (3) los registros MX/TXT/CNAME de Google, Resend y Clerk se cargan después en Vercel → Domains → DNS Records.
- [x] **B2.** Registros DNS del `.com.ar` — ✅ cargados en Vercel DNS (2026-06-11), activos cuando propague la delegación:
  - **Web:** automático (la zona vive en Vercel — no hace falta A/CNAME manual).
  - **Mail (Google):** `MX @ → smtp.google.com` prio 1. ✅
  - **Verificación Google:** `TXT @ → google-site-verification=o8x33tQN7Qs52fB6Ri2JtwHyIkc_xNgT9FRnc8DL0EQ`. ✅
  - **SPF:** `TXT @ → v=spf1 include:_spf.google.com ~all`. ✅ (mejora: el `.rest` no lo tenía)
  - **DMARC:** `TXT _dmarc → v=DMARC1; p=none;` (espejo del `.rest`). ✅
  - **Resend:** pendiente — los da Resend en B6 (ver bloqueo de plan abajo).
  - ⏳ **Esperando**: que NIC.ar publique la delegación a `ns1/ns2.vercel-dns.com` (cambiada en DonWeb el 2026-06-11; el TLD todavía servía los NS de DonWeb al cierre de la sesión).

### Vercel
- [x] **B3.** ✅ `pausastudio.com.ar` (redirect 308 → www) + `www.pausastudio.com.ar` (Production) agregados al proyecto `landing` (2026-06-11). El team real de Vercel es `ivandanker93-1339s-projects` (no "barnomagic", que es la org de GitHub).

### Google Workspace
- [x] **B4.** ✅ **Completado 2026-06-12:** dominio secundario verificado + **Gmail activado** para `@pausastudio.com.ar` (los mails rutean a Google, hasta 24 h para estar 100%).
- [x] **B5.** ✅ **Completado 2026-06-12:** alias `.com.ar` creados para los 3 buzones — `hola@`, `ivan@` y `mili@pausastudio.com.ar` (reciben en ambas direcciones). **Ojo:** los alias reciben mail pero NO sirven para login — el login sigue con `@pausastudio.rest` hasta D4.

### Resend
- [x] **B6.** ✅ **Completado 2026-06-12 vía swap** (plan free = 1 dominio): `pausastudio.rest` borrado de Resend, `pausastudio.com.ar` agregado (región São Paulo), DKIM (`resend._domainkey`) + SPF/MX (`send`) cargados en Vercel DNS → **dominio Verified, listo para enviar**. No se configuró el MX de recepción de Resend (la recepción es por Google).

## FASE C — Verificación (todo `.com.ar` funciona, `.rest` sigue vivo)

- [x] **C1.** ✅ `https://www.pausastudio.com.ar` responde 200 con la landing; apex 308 → www; certificados Let's Encrypt emitidos (verificado 2026-06-12).
- [ ] **C2.** Mandar un mail de prueba a `hola@pausastudio.com.ar` → confirmar que llega al buzón de Google. _(Pendiente: prueba manual de Ivan.)_
- [x] **C3.** ✅ **Verificado 2026-06-15.** El form de contacto entrega OK a `hola@pausastudio.com.ar` (Resend "Delivered", llegó al buzón).
  - ⚠️ **Trampa que apareció:** una prueba prematura (2026-06-11, cuando el alias `.com.ar` aún no existía) **rebotó (Bounced)** y Resend metió `hola@pausastudio.com.ar` en su **lista de supresión** → los envíos siguientes salían **Suppressed** (bloqueados sin intentar). Fix: removerla de la supresión en Resend (el plan free **no expone la lista en el panel** — la URL `/suppressions` da 404; se hizo por otra vía). Lección: no mandar pruebas a una dirección antes de que el alias/MX esté activo, o queda suprimida.

## FASE D — Switch (cambiar el default a `.com.ar`)

> A partir de acá el `.com.ar` pasa a ser el dominio principal. El `.rest` sigue activo para el redirect.

- [x] **D1.** ✅ `NEXT_PUBLIC_SITE_URL=https://pausastudio.com.ar` seteado en Vercel (Production+Preview, 2026-06-12). Deploy disparado con el push de D2.
- [x] **D2.** ✅ Branch `feat/domain-migration` mergeada a master y pusheada (2026-06-12, build verde). Único conflicto (`.env.local.example`) resuelto a favor del estado post-swap.
- [x] **D3.** ✅ **Completado 2026-06-12** (tras el swap de B6): `CONTACT_EMAIL_FROM=Pausa studio <hola@pausastudio.com.ar>` y `CONTACT_EMAIL_TO=hola@pausastudio.com.ar` en Vercel Production. El FROM en `.com.ar` ya es válido porque Resend verificó el dominio. _Pendiente menor: FROM/TO existen solo en Production — re-agregar en Preview por dashboard si se usa el form en previews._
- [x] **D4.** ✅ **Completado 2026-06-15.** Google Workspace → Gestionar dominios → "Cambiar el dominio principal" → `pausastudio.com.ar`. El `.rest` pasó a dominio secundario automáticamente; el cambio tarda hasta 48 h en aplicarse del todo.
  - ⚠️ **Corrección al plan:** Google **NO renombra automáticamente** las direcciones de usuario (este doc asumía que sí). Cambiar el dominio primario cambia la identidad de la organización, pero `ivan@`/`hola@`/`mili@` **siguen logueándose con `@pausastudio.rest`** hasta que se renombre cada usuario por separado (Admin → Usuario → Actualizar usuario → cambiar email primario; el `.rest` queda como alias). **Decisión diferida** (renombrar el propio admin mid-sesión es delicado, y el mail a `@pausastudio.com.ar` ya funciona vía alias). Ejecutar cuando se quiera que los logins sean `.com.ar`.

## FASE BO — Backoffice (Vercel + Clerk + Google OAuth)

> Requiere FASE A completa (dominio registrado y DNS del `.com.ar` operativo). Independiente de las fases C/D de la landing — se puede hacer en paralelo. **El paso BO2 es un switch sin solapamiento** (Clerk no soporta dos dominios a la vez en la misma instancia de producción): hacerlo en un momento de bajo uso. Es herramienta interna, el impacto es acotado.

> ✅ **FASE BO COMPLETADA 2026-06-15** — login con Google verificado end-to-end en `backoffice.pausastudio.com.ar`.

- [x] **BO1.** ✅ `backoffice.pausastudio.com.ar` agregado al proyecto `backoffice` en Vercel (2026-06-11).
- [x] **BO4.** ✅ **(hecho ANTES del switch, aditivo)** GCP project `Pausa Studio Backoffice` (`pausa-studio-493016`, owner `ivan@pausastudio.rest`) → OAuth client → agregados Redirect URI `https://clerk.backoffice.pausastudio.com.ar/v1/oauth_callback` + JS Origin `https://backoffice.pausastudio.com.ar` (sin borrar los `.rest`). Verificado: Google acepta el redirect sin `redirect_uri_mismatch`.
- [x] **BO2.** ✅ Clerk → Danger zone → Change domain → `backoffice.pausastudio.com.ar`. **⚠️ Decisión clave: elegir "Secondary application"** (NO "Primary"). Primary pondría el Clerk API en `clerk.pausastudio.com.ar` y mails desde `@pausastudio.com.ar`, chocando con el Google Workspace/Resend del dominio raíz. Secondary lo mantiene en `clerk.backoffice.*`. Generó 5 CNAMEs (`clerk.`/`accounts.`/`clkmail.`/`clk._domainkey.`/`clk2._domainkey.` + `.backoffice`) → cargados en Vercel DNS → DNS Verified + cert SSL emitido (Google Trust Services). No pidió `_dmarc.backoffice`.
- [x] **BO3.** ✅ Nueva `pk_live_Y2xlcmsuYmFja29mZmljZS5wYXVzYXN0dWRpby5jb20uYXIk` (= `clerk.backoffice.pausastudio.com.ar$`) en Vercel `backoffice` Production. `sk_live` **NO** cambió (enmascarado en el dashboard). Redeploy **sin build cache** (crítico: las `NEXT_PUBLIC_*` se inlinean en build-time). Verificado: el HTML servido ya trae la pk nueva.
- [x] **BO5.** ✅ `https://backoffice.pausastudio.com.ar/sign-in` carga la UI de Clerk + "Continue with Google" redirige a Google con el redirect_uri nuevo aceptado. **Hallazgo:** `backoffice.pausastudio.com.ar` no resolvía — faltaba el CNAME `backoffice → 885172b892d10307.vercel-dns-017.com` en Vercel DNS (Vercel no lo auto-crea para zonas propias con subdominios). Se agregó manualmente; coexiste OK con los `clerk.backoffice.*`.
- [x] **BO6.** ✅ `backoffice.pausastudio.rest` → redirect 308 → `backoffice.pausastudio.com.ar` en Vercel.
- [x] **BO7.** ✅ `docs/configuraciones.md` (repo backoffice) actualizado: dominios `.com.ar`, Clerk, OAuth URIs, DNS en Vercel, y Supabase→Neon.

## FASE E — Redirect + propagación

- [x] **E1.** ✅ **Completado 2026-06-15.** Vercel landing: `pausastudio.rest` y `www.pausastudio.rest` → redirect **308 Permanent** → `www.pausastudio.com.ar` (verificado por curl). Nota: hubo que redirigir primero el apex (Vercel no deja redirigir el www mientras el apex apunta a él). Backoffice `.rest` → 308 → `.com.ar` se hizo en BO6.
- [x] **E2.** ✅ **Completado 2026-06-15.** Propiedad de **Dominio** `pausastudio.com.ar` agregada y **verificada** en Google Search Console (TXT `google-site-verification=3Isxxaf...` en Vercel DNS, método "proveedor de nombres de dominio"). **"Change of address" N/A:** el `.rest` nunca tuvo propiedad en Search Console (sitio pre-lanzamiento, sin historial SEO que migrar) — la consolidación la cubre el redirect 308 (E1).
- [ ] **E3.** Actualizar link en bio del Instagram nuevo → `pausastudio.com.ar`.
- [ ] **E4.** Actualizar firmas de mail, `BRIEF_TALLERES_v1.docx`, brand book PDF, cualquier material con el dominio viejo.

## FASE F — Largo plazo (~11 meses, antes del vencimiento del `.rest`)

- [ ] **F1.** Confirmar que el redirect ya no recibe tráfico relevante (Search Console / analytics).
- [ ] **F2.** Dejar expirar el `.rest` (no renovar).
- [ ] **F3.** Google Workspace: remover el dominio `.rest` secundario (solo después de confirmar que nadie escribe a `@pausastudio.rest`).
- [ ] **F4.** Resend: remover el dominio `.rest`.
- [ ] **F5.** Google Cloud Console → OAuth client: borrar el Redirect URI y JS Origin del `.rest` (agregados en paralelo en BO4).
- [ ] **F6.** Porkbun: al expirar el `.rest` los registros mueren solos — no hace falta limpiar nada a mano.

---

## Cambios de código (repo landing)

Estos van en una branch `feat/domain-migration` y se mergean en **D2** (no antes — si se deployan antes de que el dominio exista, los mailto apuntarían a un mail que aún no recibe).

| Archivo | Línea | Cambio |
|---|---|---|
| `app/layout.tsx` | 24 | fallback `https://pausastudio.rest` → `https://pausastudio.com.ar` |
| `app/sitemap.ts` | 5 | fallback → `.com.ar` |
| `app/robots.ts` | 4 | fallback → `.com.ar` |
| `app/components/Footer.tsx` | 43, 46 | `mailto:hola@pausastudio.rest` + texto → `.com.ar` |
| `app/contacto/page.tsx` | 68, 71 | `mailto:hola@pausastudio.rest` + texto → `.com.ar` |
| `.env.local.example` | 17, 20, 34 | `CONTACT_EMAIL_TO/FROM` + `NEXT_PUBLIC_SITE_URL` → `.com.ar` |
| `README.md` | varias | menciones del dominio (doc) |
| `CLAUDE.md` | 128 | mención del dominio (doc) |

**Nota:** el código real lee de `NEXT_PUBLIC_SITE_URL`. En producción la env var manda; los fallbacks hardcoded solo aplican en local sin `.env`. Por eso el cambio crítico es la env var de Vercel (D1), no el código. Igual se actualizan los fallbacks por consistencia.

### Repo backoffice — sin cambios de código

Auditado 2026-06-10: **cero dominios hardcodeados** en el código del backoffice. El dominio solo aparece en `docs/configuraciones.md` (se actualiza en BO7). Toda la migración del backoffice es configuración externa: Vercel + Clerk + GCP (FASE BO).

---

## Lo que NO se rompe / NO se toca

- **Repo `pausa-agents`** (sistema de agentes): el dominio no está hardcodeado. Cero impacto. Los `#pausastudio` (hashtags) y `"pausastudio"` (wordmark de footers) son independientes del dominio.
- **Mails históricos** en Google Workspace: no se pierden — viven en el buzón, independiente del dominio.
- **Cuenta de Instagram nueva**: se configura aparte (no depende de este dominio, pero el link en bio sí se actualiza en E3).

---

## Histórico

- **2026-06-15** — **FASE BO completa + E1 + D4 + E2.** Backoffice migrado a `backoffice.pausastudio.com.ar` con login Google verificado end-to-end (BO1-BO7). Landing `.rest` (apex+www) → 308 → `www.pausastudio.com.ar` (E1). Dominio primario de Google Workspace cambiado a `pausastudio.com.ar` (D4 — ojo: NO auto-renombra logins, ver D4). Search Console: propiedad `pausastudio.com.ar` verificada por DNS (E2). **Pendiente:** renombrar emails de usuario a `.com.ar` (sub-paso de D4, diferido), E3/E4 (Instagram/firmas — usuario), C2/C3 (pruebas de mail), FASE F (largo plazo). **Migración técnica esencialmente terminada: ambos sitios y el login viven en `.com.ar`.**
- **2026-06-12** — FASES B, C1 y D1-D3 completadas. Google: dominio verificado + Gmail activado + alias `.com.ar` para hola@/ivan@/mili@. Resend: swap ejecutado (`.rest` borrado, `.com.ar` Verified con DKIM/SPF/MX en Vercel DNS). Vercel: env vars `NEXT_PUBLIC_SITE_URL` + `CONTACT_EMAIL_*` actualizadas a `.com.ar`; branch `feat/domain-migration` mergeada y deployada. **La landing vive en https://www.pausastudio.com.ar.** Pendiente: C2/C3 (pruebas manuales de mail), D4 (dominio primario Google), FASE BO2-BO7 (Clerk/backoffice), FASE E (redirect 301 + Search Console).
- **2026-05-23** — Plan creado. Estrategia redirect + abandono planificado del `.rest`. Setup: Google Workspace (mail), Vercel (web), Resend (transaccional), NIC.ar (registrar nuevo).
- **2026-06-11 (tarde)** — Gran avance de ejecución: nameservers cambiados a Vercel DNS en DonWeb (B1 ✅); dominios agregados en Vercel para landing (B3 ✅) y backoffice (BO1 ✅); dominio secundario agregado en Google Workspace + TXT de verificación, MX, SPF y DMARC cargados en Vercel DNS (B2 ✅, B4 en curso — falta verificar al propagar). Bloqueo documentado en B6: Resend free = 1 dominio → swap junto con D3. **Próximo paso: esperar propagación de NIC.ar → completar verificación de Google → FASE C.**
- **2026-06-11** — Ejecución iniciada. FASE A verificada completa (dominio registrado, delegado a DonWeb — zona DNS aún no configurada, B1 bloqueante). Branch `feat/domain-migration` creada y pusheada con todos los cambios de código (build verde) — se mergea en D2.
- **2026-06-10** — Auditoría de DNS (Porkbun) + repos landing y backoffice. Se agregó el inventario DNS completo (15 registros, ninguno muerto) y la FASE BO: migración del backoffice (Vercel + Clerk + Google OAuth). Hallazgo clave: cambiar el dominio de la instancia de producción de Clerk regenera los 5 CNAMEs y **cambia la `pk_live_*`**. Este doc pasa a ser el plan maestro único para ambos proyectos.
