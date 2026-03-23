/** Canonical site origin for metadata (OG URLs, canonical). */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);
  if (process.env.VERCEL_URL) return new URL(`https://${process.env.VERCEL_URL}`);
  return new URL("http://localhost:3000");
}

export function allowSearchIndexing(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}
