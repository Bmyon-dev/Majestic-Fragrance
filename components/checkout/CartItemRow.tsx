"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/data/order-types";
import { useCart } from "@/lib/cart-context";

export function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 border-b border-white/5 py-4 last:border-0">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-raised">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-text-faint">{item.brand}</p>
        <p className="font-display text-base text-text-primary truncate">{item.name}</p>
        <p className="text-sm tabular text-gold">₦{item.price.toLocaleString("en-NG")}</p>
      </div>
      <div className="flex items-center rounded-full border border-white/10">
        <button
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
          aria-label="Decrease quantity"
          className="p-2 text-text-muted hover:text-gold transition-colors"
        >
          <Minus size={12} />
        </button>
        <span className="w-6 text-center text-xs tabular text-text-primary">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
          aria-label="Increase quantity"
          className="p-2 text-text-muted hover:text-gold transition-colors"
        >
          <Plus size={12} />
        </button>
      </div>
      <button
        onClick={() => removeItem(item.productId)}
        aria-label={`Remove ${item.name} from cart`}
        className="text-text-faint hover:text-red-400 transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
