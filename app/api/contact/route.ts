import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  nombre: z.string().trim().min(2, "Nombre demasiado corto").max(120),
  email: z.string().trim().email("Email inválido"),
  tipo: z.enum(["catalogo-customizable", "bespoke", "otro"]),
  mensaje: z.string().trim().min(10, "Mensaje demasiado corto").max(2000),
  // Honeypot: si viene completo, lo tratamos como spam y respondemos 200 sin enviar.
  website: z.string().optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;

const tipoLabels: Record<ContactPayload["tipo"], string> = {
  "catalogo-customizable": "Catálogo customizable",
  "bespoke": "Diseño bespoke",
  "otro": "Otro / consulta general",
};

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON inválido" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Datos inválidos",
        issues: parsed.error.issues.map((i) => i.message),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: silenciosamente OK.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Servicio de email no configurado. Pegá RESEND_API_KEY en .env.local.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const subject = `Nueva consulta — ${tipoLabels[data.tipo]} — ${data.nombre}`;
  const html = `
    <h2 style="font-family:Georgia,serif;color:#1A1A1A;">Nueva consulta de Pausa</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(data.nombre)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Tipo:</strong> ${escapeHtml(tipoLabels[data.tipo])}</p>
    <hr style="border:0;border-top:1px solid #ccc;margin:16px 0;" />
    <p style="white-space:pre-wrap;">${escapeHtml(data.mensaje)}</p>
  `;
  const text =
    `Nueva consulta de Pausa\n\n` +
    `Nombre: ${data.nombre}\n` +
    `Email: ${data.email}\n` +
    `Tipo: ${tipoLabels[data.tipo]}\n\n` +
    `Mensaje:\n${data.mensaje}`;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject,
      html,
      text,
    });
    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message ?? "Error al enviar" },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Error inesperado";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
