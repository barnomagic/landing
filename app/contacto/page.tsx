import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { CtaWhatsApp } from "@/app/components/CtaWhatsApp";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escribinos por mail o WhatsApp. Respondemos dentro de 4 horas hábiles, lunes a viernes.",
};

export default function ContactoPage() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-24">
        <header className="mb-16 max-w-2xl">
          <p className="tech-label mb-4">Contacto</p>
          <h1 className="font-display text-5xl text-ink sm:text-6xl">
            Primero conversamos. <br />
            <span className="text-oxblood">Después cotizamos fino.</span>
          </h1>
          <p className="mt-6 text-cement">
            Respondemos dentro de 4 horas hábiles. Si querés agilizar, WhatsApp
            es el canal más rápido.
          </p>
        </header>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-5">
            <div className="border-t border-stone/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <div className="space-y-8">
                <div>
                  <p className="tech-label mb-2">WhatsApp</p>
                  <p className="text-cement">
                    El canal más rápido. Te respondemos dentro de horas
                    hábiles.
                  </p>
                  <div className="mt-4">
                    <CtaWhatsApp
                      message="Hola, quería empezar una conversación."
                      label="Abrir WhatsApp"
                      variant="solid"
                    />
                  </div>
                </div>

                <div className="border-t border-stone/15 pt-8">
                  <p className="tech-label mb-2">Email</p>
                  <a
                    href="mailto:hola@pausastudio.rest"
                    className="text-cement hover:text-oxblood"
                  >
                    hola@pausastudio.rest
                  </a>
                </div>

                <div className="border-t border-stone/15 pt-8">
                  <p className="tech-label mb-2">Taller</p>
                  <p className="text-cement">
                    Buenos Aires, Argentina.
                    <br />
                    Visitas con cita previa.
                  </p>
                </div>

                <div className="border-t border-stone/15 pt-8">
                  <p className="tech-label mb-2">Horarios</p>
                  <p className="text-cement">
                    Lunes a viernes · 10–18 h
                    <br />
                    Sábados con cita
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
