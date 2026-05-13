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
import { Section } from "@/app/components/system/Section";
import {
  Kicker,
  Heading,
} from "@/app/components/system/Typography";
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
    <h3 className="mt-12 font-display text-2xl md:text-3xl text-ink" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mt-5 text-base md:text-lg leading-[1.7] text-cement"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-5 text-base md:text-lg leading-[1.7] text-cement"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-10 border-l-2 border-oxblood pl-6 font-display italic text-xl text-stone"
      {...props}
    />
  ),
};

interface FichaItemProps {
  label: string;
  value: string;
  last?: boolean;
}

function FichaItem({ label, value, last = false }: FichaItemProps) {
  return (
    <div
      className={`grid grid-cols-[max-content_1fr] items-baseline gap-x-6 py-4 ${last ? "" : "border-b border-ink/10"}`}
    >
      <dt className="text-xs uppercase tracking-[0.2em] text-stone">{label}</dt>
      <dd className="font-display text-lg text-ink">{value}</dd>
    </div>
  );
}

export default async function ModeloPage({ params }: PageProps) {
  const { slug } = await params;
  const modelo = getModeloBySlug(slug);
  if (!modelo) notFound();

  const { frontmatter, body } = modelo;
  const inquiryMessage = getModelInquiryMessage(frontmatter.name);
  const dim = frontmatter.dimensions;

  return (
    <article>
      {/* Galería + ficha sticky */}
      <Section
        tone="hero"
        minHeightOverride="min-h-[60vh]"
        ariaLabel={`Modelo ${frontmatter.name}`}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Galería */}
          <div className="lg:col-span-7">
            <Link
              href="/catalogo"
              className="mb-10 inline-block text-xs uppercase tracking-[0.25em] text-stone transition-colors hover:text-oxblood"
            >
              ← Volver al catálogo
            </Link>
            <ImagePlaceholder
              aspect="4/5"
              label={`Foto pendiente · ${frontmatter.name}`}
            />
            <div className="mt-6 grid grid-cols-2 gap-6">
              {frontmatter.images.slice(1).map((img, idx) => (
                <ImagePlaceholder
                  key={img}
                  aspect="5/4"
                  label={`Detalle ${idx + 1}`}
                />
              ))}
              {/* Si hay solo 1 imagen extra, completar con placeholder vacío */}
              {frontmatter.images.length === 2 && (
                <ImagePlaceholder aspect="5/4" label="Detalle 2" />
              )}
            </div>
          </div>

          {/* Ficha — sticky en desktop */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Kicker className="mb-5">{tierLabel[frontmatter.tier]}</Kicker>
              <Heading level="h1" tone="section">
                {frontmatter.name}
              </Heading>
              <p className="mt-6 font-display text-xl italic text-stone">
                {frontmatter.tagline}
              </p>

              <dl className="mt-12 border-t border-ink/10">
                <FichaItem
                  label="Dimensiones"
                  value={`${dim.width_cm} × ${dim.depth_cm} × ${dim.height_cm} cm`}
                />
                {dim.seat_height_cm && (
                  <FichaItem
                    label="Altura asiento"
                    value={`${dim.seat_height_cm} cm`}
                  />
                )}
                <FichaItem
                  label="Tapizado"
                  value={frontmatter.materials.upholstery}
                />
                <FichaItem
                  label="Estructura"
                  value={frontmatter.materials.structure}
                />
                <FichaItem
                  label="Plazo"
                  value={`${frontmatter.delivery_days} días`}
                />
                <FichaItem
                  label="Desde"
                  value={formatPriceArs(frontmatter.price_from_ars)}
                  last
                />
              </dl>

              <div className="mt-12">
                <CtaWhatsApp
                  message={inquiryMessage}
                  label="Empezá la conversación"
                  variant="oxblood"
                  className="w-full"
                />
                <p className="mt-4 text-xs text-stone">
                  Precio base sin personalizaciones. Cotización fina en la
                  conversación.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Descripción */}
      <Section tone="standard" ariaLabel="Descripción del modelo">
        <div className="mx-auto max-w-3xl">
          <Kicker className="mb-6">Sobre la pieza</Kicker>
          <div className="text-base md:text-lg leading-[1.75] text-cement">
            <MDXRemote source={body} components={mdxComponents} />
          </div>

          {/* Opciones extra (telas / configuraciones) */}
          {(frontmatter.upholstery_options || frontmatter.config_options) && (
            <div className="mt-16 space-y-12 border-t border-ink/10 pt-12">
              {frontmatter.upholstery_options && (
                <div>
                  <Kicker className="mb-5">Telas disponibles</Kicker>
                  <ul className="flex flex-wrap gap-3">
                    {frontmatter.upholstery_options.map((opt) => (
                      <li
                        key={opt}
                        className="border border-ink/15 px-3 py-2 text-sm text-cement"
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {frontmatter.config_options && (
                <div>
                  <Kicker className="mb-5">Configuraciones</Kicker>
                  <ul className="flex flex-wrap gap-3">
                    {frontmatter.config_options.map((opt) => (
                      <li
                        key={opt}
                        className="border border-ink/15 px-3 py-2 text-sm text-cement"
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Section>
    </article>
  );
}
