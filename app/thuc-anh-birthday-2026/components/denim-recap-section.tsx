"use client";

import { motion } from "framer-motion";

export function DenimRecapCollage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-12 overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] ring-2 ring-slate-900/10"
      aria-label="Kỷ niệm — scrapbook denim"
    >
      <img src='/images/thuc-anh-birthday/2026/thuc-anh-6.jpg' alt='thuc-anh-6' className="w-full h-full object-cover" />
    </motion.section>
  );
}
