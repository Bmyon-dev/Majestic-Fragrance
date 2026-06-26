import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Hero } from "@/components/home/Hero";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ComboSection } from "@/components/home/ComboSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBand } from "@/components/home/CtaBand";
import { getBestSellers, getNewArrivals, products } from "@/data/products";

export default function Home() {
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();
  const featured = bestSellers.length ? bestSellers : products.slice(0, 4);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductShowcase
          eyebrow="Featured"
          title="Best Sellers"
          description="The fragrances our customers keep coming back for."
          products={featured}
          viewAllHref="/shop?filter=best-sellers"
        />
        <CategoriesSection />
        <ComboSection />
        {newArrivals.length > 0 && (
          <ProductShowcase
            eyebrow="Just In"
            title="New Arrivals"
            description="The latest additions to the Majestic Collection."
            products={newArrivals}
            viewAllHref="/shop?filter=new"
          />
        )}
        <ReviewsSection />
        <WhyChooseUsSection />
        <InstagramSection />
        <FaqSection />
        <CtaBand />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
