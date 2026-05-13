import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-stone/15 bg-offwhite">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:grid-cols-3 lg:px-12">
        <div>
          <p className="font-display text-2xl lowercase text-ink">
            pausa <span className="text-base text-stone">studio</span>
          </p>
          <p className="mt-4 max-w-xs text-sm text-cement">
            Sofás y sillones a medida. Diseñados y fabricados en Buenos Aires.
          </p>
        </div>
        <div>
          <p className="tech-label mb-4">Navegación</p>
          <ul className="space-y-2 text-sm text-cement">
            <li><Link href="/catalogo" className="hover:text-oxblood">Catálogo</Link></li>
            <li><Link href="/pedi-a-medida" className="hover:text-oxblood">Pedí a medida</Link></li>
            <li><Link href="/nosotros" className="hover:text-oxblood">Nosotros</Link></li>
            <li><Link href="/contacto" className="hover:text-oxblood">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <p className="tech-label mb-4">Contacto</p>
          <ul className="space-y-2 text-sm text-cement">
            <li>
              <a href="mailto:hola@pausastudio.rest" className="hover:text-oxblood">
                hola@pausastudio.rest
              </a>
            </li>
            <li>Buenos Aires, Argentina</li>
            <li>Lun a vie · 10–18 h</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone/15">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-stone lg:px-12">
          <span>© {year} Pausa studio</span>
        </div>
      </div>
    </footer>
  );
}
