export type ProductCategory =
  | "perfumes"
  | "perfume-oils"
  | "roll-ons"
  | "body-sprays"
  | "body-mists"
  | "pocket-perfumes"
  | "gift-sets"
  | "mens"
  | "womens"
  | "unisex";

export interface FragranceNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  gender: "men" | "women" | "unisex";
  description: string;
  notes: FragranceNotes;
  longevity: 1 | 2 | 3 | 4 | 5; // out of 5
  projection: 1 | 2 | 3 | 4 | 5; // out of 5
  occasions: string[];
  price: number; // NGN
  compareAtPrice?: number; // NGN, for showing a discount strike-through
  sizeMl: number;
  image: string;
  gallery?: string[];
  rating: number; // 0-5
  reviewCount: number;
  inStock: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isLuxuryCollection?: boolean;
  isStudentPick?: boolean;
}

export interface ComboPackage {
  id: string;
  slug: string;
  name: string;
  tier: "basic" | "standard" | "premium";
  discountPercent: number;
  items: string[];
  description: string;
  image: string;
  basePrice: number; // sum of included items at full price, for showing savings
}
