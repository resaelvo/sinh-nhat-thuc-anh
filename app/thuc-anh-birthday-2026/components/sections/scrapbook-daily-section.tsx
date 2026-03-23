"use client";

import { motion } from "framer-motion";
import { fadeUp } from "../constants";
import { CoupleGameWheel } from "../couple-game-wheel";

export function ScrapbookDailySection() {
  return (
    <motion.section
      custom={6}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="relative overflow-visible rounded-3xl border-2 border-rose-200/90 bg-rose-50/95 p-8 shadow-[8px_8px_0_rgba(225,29,72,0.12)] backdrop-blur-sm lg:col-span-2"
    >
      <p className="text-sm font-semibold uppercase tracking-widest text-rose-500">
        Chơi cùng nhau
      </p>
      <p className="mt-2 max-w-2xl font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-600">
        Quay bánh xe để chọn một mini-game: truth/dare nhẹ, vẽ nhanh, quiz kỷ
        niệm, playlist… Làm cùng nhau cho vui, không chấm điểm. Hai lần quay
        liên tiếp sẽ{" "}
        <span className="font-semibold text-slate-800">không trùng</span> ô với
        lần trước.
      </p>

      <CoupleGameWheel />
    </motion.section>
  );
}
