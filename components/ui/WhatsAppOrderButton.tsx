"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";
import { logWhatsAppClick } from "@/lib/tracking";

interface WhatsAppOrderButtonProps {
  productName: string;
  price: number;
  quantity?: number;
  className?: string;
  variant?: "solid" | "outline";
  label?: string;
}

export function WhatsAppOrderButton({
  productName,
  price,
  quantity = 1,
  className = "",
  variant = "outline",
  label = "Order on WhatsApp",
}: WhatsAppOrderButtonProps) {
  const href = buildWhatsAppOrderLink({ productName, price, quantity });

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium text-xs px-4 py-2.5 transition-all duration-300";
  const solid =
    "bg-success/90 text-[#04190f] hover:brightness-110";
  const outline =
    "border border-success/30 text-success/90 hover:bg-success/10 hover:border-success/50";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => logWhatsAppClick(`product:${productName}`)}
      className={`${base} ${variant === "solid" ? solid : outline} ${className}`}
    >
      <MessageCircle size={13} />
      {label}
    </a>
  );
}
