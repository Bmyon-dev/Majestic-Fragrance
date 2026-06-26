import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { siteConfig } from "@/data/site-config";
import { SectionHeading } from "@/components/ui/SectionHeading";

const galleryImages = [
  "https://images.unsplash.com/photo-1615160460367-dcccd27e11ad?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605463967516-b73a52062ab0?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1680503504111-1bbc7fc2103e?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1739190940453-20900e9d18fb?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1754578645612-850d520385a8?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=500&auto=format&fit=crop",
];

export function InstagramSection() {
  return (
    <section className="relative bg-surface px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Follow The Journey"
          title={siteConfig.instagramHandle}
          description="Tag us in your Majestic moments for a chance to be featured."
        />

        <div className="mt-12 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
          {galleryImages.map((img, i) => (
            <a
              key={i}
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${img})` }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-void/0 transition-colors group-hover:bg-void/50">
                <InstagramIcon
                  size={20}
                  className="text-white opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
