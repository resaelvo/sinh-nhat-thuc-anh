"use client";

import { motion } from "framer-motion";
import { fadeUp, PLACEHOLDER_IMG } from "../constants";
import { hl } from "../doodles";
import { PhotoFrame } from "../photo-elements";

export function ScrapbookReasonsSection() {
  return (
    <motion.section
      custom={4}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="relative rounded-3xl border-2 border-slate-800/10 bg-white/92 p-6 shadow-[8px_8px_0_rgba(15,23,42,0.07)]"
    >
      <h3 className="font-[family-name:var(--font-nunito)] text-lg font-bold">
        {hl("REASON WHY?!", "bg-yellow-200")} I {hl("LOVE", "bg-red-200")} YOU!!
      </h3>
      <ul className="mt-3 list-inside list-disc space-y-2 font-[family-name:var(--font-be-vietnam-pro)] text-sm text-slate-700">
        <li>
          Lorem ipsum — {hl("reason one", "bg-sky-200")} (placeholder)
        </li>
        <li>Dolor sit amet — {hl("reason two", "bg-green-200")}</li>
        <li>Consectetur — globe 🌍 & home 🏠 vibes in design reference</li>
        <li>Adipiscing elit — swap for real memories</li>
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        <PhotoFrame
          src={PLACEHOLDER_IMG("thuc-r1")}
          alt="Reason photo 1"
          className="h-20 w-28"
          tilt={false}
        />
        <PhotoFrame
          src={PLACEHOLDER_IMG("thuc-r2")}
          alt="Reason photo 2"
          className="h-20 w-28"
          tilt={false}
        />
      </div>
    </motion.section>
  );
}
