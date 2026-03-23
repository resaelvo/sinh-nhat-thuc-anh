"use client";

/** Một khóm cánh hoa anh đào đơn giản (SVG) */
function SakuraFloret({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <g transform="translate(16,16)">
        <ellipse cx="0" cy="-9" rx="3.4" ry="6.4" fill="#fbcfe8" transform="rotate(0)" />
        <ellipse
          cx="0"
          cy="-9"
          rx="3.4"
          ry="6.4"
          fill="#f9a8d4"
          opacity="0.97"
          transform="rotate(72)"
        />
        <ellipse
          cx="0"
          cy="-9"
          rx="3.4"
          ry="6.4"
          fill="#fce7f3"
          transform="rotate(144)"
        />
        <ellipse
          cx="0"
          cy="-9"
          rx="3.4"
          ry="6.4"
          fill="#fda4af"
          opacity="0.94"
          transform="rotate(216)"
        />
        <ellipse
          cx="0"
          cy="-9"
          rx="3.4"
          ry="6.4"
          fill="#fbcfe8"
          opacity="0.96"
          transform="rotate(288)"
        />
        <circle cx="0" cy="0" r="2.2" fill="#fff1f2" opacity="1" />
      </g>
    </svg>
  );
}

type SakuraSpec = {
  leftPct: number;
  durSec: number;
  delaySec: number;
  variant: "a" | "b";
  size: string;
  /** chỉ hiện từ sm trở lên — giữ mobile cực thưa */
  smOnly?: boolean;
};

/** Mật độ vừa — thêm cánh so với bản cũ, delay tách nhau */
const SAKURA_SPECS: SakuraSpec[] = [
  { leftPct: 7, durSec: 22, delaySec: 0, variant: "a", size: "h-4 w-4 sm:h-5 sm:w-5" },
  { leftPct: 24, durSec: 26, delaySec: 4.5, variant: "b", size: "h-3 w-3 sm:h-4 sm:w-4" },
  { leftPct: 41, durSec: 24, delaySec: 9, variant: "a", size: "h-3.5 w-3.5" },
  { leftPct: 58, durSec: 28, delaySec: 2, variant: "b", size: "h-4 w-4" },
  { leftPct: 73, durSec: 25, delaySec: 11, variant: "a", size: "h-3 w-3 sm:h-3.5 sm:w-3.5" },
  { leftPct: 88, durSec: 30, delaySec: 6, variant: "b", size: "h-3.5 w-3.5 sm:h-4 sm:w-4" },
  { leftPct: 16, durSec: 27, delaySec: 14, variant: "b", size: "h-3 w-3", smOnly: true },
  { leftPct: 33, durSec: 23, delaySec: 7.5, variant: "a", size: "h-4 w-4", smOnly: true },
  { leftPct: 66, durSec: 29, delaySec: 16, variant: "a", size: "h-3.5 w-3.5", smOnly: true },
  { leftPct: 50, durSec: 31, delaySec: 19, variant: "b", size: "h-3 w-3 sm:h-4 sm:w-4" },
  { leftPct: 3, durSec: 24, delaySec: 3, variant: "b", size: "h-3 w-3" },
  { leftPct: 13, durSec: 29, delaySec: 8, variant: "a", size: "h-3.5 w-3.5" },
  { leftPct: 29, durSec: 21, delaySec: 12, variant: "b", size: "h-4 w-4" },
  { leftPct: 46, durSec: 27, delaySec: 1.5, variant: "a", size: "h-3 w-3 sm:h-4 sm:w-4" },
  { leftPct: 62, durSec: 32, delaySec: 17, variant: "b", size: "h-3.5 w-3.5" },
  { leftPct: 79, durSec: 23, delaySec: 5, variant: "a", size: "h-4 w-4" },
  { leftPct: 94, durSec: 28, delaySec: 10, variant: "b", size: "h-3 w-3" },
  { leftPct: 20, durSec: 25, delaySec: 20, variant: "a", size: "h-3 w-3", smOnly: true },
  { leftPct: 38, durSec: 30, delaySec: 6.5, variant: "b", size: "h-3.5 w-3.5", smOnly: true },
  { leftPct: 55, durSec: 22, delaySec: 13, variant: "a", size: "h-4 w-4", smOnly: true },
  { leftPct: 71, durSec: 26, delaySec: 18, variant: "b", size: "h-3 w-3", smOnly: true },
];

/**
 * Lớp trên nội dung: hoa anh đào rơi thưa (CSS, pointer-events: none).
 * z-[20] — dưới thanh nhạc z-[70], không chặn click.
 */
export function SakuraFallLayer() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[20] overflow-hidden"
      aria-hidden
    >
      {SAKURA_SPECS.map((s, i) => (
        <div
          key={i}
          className={`sakura-petal absolute top-0 ${s.smOnly ? "hidden sm:block" : ""} ${
            s.variant === "a" ? "sakura-petal--a" : "sakura-petal--b"
          }`}
          style={{
            left: `${s.leftPct}%`,
            animationDuration: `${s.durSec}s`,
            animationDelay: `${s.delaySec}s`,
          }}
        >
          <SakuraFloret
            className={`${s.size} opacity-[0.96] drop-shadow-[0_1px_3px_rgba(219,39,119,0.45)]`}
          />
        </div>
      ))}
    </div>
  );
}
