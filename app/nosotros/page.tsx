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
      {/* Hero / opening — único border-b */}
      <section className="border-b border-stone/15 py-24 lg:py-40">
        <div className="max-w-3xl">
          <p className="tech-label mb-8">Pausa studio</p>
          <h1 className="font-display text-5xl text-ink sm:text-6xl lg:text-7xl">
            Pausa <span className="text-oxblood">= tu momento.</span>
          </h1>
          <p className="mt-12 max-w-2xl text-lg text-cement">
            No vendemos sillones. Vendemos el objeto que sostiene un momento que
            vale la pena.
          </p>
        </div>
      </section>

      {/* Manifiesto — composición editorial asimétrica */}
      <section className="py-28 lg:py-48">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <ImagePlaceholder
              aspect="4/5"
              label="Foto pendiente · Estudio"
            />
          </div>
          <div className="lg:col-span-7">
            <p className="tech-label mb-8">Manifiesto</p>
            <div className="space-y-7 text-cement">
              <p className="text-lg">
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

            {/* Cierre filosófico — pull quote dentro del manifiesto */}
            <p className="mt-16 font-display text-5xl text-ink sm:text-6xl">
              Diseñamos
              <br />
              <span className="text-oxblood">pausas.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos — sin bordes, espacio puro */}
      <section className="py-28 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-4">
            <p className="tech-label mb-8">Cómo trabajamos</p>
            <h2 className="font-display text-4xl text-ink sm:text-5xl">
              Una pieza a la vez.
            </h2>
          </div>
          <ol className="grid gap-y-14 gap-x-12 lg:col-span-8 sm:grid-cols-2">
            <li className="border-t border-stone/20 pt-6">
              <p className="tech-label mb-4">01 · Briefing</p>
              <p className="text-cement">
                Conversación inicial. Nos contás el espacio, el uso, el
                contexto. Sin formularios largos.
              </p>
            </li>
            <li className="border-t border-stone/20 pt-6">
              <p className="tech-label mb-4">02 · Propuesta</p>
              <p className="text-cement">
                Te volvemos con un camino — base, adaptado o bespoke — con
                precio y plazo claros.
              </p>
            </li>
            <li className="border-t border-stone/20 pt-6">
              <p className="tech-label mb-4">03 · Construcción</p>
              <p className="text-cement">
                Tapizado, espumado, costura. Las uniones críticas no se
                tercerizan.
              </p>
            </li>
            <li className="border-t border-stone/20 pt-6">
              <p className="tech-label mb-4">04 · Entrega</p>
              <p className="text-cement">
                Coordinada en CABA y primer cordón. Sin costo adicional dentro
                del rango pactado.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* CTA quieter — sin H2 que compita con el manifiesto */}
      <section className="pb-32 pt-16 lg:pb-56 lg:pt-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="tech-label mb-6">Empezar</p>
          <p className="text-lg text-cement">
            Una conversación es el primer paso.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CtaWhatsApp
              message="Hola, vi su web y quería empezar una conversación."
              label="Hablemos por WhatsApp"
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
