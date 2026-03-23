import type { MetadataRoute } from "next";
import { allowSearchIndexing, getSiteUrl } from "@/lib/site-config";

/** Only emitted when indexing is allowed; keeps /sitemap.xml valid for robots.txt. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowSearchIndexing()) {
    return [];
  }

  const base = getSiteUrl().origin;

  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    {
      url: `${base}/thuc-anh-birthday-2026`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
