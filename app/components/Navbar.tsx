import Link from "next/link";

const links = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/pedi-a-medida", label: "A medida" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone/15 bg-offwhite/85 backdrop-blur-sm">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12"
      >
        <Link
          href="/"
          aria-label="Inicio Pausa studio"
          className="group flex items-baseline gap-1.5"
        >
          <span className="font-display text-2xl lowercase tracking-tight text-ink transition-colors group-hover:text-oxblood">
            pausa
          </span>
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
            studio
          </span>
          <span className="ml-1 h-1.5 w-1.5 rounded-full bg-oxblood" aria-hidden />
        </Link>
        <ul className="hidden gap-8 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-cement transition-colors hover:text-oxblood"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <details className="relative sm:hidden">
          <summary
            aria-label="Abrir menú"
            className="cursor-pointer list-none px-2 py-1 text-cement"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="0" y1="1" x2="20" y2="1" />
              <line x1="0" y1="7" x2="20" y2="7" />
              <line x1="0" y1="13" x2="20" y2="13" />
            </svg>
          </summary>
          <ul className="absolute right-0 top-full mt-3 flex w-44 flex-col gap-1 rounded-sm border border-stone/20 bg-offwhite p-3 shadow-lg">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-2 py-2 text-sm text-cement hover:text-oxblood"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}
