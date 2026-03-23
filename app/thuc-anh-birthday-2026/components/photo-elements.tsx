"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type PhotoFrameProps = {
  src: string;
  alt: string;
  variant?: "sketch" | "circle" | "heart";
  className?: string;
  tilt?: boolean;
};

export function PhotoFrame({
  src,
  alt,
  variant = "sketch",
  className = "",
  tilt = true,
}: PhotoFrameProps) {
  const border =
    variant === "circle"
      ? "rounded-full border-4 border-sky-300 shadow-md"
      : variant === "heart"
        ? "border-4 border-rose-300 shadow-md [clip-path:polygon(50%_95%,7%_38%,23%_8%,50%_22%,77%_8%,93%_38%)]"
        : "rounded-2xl border-[3px] border-dashed border-amber-400 shadow-lg rotate-[-2deg]";

  const inner = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      loading="lazy"
    />
  );

  const box = (
    <div
      className={`overflow-hidden bg-white ${border} ${className}`}
      style={variant === "heart" ? undefined : { transformStyle: "preserve-3d" }}
    >
      {inner}
    </div>
  );

  if (!tilt) return box;

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotateY: 6, rotateX: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      style={{ perspective: 900 }}
      className="inline-block"
    >
      {box}
    </motion.div>
  );
}

export function CalendarMarch({ className = "" }: { className?: string }) {
  const days = Array.from({ length: 31 }, (_, d) => d + 1);
  const startPad = 0;
  return (
    <div
      className={`w-full rounded-2xl border-2 border-slate-800 bg-white p-3 font-sans text-sm shadow-[4px_4px_0_#1e293b] sm:p-4 sm:text-base ${className}`}
    >
      <div className="mb-2 text-center text-base font-bold text-rose-500 sm:mb-3 sm:text-lg">
        March 2026
      </div>
      <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-slate-500 sm:gap-2 sm:text-sm">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, idx) => (
          <span key={`${d}-${idx}`} className="font-semibold">
            {d}
          </span>
        ))}
        {Array.from({ length: startPad }).map((_, i) => (
          <span key={`p-${i}`} />
        ))}
        {days.map((d) => (
          <span
            key={d}
            className={`rounded-full py-1.5 sm:py-2 ${
              d === 24
                ? "bg-rose-400 font-bold text-white ring-2 ring-rose-600"
                : "text-slate-700"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-500 sm:mt-3 sm:text-xs">
        Ngày 24 — sinh nhật Thục Anh
      </p>
    </div>
  );
}

export function PosterToolbarIcon({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-red-500 text-red-600 sm:h-9 sm:w-9"
      title={label}
      aria-hidden
    >
      {children}
    </span>
  );
}

export function ViewfinderPhoto({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-md border-[3px] border-neutral-900 bg-black shadow-lg ring-2 ring-pink-200 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-1.5 top-1 font-mono text-[9px] font-bold tracking-tight text-white drop-shadow-md">
          MA 00:01
        </div>
        <div className="absolute right-1.5 top-1 text-[8px] text-white/90 drop-shadow">
          ▮▮▮
        </div>
        <div className="absolute bottom-1.5 left-1.5 rounded bg-amber-400/90 px-1 font-mono text-[8px] font-bold text-neutral-900">
          AUTO
        </div>
        <div className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full border border-white/70" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

/** Trang trí sinh nhật nổi (thay cho cá cũ). */
export function FloatingPartyDeco({
  className = "",
  delay = 0,
  emoji = "🎈",
}: {
  className?: string;
  delay?: number;
  /** Emoji trang trí: 🎈 🎁 ✨ 🎀 🍰 … */
  emoji?: string;
}) {
  return (
    <motion.span
      className={`pointer-events-none absolute text-2xl sm:text-3xl ${className}`}
      aria-hidden
      animate={{ y: [0, -10, 0], x: [0, 6, 0], rotate: [-6, 6, -6] }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {emoji}
    </motion.span>
  );
}
