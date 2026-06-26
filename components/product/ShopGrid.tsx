"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { ProductCategory } from "@/data/types";
import { ProductCard } from "@/components/product/ProductCard";

const categoryLabels: Record<ProductCategory, string> = {
  perfumes: "Perfumes",
  "perfume-oils": "Perfume Oils",
  "roll-ons": "Roll-ons",
  "body-sprays": "Body Sprays",
  "body-mists": "Body Mists",
  "pocket-perfumes": "Pocket Perfumes",
  "gift-sets": "Gift Sets",
  mens: "Men's Collection",
  womens: "Women's Collection",
  unisex: "Unisex",
};

type GenderFilter = "all" | "men" | "women" | "unisex";

export function ShopGrid() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialFilter = searchParams.get("filter");

  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">(
    (initialCategory as ProductCategory) &&
      Object.keys(categoryLabels).includes(initialCategory as string)
      ? (initialCategory as ProductCategory)
      : "all"
  );
  const [gender, setGender] = useState<GenderFilter>(
    initialCategory === "mens"
      ? "men"
      : initialCategory === "womens"
      ? "women"
      : "all"
  );
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">(
    "featured"
  );
  const [showBestSellers, setShowBestSellers] = useState(initialFilter === "best-sellers");
  const [showNewOnly, setShowNewOnly] = useState(initialFilter === "new");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategory !== "all" && activeCategory !== "mens" && activeCategory !== "womens") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (gender !== "all") {
      list = list.filter((p) => p.gender === gender);
    }
    if (showBestSellers) {
      list = list.filter((p) => p.isBestSeller);
    }
    if (showNewOnly) {
      list = list.filter((p) => p.isNewArrival);
    }

    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
    }

    return list;
  }, [activeCategory, gender, sortBy, showBestSellers, showNewOnly]);

  const categoryButtons: { label: string; value: ProductCategory | "all" }[] = [
    { label: "All", value: "all" },
    ...(Object.entries(categoryLabels) as [ProductCategory, string][])
      .filter(([key]) => key !== "mens" && key !== "womens")
      .map(([value, label]) => ({ label, value })),
  ];

  const FilterPanel = (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="eyebrow mb-3">Gender</h3>
        <div className="flex flex-wrap gap-2">
          {(["all", "men", "women", "unisex"] as GenderFilter[]).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
                gender === g
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-white/10 text-text-muted hover:border-white/30"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="eyebrow mb-3">Category</h3>
        <div className="flex flex-col gap-1">
          {categoryButtons.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                activeCategory === cat.value
                  ? "bg-gold/10 text-gold"
                  : "text-text-muted hover:bg-white/5 hover:text-text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="eyebrow mb-3">Quick Filters</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={showBestSellers}
              onChange={(e) => setShowBestSellers(e.target.checked)}
              className="accent-purple"
            />
            Best Sellers Only
          </label>
          <label className="flex items-center gap-2 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={showNewOnly}
              onChange={(e) => setShowNewOnly(e.target.checked)}
              className="accent-purple"
            />
            New Arrivals Only
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <div className="flex items-center justify-between gap-4 md:hidden">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-muted"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="rounded-full border border-white/10 bg-surface px-4 py-2 text-sm text-text-muted"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-10 md:mt-0 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">{FilterPanel}</aside>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex bg-void/95 p-6 md:hidden">
            <div className="w-full">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl text-text-primary">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                  <X size={24} className="text-text-primary" />
                </button>
              </div>
              {FilterPanel}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="btn-primary mt-8 w-full rounded-full py-3 font-semibold"
              >
                Show {filtered.length} Results
              </button>
            </div>
          </div>
        )}

        <div>
          <div className="mb-6 hidden items-center justify-between md:flex">
            <p className="text-sm text-text-muted">
              Showing <span className="text-text-primary">{filtered.length}</span> products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-full border border-white/10 bg-surface px-4 py-2 text-sm text-text-muted"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.06] py-24 text-center">
              <p className="font-display text-xl text-text-primary">No products match these filters</p>
              <p className="text-sm text-text-muted">Try adjusting or clearing your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
