import Link from "next/link";
import { getAllModelos, formatPriceArs } from "@/lib/modelos";
import { getModelInquiryMessage } from "@/lib/whatsapp";
import { Section } from "@/app/components/system/Section";
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
  ImageReveal,
} from "@/app/components/system/Motion";

export default function HomePage() {
  const modelos = getAllModelos().slice(0, 3);

  return (
    <>
      {/* HERO — grid asimétrico 7/5, imagen dominante */}
      <Section tone="hero" ariaLabel="Inicio">
        <div className="grid w-full gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="flex flex-col lg:col-span-7">
            <Kicker className="mb-5">Pausa studio · Buenos Aires</Kicker>
            <Heading level="h1" tone="hero">
              Tu pausa.
              <br />
              <span className="text-oxblood">A medida.</span>
            </Heading>
            <Body tone="editorial" className="mt-10 max-w-md">
              Sofás a medida, pensados para tu espacio.
            </Body>
            <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
              <CtaWhatsApp
                message="Hola, quería empezar una conversación sobre un sillón a medida."
                label="Empezá la conversación"
                variant="oxblood"
              />
              <ButtonLink href="/catalogo" variant="outline">
                Ver catálogo →
              </ButtonLink>
            </div>
          </FadeIn>

          <ImageReveal className="lg:col-span-5">
            <ImagePlaceholder
              aspect="4/5"
              variant="subtle"
              label="Foto pendiente · Hero"
            />
          </ImageReveal>
        </div>
      </Section>

      {/* CATÁLOGO DESTACADO — header + grid 3 */}
      <Section tone="standard" ariaLabel="Catálogo destacado">
        <div className="mb-16 flex flex-col items-start gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Kicker className="mb-5">Catálogo</Kicker>
            <Heading level="h2" tone="section">
              Tres piezas para empezar.
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
                      label={`Foto pendiente · ${m.frontmatter.name}`}
                      className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-6">
                    {m.frontmatter.category ? (
                      <p className="text-xs uppercase tracking-[0.25em] text-stone mb-3">
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
                      Desde {formatPriceArs(m.frontmatter.price_from_ars)}
                    </p>
                  </div>
                </CardLink>
              </FadeInOnView>
            </li>
          ))}
        </ul>
      </Section>

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
