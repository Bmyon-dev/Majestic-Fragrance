import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

const categories = [
  { name: "Perfumes", slug: "perfumes", img: "https://images.unsplash.com/photo-1680503504111-1bbc7fc2103e?q=80&w=600&auto=format&fit=crop" },
  { name: "Perfume Oils", slug: "perfume-oils", img: "https://images.unsplash.com/photo-1594125311687-3b1b3eafa9f4?q=80&w=600&auto=format&fit=crop" },
  { name: "Roll-ons", slug: "roll-ons", img: "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=600&auto=format&fit=crop" },
  { name: "Body Mists", slug: "body-mists", img: "https://images.unsplash.com/photo-1615160460524-432433ba1b8f?q=80&w=600&auto=format&fit=crop" },
  { name: "Gift Sets", slug: "gift-sets", img: "https://images.unsplash.com/photo-1754578645612-850d520385a8?q=80&w=600&auto=format&fit=crop" },
  { name: "Pocket Perfumes", slug: "pocket-perfumes", img: "https://images.unsplash.com/photo-1610113233329-1c73b6f7fe98?q=80&w=600&auto=format&fit=crop" },
];

export function CategoriesSection() {
  return (
    <section className="relative bg-surface px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Shop By Category"
          title="Find Your Signature Format"
          description="From all-day perfume oils to pocket-sized prestige — every format, curated for confidence."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/[0.06]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
              <div className="absolute inset-0 flex items-end p-5">
                <h3 className="font-display text-xl text-text-primary md:text-2xl">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
