import { getWhatsappLink, isWhatsappConfigured } from "@/lib/whatsapp";
import { ButtonLink } from "@/app/components/system/Buttons";

interface CtaWhatsAppProps {
  message: string;
  label?: string;
  variant?: "oxblood" | "outline";
  className?: string;
}

/**
 * CTA principal de "Empezá la conversación".
 * - Si WhatsApp está configurado: link a wa.me con mensaje prefilled.
 * - Si está en placeholder: redirige a /contacto manteniendo el styling sólido
 *   (no aplicamos `disabled` con opacity — rompe la jerarquía visual de la marca).
 */
export function CtaWhatsApp({
  message,
  label = "Empezá la conversación",
  variant = "outline",
  className = "",
}: CtaWhatsAppProps) {
  const active = isWhatsappConfigured();

  if (!active) {
    return (
      <ButtonLink href="/contacto" variant={variant} className={className}>
        {label}
      </ButtonLink>
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
