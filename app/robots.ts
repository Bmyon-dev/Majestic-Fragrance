import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/checkout", "/track"],
    },
    sitemap: "https://majesticfragrance.store/sitemap.xml",
  };
}
