"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppGeneralLink } from "@/lib/whatsapp";
import { logWhatsAppClick } from "@/lib/tracking";

/**
 * Now a secondary, muted action — checkout is the primary ordering path,
 * so this floating button is intentionally smaller and toned down rather
 * than the loud bright-green pulsing button it used to be.
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppGeneralLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => logWhatsAppClick("floating-button")}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-success/30 bg-surface/90 text-success/80 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-success/50 hover:text-success hover:scale-105 active:scale-95"
    >
      <MessageCircle size={18} strokeWidth={2} />
    </a>
  );
}
