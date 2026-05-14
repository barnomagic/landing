import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] transition-colors duration-200 ease-out cursor-pointer disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-oxblood";

const variants = {
  oxblood: "bg-oxblood text-offwhite hover:bg-ink",
  outline: "border border-ink text-ink hover:bg-ink hover:text-offwhite",
  // Variantes para superficies oscuras (hero oxblood full-bleed).
  "outline-cream":
    "border border-offwhite text-offwhite hover:bg-offwhite hover:text-oxblood",
  "ghost-cream":
    "text-offwhite/85 hover:text-offwhite underline-offset-4 hover:underline",
} as const;

type Variant = keyof typeof variants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  variant = "oxblood",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button {...rest} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  href: string;
  /** Si el href es interno (rutas /), usa next/link. Si externo, anchor nativo. */
  external?: boolean;
  children: ReactNode;
}

export function ButtonLink({
  variant = "oxblood",
  href,
  external = false,
  children,
  className = "",
  ...rest
}: ButtonLinkProps) {
  const composed = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a
        {...rest}
        href={href}
        className={composed}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={composed}>
      {children}
    </Link>
  );
}

// Alias semánticos para uso explícito
export const ButtonOxblood = (props: Omit<ButtonProps, "variant">) => (
  <Button variant="oxblood" {...props} />
);
export const ButtonOutline = (props: Omit<ButtonProps, "variant">) => (
  <Button variant="outline" {...props} />
);
