import type { Metadata } from "next";
import Link from "next/link";
import { ImagePlaceholder } from "@/app/components/ImagePlaceholder";
import { CtaWhatsApp } from "@/app/components/CtaWhatsApp";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Pausa studio. Diseñamos pausas. Atención obsesiva al detalle, una pieza a la vez.",
};

export default function NosotrosPage() {
  return (
    <>
      {/* Hero / manifiesto */}
      <section className="border-b border-stone/15 py-24 lg:py-32">
        <div className="max-w-4xl">
          <p className="tech-label mb-6">Pausa studio</p>
          <h1 className="font-display text-5xl text-ink sm:text-6xl">
            Pausa <span className="text-oxblood">= tu momento.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-cement">
            No vendemos sillones. Vendemos el objeto que sostiene un momento que
            vale la pena.
          </p>
        </div>
      </section>

      {/* Manifiesto */}
      <section className="border-b border-stone/15 py-20 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <ImagePlaceholder
              aspect="4/5"
              label="Foto pendiente · Estudio"
            />
          </div>
          <div className="lg:col-span-7">
            <p className="tech-label mb-4">Manifiesto</p>
            <h2 className="font-display text-4xl text-ink sm:text-5xl">
              Diseñamos pausas.
            </h2>
            <div className="mt-10 space-y-6 text-cement">
              <p>
                La pausa es ese intervalo deliberado: la película del domingo,
                la charla larga de sobremesa, la última copa de la noche, el
                libro de tres horas, la siesta que no pide permiso. Es donde te
                encontrás con vos mismo.
              </p>
              <p>
                Diseñamos sillones pensados para tu espacio. Tu altura, tu
                ambiente, tu vida — no las de un catálogo.
              </p>
              <p>
                Combinamos dos cosas raras en la categoría: atención obsesiva al
                detalle y una manera particular de entender cómo se habita un
                espacio personal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="border-b border-stone/15 py-20 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="tech-label mb-4">Cómo trabajamos</p>
            <h2 className="font-display text-4xl text-ink sm:text-5xl">
              Una pieza a la vez.
            </h2>
          </div>
          <ol className="grid gap-12 lg:col-span-8 sm:grid-cols-2">
            <li>
              <p className="tech-label mb-4">01 · Briefing</p>
              <p className="text-cement">
                Conversación inicial. Nos contás el espacio, el uso, el
                contexto. Sin formularios largos.
              </p>
            </li>
            <li>
              <p className="tech-label mb-4">02 · Propuesta</p>
              <p className="text-cement">
                Te volvemos con un camino — base, adaptado o bespoke — con
                precio y plazo claros.
              </p>
            </li>
            <li>
              <p className="tech-label mb-4">03 · Construcción</p>
              <p className="text-cement">
                Tapizado, espumado, costura. Las uniones críticas no se
                tercerizan.
              </p>
            </li>
            <li>
              <p className="tech-label mb-4">04 · Entrega</p>
              <p className="text-cement">
                Coordinada en CABA y primer cordón. Sin costo adicional dentro
                del rango pactado.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* CTA final — pulmón */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">
            Tu pausa, hecha a tu medida.
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <CtaWhatsApp
              message="Hola, vi su web y quería empezar una conversación."
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
      </section>
    </>
  );
}
