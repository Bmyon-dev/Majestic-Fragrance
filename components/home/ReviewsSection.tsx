import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { Quote } from "lucide-react";

export function ReviewsSection() {
  return (
    <section className="relative bg-surface px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="Confidence, Verified"
          description="Real words from real customers across FUTA and beyond."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.slice(0, 6).map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-surface-raised p-6"
            >
              <Quote size={22} className="text-gold/40" />
              <StarRating rating={t.rating} size={13} />
              <p className="text-sm leading-relaxed text-text-muted">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                  {t.product && (
                    <p className="text-xs text-text-faint">Purchased {t.product}</p>
                  )}
                </div>
                {t.verified && (
                  <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-success">
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
