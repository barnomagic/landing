import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="tech-label mb-4">404</p>
        <h1 className="font-display text-5xl text-ink sm:text-6xl">
          Esa pausa no existe.
        </h1>
        <p className="mt-6 text-cement">
          La página que buscás no está. Volvé al catálogo o empezá una
          conversación.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-oxblood px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-offwhite transition-all hover:bg-ink"
          >
            Volver al inicio
          </Link>
          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-ink transition-all hover:bg-ink hover:text-offwhite"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
