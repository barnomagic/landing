import Image from "next/image";

type Aspect = "4/5" | "16/9" | "1/1" | "3/4" | "5/4";
type Variant = "default" | "subtle";

interface ImagePlaceholderProps {
  aspect?: Aspect;
  label?: string;
  className?: string;
  /**
   * default → bg cement (foto pendiente de modelo del catálogo).
   * subtle  → bg stone/25 + border cement/15 (foto editorial del hero,
   *           no compite con la tipografía).
   */
  variant?: Variant;
  /**
   * Si se pasa `src` (path relativo a /public, ej. "/modelos/cubo/01-hero.png")
   * el componente renderiza la imagen real con next/image manteniendo el aspect ratio.
   * Si no, cae al placeholder textual.
   */
  src?: string;
  alt?: string;
  /**
   * `eager` para imagen above-the-fold (LCP candidate); el resto queda en lazy default.
   */
  priority?: boolean;
  /**
   * Pasthrough a next/image — útil para hero asimétrico vs grid 1/3.
   * Default: "100vw" (conservador).
   */
  sizes?: string;
}

const aspectClass: Record<Aspect, string> = {
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "5/4": "aspect-[5/4]",
};

const variantClass: Record<Variant, string> = {
  default: "bg-cement text-offwhite/70",
  subtle: "bg-stone/25 border border-cement/15 text-stone",
};

export function ImagePlaceholder({
  aspect = "4/5",
  label = "Foto pendiente",
  className = "",
  variant = "default",
  src,
  alt,
  priority = false,
  sizes = "100vw",
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-sm bg-stone/15 ${aspectClass[aspect]} ${className}`}
      >
        <Image
          src={src}
          alt={alt ?? label}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`flex w-full items-center justify-center overflow-hidden rounded-sm ${variantClass[variant]} ${aspectClass[aspect]} ${className}`}
    >
      <span className="text-xs font-medium uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}
