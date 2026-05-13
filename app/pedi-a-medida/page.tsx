import type { Metadata } from "next";
import Link from "next/link";
import { CtaWhatsApp } from "@/app/components/CtaWhatsApp";

export const metadata: Metadata = {
  title: "Pedí a medida",
  description:
    "Tres caminos: modelo base, modelo adaptado o diseño bespoke. Empezá la conversación.",
};

const tiers = [
  {
    name: "Modelo base",
    tagline: "Confiás en el ojo Pausa.",
    desc: "El modelo del catálogo con sus medidas y telas estándar. Plazo más corto, precio más predecible.",
    fit: "Para clientes que ya identificaron la pieza correcta y no necesitan modificarla.",
    deliver: "28 a 35 días",
  },
  {
    name: "Modelo adaptado",
    tagline: "Tu espacio, ajustado al milímetro.",
    desc: "Tomamos un modelo y lo adaptamos: medidas, tela, configuración (lineal, L, chaise), patas. Briefing corto.",
    fit: "Para clientes con un espacio concreto en mente y referencias claras.",
    deliver: "35 a 50 días",
  },
  {
    name: "Diseño bespoke",
    tagline: "Pieza diseñada desde cero.",
    desc: "Pieza nueva a partir de boceto, foto de referencia o conversación abierta. Briefing exhaustivo y bocetos previos.",
    fit: "Para clientes con visión propia que necesitan algo que no existe.",
    deliver: "60 a 90 días",
  },
];

export default function PediAMedidaPage() {
  return (
    <>
      {/* Hero — único border-b */}
      <section className="border-b border-stone/15 py-24 lg:py-40">
        <div className="max-w-4xl">
          <p className="tech-label mb-8">A medida</p>
          <h1 className="font-display text-5xl text-ink sm:text-6xl lg:text-7xl">
            Vos lo soñás.
            <br />
            <span className="text-oxblood">Nosotros lo hacemos.</span>
          </h1>
          <p className="mt-12 max-w-2xl text-lg text-cement">
            La promesa se sostiene en tres caminos claros. Cada uno tiene precio
            y plazo distintos. Te decimos cuál te conviene desde el primer
            mensaje — no prometemos &ldquo;todo a medida&rdquo; sin condiciones.
          </p>
        </div>
      </section>

      {/* Tres tiers — cards con más aire interno */}
      <section className="py-28 lg:py-40">
        <ol className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {tiers.map((tier, idx) => (
            <li
              key={tier.name}
              className="flex flex-col border border-stone/20 p-10"
            >
              <span className="tech-label">Camino {idx + 1}</span>
              <h2 className="mt-6 font-display text-3xl text-ink">
                {tier.name}
              </h2>
              <p className="mt-3 text-sm italic text-stone">{tier.tagline}</p>
              <p className="mt-8 text-cement">{tier.desc}</p>
              <div className="mt-10 space-y-4 border-t border-stone/15 pt-6 text-sm text-cement">
                <p>
                  <span className="tech-label !text-stone">Para quién · </span>
                  {tier.fit}
                </p>
                <p>
                  <span className="tech-label !text-stone">Plazo · </span>
                  {tier.deliver}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA pulmón — único H2 grande de la página */}
      <section className="pb-32 pt-16 lg:pb-56 lg:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">
            Primer paso: una conversación.
          </h2>
          <p className="mt-8 text-cement">
            Te respondemos dentro de 4 horas hábiles. Primero hablamos, después
            cotizamos fino.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <CtaWhatsApp
              message="Hola, quería consultar por un pedido a medida. ¿Me explican cómo arrancamos?"
              label="Hablemos por WhatsApp"
              variant="solid"
            />
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-ink transition-all hover:bg-ink hover:text-offwhite"
            >
              Form por mail
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
