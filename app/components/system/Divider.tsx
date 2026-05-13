type DividerVariant = "oxblood-tick" | "hairline";

const variants: Record<DividerVariant, string> = {
  // Filete decorativo oxblood — usado arriba de cards de pilares/tiers
  "oxblood-tick": "h-px w-8 bg-oxblood",
  // Línea sutil de separación full-width
  hairline: "h-px w-full bg-ink/10",
};

interface DividerProps {
  variant?: DividerVariant;
  className?: string;
}

export function Divider({
  variant = "oxblood-tick",
  className = "",
}: DividerProps) {
  return <div role="presentation" className={`${variants[variant]} ${className}`} />;
}
