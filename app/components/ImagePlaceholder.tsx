interface ImagePlaceholderProps {
  aspect?: "4/5" | "16/9" | "1/1" | "3/4";
  label?: string;
  className?: string;
}

const aspectClass: Record<NonNullable<ImagePlaceholderProps["aspect"]>, string> = {
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-[16/9]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
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
      className={`flex w-full items-center justify-center bg-cement text-offwhite ${aspectClass[aspect]} ${className}`}
    >
      <span className="tech-label !text-offwhite/70">{label}</span>
    </div>
  );
}
