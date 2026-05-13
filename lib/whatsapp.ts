const RAW_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export const isWhatsappConfigured = (): boolean => {
  if (!RAW_NUMBER) return false;
  return !/x/i.test(RAW_NUMBER);
};

export const getWhatsappNumber = (): string => RAW_NUMBER;

export const getWhatsappLink = (context?: string): string => {
  const base = `https://wa.me/${RAW_NUMBER}`;
  if (!context) return base;
  const message = encodeURIComponent(context);
  return `${base}?text=${message}`;
};

export const getModelInquiryMessage = (modelName: string): string =>
  `Hola, me interesa el modelo ${modelName}. Quería empezar una conversación sobre el armado a medida.`;

export const getCustomInquiryMessage = (): string =>
  "Hola, quería consultar por un pedido a medida.";
