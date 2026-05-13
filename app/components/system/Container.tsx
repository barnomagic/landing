import type { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

/**
 * Container global. TODA sección pasa por acá.
 * max-w 1280px (Tailwind v4: max-w-7xl == 80rem == 1280px).
 * Padding lateral progresivo: px-6 mobile → px-24 xl.
 */
export function Container({ children, className = "", ...rest }: ContainerProps) {
  return (
    <div
      {...rest}
      className={`mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-16 xl:px-24 ${className}`}
    >
      {children}
    </div>
  );
}
