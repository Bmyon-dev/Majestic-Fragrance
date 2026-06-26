import { siteConfig } from "@/data/site-config";

interface WhatsAppOrderDetails {
  productName: string;
  price: number;
  quantity?: number;
}

/**
 * Builds a wa.me link with a prefilled order message.
 * Used by every "Order on WhatsApp" button across the site.
 */
export function buildWhatsAppOrderLink({
  productName,
  price,
  quantity = 1,
}: WhatsAppOrderDetails): string {
  const message = [
    `Hello ${siteConfig.brandName},`,
    ``,
    `I would like to order:`,
    ``,
    `Product: ${productName}`,
    `Price: ₦${price.toLocaleString("en-NG")}`,
    `Quantity: ${quantity}`,
    ``,
    `Please assist me.`,
  ].join("\n");

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

/**
 * Generic WhatsApp link with no prefilled product — used for the floating
 * button and general "chat with us" CTAs.
 */
export function buildWhatsAppGeneralLink(customMessage?: string): string {
  const message =
    customMessage ??
    `Hello ${siteConfig.brandName}, I'd like to know more about your fragrances.`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}
