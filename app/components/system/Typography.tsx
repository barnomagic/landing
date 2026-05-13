import type { HTMLAttributes, ReactNode } from "react";

const cn = (...parts: Array<string | undefined>): string =>
  parts.filter(Boolean).join(" ");

// =============================================================================
// Kicker — label uppercase tracking arriba de cada H2
// =============================================================================
interface KickerProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  as?: "p" | "span";
}

export function Kicker({
  children,
  className,
  as: Tag = "p",
  ...rest
}: KickerProps) {
  return (
    <Tag
      {...rest}
      className={cn(
        "text-xs font-medium uppercase tracking-[0.25em] text-stone",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

// =============================================================================
// Heading — H1/H2/H3 con tones
// =============================================================================
type HeadingLevel = "h1" | "h2" | "h3";
type HeadingTone = "hero" | "section" | "card" | "manifesto-closer";

const headingClasses: Record<HeadingTone, string> = {
  hero:
    "font-display font-normal text-5xl md:text-7xl lg:text-8xl tracking-[-0.02em] leading-[1.02] text-ink",
  section:
    "font-display font-normal text-3xl md:text-5xl lg:text-6xl tracking-[-0.015em] leading-[1.05] text-ink",
  card:
    "font-display font-normal text-xl md:text-2xl lg:text-3xl tracking-tight leading-[1.15] text-ink",
  // El cierre "Diseñamos pausas." — máxima escala
  "manifesto-closer":
    "font-display font-normal text-6xl md:text-8xl lg:text-9xl tracking-[-0.03em] leading-[0.95] text-ink",
};

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  tone?: HeadingTone;
  children: ReactNode;
}

export function Heading({
  level = "h2",
  tone = "section",
  children,
  className,
  ...rest
}: HeadingProps) {
  const Tag = level;
  return (
    <Tag {...rest} className={cn(headingClasses[tone], className)}>
      {children}
    </Tag>
  );
}

// =============================================================================
// Body — párrafo con tone editorial / standard / caption
// =============================================================================
type BodyTone = "editorial" | "standard" | "caption" | "lead";

const bodyClasses: Record<BodyTone, string> = {
  editorial:
    "text-lg md:text-xl leading-[1.65] text-cement",
  lead:
    "text-base md:text-lg leading-[1.6] text-cement",
  standard:
    "text-base md:text-lg leading-[1.7] text-cement",
  caption:
    "text-sm uppercase tracking-[0.15em] text-stone",
};

interface BodyProps extends HTMLAttributes<HTMLParagraphElement> {
  tone?: BodyTone;
  children: ReactNode;
}

export function Body({
  tone = "standard",
  children,
  className,
  ...rest
}: BodyProps) {
  return (
    <p {...rest} className={cn(bodyClasses[tone], className)}>
      {children}
    </p>
  );
}
