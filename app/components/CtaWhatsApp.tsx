import { getWhatsappLink, isWhatsappConfigured } from "@/lib/whatsapp";
import { Button, ButtonLink } from "@/app/components/system/Buttons";

interface CtaWhatsAppProps {
  message: string;
  label?: string;
  variant?: "oxblood" | "outline";
  className?: string;
}

export function CtaWhatsApp({
  message,
  label = "Empezá la conversación",
  variant = "outline",
  className = "",
}: CtaWhatsAppProps) {
  const active = isWhatsappConfigured();

  if (!active) {
    return (
      <Button
        type="button"
        variant={variant}
        disabled
        title="WhatsApp se activa antes del lanzamiento"
        className={className}
      >
        {label}
      </Button>
    );
  }

  return (
    <ButtonLink
      variant={variant}
      href={getWhatsappLink(message)}
      external
      className={className}
    >
      {label}
    </ButtonLink>
  );
}
