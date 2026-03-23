"use client";

import { motion } from "framer-motion";
import { fadeUp } from "../constants";
import { MusicBirthdayPanel } from "../music-panel";

export function ScrapbookMusicSection() {
  return (
    <motion.section
      custom={3}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="relative overflow-hidden rounded-3xl border-2 border-slate-800/10 bg-gradient-to-br from-violet-50/95 to-white/95 p-6 shadow-[8px_8px_0_rgba(15,23,42,0.07)] backdrop-blur-sm"
    >
      <MusicBirthdayPanel />
    </motion.section>
  );
}
