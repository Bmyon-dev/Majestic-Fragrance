import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { TrackOrderClient } from "@/components/track/TrackOrderClient";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Enter your order reference to track your Majestic Fragrance order status.",
  robots: { index: false },
};

export default function TrackPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 md:pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
          <p className="eyebrow mb-3">Order Tracking</p>
          <h1 className="font-display text-3xl text-text-primary md:text-4xl mb-3">
            Track Your Order
          </h1>
          <p className="text-text-muted mb-10">
            Enter the order reference you received at checkout.
          </p>
        </div>
        <div className="px-5 md:px-8">
          <TrackOrderClient />
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
