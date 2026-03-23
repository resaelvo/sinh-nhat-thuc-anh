"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  googleDriveVideoPreviewUrl,
  INTRO_GOOGLE_DRIVE_VIDEO_SHARE_URL,
  INTRO_GOOGLE_DRIVE_VIDEO_SHARE_URL_2,
} from "../constants";
import { DoodleStar, hl } from "../doodles";
import { PhotoFrame } from "../photo-elements";


export function ScrapbookIntroSection() {
  const drivePreviews = [
    INTRO_GOOGLE_DRIVE_VIDEO_SHARE_URL,
    INTRO_GOOGLE_DRIVE_VIDEO_SHARE_URL_2,
  ]
    .map((url) => googleDriveVideoPreviewUrl(url))
    .filter((src): src is string => src !== null);

  return (
    <motion.section
      custom={0}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="relative rounded-3xl border-2 border-slate-800/10 bg-white/92 p-6 shadow-[8px_8px_0_rgba(15,23,42,0.07)] backdrop-blur-sm"
    >
      <DoodleStar className="absolute -right-2 -top-2 h-8 w-8" />
      <h2 className="font-[family-name:var(--font-nunito)] text-xl font-bold leading-snug sm:text-2xl">
        ĐƯỢC ĐI CHỤP PHOTOBOOTH VỚI MY {hl("FAVORITE", "bg-red-200")} PERSON…
      </h2>
      {drivePreviews.length > 0 ? (
        <div className="mt-4 flex w-full flex-col gap-4">
          {drivePreviews.map((src, i) => (
            <div
              key={`${i}-${src}`}
              className="w-full overflow-hidden rounded-2xl border-2 border-slate-800/10 bg-slate-900/5 shadow-inner"
            >
              <div className="relative aspect-video w-full">
                <iframe
                  title={
                    i === 0
                      ? "Video chúc mừng sinh nhật"
                      : `Video chúc mừng sinh nhật (${i + 1})`
                  }
                  src={src}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mt-5 flex flex-wrap items-end gap-4">
        <PhotoFrame
          src='/images/thuc-anh-birthday/2026/thuc-anh-7.jpg'
          alt="Placeholder portrait Thục Anh"
          className="h-auto w-full object-cover"
        />
        <div className="flex gap-3">
          <PhotoFrame
            src='/images/thuc-anh-birthday/2026/thuc-anh-2.jpeg'
            alt="Placeholder heart frame 1"
            variant="circle"
            className="h-28 w-28"
          />
          <PhotoFrame
            src='/images/thuc-anh-birthday/2026/thuc-anh-9.jpg'
            alt="Placeholder heart frame 2"
            variant="circle"
            className="h-28 w-28"
          />
          <PhotoFrame
            src='/images/thuc-anh-birthday/2026/thuc-anh-10.jpg'
            alt="Placeholder heart frame 1"
            variant="circle"
            className="h-28 w-28"
          />
          <PhotoFrame
            src='/images/thuc-anh-birthday/2026/thuc-anh-11.jpg'
            alt="Placeholder heart frame 1"
            variant="circle"
            className="h-28 w-28"
          />
        </div>
      </div>
    </motion.section>
  );
}
