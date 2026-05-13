import type { ReactNode } from "react";
import { Container } from "./Container";

export type SectionTone = "hero" | "standard" | "pulmon" | "cta" | "compact";

const tones: Record<SectionTone, string> = {
  hero:     "min-h-[85vh] flex items-center py-24 lg:py-32",
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
