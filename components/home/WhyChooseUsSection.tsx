import { ShieldCheck, Truck, Gem, Headset } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: Gem,
    title: "Curated, Not Generic",
    description: "Every fragrance is selected for lasting quality, not chosen because it's cheap to stock.",
  },
  {
    icon: ShieldCheck,
    title: "Built on Trust",
    description: "Verified reviews, transparent pricing, and real photos — no surprises at checkout.",
  },
  {
    icon: Truck,
    title: "Fast Local Delivery",
    description: "Reliable delivery around FUTA and its environs, with WhatsApp updates on your order.",
  },
  {
    icon: Headset,
    title: "Always Reachable",
    description: "Order, ask questions, or get fragrance advice directly on WhatsApp — no bots, real answers.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="relative px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Majestic"
          title="Built on Confidence, Not Compromise"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group flex flex-col gap-4 rounded-2xl border border-white/[0.06] p-6 transition-colors hover:border-gold/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple/20 to-magenta/20 text-gold transition-transform group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-lg text-text-primary">
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
