import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Mail } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";
import { buildWhatsAppGeneralLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Majestic Fragrance is a luxury perfume brand based in FUTA, Akure, Nigeria — built for individuals who value confidence and elegance.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 md:pt-32">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <p className="eyebrow mb-3">Our Story</p>
          <h1 className="font-display text-4xl text-text-primary md:text-5xl max-w-2xl">
            Luxury in Every Drop
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/[0.06]">
              <Image
                src="https://images.unsplash.com/photo-1719176010035-17729577d496?q=80&w=1000&auto=format&fit=crop"
                alt="Luxury atmosphere"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
            </div>

            <div className="flex flex-col gap-5 text-text-muted leading-relaxed">
              <p>
                Majestic Fragrance started with a simple belief: luxury
                fragrance shouldn&apos;t be reserved for those who can fly to
                Paris for it. It should be available right here, around
                FUTA, with the same quality and care as the world&apos;s
                most prestigious perfume houses.
              </p>
              <p>
                Every product in the Majestic Collection is chosen for how
                it performs, not just how it smells in the bottle —
                longevity, projection, and the confidence it gives the
                person wearing it.
              </p>
              <p>
                Whether you&apos;re a student looking for an everyday
                signature, a professional dressing for the boardroom, or
                searching for the perfect gift, Majestic Fragrance is built
                to make you feel exactly as our name suggests.
              </p>
            </div>
          </div>

          <div className="gold-rule my-16" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-3 text-center">
              <MapPin className="text-gold" size={24} />
              <p className="text-sm text-text-muted">{siteConfig.address}</p>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <Mail className="text-gold" size={24} />
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-text-muted hover:text-gold transition-colors break-all"
              >
                {siteConfig.email}
              </a>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <InstagramIcon className="text-gold" size={24} />
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-gold transition-colors"
              >
                {siteConfig.instagramHandle}
              </a>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-6 rounded-3xl border border-gold/20 bg-surface p-10 text-center">
            <h2 className="font-display text-2xl text-text-primary md:text-3xl">
              Ready to find your signature scent?
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href="/shop" size="md">Shop Collection</Button>
              <Button href={buildWhatsAppGeneralLink()} variant="outline" size="md" external>
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
