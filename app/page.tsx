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
      <section className="border-b border-stone/15">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:py-32 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="tech-label mb-6">Pausa studio · Buenos Aires</p>
            <h1 className="font-display text-5xl text-ink sm:text-6xl lg:text-7xl">
              Tu pausa. <span className="text-oxblood">A medida.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg text-cement">
              Sofás a medida con oficio fabril argentino premium. Sin showroom,
              sin intermediarios, sin masividad.
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
      <section className="border-b border-stone/15">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="tech-label mb-3">Catálogo</p>
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
        </div>
      </section>

      {/* Por qué Pausa */}
      <section className="border-b border-stone/15">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="tech-label mb-3">Por qué Pausa</p>
              <h2 className="font-display text-4xl text-ink sm:text-5xl">
                No competimos con catálogo. Competimos con detalle.
              </h2>
            </div>
            <ul className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
              <li>
                <p className="tech-label mb-3">Oficio real</p>
                <p className="text-cement">
                  Tapizado premium argentino del que se aprende en taller, no en
                  aulas. Costura a mano donde tiene que ir.
                </p>
              </li>
              <li>
                <p className="tech-label mb-3">A tu medida</p>
                <p className="text-cement">
                  Tu altura, tu ambiente, tu vida. No las de un catálogo
                  cerrado.
                </p>
              </li>
              <li>
                <p className="tech-label mb-3">Sin intermediarios</p>
                <p className="text-cement">
                  Del taller a tu casa. Sin mueblería, sin filtro masivo, sin
                  margen agregado.
                </p>
              </li>
              <li>
                <p className="tech-label mb-3">Tres tiers claros</p>
                <p className="text-cement">
                  Modelo base, modelo adaptado o diseño bespoke. Precio y plazo
                  desde el primer mensaje.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">
            Tu pausa, hecha a tu medida.
          </h2>
          <p className="mt-6 text-cement">
            Primer paso: una conversación. Te respondemos dentro de 4 horas
            hábiles.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
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
