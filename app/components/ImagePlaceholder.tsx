type Aspect = "4/5" | "16/9" | "1/1" | "3/4" | "5/4";

interface ImagePlaceholderProps {
  aspect?: Aspect;
  label?: string;
  className?: string;
}

const aspectClass: Record<Aspect, string> = {
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "5/4": "aspect-[5/4]",
};

export function ImagePlaceholder({
  aspect = "4/5",
  label = "Foto pendiente",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex w-full items-center justify-center overflow-hidden rounded-sm bg-cement text-offwhite/70 ${aspectClass[aspect]} ${className}`}
    >
      <span className="text-xs font-medium uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}
