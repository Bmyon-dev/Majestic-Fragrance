import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  metadataBase: new URL("https://majesticfragrance.store"),
  title: {
    default: "Majestic Fragrance | Luxury Perfumes & Fragrances in Nigeria",
    template: "%s | Majestic Fragrance",
  },
  description:
    "Majestic Fragrance — premium perfumes, body mists, perfume oils and gift sets curated for individuals who value confidence and elegance. Based in FUTA, Akure, Nigeria. Order via WhatsApp.",
  keywords: [
    "Luxury Perfumes in Nigeria",
    "Affordable Luxury Fragrances",
    "Best Perfume Store in Akure",
    "Perfume Oils in FUTA",
    "Body Mists in Nigeria",
    "Long-lasting Perfumes",
    "Majestic Fragrance",
  ],
  authors: [{ name: "Majestic Fragrance" }],
  openGraph: {
    title: "Majestic Fragrance | Wear Confidence. Leave a Lasting Impression.",
    description:
      "Premium perfumes, body mists, oils and gift sets curated for individuals who value confidence and elegance.",
    url: "https://majesticfragrance.store",
    siteName: "Majestic Fragrance",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Majestic Fragrance",
    description: "Luxury in every drop. Wear Confidence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-void text-text-primary">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
