import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { buildWhatsAppGeneralLink } from "@/lib/whatsapp";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-purple/20 via-magenta/10 to-transparent" />
      <div className="pointer-events-none absolute -left-16 -top-16 opacity-[0.04]">
        <LogoMark size={360} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <p className="eyebrow">Ready When You Are</p>
        <h2 className="font-display text-3xl font-medium leading-tight text-text-primary md:text-5xl">
          Smell Exceptional.<br />
          <span className="text-gradient-gold">Feel Majestic.</span>
        </h2>
        <p className="max-w-xl text-base text-text-muted md:text-lg">
          Browse the full collection or message us directly — we&apos;re happy to
          help you find the right scent for any occasion.
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Button href="/shop" size="lg">
            Shop Collection
          </Button>
          <Button href={buildWhatsAppGeneralLink()} variant="outline" size="lg" external>
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
