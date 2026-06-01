/**
 * Feature flags de la web. Las NEXT_PUBLIC_* se inlinean en build time.
 *
 * showPrices: muestra los precios "Desde $X" en cards y ficha de producto.
 * Default = true. Para ocultarlos en toda la web, setear en .env.local:
 *   NEXT_PUBLIC_SHOW_PRICES=false
 * Revertir = volver a "true" (o borrar la variable).
 */
export const showPrices = process.env.NEXT_PUBLIC_SHOW_PRICES !== "false";

/**
 * showDelivery: muestra el "Plazo" de producción en la ficha de producto.
 * Default = false (oculto) para no exponer un plazo comprometido en público,
 * en línea con el guardrail del brand book (§2.6 / §3.3). Para mostrarlo:
 *   NEXT_PUBLIC_SHOW_DELIVERY=true
 * Revertir = volver a "false" (o borrar la variable).
 */
export const showDelivery = process.env.NEXT_PUBLIC_SHOW_DELIVERY === "true";
