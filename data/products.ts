// === PRODUCT CATALOG ===
// These are placeholder products with sample names and prices in NGN (₦).
// To update: edit the fields below, then commit + push to GitHub.
// Vercel will automatically redeploy with your changes.
//
// `image` accepts any direct image URL (e.g. an Imgur link, a Google Drive
// "direct link", or any hosted image). Replace these with real product
// photos whenever you're ready — the layout will adapt automatically.

import { Product, ComboPackage } from "./types";

export const products: Product[] = [
  {
    id: "p1",
    slug: "confidence-eau-de-parfum",
    name: "Confidence",
    brand: "Majestic Collection",
    category: "perfumes",
    gender: "women",
    description:
      "A warm, magnetic eau de parfum built around dark berries and amber musk. Confidence is the signature scent for women who walk into a room and own it.",
    notes: {
      top: ["Black Currant", "Bergamot", "Pink Pepper"],
      middle: ["Bulgarian Rose", "Jasmine", "Saffron"],
      base: ["Amber", "Musk", "Vanilla"],
    },
    longevity: 5,
    projection: 4,
    occasions: ["Evening", "Date Night", "Special Occasion"],
    price: 28000,
    compareAtPrice: 35000,
    sizeMl: 50,
    image:
      "https://images.unsplash.com/photo-1615160460367-dcccd27e11ad?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    isBestSeller: true,
    isLuxuryCollection: true,
  },
  {
    id: "p2",
    slug: "royal-oud-eau-de-parfum",
    name: "Royal Oud",
    brand: "Majestic Collection",
    category: "perfumes",
    gender: "men",
    description:
      "Smoky oud meets crisp citrus and warm leather. Royal Oud is a bold, long-lasting statement scent for men who command attention without saying a word.",
    notes: {
      top: ["Bergamot", "Cardamom"],
      middle: ["Oud", "Leather", "Cedarwood"],
      base: ["Amber", "Tonka Bean", "Sandalwood"],
    },
    longevity: 5,
    projection: 5,
    occasions: ["Office", "Evening", "Special Occasion"],
    price: 30000,
    compareAtPrice: 38000,
    sizeMl: 50,
    image:
      "https://images.unsplash.com/photo-1680503504111-1bbc7fc2103e?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    isBestSeller: true,
    isLuxuryCollection: true,
  },
  {
    id: "p3",
    slug: "velvet-bloom-perfume-oil",
    name: "Velvet Bloom",
    brand: "Majestic Collection",
    category: "perfume-oils",
    gender: "women",
    description:
      "A concentrated floral oil that lasts all day on skin. Soft peony and white musk in a long-wear, alcohol-free oil base — perfect for sensitive skin.",
    notes: {
      top: ["Peony", "Litchi"],
      middle: ["White Musk", "Freesia"],
      base: ["Soft Woods", "Cashmere"],
    },
    longevity: 4,
    projection: 2,
    occasions: ["Daily Wear", "Office"],
    price: 12000,
    sizeMl: 15,
    image:
      "https://images.unsplash.com/photo-1594125311687-3b1b3eafa9f4?q=80&w=1200&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 18,
    inStock: true,
    isStudentPick: true,
  },
  {
    id: "p4",
    slug: "first-class-roll-on",
    name: "First Class",
    brand: "Majestic Collection",
    category: "roll-ons",
    gender: "unisex",
    description:
      "A pocket-friendly roll-on with citrus and clean musk — fresh enough for class, smooth enough for dinner after.",
    notes: {
      top: ["Lemon", "Mandarin"],
      middle: ["Lavender", "Neroli"],
      base: ["White Musk"],
    },
    longevity: 3,
    projection: 2,
    occasions: ["Daily Wear", "Office", "Class"],
    price: 6500,
    sizeMl: 10,
    image:
      "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=1200&auto=format&fit=crop",
    rating: 4.5,
    reviewCount: 42,
    inStock: true,
    isStudentPick: true,
    isBestSeller: true,
  },
  {
    id: "p5",
    slug: "midnight-affair-body-mist",
    name: "Midnight Affair",
    brand: "Majestic Collection",
    category: "body-mists",
    gender: "women",
    description:
      "A light, layerable body mist with vanilla orchid and soft sandalwood. Spray generously — it's made for layering under your main fragrance.",
    notes: {
      top: ["Vanilla Orchid"],
      middle: ["Soft Sandalwood"],
      base: ["Musk"],
    },
    longevity: 2,
    projection: 2,
    occasions: ["Daily Wear", "Layering"],
    price: 7000,
    sizeMl: 250,
    image:
      "https://images.unsplash.com/photo-1615160460524-432433ba1b8f?q=80&w=1200&auto=format&fit=crop",
    rating: 4.4,
    reviewCount: 15,
    inStock: true,
    isNewArrival: true,
  },
  {
    id: "p6",
    slug: "urban-edge-body-spray",
    name: "Urban Edge",
    brand: "Majestic Collection",
    category: "body-sprays",
    gender: "men",
    description:
      "A sharp, energizing body spray with mint and ginger up top, settling into warm woods. Built for the gym bag and the going-out bag alike.",
    notes: {
      top: ["Mint", "Ginger"],
      middle: ["Black Pepper"],
      base: ["Cedarwood", "Musk"],
    },
    longevity: 2,
    projection: 3,
    occasions: ["Daily Wear", "Gym", "Casual"],
    price: 6000,
    sizeMl: 200,
    image:
      "https://images.unsplash.com/photo-1608721279136-cd41b752fa41?q=80&w=1200&auto=format&fit=crop",
    rating: 4.3,
    reviewCount: 11,
    inStock: true,
  },
  {
    id: "p7",
    slug: "pocket-prestige",
    name: "Pocket Prestige",
    brand: "Majestic Collection",
    category: "pocket-perfumes",
    gender: "unisex",
    description:
      "All the elegance of our signature scents in a slim, refillable pocket atomizer. Slips into any bag or pocket for touch-ups on the go.",
    notes: {
      top: ["Bergamot", "Pink Pepper"],
      middle: ["Rose", "Jasmine"],
      base: ["Amber", "Musk"],
    },
    longevity: 3,
    projection: 2,
    occasions: ["Daily Wear", "Travel"],
    price: 8500,
    sizeMl: 20,
    image:
      "https://images.unsplash.com/photo-1610113233329-1c73b6f7fe98?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 9,
    inStock: true,
    isNewArrival: true,
  },
  {
    id: "p8",
    slug: "heritage-noir",
    name: "Heritage Noir",
    brand: "Majestic Collection",
    category: "perfumes",
    gender: "unisex",
    description:
      "Dark, smoky, and unmistakably confident. Heritage Noir blends incense and black pepper with a soft amber finish for a unisex scent that turns heads.",
    notes: {
      top: ["Black Pepper", "Incense"],
      middle: ["Iris", "Suede"],
      base: ["Amber", "Vanilla", "Patchouli"],
    },
    longevity: 5,
    projection: 4,
    occasions: ["Evening", "Special Occasion"],
    price: 32000,
    compareAtPrice: 40000,
    sizeMl: 50,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 27,
    inStock: true,
    isLuxuryCollection: true,
    isBestSeller: true,
  },
];

export const comboPackages: ComboPackage[] = [
  {
    id: "c1",
    slug: "basic-package",
    name: "Basic Package",
    tier: "basic",
    discountPercent: 10,
    items: ["1x Perfume", "1x Roll-on", "1x Body Spray or Body Mist"],
    description:
      "The perfect starter set — a signature perfume backed up by a roll-on and body spray for everyday top-ups.",
    image:
      "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=1200&auto=format&fit=crop",
    basePrice: 41000,
  },
  {
    id: "c2",
    slug: "standard-package",
    name: "Standard Package",
    tier: "standard",
    discountPercent: 12,
    items: ["1x Perfume", "1x Roll-on", "1x Perfume Oil", "1x Body Spray or Body Mist"],
    description:
      "More coverage, more savings. A full rotation for every part of your day, from your desk to your night out.",
    image:
      "https://images.unsplash.com/photo-1708486855543-6010a133280f?q=80&w=1200&auto=format&fit=crop",
    basePrice: 52500,
  },
  {
    id: "c3",
    slug: "premium-package",
    name: "Premium Package",
    tier: "premium",
    discountPercent: 15,
    items: [
      "1x Perfume",
      "1x Body Spray",
      "1x Body Mist",
      "1x Roll-on",
      "1x Perfume Oil or Pocket Perfume",
    ],
    description:
      "The complete Majestic wardrobe. Five formats, one discount, built for anyone who wants to be covered for every occasion.",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
    basePrice: 68500,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNewArrival);
}

export function getLuxuryCollection(): Product[] {
  return products.filter((p) => p.isLuxuryCollection);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
