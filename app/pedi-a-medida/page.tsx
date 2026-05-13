import type { Metadata } from "next";
import { Section } from "@/app/components/system/Section";
import {
  Kicker,
  Heading,
  Body,
} from "@/app/components/system/Typography";
import { ButtonLink } from "@/app/components/system/Buttons";
import { TierCard } from "@/app/components/system/Card";
import { CtaWhatsApp } from "@/app/components/CtaWhatsApp";
import { FadeInOnView } from "@/app/components/system/Motion";

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
      {/* Subhero */}
      <Section tone="hero" minHeightOverride="min-h-[50vh]" ariaLabel="A medida">
        <div className="max-w-4xl">
          <Kicker className="mb-5">A medida</Kicker>
          <Heading level="h1" tone="hero">
            Vos lo soñás.
            <br />
            <span className="text-oxblood">Nosotros lo hacemos.</span>
          </Heading>
          <Body tone="editorial" className="mt-10 max-w-2xl">
            La promesa se sostiene en tres caminos claros. Cada uno tiene
            precio y plazo distintos. Te decimos cuál te conviene desde el
            primer mensaje — no prometemos &ldquo;todo a medida&rdquo; sin
            condiciones.
          </Body>
        </div>
      </Section>

      {/* Tres tiers — pulmón */}
      <Section tone="pulmon" ariaLabel="Tres caminos">
        <ul className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-16">
          {tiers.map((tier, idx) => (
            <li key={tier.name}>
              <FadeInOnView delay={idx * 0.1}>
                <TierCard
                  index={idx + 1}
                  name={tier.name}
                  tagline={tier.tagline}
                  description={tier.desc}
                  fitLabel="Para quién"
                  fit={tier.fit}
                  deliverLabel="Plazo"
                  deliver={tier.deliver}
                />
              </FadeInOnView>
            </li>
          ))}
        </ul>
      </Section>

      {/* CTA cierre */}
      <Section tone="cta" className="border-t border-ink/10" ariaLabel="Empezar conversación">
        <div className="mx-auto max-w-2xl text-center">
          <Kicker className="mb-6">Primer paso</Kicker>
          <Heading level="h2" tone="section">
            Una conversación.
          </Heading>
          <Body tone="lead" className="mt-8 mx-auto max-w-lg">
            Te respondemos dentro de 4 horas hábiles. Primero hablamos,
            después cotizamos fino.
          </Body>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <CtaWhatsApp
              message="Hola, quería consultar por un pedido a medida. ¿Me explican cómo arrancamos?"
              label="Hablemos por WhatsApp"
              variant="oxblood"
            />
            <ButtonLink href="/contacto" variant="outline">
              Form por mail
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
