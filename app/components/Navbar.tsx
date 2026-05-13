import Link from "next/link";
import { Container } from "@/app/components/system/Container";

const links = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/pedi-a-medida", label: "A medida" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink/10 bg-offwhite/85 backdrop-blur-sm">
      <Container>
        <nav
          aria-label="Navegación principal"
          className="flex items-center justify-between py-5"
        >
          <Link
            href="/"
            aria-label="Inicio Pausa studio"
            className="group flex items-baseline gap-1.5 cursor-pointer"
          >
            <span className="font-display text-2xl lowercase tracking-tight text-ink transition-colors group-hover:text-oxblood">
              pausa
            </span>
            <span className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
              studio
            </span>
            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-oxblood" aria-hidden />
          </Link>
          <ul className="hidden gap-10 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cement transition-colors duration-200 hover:text-oxblood"
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
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <line x1="0" y1="1" x2="20" y2="1" />
                <line x1="0" y1="7" x2="20" y2="7" />
                <line x1="0" y1="13" x2="20" y2="13" />
              </svg>
            </summary>
            <ul className="absolute right-0 top-full mt-3 flex w-44 flex-col gap-1 rounded-sm border border-ink/15 bg-offwhite p-3 shadow-lg">
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
      </Container>
    </header>
  );
}
