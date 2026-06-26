import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your cart and complete your order with Majestic Fragrance.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
          <p className="eyebrow mb-3">Secure Checkout</p>
          <h1 className="font-display text-3xl text-text-primary md:text-4xl mb-10">
            Your Cart
          </h1>
          <CheckoutFlow />
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
