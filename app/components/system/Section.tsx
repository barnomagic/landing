import type { ReactNode } from "react";
import { Container } from "./Container";

export type SectionTone = "hero" | "standard" | "pulmon" | "cta" | "compact";

const tones: Record<SectionTone, string> = {
  // Hero: contenido alineado al top con padding generoso.
  // items-center empujaba el H1 al medio del viewport (~y=400 en 900h),
  // dejando off-white arriba — la primera impresión era "página vacía".
  hero:     "min-h-[75vh] flex items-start pt-28 pb-20 lg:pt-40 lg:pb-32",
  standard: "py-24 md:py-32 lg:py-40",
  pulmon:   "py-32 md:py-48 lg:py-56",
  cta:      "py-24 md:py-32 lg:py-40",
  compact:  "py-16 md:py-20",
};

interface SectionProps {
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  /** Override default tone padding when una excepción se justifica (ej: hero reducido). */
  paddingOverride?: string;
  /** Override min-h del hero (ej: min-h-[40vh] para subheros). */
  minHeightOverride?: string;
  ariaLabel?: string;
}

export function Section({
  tone = "standard",
  children,
  className = "",
  containerClassName = "",
  id,
  paddingOverride,
  minHeightOverride,
  ariaLabel,
}: SectionProps) {
  // Permite override puntual sin perder el sistema (ej: subhero con min-h reducido).
  const base = paddingOverride
    ? paddingOverride
    : minHeightOverride && tone === "hero"
      ? `${minHeightOverride} flex items-end py-24 lg:py-32`
      : tones[tone];

  return (
    <section id={id} aria-label={ariaLabel} className={`${base} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
