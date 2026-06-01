import type { Metadata } from "next";
import { getAllModelos, formatPriceArs } from "@/lib/modelos";
import { showPrices } from "@/lib/flags";
import { Section } from "@/app/components/system/Section";
import {
  Kicker,
  Heading,
  Body,
} from "@/app/components/system/Typography";
import { CardLink } from "@/app/components/system/Card";
import { ImagePlaceholder } from "@/app/components/ImagePlaceholder";
import { FadeInOnView } from "@/app/components/system/Motion";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Sofás, sillones y piezas a medida. Catálogo curado desde Pausa studio.",
};

export default function CatalogoPage() {
  const modelos = getAllModelos();

  return (
    <>
      {/* Header — subhero reducido */}
      <Section tone="hero" minHeightOverride="min-h-[40vh]" ariaLabel="Catálogo">
        <div className="max-w-3xl">
          <Kicker className="mb-5">Catálogo</Kicker>
          <Heading level="h1" tone="hero">
            Piezas con punto
            <br />
            <span className="text-oxblood">de partida.</span>
          </Heading>
          <Body tone="editorial" className="mt-10 max-w-2xl">
            Cada modelo se adapta. Medidas, telas, configuración — todo se
            decide en la conversación inicial.
          </Body>
        </div>
      </Section>

      {/* Grid */}
      <Section tone="standard" ariaLabel="Modelos del catálogo">
        <ul className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
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
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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
                      level="h2"
                      tone="card"
                      className="transition-colors group-hover:text-oxblood"
                    >
                      {m.frontmatter.name}
                    </Heading>
                    <p className="mt-3 text-base text-cement">
                      {m.frontmatter.tagline}
                    </p>
                    <p className="mt-5 text-sm text-stone">
                      {m.frontmatter.dimensions.width_cm} ×{" "}
                      {m.frontmatter.dimensions.depth_cm} ×{" "}
                      {m.frontmatter.dimensions.height_cm} cm
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-stone">
                      {showPrices
                        ? `Desde ${formatPriceArs(m.frontmatter.price_from_ars)}`
                        : "A medida del espacio"}
                    </p>
                  </div>
                </CardLink>
              </FadeInOnView>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
