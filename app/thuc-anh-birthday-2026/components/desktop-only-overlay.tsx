"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MQ = "(max-width: 1023px)";

export function DesktopOnlyOverlay() {
  const [blocked, setBlocked] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(MQ);
    const apply = () => setBlocked(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (blocked !== true) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [blocked]);

  if (blocked !== true) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex touch-none items-center justify-center overflow-y-auto overscroll-contain bg-gradient-to-br from-[#1a0a14] via-[#2d1220] to-[#1e1030] px-5 py-10"
      style={{ touchAction: "none" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="desktop-only-title"
      aria-describedby="desktop-only-desc"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(251, 113, 133, 0.35) 0%, transparent 45%),
            radial-gradient(circle at 80% 70%, rgba(167, 139, 250, 0.3) 0%, transparent 42%),
            radial-gradient(circle at 50% 90%, rgba(253, 186, 116, 0.15) 0%, transparent 35%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
      >
        <span className="absolute left-[8%] top-[12%] text-3xl">🌸</span>
        <span className="absolute right-[10%] top-[20%] text-2xl">🌸</span>
        <span className="absolute bottom-[18%] left-[14%] text-xl">💗</span>
        <span className="absolute right-[18%] bottom-[24%] text-2xl">🌸</span>
        <span className="absolute left-1/2 top-[8%] -translate-x-1/2 text-4xl opacity-80">
          ✨
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative w-full max-w-md rounded-[1.75rem] border-2 border-rose-300/50 bg-gradient-to-b from-white/95 via-[#fff8fc] to-[#fdf2f8] p-8 text-center shadow-[0_24px_60px_rgba(190,24,93,0.25),0_0_0_1px_rgba(255,255,255,0.8)_inset]"
      >
        <div
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-rose-300/70 bg-rose-50/80 text-4xl shadow-sm"
          aria-hidden
        >
          💻
        </div>
        <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-[0.25em] text-rose-500">
          Thục Anh · 24.03
        </p>
        <h2
          id="desktop-only-title"
          className="mt-3 font-[family-name:var(--font-nunito)] text-2xl font-extrabold leading-tight text-rose-950 sm:text-[1.65rem]"
        >
          Mở trên máy tính
          <span className="mt-1 block text-lg font-bold text-violet-700">
            để xem trọn vẹn nhé
          </span>
        </h2>
        <p
          id="desktop-only-desc"
          className="mt-4 text-sm leading-relaxed text-slate-600"
        >
          Trang sinh nhật này được trang trí cho{" "}
          <span className="font-semibold text-rose-700">màn hình lớn</span> - em iu 
          dùng <strong>PC hoặc laptop</strong> xem nhaa!! Anh iu em nhất trên đời.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-lg">
          <span aria-hidden>🌸</span>
          <span aria-hidden>💕</span>
          <span aria-hidden>🎀</span>
          <span aria-hidden>🌸</span>
        </div>
        <p className="mt-5 text-xs text-slate-500">
          Cảm ơn em đã ghé thăm - mở máy tính lên đeee!
        </p>
      </motion.div>
    </div>
  );
}
