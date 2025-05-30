import { sitemapURL } from "@/lib/routes";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard","/api",],
    },
    sitemap: [sitemapURL]
  };
};