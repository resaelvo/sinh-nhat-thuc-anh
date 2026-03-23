import type { Metadata } from "next";
import { Be_Vietnam_Pro, Geist_Mono } from "next/font/google";
import { allowSearchIndexing, getSiteUrl } from "@/lib/site-config";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();
const indexable = allowSearchIndexing();
const siteName = "Thục Anh Birthday";
const description = "A birthday celebration page for Thục Anh.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: siteName,
  alternates: { canonical: "/" },
  robots: indexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
        nocache: true,
      },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName,
    title: siteName,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
  },
  referrer: "strict-origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
