"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { comboPackages } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppOrderButton } from "@/components/ui/WhatsAppOrderButton";
import { siteConfig } from "@/data/site-config";
import { useCart } from "@/lib/cart-context";

export function ComboSection() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  function handleAddCombo(comboId: string, name: string, image: string, price: number) {
    addItem({ productId: `combo-${comboId}`, slug: `combo-${comboId}`, name, brand: "Combo Package", price, image });
    setAddedId(comboId);
    setTimeout(() => setAddedId(null), 1800);
  }

  return (
    <section className="relative px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Combo Packages"
          title="More Scents. More Savings."
          description={`Bundle your favourites and save up to 15%. ${siteConfig.deliveryNote}`}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {comboPackages.map((combo, idx) => {
            const discountedPrice = Math.round(
              combo.basePrice * (1 - combo.discountPercent / 100)
            );
            const isFeatured = idx === 2;
            return (
              <div
                key={combo.id}
                className={`relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-500 ${
                  isFeatured
                    ? "border-gold/40 bg-gradient-to-b from-surface-raised to-surface md:-translate-y-4"
                    : "border-white/[0.06] bg-surface"
                }`}
              >
                {isFeatured && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple to-magenta py-1.5 text-center text-xs font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </div>
                )}

                <div className={`relative aspect-[16/9] w-full ${isFeatured ? "mt-7" : ""}`}>
                  <Image
                    src={combo.image}
                    alt={combo.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 rounded-full bg-gold px-3 py-1 text-xs font-bold text-void">
                    {combo.discountPercent}% OFF
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl text-text-primary">
                    {combo.name}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">
                    {combo.description}
                  </p>

                  <ul className="mt-5 flex flex-col gap-2.5">
                    {combo.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                        <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-2xl text-text-primary tabular">
                      ₦{discountedPrice.toLocaleString("en-NG")}
                    </span>
                    <span className="text-sm tabular text-text-faint line-through">
                      ₦{combo.basePrice.toLocaleString("en-NG")}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      onClick={() =>
                        handleAddCombo(combo.id, combo.name, combo.image, discountedPrice)
                      }
                      className="btn-primary flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold"
                    >
                      <ShoppingBag size={15} />
                      {addedId === combo.id ? "Added to Cart" : "Add to Cart"}
                    </button>
                    <WhatsAppOrderButton
                      productName={combo.name}
                      price={discountedPrice}
                      className="w-full"
                      label="Or order on WhatsApp"
                    />
                    <Link
                      href={`/combos#${combo.slug}`}
                      className="text-center text-xs uppercase tracking-widest text-text-muted hover:text-gold transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
