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
import { showPrices, showDelivery } from "@/lib/flags";
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
  const { name, tagline, hero_image } = modelo.frontmatter;
  const description = `${name}. ${tagline} Sofás y sillones a medida. Pausa studio.`;
  return {
    title: name,
    description,
    openGraph: {
      title: `${name} — Pausa studio`,
      description,
      images: [{ url: hero_image, width: 1200, height: 1500 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — Pausa studio`,
      description,
      images: [hero_image],
    },
  };
}

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
}

function FichaItem({ label, value }: FichaItemProps) {
  return (
    <div className="grid grid-cols-[max-content_1fr] items-baseline gap-x-6 border-b border-ink/10 py-4">
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

  // Convención de 5 shots: [0]=hero, [1..3]=perfil/angular/detalle, [4]=oxblood.
  const heroImg = frontmatter.hero_image || frontmatter.images[0];
  const detailImgs = frontmatter.images.slice(1, 4);
  const variantImgs = frontmatter.images.slice(4, 5);

  const detailCaptions = ["Perfil", "Angular", "Detalle"];
  const variantCaptions = ["Terciopelo oxblood"];

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

            {/* Hero shot */}
            <ImagePlaceholder
              aspect="4/5"
              src={heroImg}
              alt={`${frontmatter.name} — vista frontal`}
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              label={`Foto pendiente · ${frontmatter.name}`}
            />

            {/* Detalles (perfil / angular / detalle) */}
            {detailImgs.length > 0 && (
              <div className="mt-8 grid grid-cols-3 gap-4 md:gap-6">
                {detailImgs.map((img, idx) => (
                  <ImagePlaceholder
                    key={img}
                    aspect="4/5"
                    src={img}
                    alt={`${frontmatter.name} — ${detailCaptions[idx] ?? "Detalle"}`}
                    sizes="(min-width: 1024px) 19vw, 33vw"
                    label={detailCaptions[idx] ?? `Detalle ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Variantes de tela */}
            {variantImgs.length > 0 && (
              <div className="mt-16">
                <Kicker className="mb-6">En otras telas</Kicker>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {variantImgs.map((img, idx) => (
                    <figure key={img}>
                      <ImagePlaceholder
                        aspect="4/5"
                        src={img}
                        alt={`${frontmatter.name} — ${variantCaptions[idx] ?? "Variante"}`}
                        sizes="(min-width: 1024px) 29vw, 50vw"
                        label={variantCaptions[idx] ?? `Variante ${idx + 1}`}
                      />
                      <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-stone">
                        {variantCaptions[idx] ?? `Variante ${idx + 1}`}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Ficha — sticky en desktop */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              {frontmatter.category ? (
                <Kicker className="mb-5">{frontmatter.category}</Kicker>
              ) : null}
              <Heading level="h1" tone="section">
                {frontmatter.name}
              </Heading>
              <p className="mt-6 font-display text-xl italic text-stone">
                {frontmatter.tagline}
              </p>

              <dl className="mt-12 border-t border-ink/10 [&>div:last-child]:border-b-0">
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
                {frontmatter.includes && (
                  <FichaItem label="Incluye" value={frontmatter.includes} />
                )}
                {showDelivery && (
                  <FichaItem
                    label="Plazo"
                    value={`${frontmatter.delivery_days} días`}
                  />
                )}
                {showPrices && (
                  <FichaItem
                    label="Desde"
                    value={formatPriceArs(frontmatter.price_from_ars)}
                  />
                )}
              </dl>

              <div className="mt-12">
                <CtaWhatsApp
                  message={inquiryMessage}
                  label="Empezá la conversación"
                  variant="oxblood"
                  className="w-full"
                />
                <p className="mt-4 text-xs text-stone">
                  {showPrices
                    ? "Precio base sin personalizaciones. Cotización fina en la conversación."
                    : "El precio depende de las medidas de tu espacio y la configuración. Porque cada sofá se diseña para vos. Hablemos."}
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
        </div>
      </Section>

      {/* Customizable — config + telas + accesorios */}
      {(frontmatter.upholstery_options ||
        frontmatter.config_options ||
        frontmatter.accessory_options) && (
        <Section
          tone="standard"
          className="border-t border-ink/10"
          ariaLabel="Customización"
        >
          <div className="mx-auto max-w-4xl">
            <Kicker className="mb-10">Customizable</Kicker>
            <div className="grid gap-12 md:grid-cols-2 md:gap-20">
              {frontmatter.config_options && (
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-stone mb-5">
                    Configuración
                  </p>
                  <ul className="space-y-3">
                    {frontmatter.config_options.map((opt) => (
                      <li
                        key={opt}
                        className="border-b border-ink/10 pb-3 text-base md:text-lg text-cement"
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {frontmatter.upholstery_options && (
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-stone mb-5">
                    Telas disponibles
                  </p>
                  <ul className="space-y-3">
                    {frontmatter.upholstery_options.map((opt) => (
                      <li
                        key={opt}
                        className="border-b border-ink/10 pb-3 text-base md:text-lg text-cement"
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {frontmatter.accessory_options && (
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-stone mb-5">
                    Accesorios
                  </p>
                  <ul className="space-y-3">
                    {frontmatter.accessory_options.map((opt) => (
                      <li
                        key={opt}
                        className="border-b border-ink/10 pb-3 text-base md:text-lg text-cement"
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Section>
      )}
    </article>
  );
}
