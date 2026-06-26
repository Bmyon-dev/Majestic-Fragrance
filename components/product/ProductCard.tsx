"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/data/types";
import { formatNaira } from "@/data/products";
import { StarRating } from "@/components/ui/StarRating";
import { useCart } from "@/lib/cart-context";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";
import { logWhatsAppClick } from "@/lib/tracking";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const discountPercent = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  const whatsappHref = buildWhatsAppOrderLink({
    productName: product.name,
    price: product.price,
  });

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-surface transition-all duration-500 hover:border-gold/30 hover:-translate-y-1">
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[4/5] w-full overflow-hidden bg-surface-raised"
      >
        <Image
          src={product.image}
          alt={`${product.name} by ${product.brand}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="eyebrow rounded-full bg-void/70 px-2.5 py-1 backdrop-blur-sm">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="eyebrow rounded-full bg-void/70 px-2.5 py-1 backdrop-blur-sm text-purple-soft">
              New
            </span>
          )}
        </div>

        {discountPercent && (
          <div className="absolute top-3 right-3 rounded-full bg-gradient-to-br from-purple to-magenta px-2.5 py-1 text-xs font-bold text-white">
            -{discountPercent}%
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-void/70">
            <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs uppercase tracking-widest text-text-muted">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        <p className="text-xs uppercase tracking-wider text-text-faint">
          {product.brand}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-xl text-text-primary group-hover:text-gradient-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <StarRating
          rating={product.rating}
          reviewCount={product.reviewCount}
          size={12}
        />
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-bold tabular text-text-primary">
            {formatNaira(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm tabular text-text-faint line-through">
              {formatNaira(product.compareAtPrice)}
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {product.inStock ? (
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-semibold"
              >
                {justAdded ? (
                  <>
                    <Check size={14} /> Added
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} /> Add to Cart
                  </>
                )}
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logWhatsAppClick(`card:${product.name}`)}
                aria-label={`Order ${product.name} on WhatsApp`}
                className="flex items-center justify-center rounded-full border border-white/10 px-3 text-text-muted transition-colors hover:border-success/30 hover:text-success"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.94 8.94 0 0 0-7.73 13.4L3 21l3.71-1.27a8.9 8.9 0 0 0 5.34 1.8h0a8.94 8.94 0 0 0 5.55-15.21zM12.05 19.8a7.43 7.43 0 0 1-3.8-1.04l-.27-.16-2.84.97.95-2.77-.18-.28a7.4 7.4 0 0 1-1.14-3.93 7.43 7.43 0 1 1 7.28 7.21zm4.08-5.56c-.22-.11-1.3-.64-1.5-.72-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.86-.13.15-.26.16-.48.05-.22-.1-.93-.34-1.77-1.09a6.62 6.62 0 0 1-1.22-1.52c-.13-.22-.01-.34.1-.45.11-.11.25-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.07-.11-.6-1.44-.82-1.97-.22-.52-.44-.45-.61-.46h-.52a1 1 0 0 0-.73.34 3.05 3.05 0 0 0-.95 2.27c0 1.34.98 2.63 1.11 2.81.13.17 1.83 2.8 4.44 3.81.62.24 1.1.38 1.48.49.62.2 1.19.17 1.64.1.5-.07 1.53-.62 1.74-1.22.22-.6.22-1.11.15-1.22-.06-.1-.21-.16-.43-.27z" />
                </svg>
              </a>
            </div>
          ) : (
            <span className="rounded-full border border-white/10 py-2.5 text-center text-xs text-text-faint">
              Out of Stock
            </span>
          )}
          <Link
            href={`/product/${product.slug}`}
            className="text-center text-xs uppercase tracking-widest text-text-muted hover:text-gold transition-colors py-1"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
