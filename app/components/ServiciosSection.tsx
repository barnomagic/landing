import { Section } from "@/app/components/system/Section";
import { Kicker, Heading, Body } from "@/app/components/system/Typography";
import { ImagePlaceholder } from "@/app/components/ImagePlaceholder";
import { CtaWhatsApp } from "@/app/components/CtaWhatsApp";
import { FadeInOnView } from "@/app/components/system/Motion";

interface ServiciosSectionProps {
  /**
   * Incluir el bloque héroe "Sofás a medida" (Bloque 1 del copy).
   * En el home: true (encuadra la sección). En /pedi-a-medida: false
   * (la página ya trata sofás a medida, evitamos duplicar).
   */
  includeIntro?: boolean;
}

/**
 * Sección de servicios — copy literal de drafts/2026-05-27/web-copy-servicios.md.
 * Los 3 bloques se apilan verticalmente en todos los breakpoints. Sofás (B1) es
 * el héroe; retapizado (B2) y proyectos especiales (B3) quedan subordinados por
 * tono (standard → standard → compact) y escala de heading.
 */
export function ServiciosSection({ includeIntro = true }: ServiciosSectionProps) {
  return (
    <>
      {/* Bloque 1 — Sofás nuevos a medida (héroe de la sección) */}
      {includeIntro && (
        <Section tone="standard" ariaLabel="Servicios — Sofás a medida">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <FadeInOnView>
              <Kicker className="mb-5">Servicios</Kicker>
              <Heading level="h2" tone="section">
                Tu pausa, a medida.
              </Heading>
              <Body tone="editorial" className="mt-8">
                Sofás pensados para tu espacio y tu altura, diseñados desde una
                conversación donde importan los detalles. Dos caminos: partís de
                un modelo de nuestro catálogo y lo adaptás, o diseñamos una pieza
                nueva desde cero.
              </Body>
              <Body tone="standard" className="mt-6">
                Cada sofá lleva densidad pensada, costuras donde corresponden,
                trama natural seleccionada por tacto y gramaje. La medida no es
                capricho — es la diferencia entre un sofá que sostiene y uno que
                se hunde. Trabajamos la espuma en capas, reforzamos donde se
                soporta el peso, tensamos el tapizado para que envejezca bien.
              </Body>
              <Body tone="standard" className="mt-6">
                El catálogo es punto de partida. Si lo que necesitás no está en
                la selección, diseñamos desde cero. Foto, medidas, referencias de
                lo que te atrae — eso basta. Después viene la lupa: detalle
                obsesivo en cada costura, en cada refilado, en lo que nadie ve
                pero todos sienten.
              </Body>
              <div className="mt-10">
                <CtaWhatsApp
                  message="Hola, te escribo por un sofá nuevo que vi en la web"
                  label="Empezá la conversación"
                  variant="oxblood"
                />
              </div>
            </FadeInOnView>
            <FadeInOnView delay={0.1}>
              <ImagePlaceholder
                aspect="4/5"
                src="/servicios/sofas-a-medida.jpg"
                alt="Una pausa en el sofá: té y lectura en un living sereno"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </FadeInOnView>
          </div>
        </Section>
      )}

      {/* Bloque 2 — Retapizado (subsección secundaria) */}
      <Section tone="standard" ariaLabel="Servicios — Retapizado">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <FadeInOnView>
            <Kicker className="mb-5">Retapizado</Kicker>
            <Heading level="h3" tone="card">
              Reacondicionamos sofás que vale la pena mantener.
            </Heading>
            <Body tone="standard" className="mt-6">
              Le damos nueva vida a tu tapizado, siempre que la estructura del
              sofá esté sana. Trabajamos cualquier pieza, sin importar
              procedencia — lo que importa es que el bastidor resista.
              Fotografía, medidas, estado del bastidor: eso nos deja evaluar qué
              se puede hacer. El tapizado nuevo lleva las mismas familias de tela
              que el catálogo, la misma obsesión por detalle. Si la espuma está
              vencida, la reponemos. Si hay resortes o cinchas flojas, se tensan.
              No es restauración mayor, es recuperación inteligente.
            </Body>
            <div className="mt-10">
              <CtaWhatsApp
                message="Hola, te consulto por el servicio de retapizado"
                label="Consultá sobre tu sofá"
                variant="oxblood"
              />
            </div>
          </FadeInOnView>
          <FadeInOnView delay={0.1}>
            <ImagePlaceholder
              aspect="4/5"
              src="/servicios/retapizado.jpg"
              alt="Sofá retapizado: cuerpo gris sobre estructura de roble"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </FadeInOnView>
        </div>
      </Section>

      {/* Bloque 3 — Proyectos especiales (subsección menor) */}
      <Section tone="compact" ariaLabel="Servicios — Proyectos especiales">
        <div className="mx-auto grid max-w-3xl grid-cols-1 items-center gap-8 sm:grid-cols-[1fr_auto] sm:gap-12">
          <FadeInOnView>
            <Kicker className="mb-5">Proyectos especiales</Kicker>
            <Heading level="h3" tone="card">
              Si tu proyecto no es sofá, pero requiere la misma mirada —
              contanos.
            </Heading>
            <Body tone="standard" className="mt-6">
              Piezas de tapicería pensadas con el mismo criterio que nuestros
              sofás. Cada proyecto empieza con una conversación donde importan
              los detalles.
            </Body>
            <div className="mt-8">
              <CtaWhatsApp
                message="Hola, te escribo por un proyecto especial"
                label="Contanos tu proyecto"
                variant="oxblood"
              />
            </div>
          </FadeInOnView>
          <FadeInOnView delay={0.1} className="w-full sm:w-48">
            <ImagePlaceholder
              aspect="1/1"
              src="/servicios/proyectos-especiales.jpg"
              alt="Sillas de comedor tapizadas en bouclé crudo"
              sizes="(min-width: 640px) 12rem, 100vw"
            />
          </FadeInOnView>
        </div>
      </Section>
    </>
  );
}
