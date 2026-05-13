import { Section } from "@/app/components/system/Section";
import {
  Kicker,
  Heading,
  Body,
} from "@/app/components/system/Typography";
import { ButtonLink } from "@/app/components/system/Buttons";

export default function NotFound() {
  return (
    <Section tone="hero" ariaLabel="Página no encontrada">
      <div className="mx-auto max-w-2xl text-center">
        <Kicker className="mb-5">404</Kicker>
        <Heading level="h1" tone="hero">
          Esa pausa no existe.
        </Heading>
        <Body tone="editorial" className="mt-10 mx-auto max-w-lg">
          La página que buscás no está. Volvé al inicio o abrí el catálogo.
        </Body>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variant="oxblood">
            Volver al inicio
          </ButtonLink>
          <ButtonLink href="/catalogo" variant="outline">
            Ver catálogo
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
