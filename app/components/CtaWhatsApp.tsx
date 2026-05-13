import { getWhatsappLink, isWhatsappConfigured } from "@/lib/whatsapp";

interface CtaWhatsAppProps {
  message: string;
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
}

const baseClass =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] transition-all";

const variantClass: Record<NonNullable<CtaWhatsAppProps["variant"]>, string> = {
  solid: "bg-oxblood text-offwhite hover:bg-ink",
  outline: "border border-ink text-ink hover:bg-ink hover:text-offwhite",
};

export function CtaWhatsApp({
  message,
  label = "Empezá la conversación",
  variant = "outline",
  className = "",
}: CtaWhatsAppProps) {
  const active = isWhatsappConfigured();
  const composed = `${baseClass} ${variantClass[variant]} ${className}`;

  if (!active) {
    return (
      <button
        type="button"
        disabled
        title="WhatsApp se activa antes del lanzamiento"
        className={`${composed} cursor-not-allowed opacity-60`}
      >
        {label}
      </button>
    );
  }

  return (
    <a
      href={getWhatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={composed}
    >
      {label}
    </a>
  );
}
