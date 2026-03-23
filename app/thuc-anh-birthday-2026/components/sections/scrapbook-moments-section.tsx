"use client";

import { motion } from "framer-motion";
import { fadeUp, PLACEHOLDER_IMG } from "../constants";
import { hl } from "../doodles";
import { PhotoFrame } from "../photo-elements";

export function ScrapbookMomentsSection() {
  return (
    <motion.section
      custom={5}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="relative rounded-3xl border-2 border-slate-800/10 bg-white/92 p-6 shadow-[8px_8px_0_rgba(15,23,42,0.07)] lg:col-span-2"
    >
      <h3 className="font-[family-name:var(--font-nunito)] text-xl font-bold text-sky-600">
        Our moment — with Thục Anh
      </h3>
      <p className="mt-2 max-w-xl font-[family-name:var(--font-be-vietnam-pro)] italic text-slate-600">
        “With you, even the {hl("simplest days", "bg-amber-100")} feel like an adventure.”
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {["m1", "m2", "m3", "m4"].map((s) => (
          <PhotoFrame
            key={s}
            src={PLACEHOLDER_IMG(`thuc-${s}`)}
            alt={`Moment ${s}`}
            className="aspect-square w-full"
          />
        ))}
      </div>
    </motion.section>
  );
}
