"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, PLACEHOLDER_IMG } from "../constants";
import {
  DoodleStar,
  KidCrayonScribbleA,
  KidCrayonScribbleB,
  KidCrayonScribbleC,
} from "../doodles";
import { CalendarMarch, PhotoFrame } from "../photo-elements";

function ScrapSticker({
  children,
  className = "",
  baseRotate = 0,
}: {
  children: ReactNode;
  className?: string;
  baseRotate?: number;
}) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none inline-block max-w-[11rem] select-none rounded-xl border-2 border-rose-300/80 bg-gradient-to-br from-pink-50 via-fuchsia-50/90 to-violet-50 px-2.5 py-1.5 text-center font-[family-name:var(--font-nunito)] text-[11px] font-extrabold leading-tight text-rose-600 shadow-[3px_3px_0_rgba(190,24,93,0.2)] sm:max-w-none sm:px-3 sm:text-xs ${className}`}
      animate={{
        y: [0, -3, 0],
        rotate: [baseRotate - 1, baseRotate + 1, baseRotate - 1],
      }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}

const partyEmojis: { emoji: string; delay: number }[] = [
  { emoji: "👑", delay: 0 },
  { emoji: "✨", delay: 0.25 },
  { emoji: "🎀", delay: 0.5 },
  { emoji: "👸", delay: 0.75 },
  { emoji: "💖", delay: 1 },
];

function EmojiStack({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-4 ${className}`}
      aria-hidden
    >
      {partyEmojis.map(({ emoji, delay }) => (
        <motion.span
          key={emoji + delay}
          className="text-2xl sm:text-[1.65rem]"
          animate={{ y: [0, -6, 0], rotate: [-5, 5, -5] }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  );
}

export function ScrapbookCalendarSection() {
  return (
    <motion.section
      custom={1}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="relative overflow-visible rounded-3xl border-2 border-slate-800/10 bg-white/92 p-4 shadow-[8px_8px_0_rgba(15,23,42,0.07)] sm:p-6"
    >
      <div className="absolute right-3 top-3 z-20 rounded-full bg-yellow-200 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm sm:right-4 sm:top-4 sm:text-sm">
        Make a wish!
      </div>

      {/* Lịch + ảnh — full width section */}
      <div className="relative z-[1] w-full pt-11 sm:pt-12">
        <CalendarMarch />

        <div className="mx-auto mt-6 flex w-full max-w-md flex-col items-center gap-4 sm:mt-8 sm:max-w-lg">
          {/* <span className="text-4xl sm:text-5xl" aria-hidden>
            🎂
          </span> */}
          <PhotoFrame
            src='/images/thuc-anh-birthday/2026/thuc-anh-8.jpg'
            alt="Placeholder calendar photo"
            className="h-auto w-full object-cover"
            tilt={false}
          />
        </div>
      </div>

      {/* Sticker + nét bé + emoji — full width, phía dưới */}
      <div className="relative mt-8 w-full border-t-2 border-dashed border-rose-200/70 pt-6 sm:mt-10 sm:pt-8">
        <div className="flex w-full flex-col items-stretch gap-6 sm:gap-8">
          <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-4 sm:justify-evenly sm:gap-x-6">
            <KidCrayonScribbleA className="h-11 w-[4.5rem] shrink-0 -rotate-6 opacity-80 sm:h-12 sm:w-24" />
            <DoodleStar className="h-8 w-8 shrink-0 opacity-90 sm:h-9 sm:w-9" />
            <KidCrayonScribbleB className="h-14 w-[4.75rem] shrink-0 rotate-6 opacity-75 sm:h-16 sm:w-24" />
            <KidCrayonScribbleC className="h-12 w-16 shrink-0 opacity-80 sm:h-14 sm:w-[4.5rem]" />
          </div>

          <div className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3 sm:gap-y-3">
            <ScrapSticker baseRotate={-5}>
              Công chúa<span className="ml-0.5">👑</span>
            </ScrapSticker>
            {/* <ScrapSticker baseRotate={4}>
              Con gái<span className="ml-0.5">💕</span>
            </ScrapSticker> */}
            {/* <ScrapSticker baseRotate={-3}>
              Nhà có công chúa
            </ScrapSticker> */}
          </div>

          <EmojiStack className="w-full pt-1" />
        </div>
      </div>
    </motion.section>
  );
}
