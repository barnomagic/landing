import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/app/components/system/Section";
import {
  Kicker,
  Heading,
  Body,
} from "@/app/components/system/Typography";
import { ButtonLink } from "@/app/components/system/Buttons";
import { StepCard } from "@/app/components/system/Card";
import { CtaWhatsApp } from "@/app/components/CtaWhatsApp";
import {
  FadeIn,
  FadeInOnView,
  ImageReveal,
} from "@/app/components/system/Motion";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Pausa studio. Diseñamos pausas. Atención obsesiva al detalle, una pieza a la vez.",
};

// Manifiesto v0.3 §1 — texto exacto del brand book.

export default function NosotrosPage() {
  return (
    <>
      {/* Hero invertido — imagen izquierda, texto derecha */}
      <Section tone="hero" ariaLabel="Pausa studio">
        <div className="grid w-full gap-12 lg:grid-cols-12 lg:gap-16">
          <ImageReveal className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative aspect-square w-full overflow-hidden rounded-sm">
              <Image
                src="/nosotros-estudio.jpg"
                alt="Pausa studio — un momento de lectura sobre el sofá en bouclé crudo"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </ImageReveal>
          <FadeIn className="order-1 flex flex-col lg:order-2 lg:col-span-7">
            <Kicker className="mb-5">Pausa studio</Kicker>
            <Heading level="h1" tone="hero">
              Pausa <span className="text-oxblood">= tu momento.</span>
            </Heading>
            <Body tone="editorial" className="mt-10 max-w-md">
              No vendemos sofás. Vendemos el sostén de momentos que valen
              la pena.
            </Body>
          </FadeIn>
        </div>
      </Section>

      {/* Manifiesto — ritmo standard con pb reducido: el cierre "Diseñamos pausas."
          ya carga el peso del bloque, no necesita 160px de aire extra antes de "Cómo trabajamos". */}
      <Section
        tone="standard"
        className="!pb-20 lg:!pb-24"
        ariaLabel="Manifiesto"
      >
        <div className="mx-auto max-w-3xl text-center">
          <FadeInOnView>
            <Kicker className="mb-8">Manifiesto</Kicker>
          </FadeInOnView>

          <div className="space-y-8 md:space-y-10 text-left md:text-center">
            <FadeInOnView delay={0.05}>
              <Body tone="editorial">
                No vendemos sofás. Vendemos el sostén de momentos que valen
                la pena.
              </Body>
            </FadeInOnView>
            <FadeInOnView delay={0.1}>
              <Body tone="editorial">
                La pausa es ese intervalo deliberado: la película del domingo,
                la charla larga de sobremesa, la última copa de la noche, el
                libro de tres horas, la siesta que no pide permiso. Es donde
                te encontrás con vos mismo.
              </Body>
            </FadeInOnView>
            <FadeInOnView delay={0.15}>
              <Body tone="editorial">
                Diseñamos piezas pensadas para tu espacio. Tu altura, tu
                ambiente, tu vida — medidas que sirven para vos.
              </Body>
            </FadeInOnView>
            <FadeInOnView delay={0.2}>
              <Body tone="editorial">
                Cada pieza se sostiene en dos pilares: atención obsesiva al
                detalle y una manera particular de entender cómo se habita
                un espacio personal.
              </Body>
            </FadeInOnView>
          </div>

          <FadeInOnView delay={0.25}>
            <p className="mt-20 font-display text-5xl md:text-7xl text-oxblood leading-[0.95]">
              Diseñamos pausas.
            </p>
          </FadeInOnView>
        </div>
      </Section>

      {/* Cómo trabajamos — 2x2 */}
      <Section tone="standard" ariaLabel="Cómo trabajamos">
        <div className="mb-16 max-w-2xl md:mb-20">
          <Kicker className="mb-5">Cómo trabajamos</Kicker>
          <Heading level="h2" tone="section">
            Una pieza a la vez.
          </Heading>
        </div>
        <ol className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
          <li>
            <FadeInOnView>
              <StepCard number="01" label="Briefing">
                Conversación inicial. Nos contás el espacio, el uso, el
                contexto. Sin formularios largos.
              </StepCard>
            </FadeInOnView>
          </li>
          <li>
            <FadeInOnView delay={0.08}>
              <StepCard number="02" label="Propuesta">
                Volvemos con una primera propuesta diseñada para tu espacio.
                La ajustamos hasta que sea tuya.
              </StepCard>
            </FadeInOnView>
          </li>
          <li>
            <FadeInOnView delay={0.16}>
              <StepCard number="03" label="Construcción">
                Tapizado, espumado, costura. La lupa en cada detalle.
              </StepCard>
            </FadeInOnView>
          </li>
          <li>
            <FadeInOnView delay={0.24}>
              <StepCard number="04" label="Entrega">
                Coordinamos cada entrega persona a persona.
              </StepCard>
            </FadeInOnView>
          </li>
        </ol>
      </Section>

      {/* CTA cierre */}
      <Section tone="cta" className="border-t border-ink/10" ariaLabel="Empezar conversación">
        <div className="mx-auto max-w-2xl text-center">
          <Kicker className="mb-6">Empezar</Kicker>
          <Heading level="h2" tone="section">
            Una conversación es el primer paso.
          </Heading>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <CtaWhatsApp
              message="Hola, vi su web y quería empezar una conversación."
              label="Hablemos por WhatsApp"
              variant="oxblood"
            />
            <ButtonLink href="/catalogo" variant="outline">
              Ver catálogo
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
