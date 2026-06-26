import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ShopGrid } from "@/components/product/ShopGrid";

export const metadata: Metadata = {
  title: "Shop All Fragrances",
  description:
    "Browse the full Majestic Fragrance collection — perfumes, perfume oils, roll-ons, body mists, gift sets and more. Luxury fragrances for men and women in Nigeria.",
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow mb-3">The Collection</p>
          <h1 className="font-display text-4xl text-text-primary md:text-5xl">
            Shop All Fragrances
          </h1>
        </div>
        <Suspense fallback={<div className="px-5 py-20 text-center text-text-muted md:px-8">Loading collection…</div>}>
          <ShopGrid />
        </Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
