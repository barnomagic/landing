import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getModeloBySlug } from "@/lib/modelos";
import { getModelInquiryMessage } from "@/lib/whatsapp";
import { Section } from "@/app/components/system/Section";
import { Kicker, Heading } from "@/app/components/system/Typography";
import { StepCard } from "@/app/components/system/Card";
import { ProductGallery } from "@/app/components/ProductGallery";
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

/**
 * Proceso de personalización — compartido por todos los modelos. Centrado en
 * las decisiones que toma el cliente, no en el workflow del taller.
 * EDITABLE: ajustá los pasos a gusto.
 */
const PROCESO_PASOS: { number: string; label: string; detail: string }[] = [
  {
    number: "01",
    label: "Definimos la medida",
    detail:
      "A tu espacio, no al revés. El largo, la profundidad y la configuración salen de tu living.",
  },
  {
    number: "02",
    label: "Elegís la piel",
    detail:
      "Bouclé, lino, panamá o pana. El color y la textura que conversan con tu casa.",
  },
  {
    number: "03",
    label: "Lo construimos a mano",
    detail:
      "Hechura artesanal, una sola pieza por vez en el taller.",
  },
  {
    number: "04",
    label: "Llega y se queda",
    detail: "Coordinamos la entrega persona a persona.",
  },
];

interface ListaConfigProps {
  label: string;
  items: string[];
}

function ListaConfig({ label, items }: ListaConfigProps) {
  return (
    <div>
      <p className="mb-5 text-xs uppercase tracking-[0.25em] text-stone">
        {label}
      </p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="border-b border-ink/10 pb-3 text-base md:text-lg text-cement"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ModeloPage({ params }: PageProps) {
  const { slug } = await params;
  const modelo = getModeloBySlug(slug);
  if (!modelo) notFound();

  const { frontmatter, body } = modelo;
  const inquiryMessage = getModelInquiryMessage(frontmatter.name);

  // Hero primero, luego el resto de los shots — ProductGallery maneja el zoom.
  const galleryImages = [
    frontmatter.hero_image,
    ...frontmatter.images.filter((img) => img !== frontmatter.hero_image),
  ].filter(Boolean);

  return (
    <article>
      {/* Galería + identidad sticky */}
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

            {/* Galería con lightbox (click para ampliar) */}
            <ProductGallery
              name={frontmatter.name}
              images={galleryImages}
            />
          </div>

          {/* Identidad — sticky en desktop. Carácter, no ficha técnica. */}
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

              {frontmatter.caracter ? (
                <p className="mt-8 text-base md:text-lg leading-[1.7] text-cement">
                  {frontmatter.caracter}
                </p>
              ) : null}

              <div className="mt-12">
                <CtaWhatsApp
                  message={inquiryMessage}
                  label="Empezá la conversación"
                  variant="oxblood"
                  className="w-full"
                />
                <p className="mt-4 text-xs leading-relaxed text-stone">
                  No tiene medidas fijas. Nace acá y se diseña con vos. El precio
                  depende de tu pieza — hablemos.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Cómo se vuelve tuyo — el proceso de personalización */}
      <Section
        tone="standard"
        className="border-t border-ink/10"
        ariaLabel="Cómo se personaliza"
      >
        <div className="max-w-2xl">
          <Kicker className="mb-5">Cómo se vuelve tuyo</Kicker>
          <Heading level="h2" tone="section">
            Un punto de partida.
            <br />
            <span className="text-oxblood">El resto lo decidís vos.</span>
          </Heading>
        </div>
        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {PROCESO_PASOS.map((paso) => (
            <StepCard key={paso.number} number={paso.number} label={paso.label}>
              {paso.detail}
            </StepCard>
          ))}
        </div>
      </Section>

      {/* Lo que variás / Lo que siempre está */}
      {(frontmatter.varias || frontmatter.invariante) && (
        <Section
          tone="standard"
          className="border-t border-ink/10"
          ariaLabel="Configuración del modelo"
        >
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            {frontmatter.varias && (
              <ListaConfig label="Lo que variás" items={frontmatter.varias} />
            )}
            {frontmatter.invariante && (
              <ListaConfig
                label="Lo que siempre está"
                items={frontmatter.invariante}
              />
            )}
          </div>
        </Section>
      )}

      {/* Sobre la pieza — descripción editorial */}
      <Section
        tone="standard"
        className="border-t border-ink/10"
        ariaLabel="Sobre la pieza"
      >
        <div className="mx-auto max-w-3xl">
          <Kicker className="mb-6">Sobre la pieza</Kicker>
          <div className="text-base md:text-lg leading-[1.75] text-cement">
            <MDXRemote source={body} components={mdxComponents} />
          </div>
        </div>
      </Section>
    </article>
  );
}
