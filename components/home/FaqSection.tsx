"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site-config";

export const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "You can order directly on WhatsApp by tapping any \"Order on WhatsApp\" button, or browse the shop, select your item, and we'll guide you through delivery and payment on WhatsApp.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We currently accept bank transfer only. Card payment is not available at this time, but transfer is confirmed instantly with your receipt on WhatsApp.",
  },
  {
    question: "Where do you deliver?",
    answer: siteConfig.deliveryNote,
  },
  {
    question: "Are your fragrances long-lasting?",
    answer:
      "Yes. Each product page shows a longevity and projection rating so you know exactly what to expect before you order — most of our perfumes are rated 4-5 out of 5 for longevity.",
  },
  {
    question: "Can I get a discount on combo packages?",
    answer:
      "Yes — our Basic, Standard, and Premium combo packages come with 10%, 12%, and 15% off respectively. Individual purchases also occasionally qualify for promotional discounts.",
  },
  {
    question: "How do I know if a product is in stock?",
    answer:
      "Every product card and detail page clearly shows availability. If an item is out of stock, you'll see an \"Out of Stock\" label and won't be able to order it until it's restocked.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-white/[0.06] bg-surface"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-text-primary">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-gold transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-text-muted">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
