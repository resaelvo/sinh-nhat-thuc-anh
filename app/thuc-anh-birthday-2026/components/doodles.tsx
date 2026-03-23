"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { floatSlow } from "./constants";

/** Halo mờ nhẹ sau icon nền — không vẽ thêm khung để giao diện gọn. */
export function BgDoodleSlot({
  className = "",
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      {...floatSlow}
      transition={{ ...floatSlow.transition, delay }}
      className={`pointer-events-none absolute z-[3] ${className}`}
    >
      <div className="relative inline-flex items-center justify-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 blur-xl"
          aria-hidden
        />
        <div className="relative z-10 drop-shadow-[0_2px_8px_rgba(255,255,255,0.55)]">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export function hl(text: string, color = "bg-rose-200") {
  return (
    <span className={`${color} px-1 py-0.5 rounded-sm font-semibold`}>
      {text}
    </span>
  );
}

export function DoodleHeart({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-7-4.35-7-10a5 5 0 0 1 9.5-2A5 5 0 0 1 19 11c0 5.65-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="#fecaca"
      />
    </svg>
  );
}

/** Nền chỉ toàn tim — vị trí cố định (không random) để tránh lệch SSR/hydration. */
const HEART_BG_SPOTS: { pos: string; delay: number; size: string; tone: string }[] = [
  { pos: "left-[2%] top-[8%]", delay: 0, size: "h-9 w-9 sm:h-10 sm:w-10", tone: "text-rose-400/55" },
  { pos: "left-[8%] top-[22%]", delay: 0.35, size: "h-7 w-7 sm:h-8 sm:w-8", tone: "text-rose-500/45" },
  { pos: "left-[4%] top-[42%]", delay: 0.7, size: "h-11 w-11 sm:h-12 sm:w-12", tone: "text-pink-400/50" },
  { pos: "left-[1%] top-[62%]", delay: 1.1, size: "h-8 w-8", tone: "text-rose-400/40" },
  { pos: "left-[12%] bottom-[18%]", delay: 0.2, size: "h-10 w-10 sm:h-11 sm:w-11", tone: "text-rose-500/48" },
  { pos: "left-[6%] bottom-[6%]", delay: 1.4, size: "h-6 w-6 sm:h-7 sm:w-7", tone: "text-pink-500/42" },
  { pos: "right-[3%] top-[10%]", delay: 0.5, size: "h-10 w-10", tone: "text-rose-400/52" },
  { pos: "right-[7%] top-[28%]", delay: 0.9, size: "h-8 w-8 sm:h-9 sm:w-9", tone: "text-pink-400/46" },
  { pos: "right-[2%] top-[48%]", delay: 0.15, size: "h-12 w-12 sm:h-14 sm:w-14", tone: "text-rose-500/44" },
  { pos: "right-[9%] top-[58%]", delay: 1.2, size: "h-7 w-7", tone: "text-rose-400/38" },
  { pos: "right-[4%] bottom-[22%]", delay: 0.6, size: "h-11 w-11", tone: "text-pink-500/50" },
  { pos: "right-[1%] bottom-[8%]", delay: 1.5, size: "h-9 w-9", tone: "text-rose-500/42" },
  { pos: "left-[18%] top-[14%]", delay: 0.4, size: "h-6 w-6 sm:h-7 sm:w-7", tone: "text-rose-400/35" },
  { pos: "right-[16%] top-[12%]", delay: 0.8, size: "h-7 w-7", tone: "text-pink-400/40" },
  { pos: "left-[22%] top-[55%]", delay: 1.0, size: "h-8 w-8", tone: "text-rose-500/36" },
  { pos: "right-[20%] bottom-[12%]", delay: 0.25, size: "h-9 w-9", tone: "text-rose-400/48" },
  { pos: "left-[32%] top-[6%]", delay: 1.3, size: "h-5 w-5 sm:h-6 sm:w-6", tone: "text-pink-500/32" },
  { pos: "right-[30%] top-[8%]", delay: 0.55, size: "h-6 w-6", tone: "text-rose-500/34" },
  { pos: "left-[40%] top-[3%]", delay: 0.1, size: "h-7 w-7", tone: "text-rose-400/30" },
  { pos: "right-[38%] top-[4%]", delay: 1.6, size: "h-5 w-5", tone: "text-pink-400/34" },
  { pos: "left-[48%] top-[12%]", delay: 0.45, size: "h-8 w-8", tone: "text-rose-500/38" },
  { pos: "right-[46%] bottom-[8%]", delay: 1.15, size: "h-10 w-10", tone: "text-pink-500/40" },
  { pos: "left-[52%] bottom-[4%]", delay: 0.65, size: "h-6 w-6", tone: "text-rose-400/36" },
  { pos: "left-[28%] bottom-[10%]", delay: 1.35, size: "h-7 w-7", tone: "text-rose-500/40" },
  { pos: "right-[42%] top-[38%]", delay: 0.3, size: "h-5 w-5", tone: "text-pink-400/28" },
  { pos: "left-[14%] top-[78%]", delay: 1.25, size: "h-8 w-8", tone: "text-rose-400/44" },
  { pos: "right-[12%] top-[72%]", delay: 0.75, size: "h-7 w-7", tone: "text-pink-500/38" },
];

export function HeartBackgroundField() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
      {HEART_BG_SPOTS.map((h, i) => (
        <BgDoodleSlot
          key={i}
          className={`${h.pos} ${h.tone}`}
          delay={h.delay}
        >
          <DoodleHeart className={h.size} />
        </BgDoodleSlot>
      ))}
    </div>
  );
}

export function DoodleStar({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#fde047" aria-hidden>
      <path
        d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"
        stroke="#ca8a04"
        strokeWidth="1"
      />
    </svg>
  );
}

export function DoodleSparkle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="#86efac" />
    </svg>
  );
}

/** Bóng bay — trang trí nền sinh nhật */
export function DoodleBalloon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse
        cx="12"
        cy="9"
        rx="6.2"
        ry="7.8"
        fill="#fbcfe8"
        stroke="#db2777"
        strokeWidth="1.2"
      />
      <path
        d="M12 16.8 Q10.5 19 12 22.5"
        stroke="#9d174d"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Hộp quà — trang trí nền sinh nhật */
export function DoodleGift({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4"
        y="10"
        width="16"
        height="11"
        rx="1"
        fill="#fef3c7"
        stroke="#d97706"
        strokeWidth="1.2"
      />
      <path
        d="M12 10V21M4 14h16"
        stroke="#d97706"
        strokeWidth="1.2"
      />
      <path
        d="M8 10h8c0-2.2-1.8-4-4-4s-4 1.8-4 4Z"
        fill="#fde68a"
        stroke="#d97706"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/** Bánh nhỏ + nến — trang trí nền sinh nhật */
/** Nét vẽ nguệch ngoạc kiểu bé học (sáp / bút chì) — dùng trang trí scrapbook. */
export function KidCrayonScribbleA({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 72" fill="none" aria-hidden>
      <path
        d="M6 40 Q18 18 34 34 T58 26 Q72 12 88 28 Q96 44 112 36"
        stroke="#ec4899"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <path
        d="M14 52 Q28 46 40 54 Q52 62 68 50"
        stroke="#38bdf8"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="22" cy="20" r="3" fill="#fbbf24" opacity="0.55" />
    </svg>
  );
}

export function KidCrayonScribbleB({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 90" fill="none" aria-hidden>
      <path
        d="M48 8 L52 28 L72 30 L56 42 L62 62 L48 50 L34 62 L40 42 L24 30 L44 28 Z"
        stroke="#a855f7"
        strokeWidth="2.4"
        strokeLinejoin="round"
        fill="none"
        opacity="0.42"
        transform="rotate(-8 50 45)"
      />
      <path
        d="M8 68 Q24 52 38 70 Q52 78 70 64 Q84 58 92 72"
        stroke="#34d399"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function KidCrayonScribbleC({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 80" fill="none" aria-hidden>
      <path
        d="M50 18 C38 18 28 30 30 44 C32 58 48 66 62 58 C70 52 72 40 64 32 C58 26 50 24 44 30"
        stroke="#f43f5e"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.48"
      />
      <path
        d="M12 24 L16 28 M20 20 L24 26 M10 36 L18 38"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

export function DoodleBirthdayCake({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 18h14v3H5v-3Z"
        fill="#fce7f3"
        stroke="#db2777"
        strokeWidth="1.2"
      />
      <path
        d="M7 14h10v4H7v-4Z"
        fill="#fdf2f8"
        stroke="#ec4899"
        strokeWidth="1.2"
      />
      <path
        d="M12 14V9.5"
        stroke="#78716c"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 4.5c.8 1.2 1.5 2.8 1.5 4.2 0 .6-.2 1.1-.5 1.5-.6-.4-1.4-.6-2.2-.6h-.6c-.3-.4-.5-.9-.5-1.5 0-1.4.7-3 1.5-4.2Z"
        fill="#fde047"
        stroke="#ca8a04"
        strokeWidth="0.9"
      />
    </svg>
  );
}
