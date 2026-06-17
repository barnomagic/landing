import Image from "next/image";
import Link from "next/link";
import { getAllModelos } from "@/lib/modelos";
import { getModelInquiryMessage } from "@/lib/whatsapp";
import { ServiciosSection } from "@/app/components/ServiciosSection";
import { Section } from "@/app/components/system/Section";
import { Container } from "@/app/components/system/Container";
import {
  Kicker,
  Heading,
  Body,
} from "@/app/components/system/Typography";
import { ButtonLink } from "@/app/components/system/Buttons";
import { CardLink, PilarCard } from "@/app/components/system/Card";
import { ImagePlaceholder } from "@/app/components/ImagePlaceholder";
import { CtaWhatsApp } from "@/app/components/CtaWhatsApp";
import {
  FadeIn,
  FadeInOnView,
} from "@/app/components/system/Motion";

export default function HomePage() {
  const modelos = getAllModelos().slice(0, 3);

  return (
    <>
      {/* HERO — cinematic oxblood full-bleed.
          Sofá bouclé crudo sobre cyclorama oxblood; el bg-oxblood de fondo cubre cualquier gap
          que deje la imagen al hacer object-cover sobre viewports angostos/largos.
          Tipografía off-white anclada al cuadrante inferior-izquierdo. */}
      <section
        aria-label="Inicio"
        className="relative w-full min-h-screen overflow-hidden bg-oxblood"
      >
        <div className="absolute inset-0">
          <Image
            src="/hero-home.png"
            alt="Sofá Pausa en bouclé crudo natural"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_center] lg:object-[80%_center]"
          />
          {/* Scrim horizontal — denso a la izquierda (donde aterriza el texto),
              transparent a la derecha (donde respira el sofá). */}
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-r from-oxblood/85 via-oxblood/30 to-transparent"
          />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col justify-center pb-16 pt-32">
          <Container>
            <FadeIn className="max-w-xl">
              <Kicker className="mb-5 !text-offwhite/70">
                Pausa studio · Buenos Aires
              </Kicker>
              <Heading
                level="h1"
                tone="hero"
                className="mb-6 !text-offwhite"
              >
                Tu pausa.
                <br />
                <span className="font-light italic">A medida.</span>
              </Heading>
              <Body
                tone="editorial"
                className="mb-10 max-w-md !text-offwhite/85"
              >
                Sofás a medida, pensados para tu espacio.
              </Body>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
                <CtaWhatsApp
                  message="Hola, quería empezar una conversación sobre un sofá a medida."
                  label="Empezá la conversación"
                  variant="outline-cream"
                />
                <ButtonLink href="/catalogo" variant="ghost-cream">
                  Ver catálogo →
                </ButtonLink>
              </div>
            </FadeIn>
          </Container>
        </div>
      </section>

      {/* CATÁLOGO DESTACADO — header + grid 3 */}
      <Section tone="standard" ariaLabel="Catálogo destacado">
        <div className="mb-16 flex flex-col items-start gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Kicker className="mb-5">Catálogo</Kicker>
            <Heading level="h2" tone="section">
              Una primera mirada.
            </Heading>
          </div>
          <Link
            href="/catalogo"
            className="text-sm uppercase tracking-[0.18em] text-cement transition-colors hover:text-oxblood"
          >
            Ver todos →
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12">
          {modelos.map((m, idx) => (
            <li key={m.frontmatter.slug}>
              <FadeInOnView delay={idx * 0.08}>
                <CardLink
                  href={`/catalogo/${m.frontmatter.slug}`}
                  ariaLabel={`Ver detalle de ${m.frontmatter.name}`}
                >
                  <div className="overflow-hidden rounded-sm">
                    <ImagePlaceholder
                      aspect="4/5"
                      src={m.frontmatter.hero_image}
                      alt={`${m.frontmatter.name} — ${m.frontmatter.tagline}`}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      label={`Foto pendiente · ${m.frontmatter.name}`}
                      className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-6">
                    {m.frontmatter.category ? (
                      <p className="text-xs uppercase tracking-[0.25em] text-stone mb-1">
                        {m.frontmatter.category}
                      </p>
                    ) : null}
                    <Heading
                      level="h3"
                      tone="card"
                      className="transition-colors group-hover:text-oxblood"
                    >
                      {m.frontmatter.name}
                    </Heading>
                    <p className="mt-3 text-base text-cement">
                      {m.frontmatter.tagline}
                    </p>
                    <p className="mt-5 text-xs uppercase tracking-[0.2em] text-stone">
                      A medida de tu espacio
                    </p>
                  </div>
                </CardLink>
              </FadeInOnView>
            </li>
          ))}
        </ul>
      </Section>

      {/* SERVICIOS — sofás (héroe) + retapizado + proyectos especiales */}
      <ServiciosSection />

      {/* POR QUÉ PAUSA — pulmón, manifest closer */}
      <Section tone="pulmon" ariaLabel="Por qué Pausa">
        <FadeInOnView className="text-center">
          <Kicker className="mb-8">Por qué Pausa</Kicker>
          <Heading
            level="h2"
            tone="manifesto-closer"
            className="mx-auto max-w-5xl"
          >
            Diseñamos <span className="text-oxblood">pausas.</span>
          </Heading>
        </FadeInOnView>

        <ul className="mt-20 grid grid-cols-1 gap-10 md:mt-28 md:grid-cols-3 lg:gap-16">
          <li>
            <FadeInOnView delay={0}>
              <PilarCard label="A tu medida">
                Tu altura, tu ambiente, tu vida. Nuestro compromiso.
              </PilarCard>
            </FadeInOnView>
          </li>
          <li>
            <FadeInOnView delay={0.1}>
              <PilarCard label="Detalle obsesivo">
                Lo que no se ve, se siente. Costuras donde corresponden,
                densidades pensadas.
              </PilarCard>
            </FadeInOnView>
          </li>
          <li>
            <FadeInOnView delay={0.2}>
              <PilarCard label="Modelo o bespoke">
                Empezás por un modelo de la selección o por una pieza
                diseñada desde cero.
              </PilarCard>
            </FadeInOnView>
          </li>
        </ul>
      </Section>

      {/* CIERRE / CTA */}
      <Section tone="cta" className="border-t border-ink/10" ariaLabel="Empezar conversación">
        <div className="mx-auto max-w-2xl text-center">
          <Kicker className="mb-6">Primer paso</Kicker>
          <Heading level="h2" tone="section">
            Hablemos. Tu sofá viene después.
          </Heading>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <CtaWhatsApp
              message={getModelInquiryMessage("alguno del catálogo")}
              label="Hablemos por WhatsApp"
              variant="oxblood"
            />
            <ButtonLink href="/contacto" variant="outline">
              Escribinos un mail
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
