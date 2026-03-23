import type { MetadataRoute } from "next";
import { allowSearchIndexing, getSiteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl().origin;

  if (allowSearchIndexing()) {
    return {
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${base}/sitemap.xml`,
    };
  }

  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
