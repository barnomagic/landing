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
- [ ] **B4.** Admin Console → Account → Domains → Manage domains → **Add a domain** → `pausastudio.com.ar` como **dominio secundario**. 🔄 **En curso (2026-06-11):** dominio agregado como secundario + TXT de verificación cargado en Vercel DNS. **Falta**: cuando propague el DNS, completar la verificación en el asistente (Admin Console → Dominios → Verificar) y activar Gmail para el dominio (el asistente lo pide después de verificar).
- [ ] **B5.** Crear/aliasear `hola@pausastudio.com.ar` en el mismo buzón que `hola@pausastudio.rest`. Así el buzón recibe en ambas direcciones durante la transición.

### Resend
- [ ] **B6.** Resend dashboard → Domains → Add Domain → `pausastudio.com.ar`. Crear los registros DKIM/SPF que indica (B2). Verificar.
  - ⚠️ **Bloqueo detectado (2026-06-11):** el plan free de Resend permite **1 solo dominio** — no se puede tener `.rest` y `.com.ar` verificados a la vez. Opciones: (a) **swap** — borrar `pausastudio.rest` de Resend y agregar `pausastudio.com.ar` (gratis; el form de contacto no manda mails entre el borrado y la verificación del nuevo + update de env vars — hacerlo junto con D3 y con el DNS ya propagado), o (b) upgrade a Pro USD 20/mes para tener ambos. **Recomendado: (a)**, en la práctica fusiona B6 con D3.

## FASE C — Verificación (todo `.com.ar` funciona, `.rest` sigue vivo)

- [ ] **C1.** `https://pausastudio.com.ar` carga el sitio (mismo contenido que el `.rest`).
- [ ] **C2.** Mandar un mail de prueba a `hola@pausastudio.com.ar` → confirmar que llega al buzón de Google.
- [ ] **C3.** Enviar el form de contacto del sitio en preview → confirmar que Resend lo entrega desde `@pausastudio.com.ar` (cuando se cambie el FROM en D3).

## FASE D — Switch (cambiar el default a `.com.ar`)

> A partir de acá el `.com.ar` pasa a ser el dominio principal. El `.rest` sigue activo para el redirect.

- [ ] **D1.** Vercel → Environment Variables → `NEXT_PUBLIC_SITE_URL=https://pausastudio.com.ar`. Redeploy.
- [ ] **D2.** Merge de la branch `feat/domain-migration` con los cambios de código (fallbacks + mailto). Ver "Cambios de código" abajo.
- [~] **D3.** Resend / env vars. 🔄 **Parcial (2026-06-12):** `CONTACT_EMAIL_TO=hola@pausastudio.com.ar` ya seteado en Vercel Production + código (mailto visible del Footer y /contacto migrados a `.com.ar`). **`CONTACT_EMAIL_FROM` sigue en `<hola@pausastudio.rest>`** porque `pausastudio.com.ar` todavía NO está verificado en Resend (depende de B6) — al ponerlo en `.com.ar` el form devolvía 502. Cuando B6 esté hecho: `vercel env rm CONTACT_EMAIL_FROM production` + add con `Pausa studio <hola@pausastudio.com.ar>` y redeploy. Form verificado funcionando (envía desde `.rest`, entrega a `.com.ar`). _Pendiente: estas vars quedaron solo en Production (el rm por CLI se llevó Preview); re-agregar en Preview por dashboard si se usa._
- [ ] **D4.** Google Workspace → cambiar **dominio primario** a `pausastudio.com.ar`. Google renombra las direcciones de usuario automáticamente y deja el `.rest` como alias (los mails a `@pausastudio.rest` siguen llegando). _Nota: hay restricciones de frecuencia para cambiar primario; si la cuenta es muy nueva, esperar los días que pida Google._

## FASE BO — Backoffice (Vercel + Clerk + Google OAuth)

> Requiere FASE A completa (dominio registrado y DNS del `.com.ar` operativo). Independiente de las fases C/D de la landing — se puede hacer en paralelo. **El paso BO2 es un switch sin solapamiento** (Clerk no soporta dos dominios a la vez en la misma instancia de producción): hacerlo en un momento de bajo uso. Es herramienta interna, el impacto es acotado.

- [x] **BO1.** ✅ `backoffice.pausastudio.com.ar` agregado al proyecto `backoffice` en Vercel (2026-06-11). No hace falta CNAME manual: la zona DNS vive en Vercel.
- [ ] **BO2.** Clerk Dashboard → instancia de producción → Domains → cambiar el dominio a `backoffice.pausastudio.com.ar`. Clerk genera 5 CNAMEs nuevos (`clerk.backoffice`, `accounts.backoffice`, `clk._domainkey.backoffice`, `clk2._domainkey.backoffice`, `clkmail.backoffice`) — cargarlos en el DNS del `.com.ar` + TXT `_dmarc.backoffice`. Esperar a que Clerk verifique todos.
- [ ] **BO3.** ⚠️ Al cambiar el dominio, **cambia la `pk_live_*`** (la publishable key codifica el dominio). Vercel → proyecto `backoffice` → Environment Variables → actualizar `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (Production) con la nueva key del dashboard de Clerk. La `sk_live_*` en principio no cambia — verificarlo en el dashboard igual. Redeploy.
- [ ] **BO4.** Google Cloud Console → proyecto `Pausa Studio Backoffice` → OAuth client → **agregar** (no reemplazar) Authorized Redirect URI `https://clerk.backoffice.pausastudio.com.ar/v1/oauth_callback` y Authorized JS Origin `https://backoffice.pausastudio.com.ar`. Los valores `.rest` se borran recién en F5.
- [ ] **BO5.** Verificar: `https://backoffice.pausastudio.com.ar` carga + login con Google funciona end-to-end.
- [ ] **BO6.** Quitar `backoffice.pausastudio.rest` del proyecto Vercel (o dejarlo con redirect al `.com.ar` hasta que expire el `.rest`).
- [ ] **BO7.** Actualizar `docs/configuraciones.md` en el repo backoffice (dominios, Clerk domain, OAuth URIs — y de paso quitar la sección Supabase, ya migrado a Neon).

## FASE E — Redirect + propagación

- [ ] **E1.** Configurar **redirect 301** `pausastudio.rest` → `pausastudio.com.ar`. En Vercel: mantener el `.rest` como dominio del proyecto con redirect a `.com.ar` (Vercel tiene opción "Redirect to" al configurar el dominio).
- [ ] **E2.** Google Search Console: agregar propiedad `pausastudio.com.ar` + usar "Change of address" desde el `.rest` para preservar SEO.
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

- **2026-05-23** — Plan creado. Estrategia redirect + abandono planificado del `.rest`. Setup: Google Workspace (mail), Vercel (web), Resend (transaccional), NIC.ar (registrar nuevo).
- **2026-06-11 (tarde)** — Gran avance de ejecución: nameservers cambiados a Vercel DNS en DonWeb (B1 ✅); dominios agregados en Vercel para landing (B3 ✅) y backoffice (BO1 ✅); dominio secundario agregado en Google Workspace + TXT de verificación, MX, SPF y DMARC cargados en Vercel DNS (B2 ✅, B4 en curso — falta verificar al propagar). Bloqueo documentado en B6: Resend free = 1 dominio → swap junto con D3. **Próximo paso: esperar propagación de NIC.ar → completar verificación de Google → FASE C.**
- **2026-06-11** — Ejecución iniciada. FASE A verificada completa (dominio registrado, delegado a DonWeb — zona DNS aún no configurada, B1 bloqueante). Branch `feat/domain-migration` creada y pusheada con todos los cambios de código (build verde) — se mergea en D2.
- **2026-06-10** — Auditoría de DNS (Porkbun) + repos landing y backoffice. Se agregó el inventario DNS completo (15 registros, ninguno muerto) y la FASE BO: migración del backoffice (Vercel + Clerk + Google OAuth). Hallazgo clave: cambiar el dominio de la instancia de producción de Clerk regenera los 5 CNAMEs y **cambia la `pk_live_*`**. Este doc pasa a ser el plan maestro único para ambos proyectos.
