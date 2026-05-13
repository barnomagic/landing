import type { Metadata } from "next";
import Link from "next/link";
import { ImagePlaceholder } from "@/app/components/ImagePlaceholder";
import { CtaWhatsApp } from "@/app/components/CtaWhatsApp";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Pausa studio combina oficio fabril premium argentino real con visión de espacio personal. Sin showroom, sin intermediarios, sin masividad.",
};

export default function NosotrosPage() {
  return (
    <>
      <section className="border-b border-stone/15">
        <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
          <p className="tech-label mb-6">Pausa studio</p>
          <h1 className="font-display text-5xl text-ink sm:text-6xl">
            No vendemos sillones. <br />
            <span className="text-oxblood">
              Vendemos el objeto que sostiene un momento que vale la pena.
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-cement">
            La pausa es ese intervalo deliberado: la película del domingo, la
            charla larga de sobremesa, la última copa de la noche, el libro de
            tres horas, la siesta que no pide permiso.
          </p>
        </div>
      </section>

      <section className="border-b border-stone/15 bg-offwhite">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ImagePlaceholder
              aspect="4/5"
              label="Foto pendiente · Taller"
            />
          </div>
          <div className="lg:col-span-7">
            <p className="tech-label mb-3">El oficio</p>
            <h2 className="font-display text-4xl text-ink sm:text-5xl">
              Aprendido en taller, no en aulas.
            </h2>
            <div className="mt-8 space-y-6 text-cement">
              <p>
                Veníamos del oficio real del tapizado premium argentino — el que
                solo se aprende en taller, manos sobre la tela, viendo cómo se
                tensa una funda y cómo se refila una costura. Años de formación
                en piso de fábrica, no en cursos.
              </p>
              <p>
                A eso le sumamos algo que en la categoría falta: la visión de
                quien entiende cómo se habita un espacio personal. No diseñamos
                sillones para catálogo. Diseñamos sillones para tu casa.
              </p>
              <p>
                Esa combinación — oficio fabril real + ojo de espacio — es lo
                que define la marca. No competimos con catálogo. Competimos con
                detalle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone/15">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="tech-label mb-3">Cómo trabajamos</p>
              <h2 className="font-display text-4xl text-ink sm:text-5xl">
                Sin filtro masivo.
              </h2>
            </div>
            <ol className="grid gap-10 lg:col-span-8 sm:grid-cols-2">
              <li>
                <p className="tech-label mb-3">01 · Briefing</p>
                <p className="text-cement">
                  Conversación inicial. Nos contás el espacio, el uso, el
                  contexto. Sin formularios largos.
                </p>
              </li>
              <li>
                <p className="tech-label mb-3">02 · Propuesta</p>
                <p className="text-cement">
                  Te volvemos con un camino — base, adaptado o bespoke — con
                  precio y plazo claros.
                </p>
              </li>
              <li>
                <p className="tech-label mb-3">03 · Taller</p>
                <p className="text-cement">
                  Fabricamos en taller propio. Tapizado, espumado, costura — sin
                  tercerizar el corazón de la pieza.
                </p>
              </li>
              <li>
                <p className="tech-label mb-3">04 · Entrega</p>
                <p className="text-cement">
                  Coordinada en CABA y primer cordón. Sin costo adicional dentro
                  del rango pactado.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">
            Tu pausa, hecha a tu medida.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
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
