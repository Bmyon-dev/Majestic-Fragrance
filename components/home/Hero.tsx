"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { buildWhatsAppGeneralLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative flex min-h-[100vh] items-center overflow-hidden bg-void pt-24">
      {/* Ambient gradient atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-purple/20 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-magenta/15 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gold/10 blur-[100px]" />
      </div>

      {/* Watermark crown — signature element, faint, large, once */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute -right-20 top-10 hidden md:block"
      >
        <LogoMark size={520} />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="eyebrow mb-6"
          >
            Majestic Fragrance &mdash; FUTA, Akure
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl font-medium leading-[1.1] text-text-primary md:text-6xl lg:text-[4.2rem]"
          >
            Luxury Fragrances<br />
            That Define<br />
            <span className="text-gradient-brand">Your Presence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-md text-base leading-relaxed text-text-muted md:text-lg"
          >
            Premium perfumes, body mists, oils and gift sets curated for
            individuals who value confidence and elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Button href="/shop" size="lg">
              Shop Collection
            </Button>
            <Button href={buildWhatsAppGeneralLink()} variant="outline" size="lg" external>
              Order Via WhatsApp
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex items-center gap-8"
          >
            <div>
              <p className="font-display text-2xl text-gradient-gold">15%</p>
              <p className="text-xs text-text-faint">Off Premium Combos</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl text-gradient-gold">100%</p>
              <p className="text-xs text-text-faint">Long-lasting Formulas</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl text-gradient-gold">FUTA</p>
              <p className="text-xs text-text-faint">Local Delivery</p>
            </div>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-purple/30 via-magenta/20 to-transparent blur-2xl" />
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop"
              alt="Majestic Fragrance signature perfume bottle"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 480px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
            <div className="shimmer absolute inset-0" />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="h-9 w-5 rounded-full border border-white/20 p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
