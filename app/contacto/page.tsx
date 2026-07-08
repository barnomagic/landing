import type { Metadata } from "next";
import { Section } from "@/app/components/system/Section";
import {
  Kicker,
  Heading,
  Body,
} from "@/app/components/system/Typography";
import { ContactForm } from "./ContactForm";
import { CtaWhatsApp } from "@/app/components/CtaWhatsApp";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacto · Pausa studio. Sofás y sillones a medida.",
};

export default function ContactoPage() {
  return (
    <>
      {/* Subhero */}
      <Section tone="hero" minHeightOverride="min-h-[40vh]" ariaLabel="Contacto">
        <div className="max-w-3xl">
          <Kicker className="mb-5">Contacto</Kicker>
          <Heading level="h1" tone="hero">
            Hablemos.
          </Heading>
          <Body tone="editorial" className="mt-10 max-w-2xl">
            Escribinos por mail o WhatsApp. WhatsApp suele ser el canal
            más ágil para una primera conversación.
          </Body>
        </div>
      </Section>

      {/* Form + info */}
      <Section tone="standard" ariaLabel="Formulario e información">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Form */}
          <div>
            <Kicker className="mb-8">Escribinos</Kicker>
            <ContactForm />
          </div>

          {/* Info */}
          <aside className="lg:border-l lg:border-ink/10 lg:pl-12">
            <Kicker className="mb-8">Canales</Kicker>

            <div className="space-y-8 divide-y divide-ink/10">
              <div className="pt-0">
                <p className="text-xs uppercase tracking-[0.2em] text-stone">
                  WhatsApp
                </p>
                <p className="mt-3 text-base text-cement">
                  El canal más ágil para una primera conversación.
                </p>
                <div className="mt-5">
                  <CtaWhatsApp
                    message="Hola, quería empezar una conversación."
                    label="Abrir WhatsApp"
                    variant="oxblood"
                  />
                </div>
              </div>

              <div className="pt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-stone">
                  Email
                </p>
                <a
                  href="mailto:hola@pausastudio.com.ar"
                  className="mt-3 inline-block text-base text-cement transition-colors hover:text-oxblood"
                >
                  hola@pausastudio.com.ar
                </a>
              </div>

              <div className="pt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-stone">
                  Estudio
                </p>
                <p className="mt-3 text-base text-cement">
                  Buenos Aires, Argentina.
                </p>
              </div>

              <div className="pt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-stone">
                  Horarios
                </p>
                <p className="mt-3 text-base text-cement">
                  Lunes a viernes · 10–18 h
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
