import Link from "next/link";
import { Container } from "@/app/components/system/Container";
import { Kicker } from "@/app/components/system/Typography";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink/10 bg-offwhite">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Wordmark + bajada */}
          <div className="lg:col-span-4">
            <p className="flex items-baseline gap-1.5 font-display text-2xl lowercase text-ink">
              <span>pausa</span>
              <span className="text-base text-stone">studio</span>
              <span
                aria-hidden
                className="h-2 w-2 self-center rounded-full bg-oxblood"
              />
            </p>
            <p className="mt-5 max-w-xs text-sm leading-[1.7] text-cement">
              Sofás y sillones a medida. Diseñados y fabricados en Buenos Aires.
            </p>
          </div>

          {/* Navegación */}
          <div className="lg:col-span-3">
            <Kicker className="mb-5">Navegación</Kicker>
            <ul className="space-y-3 text-sm text-cement">
              <li><Link href="/catalogo" className="transition-colors hover:text-oxblood">Catálogo</Link></li>
              <li><Link href="/pedi-a-medida" className="transition-colors hover:text-oxblood">Pedí a medida</Link></li>
              <li><Link href="/nosotros" className="transition-colors hover:text-oxblood">Nosotros</Link></li>
              <li><Link href="/contacto" className="transition-colors hover:text-oxblood">Contacto</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <Kicker className="mb-5">Contacto</Kicker>
            <ul className="space-y-3 text-sm text-cement">
              <li>
                <a
                  href="mailto:hola@pausastudio.com.ar"
                  className="transition-colors hover:text-oxblood"
                >
                  hola@pausastudio.com.ar
                </a>
              </li>
              <li>Buenos Aires, Argentina</li>
              <li>Lun a vie · 10–18 h</li>
            </ul>
          </div>

          {/* Estudio / redes */}
          <div className="lg:col-span-2">
            <Kicker className="mb-5">Estudio</Kicker>
            <ul className="space-y-3 text-sm text-cement">
              <li className="text-stone">Instagram · próximamente</li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-stone sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Pausa studio</span>
          <span>v0.3</span>
        </div>
      </Container>
    </footer>
  );
}
