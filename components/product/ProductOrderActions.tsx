"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Heart, ShoppingBag, Check } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";
import { logWhatsAppClick } from "@/lib/tracking";
import { useCart } from "@/lib/cart-context";

interface ProductOrderActionsProps {
  productId: string;
  slug: string;
  productName: string;
  brand: string;
  price: number;
  image: string;
  inStock: boolean;
}

export function ProductOrderActions({
  productId,
  slug,
  productName,
  brand,
  price,
  image,
  inStock,
}: ProductOrderActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  const whatsappHref = buildWhatsAppOrderLink({ productName, price, quantity });

  function handleAddToCart() {
    addItem({ productId, slug, name: productName, brand, price, image }, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-text-muted">Quantity</span>
        <div className="flex items-center rounded-full border border-white/10">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="p-3 text-text-muted hover:text-gold transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-sm tabular text-text-primary">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="p-3 text-text-muted hover:text-gold transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>

        <button
          onClick={() => setWishlisted((w) => !w)}
          aria-label="Add to wishlist"
          aria-pressed={wishlisted}
          className="ml-auto rounded-full border border-white/10 p-3 transition-colors hover:border-gold/40"
        >
          <Heart
            size={18}
            className={wishlisted ? "fill-magenta text-magenta" : "text-text-muted"}
          />
        </button>
      </div>

      {inStock ? (
        <>
          {/* Primary action: add to cart → checkout */}
          <button
            onClick={handleAddToCart}
            className="btn-primary flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold"
          >
            {justAdded ? (
              <>
                <Check size={18} /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag size={18} />
                Add to Cart — ₦{(price * quantity).toLocaleString("en-NG")}
              </>
            )}
          </button>

          {justAdded && (
            <Link
              href="/checkout"
              className="text-center text-sm font-semibold text-gold hover:text-gold-bright transition-colors -mt-1"
            >
              View Cart &amp; Checkout →
            </Link>
          )}

          {/* Secondary, de-emphasized: order directly via WhatsApp */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => logWhatsAppClick(`product-detail:${productName}`)}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-xs font-medium text-text-muted transition-colors hover:border-success/30 hover:text-success"
          >
            <MessageCircle size={14} />
            Or order directly on WhatsApp
          </a>
        </>
      ) : (
        <button
          disabled
          className="w-full cursor-not-allowed rounded-full border border-white/10 px-6 py-4 font-semibold text-text-faint"
        >
          Currently Out of Stock
        </button>
      )}

      <p className="text-center text-xs text-text-faint">
        Pay online by bank transfer at checkout, or arrange payment directly on WhatsApp.
      </p>
    </div>
  );
}
