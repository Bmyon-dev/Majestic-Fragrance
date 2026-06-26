import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ComboSection } from "@/components/home/ComboSection";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Combo Packages — Save up to 15%",
  description:
    "Bundle perfumes, roll-ons, body sprays and more with our Basic, Standard, and Premium combo packages. Save up to 15% on Majestic Fragrance combos.",
};

export default function CombosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
          <p className="eyebrow mb-3">Discount Sales Packages</p>
          <h1 className="font-display text-4xl text-text-primary md:text-5xl">
            More Scents. More Savings.
          </h1>
          <p className="mt-4 text-text-muted max-w-xl mx-auto">
            {siteConfig.deliveryNote}
          </p>
        </div>
        <ComboSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
