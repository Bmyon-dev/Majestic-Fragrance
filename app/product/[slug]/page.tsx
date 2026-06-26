import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductOrderActions } from "@/components/product/ProductOrderActions";
import { RatingBars } from "@/components/product/RatingBars";
import { StarRating } from "@/components/ui/StarRating";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductReviews } from "@/components/product/ProductReviews";
import {
  getProductBySlug,
  getRelatedProducts,
  formatNaira,
  products,
} from "@/data/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} by ${product.brand}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Majestic Fragrance`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product);
  const gallery = product.gallery?.length ? product.gallery : [product.image];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: "NGN",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: product.reviewCount
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-text-faint">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
            <ChevronRight size={12} />
            <span className="text-text-muted">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <ProductGallery images={gallery} productName={product.name} />

            <div>
              <p className="text-xs uppercase tracking-wider text-text-faint">
                {product.brand}
              </p>
              <h1 className="font-display mt-2 text-3xl text-text-primary md:text-4xl">
                {product.name}
              </h1>

              <div className="mt-3">
                <StarRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  showNumber
                  size={16}
                />
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-3xl text-text-primary tabular">
                  {formatNaira(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-lg tabular text-text-faint line-through">
                    {formatNaira(product.compareAtPrice)}
                  </span>
                )}
                <span className="text-sm text-text-faint">/ {product.sizeMl}ml</span>
              </div>

              <p className="mt-5 leading-relaxed text-text-muted">
                {product.description}
              </p>

              <div className="mt-8">
                <ProductOrderActions
                  productId={product.id}
                  slug={product.slug}
                  productName={product.name}
                  brand={product.brand}
                  price={product.price}
                  image={product.image}
                  inStock={product.inStock}
                />
              </div>

              <div className="gold-rule my-8" />

              {/* Fragrance Notes */}
              <div>
                <h2 className="eyebrow mb-4">Fragrance Notes</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-text-faint mb-2">Top</p>
                    <p className="text-sm text-text-muted">{product.notes.top.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-faint mb-2">Middle</p>
                    <p className="text-sm text-text-muted">{product.notes.middle.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-faint mb-2">Base</p>
                    <p className="text-sm text-text-muted">{product.notes.base.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="gold-rule my-8" />

              {/* Performance */}
              <div className="flex flex-col gap-4">
                <h2 className="eyebrow">Performance</h2>
                <RatingBars label="Longevity" value={product.longevity} />
                <RatingBars label="Projection" value={product.projection} />
              </div>

              {product.occasions.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.occasions.map((occ) => (
                    <span
                      key={occ}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-muted"
                    >
                      {occ}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <ProductReviews productId={product.id} productSlug={product.slug} />

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="font-display text-2xl text-text-primary mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
