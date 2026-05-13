import type { ReactNode } from "react";
import Link from "next/link";
import { Divider } from "./Divider";

type CardVariant = "modelo" | "pilar" | "tier" | "step";

interface CardBaseProps {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
}

interface CardLinkProps extends CardBaseProps {
  href: string;
  ariaLabel?: string;
}

/**
 * Card linkeable (catálogo). El Link envuelve toda la card.
 */
export function CardLink({
  variant = "modelo",
  href,
  ariaLabel,
  children,
  className = "",
}: CardLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`group block cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxblood ${className}`}
      data-card-variant={variant}
    >
      {children}
    </Link>
  );
}

/**
 * Pilar — usado en "Por qué Pausa". Filete oxblood + label + body.
 */
interface PilarProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function PilarCard({ label, children, className = "" }: PilarProps) {
  return (
    <div className={className}>
      <Divider variant="oxblood-tick" className="mb-6" />
      <p className="font-display text-xl md:text-2xl text-ink mb-4">{label}</p>
      <div className="text-base md:text-lg leading-[1.65] text-cement">
        {children}
      </div>
    </div>
  );
}

/**
 * Tier — usado en /pedi-a-medida. Filete + nº camino + label + tagline italic + body + footer técnico.
 */
interface TierProps {
  index: number;
  name: string;
  tagline: string;
  description: string;
  fitLabel: string;
  fit: string;
  deliverLabel?: string;
  deliver?: string;
}

export function TierCard({
  index,
  name,
  tagline,
  description,
  fitLabel,
  fit,
  deliverLabel,
  deliver,
}: TierProps) {
  return (
    <div className="flex flex-col">
      <Divider variant="oxblood-tick" className="mb-6" />
      <p className="text-xs uppercase tracking-[0.25em] text-stone">
        Camino {index}
      </p>
      <h3 className="mt-5 font-display text-2xl md:text-3xl text-ink">
        {name}
      </h3>
      <p className="mt-3 font-display italic text-stone">{tagline}</p>
      <p className="mt-7 text-base md:text-lg leading-[1.65] text-cement">
        {description}
      </p>
      <div className="mt-8 grid gap-4 border-t border-ink/10 pt-6 text-sm">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-stone">
            {fitLabel} ·{" "}
          </span>
          <span className="text-cement">{fit}</span>
        </div>
        {deliverLabel && deliver ? (
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-stone">
              {deliverLabel} ·{" "}
            </span>
            <span className="text-cement">{deliver}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Step — paso del proceso "Cómo trabajamos". Número grande + label + body.
 */
interface StepProps {
  number: string;
  label: string;
  children: ReactNode;
}

export function StepCard({ number, label, children }: StepProps) {
  return (
    <div>
      <p className="font-display text-4xl md:text-5xl text-stone leading-none">
        {number}
      </p>
      <p className="mt-6 text-xs uppercase tracking-[0.25em] text-ink">
        {label}
      </p>
      <p className="mt-4 text-base md:text-lg leading-[1.65] text-cement">
        {children}
      </p>
    </div>
  );
}
