"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER_IMG, STICKER_PINK } from "./constants";
import {
  FloatingPartyDeco,
  PosterToolbarIcon,
  ViewfinderPhoto,
} from "./photo-elements";

export function Y2KScrapbookPoster() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative mb-12 overflow-hidden rounded-3xl border-[3px] border-pink-400 bg-white shadow-[0_10px_0_#f472b6,0_16px_28px_rgba(0,0,0,0.09)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d6d3d1 1px, transparent 1px),
            linear-gradient(to bottom, #d6d3d1 1px, transparent 1px)
          `,
          backgroundSize: "26px 26px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-fuchsia-50/20 to-yellow-50/25" />

      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 border-b-2 border-pink-200/90 bg-white/96 px-3 py-2.5 backdrop-blur-sm sm:px-4">
        <div className="flex gap-2 text-red-600 sm:gap-3">
          <PosterToolbarIcon label="Calendar">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M8 3v4M16 3v4M3 11h18" />
            </svg>
          </PosterToolbarIcon>
          <PosterToolbarIcon label="Inbox">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16v12H4z" />
              <path d="M4 9l8 5 8-5" />
            </svg>
          </PosterToolbarIcon>
          <PosterToolbarIcon label="List">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 6h12M8 12h12M8 18h12M4 6h1M4 12h1M4 18h1" />
            </svg>
          </PosterToolbarIcon>
          <PosterToolbarIcon label="Add">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </PosterToolbarIcon>
        </div>
        <div className="flex items-center rounded-xl bg-neutral-100 p-1 text-[9px] font-semibold text-neutral-500 sm:text-[11px]">
          <span className="rounded-lg px-2 py-1">Every Day</span>
          <span className="rounded-lg px-2 py-1">Every Week</span>
          <span className="rounded-lg bg-neutral-800 px-2.5 py-1 text-white shadow-sm">
            Every Month
          </span>
        </div>
      </div>

      <div className="relative z-10 min-h-[420px] pb-24 pt-2 font-[family-name:var(--font-poster-display),sans-serif] sm:min-h-[480px] sm:pb-28">
        <p className="absolute left-3 top-2 font-sans text-base font-black text-neutral-900 sm:left-5 sm:top-3 sm:text-lg">
          Ngày 24 · Tháng 3 · 2026
        </p>

        <div className="absolute left-2 top-14 z-30 max-w-[85%] sm:left-5 sm:top-[4.25rem] sm:max-w-none">
          <p className={`text-[clamp(1.65rem,6.5vw,3rem)] leading-[0.95] ${STICKER_PINK}`}>
            Happy Birthday
          </p>
          <p className={`mt-1 text-[clamp(1.65rem,6.5vw,3rem)] leading-[0.95] ${STICKER_PINK}`}>
            Thục Anh
          </p>
        </div>
        <div className="absolute right-2 top-16 z-30 max-w-[130px] rounded-2xl border-2 border-pink-400 bg-white px-2.5 py-1.5 text-center text-[10px] font-sans font-bold leading-tight text-pink-600 shadow-md sm:right-6 sm:top-18 sm:max-w-[200px] sm:px-3 sm:py-2 sm:text-xs">
          Sinh nhật vui vẻ nha em iu ✿
        </div>
        <div className="absolute right-4 top-20 z-20 rotate-6 rounded-2xl border-2 border-amber-300 bg-yellow-100 px-2 py-1 text-[10px] font-sans font-bold text-amber-900 shadow sm:right-10 sm:top-34 sm:text-[11px]">
          Em ơi, anh iu em nhất!
        </div>
        <div className="absolute left-[21%] top-[0.5rem] z-20 ">
          <img src="/images/thuc-anh-birthday/2026/thuc-anh-1.png" alt="handsome" className="h-120 w-120 object-cover" loading="lazy" />
        </div>

        <div className="absolute right-2 top-[10rem] z-30 flex flex-col items-end gap-3 sm:right-5 sm:top-[13rem]">
          <ViewfinderPhoto
            src="/images/thuc-anh-birthday/2026/thuc-anh-3.jpg"
            alt="Placeholder viewfinder 1"
            className="h-40 w-40 sm:h-60 sm:w-60"
          />
          {/* <ViewfinderPhoto
            src={PLACEHOLDER_IMG("poster-vf2", 280, 280)}
            alt="Placeholder viewfinder 2"
            className="h-24 w-24 -rotate-6 sm:h-32 sm:w-32"
          /> */}
        </div>

        <div className="absolute left-3 top-[13rem] z-[25] sm:left-6 ">
          <motion.div
            whileHover={{ scale: 1.04, rotate: -2 }}
            className="relative inline-block"
          >
            <div className="absolute -right-1 -top-5 z-10 text-2xl drop-shadow-md" aria-hidden>
              🎉
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/thuc-anh-birthday/2026/thuc-anh-2.jpeg"
              alt="Placeholder portrait sticker"
              className="h-40 w-40 rounded-2xl object-cover shadow-[5px_5px_0_#fbcfe8] sm:h-60 sm:w-50"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* <FloatingPartyDeco
          emoji="🎈"
          className="left-[8%] top-[40%] z-20 opacity-90"
          delay={0}
        /> */}
        <FloatingPartyDeco
          emoji="✨"
          className="right-[20%] top-[48%] z-20 opacity-80"
          delay={1.2}
        />
        {/* <FloatingPartyDeco
          emoji="✨"
          className="left-[65%] top-[72%] z-20 text-xl opacity-70 sm:top-[68%]"
          delay={2.3}
        /> */}

        <div className="absolute bottom-4 left-0 right-0 z-30 px-2 text-center sm:bottom-6">
          <p className={`inline-block text-[clamp(1.25rem,5vw,2.25rem)] ${STICKER_PINK}`}>
            Thục Anh birthday
          </p>
        
        </div>
      </div>
    </motion.section>
  );
}
