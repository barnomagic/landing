import type { Metadata } from "next";
import Link from "next/link";
import { getAllModelos, formatPriceArs } from "@/lib/modelos";
import { ImagePlaceholder } from "@/app/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Modelos de Pausa studio. Tres tiers — base, adaptado y bespoke — todos a medida, fabricados en Buenos Aires.",
};

const tierLabel: Record<string, string> = {
  base: "Modelo base",
  adaptado: "Modelo adaptado",
  bespoke: "Diseño bespoke",
};

export default function CatalogoPage() {
  const modelos = getAllModelos();

  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <header className="mb-16 max-w-2xl">
          <p className="tech-label mb-4">Catálogo</p>
          <h1 className="font-display text-5xl text-ink sm:text-6xl">
            Piezas pensadas para tu espacio.
          </h1>
          <p className="mt-6 text-cement">
            Cada modelo se adapta. Medidas, telas, configuración — todo se
            decide en la conversación inicial.
          </p>
        </header>

        <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {modelos.map((m) => (
            <li key={m.frontmatter.slug}>
              <Link
                href={`/catalogo/${m.frontmatter.slug}`}
                className="group block"
              >
                <ImagePlaceholder
                  aspect="4/5"
                  label={`Foto pendiente · ${m.frontmatter.name}`}
                />
                <div className="mt-5">
                  <p className="tech-label">{tierLabel[m.frontmatter.tier]}</p>
                  <h2 className="mt-2 font-display text-2xl text-ink transition-colors group-hover:text-oxblood">
                    {m.frontmatter.name}
                  </h2>
                  <p className="mt-2 text-sm text-cement">
                    {m.frontmatter.tagline}
                  </p>
                  <p className="mt-4 text-sm text-stone">
                    {m.frontmatter.dimensions.width_cm} ×{" "}
                    {m.frontmatter.dimensions.depth_cm} ×{" "}
                    {m.frontmatter.dimensions.height_cm} cm
                  </p>
                  <p className="tech-label mt-3">
                    Desde {formatPriceArs(m.frontmatter.price_from_ars)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
