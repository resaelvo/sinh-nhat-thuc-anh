import type { Metadata } from "next";
import { Baloo_2, Caveat, Nunito } from "next/font/google";
import type { ReactNode } from "react";

/** Headings — clear, works well with Vietnamese diacritics. */
const nunito = Nunito({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-nunito",
  display: "swap",
});

/** Poster / sticker titles — rounded display with Vietnamese glyphs. */
const balooPoster = Baloo_2({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["600", "700"],
  variable: "--font-poster-display",
  display: "swap",
});

/** Chữ viết tay cho scrapbook / denim recap */
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thục Anh — sinh nhật 2026 ✦",
  description:
    "Một trang scrapbook chúc mừng sinh nhật Thục Anh — ảnh và lời chúc (placeholder).",
};

export default function ThucAnhBirthday2026Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      lang="vi"
      className={`${nunito.variable} ${balooPoster.variable} ${caveat.variable}`}
    >
      {children}
    </div>
  );
}
