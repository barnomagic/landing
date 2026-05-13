import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllSlugs,
  getModeloBySlug,
  formatPriceArs,
} from "@/lib/modelos";
import { getModelInquiryMessage } from "@/lib/whatsapp";
import { ImagePlaceholder } from "@/app/components/ImagePlaceholder";
import { CtaWhatsApp } from "@/app/components/CtaWhatsApp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const modelo = getModeloBySlug(slug);
  if (!modelo) return {};
  return {
    title: modelo.frontmatter.name,
    description: modelo.frontmatter.tagline,
  };
}

const tierLabel: Record<string, string> = {
  base: "Modelo base",
  adaptado: "Modelo adaptado",
  bespoke: "Diseño bespoke",
};

const mdxComponents = {
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-10 font-display text-2xl text-ink" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 text-cement" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-cement" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-8 border-l-2 border-oxblood pl-5 italic text-stone"
      {...props}
    />
  ),
};

export default async function ModeloPage({ params }: PageProps) {
  const { slug } = await params;
  const modelo = getModeloBySlug(slug);
  if (!modelo) notFound();

  const { frontmatter, body } = modelo;
  const inquiryMessage = getModelInquiryMessage(frontmatter.name);

  return (
    <article>
      <div className="pt-12 lg:pt-16">
        <Link
          href="/catalogo"
          className="tech-label hover:text-oxblood"
        >
          ← Volver al catálogo
        </Link>
      </div>

      <header className="pb-20 pt-16 lg:pb-24 lg:pt-20">
        <p className="tech-label mb-6">{tierLabel[frontmatter.tier]}</p>
        <h1 className="font-display text-5xl text-ink sm:text-6xl lg:text-7xl">
          {frontmatter.name}
        </h1>
        <p className="mt-10 max-w-xl text-lg text-cement">
          {frontmatter.tagline}
        </p>
      </header>

      {/* Galería — sin bordes, espacio puro */}
      <section className="pb-24 lg:pb-32">
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          <div className="sm:col-span-2">
            <ImagePlaceholder
              aspect="16/9"
              label={`Foto pendiente · ${frontmatter.name}`}
            />
          </div>
          {frontmatter.images.slice(1).map((img, idx) => (
            <ImagePlaceholder
              key={img}
              aspect="4/5"
              label={`Foto pendiente · detalle ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Body + ficha técnica */}
      <section className="pb-32 lg:pb-48">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-7">
            <div className="prose-pausa">
              <MDXRemote source={body} components={mdxComponents} />
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="border border-stone/20 p-8">
              <p className="tech-label mb-6">Ficha técnica</p>

              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="tech-label !text-stone">Medidas</dt>
                  <dd className="mt-1 text-cement">
                    {frontmatter.dimensions.width_cm} cm de ancho ·{" "}
                    {frontmatter.dimensions.depth_cm} cm de profundidad ·{" "}
                    {frontmatter.dimensions.height_cm} cm de alto
                    {frontmatter.dimensions.seat_height_cm
                      ? ` · asiento ${frontmatter.dimensions.seat_height_cm} cm`
                      : ""}
                  </dd>
                </div>
                <div>
                  <dt className="tech-label !text-stone">Tapizado</dt>
                  <dd className="mt-1 text-cement">
                    {frontmatter.materials.upholstery}
                  </dd>
                </div>
                {frontmatter.materials.filling_seat && (
                  <div>
                    <dt className="tech-label !text-stone">Relleno asiento</dt>
                    <dd className="mt-1 text-cement">
                      {frontmatter.materials.filling_seat}
                    </dd>
                  </div>
                )}
                {frontmatter.materials.filling_back && (
                  <div>
                    <dt className="tech-label !text-stone">Relleno respaldo</dt>
                    <dd className="mt-1 text-cement">
                      {frontmatter.materials.filling_back}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="tech-label !text-stone">Estructura</dt>
                  <dd className="mt-1 text-cement">
                    {frontmatter.materials.structure}
                  </dd>
                </div>
                <div>
                  <dt className="tech-label !text-stone">Tiempo</dt>
                  <dd className="mt-1 text-cement">
                    {frontmatter.delivery_days} días corridos
                  </dd>
                </div>
                {frontmatter.upholstery_options && (
                  <div>
                    <dt className="tech-label !text-stone">Telas disponibles</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {frontmatter.upholstery_options.map((opt) => (
                        <span
                          key={opt}
                          className="border border-stone/30 px-2 py-1 text-xs text-cement"
                        >
                          {opt}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {frontmatter.config_options && (
                  <div>
                    <dt className="tech-label !text-stone">Configuraciones</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {frontmatter.config_options.map((opt) => (
                        <span
                          key={opt}
                          className="border border-stone/30 px-2 py-1 text-xs text-cement"
                        >
                          {opt}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                <div className="border-t border-stone/15 pt-5">
                  <dt className="tech-label !text-stone">Precio desde</dt>
                  <dd className="mt-1 font-display text-2xl text-ink">
                    {formatPriceArs(frontmatter.price_from_ars)}
                  </dd>
                  <p className="mt-2 text-xs text-stone">
                    Precio base sin personalizaciones. Cotización fina en la
                    conversación.
                  </p>
                </div>
              </dl>

              <div className="mt-8">
                <CtaWhatsApp
                  message={inquiryMessage}
                  label="Empezá la conversación"
                  variant="solid"
                  className="w-full"
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}
