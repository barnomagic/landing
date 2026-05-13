import Link from "next/link";
import { getAllModelos, formatPriceArs } from "@/lib/modelos";
import { getModelInquiryMessage } from "@/lib/whatsapp";
import { ImagePlaceholder } from "@/app/components/ImagePlaceholder";
import { CtaWhatsApp } from "@/app/components/CtaWhatsApp";

export default function HomePage() {
  const modelos = getAllModelos().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-stone/15 py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="tech-label mb-6">Pausa studio · Buenos Aires</p>
            <h1 className="font-display text-5xl text-ink sm:text-6xl lg:text-7xl">
              Tu pausa. <span className="text-oxblood">A medida.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg text-cement">
              Sofás a medida, pensados para tu espacio.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CtaWhatsApp
                message="Hola, quería empezar una conversación sobre un sillón a medida."
                label="Empezá la conversación"
                variant="solid"
              />
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-ink transition-all hover:bg-ink hover:text-offwhite"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <ImagePlaceholder aspect="4/5" label="Foto pendiente · Hero" />
          </div>
        </div>
      </section>

      {/* Modelos destacados */}
      <section className="border-b border-stone/15 py-20 lg:py-32">
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="tech-label mb-4">Catálogo</p>
            <h2 className="font-display text-4xl text-ink sm:text-5xl">
              Tres piezas para empezar.
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="text-sm uppercase tracking-[0.12em] text-cement hover:text-oxblood"
          >
            Ver todos →
          </Link>
        </div>

        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
                  <h3 className="font-display text-2xl text-ink transition-colors group-hover:text-oxblood">
                    {m.frontmatter.name}
                  </h3>
                  <p className="mt-2 text-sm text-cement">
                    {m.frontmatter.tagline}
                  </p>
                  <p className="tech-label mt-3">
                    Desde {formatPriceArs(m.frontmatter.price_from_ars)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Por qué Pausa — 3 pilares v0.2 */}
      <section className="border-b border-stone/15 py-20 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="tech-label mb-4">Por qué Pausa</p>
            <h2 className="font-display text-5xl text-ink sm:text-6xl">
              Diseñamos <span className="text-oxblood">pausas.</span>
            </h2>
          </div>
          <ul className="grid gap-12 sm:grid-cols-3 lg:col-span-7">
            <li>
              <p className="tech-label mb-4">A tu medida</p>
              <p className="text-cement">
                Tu altura, tu ambiente, tu vida. Nuestro compromiso.
              </p>
            </li>
            <li>
              <p className="tech-label mb-4">Detalle obsesivo</p>
              <p className="text-cement">
                Lo que no se ve, se siente. Costuras donde corresponden,
                densidades pensadas.
              </p>
            </li>
            <li>
              <p className="tech-label mb-4">Tres caminos claros</p>
              <p className="text-cement">
                Modelo base, modelo adaptado o diseño bespoke.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA final — pulmón */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">
            Tu pausa, hecha a tu medida.
          </h2>
          <p className="mt-8 text-cement">
            Primer paso: una conversación. Te respondemos dentro de 4 horas
            hábiles.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <CtaWhatsApp
              message={getModelInquiryMessage("alguno del catálogo")}
              label="Hablemos por WhatsApp"
              variant="solid"
            />
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-ink transition-all hover:bg-ink hover:text-offwhite"
            >
              Escribinos un mail
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
