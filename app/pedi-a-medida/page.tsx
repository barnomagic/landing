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
    "Dos caminos: catálogo customizable o diseño bespoke. Pausa studio.",
};

const tiers = [
  {
    name: "Catálogo customizable",
    tagline: "Partís de un modelo. Lo hacemos tuyo.",
    desc: "Elegís un modelo de la selección y lo adaptamos: medidas, tela, configuración (lineal, L, chaise), patas. Sobre una pieza ya pensada.",
    fit: "Para clientes que ya identificaron una pieza del catálogo y quieren ajustarla a su espacio.",
  },
  {
    name: "Diseño bespoke",
    tagline: "Pieza diseñada desde cero.",
    desc: "Pieza nueva a partir de boceto, foto de referencia o conversación abierta. Briefing exhaustivo y bocetos previos antes de tocar materiales.",
    fit: "Para clientes con visión propia que necesitan algo que no existe todavía.",
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
            Dos caminos. Uno se elige. El otro se imagina. Los dos terminan
            en tu casa.
          </Body>
        </div>
      </Section>

      {/* Dos caminos — pulmón */}
      <Section tone="pulmon" ariaLabel="Dos caminos">
        <ul className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
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
            Hablemos. Tu sofá viene después.
          </Heading>
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
