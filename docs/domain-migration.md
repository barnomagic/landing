# Dominio pausastudio.com.ar — config actual + cola pendiente

> **Migración `pausastudio.rest` → `pausastudio.com.ar` completada el 2026-06-15.**
> Ambos sitios y el login viven en `.com.ar`; el `.rest` redirige 308 y se deja
> morir al vencer (~jun 2027). Este doc ya no es un "plan" — es el **mapa de dónde
> vive cada cosa** (para debuggear si algo se rompe) + la **cola pendiente**.
> El estado detallado del backoffice está en `backoffice/docs/configuraciones.md`.

## Dónde vive cada cosa

| Pieza | Dónde | Detalle |
|---|---|---|
| **Registrador `.com.ar`** | **DonWeb** (NIC.ar) | cliente 116231733, vence **10/06/2027**. NS delegados a Vercel. |
| **Zona DNS `.com.ar`** | **Vercel DNS** | NS `ns1/ns2.vercel-dns.com`. Se edita en Vercel → Domains → `pausastudio.com.ar` → DNS Records. |
| **Zona DNS `.rest`** | **Porkbun** (legacy) | sigue ahí con registros viejos; se abandona al vencer. |
| **Team Vercel** | `ivandanker93-1339s-projects` | (cuenta `ivandanker93@gmail.com`. "barnomagic" es la org de GitHub, no el team.) |
| **Landing** | Vercel proyecto `landing` | `www.pausastudio.com.ar` (apex 308→www). `.rest` (apex+www) → 308 → `www.com.ar`. Lee `NEXT_PUBLIC_SITE_URL`. |
| **Backoffice** | Vercel proyecto `backoffice` | `backoffice.pausastudio.com.ar`. `.rest` → 308 → `.com.ar`. Auth Clerk + Google OAuth. |
| **Mail bandeja** | Google Workspace | dominio **primario** `pausastudio.com.ar`; `.rest` quedó como secundario/alias. Buzones `hola@`/`ivan@`/`mili@`. |
| **Mail transaccional** | Resend | dominio `pausastudio.com.ar` verificado (DKIM/SPF/MX en Vercel DNS). Form de contacto FROM/TO `hola@pausastudio.com.ar`. |
| **Clerk** | app `app_3C9Y8gt1wqMGSfEd145v9ZyAdF3` / instance `ins_3CBICBi87JKKtasBl0NcKc4EFe1` | dominio `backoffice.pausastudio.com.ar` (**secondary application**). Ver `configuraciones.md`. |
| **Google OAuth (GCP)** | project `pausa-studio-493016`, client `901640977516-mbs1...` | owner `ivan@pausastudio.rest`. Redirect URI `https://clerk.backoffice.pausastudio.com.ar/v1/oauth_callback`. |
| **Search Console** | propiedad de Dominio `pausastudio.com.ar` | verificada por DNS TXT. |

### Registros DNS clave en `pausastudio.com.ar` (Vercel DNS)

```
A     @                            216.198.79.1                            (landing apex → Vercel)
CNAME www                          cname.vercel-dns.com                    (landing www)
CNAME backoffice                   885172b892d10307.vercel-dns-017.com     (backoffice app — ⚠ alta manual, ver trampa #3)
CNAME clerk.backoffice             frontend-api.clerk.services             (Clerk Frontend API)
CNAME accounts.backoffice          accounts.clerk.services                 (Clerk Account Portal)
CNAME clkmail.backoffice           mail.ybhbnkc7amny.clerk.services         (Clerk mail)
CNAME clk._domainkey.backoffice    dkim1.ybhbnkc7amny.clerk.services        (Clerk DKIM 1)
CNAME clk2._domainkey.backoffice   dkim2.ybhbnkc7amny.clerk.services        (Clerk DKIM 2)
MX    @                            smtp.google.com (prio 1)                 (Google Workspace)
TXT   @                            google-site-verification=o8x33t...       (verif. Google Workspace)
TXT   @                            google-site-verification=3Isxxaf...      (verif. Search Console)
TXT   @                            v=spf1 include:_spf.google.com ~all      (SPF Google)
TXT   _dmarc                       v=DMARC1; p=none;
MX    send                         feedback-smtp.sa-east-1.amazonses.com    (Resend bounces, prio 10)
TXT   send                         v=spf1 include:amazonses.com ~all        (Resend SPF)
TXT   resend._domainkey            p=MIGf...                                (Resend DKIM)
```

## Cola pendiente

### Corto plazo (cuando se quiera, sin urgencia)
- [ ] **Renombrar logins** a `@pausastudio.com.ar`. El dominio primario ya es `.com.ar`, pero **Google NO renombró los logins automáticamente** — `ivan@`/`hola@`/`mili@` siguen entrando con `@pausastudio.rest` (que es alias; el mail llega igual). Para que el login sea `.com.ar`: Admin → cada usuario → Actualizar usuario → cambiar email primario (el `.rest` queda como alias). Ojo renombrar el admin mid-sesión.
- [ ] **E3.** Link en bio de Instagram → `pausastudio.com.ar`.
- [ ] **E4.** Firmas de mail, `BRIEF_TALLERES_v1.docx`, brand book PDF, materiales con el dominio viejo.

### FASE F — Largo plazo (~jun 2027, antes de que venza el `.rest`)
- [ ] **F1.** Confirmar que el redirect del `.rest` ya no recibe tráfico relevante (Search Console / analytics).
- [ ] **F2.** Dejar expirar el `.rest` (no renovar en DonWeb/Porkbun).
- [ ] **F3.** Google Workspace: remover el dominio `.rest` secundario (tras confirmar que nadie escribe a `@pausastudio.rest`).
- [ ] **F4.** Resend: remover el dominio `.rest` (ya estaba borrado; verificar).
- [ ] **F5.** GCP OAuth client: borrar el Redirect URI y JS Origin del `.rest`.
- [ ] **F6.** Los registros DNS del `.rest` (Porkbun) mueren solos al expirar — no hace falta limpiar a mano.

## Trampas que aparecieron (no repetir)

1. **Google NO auto-renombra los logins** al cambiar el dominio primario. Cambia la identidad de la org, pero las direcciones de usuario se renombran una por una aparte (ver cola arriba). El plan original asumía mal que era automático.
2. **Clerk: elegir "Secondary application"**, NO "Primary", al cambiar el dominio. Primary pondría el Clerk API en `clerk.pausastudio.com.ar` y mails desde `@pausastudio.com.ar`, chocando con el Google Workspace/Resend del dominio raíz. Secondary lo mantiene en `clerk.backoffice.*`. El switch regenera la `pk_live` (codifica el dominio) → actualizar en Vercel + **redeploy SIN build cache** (las `NEXT_PUBLIC_*` se inlinean en build). La `sk_live` no cambia.
3. **El CNAME `backoffice` hay que crearlo a mano** en Vercel DNS. Vercel no auto-crea el registro del subdominio del proyecto cuando la zona es propia y ya tiene subdominios (`clerk.backoffice.*`). Sin él, `backoffice.pausastudio.com.ar` da "Invalid Configuration" y no resuelve. Coexiste OK con los `clerk.backoffice.*`.
4. **Resend suprime direcciones que rebotaron.** Una prueba mandada a `hola@pausastudio.com.ar` **antes de que el alias existiera** rebotó (Bounced) y Resend la metió en su **lista de supresión** → envíos siguientes salían **Suppressed** (bloqueados sin intentar). El plan free **no expone la lista en el panel** (`/suppressions` da 404). No probar envíos a una dirección antes de que su alias/MX esté activo.
5. **Redirect en Vercel:** no deja redirigir el `www` mientras el apex apunta a él — redirigir primero el apex.
