import { djConfig } from "../../config/dj";

export type SiteConfig = typeof djConfig;

export const siteConfig: SiteConfig = djConfig;

export const rawWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export function getWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  return raw.replace(/\D/g, "");
}

export function buildWhatsAppLink(message?: string): string {
  const number = getWhatsAppNumber();
  const text = encodeURIComponent(message ?? djConfig.whatsappMessage);
  if (!number) return "#";
  return `https://wa.me/${number}?text=${text}`;
}

export function getSocialLinks() {
  const base = { ...djConfig.social };
  const number = getWhatsAppNumber();
  if (number) {
    base.whatsapp = `https://wa.me/${number}?text=${encodeURIComponent(
      djConfig.whatsappMessage
    )}`;
  }
  return base;
}
