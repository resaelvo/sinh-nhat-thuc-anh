"use client";

import { useCallback, useEffect, useState } from "react";
import { PLACEHOLDER_IMG } from "./constants";
import { useBirthdayAudioRef } from "./birthday-audio";
import { PhotoFrame } from "./photo-elements";

function LyricsScroller() {
  const lines = [
    "[Verse] …",
    "Lorem ipsum dolor sit amet — {placeholder track}",
    "Consectetur adipiscing elit sed do eiusmod",
    "Tempor incididunt ut labore et dolore magna",
    "Ut enim ad minim veniam quis nostrud",
    "…",
    "{highlight} Sempurna — Andra & The Backbone (replace)",
    "Duis aute irure dolor in reprehenderit",
    "Voluptate velit esse cillum dolore eu fugiat",
    "Excepteur sint occaecat cupidatat non proident",
  ];
  return (
    <div className="relative h-48 overflow-hidden rounded-xl bg-slate-900/92 px-3 py-2 text-xs text-emerald-100">
      <div className="music-lyrics-scroll space-y-2 font-mono leading-relaxed">
        {[...lines, ...lines].map((line, i) => (
          <p key={i} className={i % 7 === 6 ? "text-amber-300" : ""}>
            {line}
          </p>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-slate-900 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-900 to-transparent" />
    </div>
  );
}

function formatT(s: number) {
  if (!Number.isFinite(s)) return "3:36";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/**
 * Thanh nhạc góc phải — `fixed` (layout trang có `overflow-hidden` nên CSS `sticky` không bám viewport).
 * Liquid glass trong `globals.css` → `.music-liquid-glass`.
 */
export function BirthdayMusicStickyBar() {
  const audioRef = useBirthdayAudioRef();
  const [playing, setPlaying] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onTime = () => setCurrentTime(el.currentTime);
    const onMeta = () => setDuration(el.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    const onError = () => setLoadError(true);

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    el.addEventListener("error", onError);

    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("error", onError);
    };
  }, [audioRef]);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el || loadError) return;
    if (playing) {
      el.pause();
    } else {
      void el.play().catch(() => {});
    }
  }, [playing, loadError, audioRef]);

  const stop = useCallback(() => {
    const el = audioRef.current;
    if (!el || loadError) return;
    el.pause();
    el.currentTime = 0;
    setCurrentTime(0);
  }, [loadError, audioRef]);

  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div
      className="music-liquid-glass group fixed right-3 top-3 z-[70] w-[min(10.25rem,calc(100vw-2rem))] rounded-2xl px-3 py-2 shadow-md outline-none transition-shadow duration-200 ease-out hover:shadow-lg focus-visible:ring-2 focus-visible:ring-violet-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-within:shadow-lg sm:right-4 sm:top-4 motion-reduce:transition-none"
      role="region"
      aria-label="Nhạc nền sinh nhật — phát sau khi thổi nến ở màn hình đầu"
      title="Hover hoặc Tab vào để phát / tạm dừng / dừng"
      tabIndex={0}
    >
      <div className="relative w-full min-h-[2.25rem] group-hover:min-h-[9.25rem] group-focus-within:min-h-[9.25rem]">
        {/* Thu gọn: chỉ thời gian — fade, không đổi display (tránh reflow) */}
        <p className="absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 text-center font-mono text-[11px] font-semibold tabular-nums text-violet-950/90 transition-opacity duration-150 group-hover:pointer-events-none group-hover:opacity-0 group-hover:select-none group-focus-within:pointer-events-none group-focus-within:opacity-0 motion-reduce:transition-none">
          {loadError ? "—:—" : formatT(currentTime)}
        </p>

        {/* Mở rộng: cùng khung, opacity — min-height nhảy một bước (không transition) để ít jank hơn scale+padding */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] pt-0.5 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 motion-reduce:transition-none">
        <p className="mb-2 text-center font-mono text-xs font-medium tabular-nums text-violet-950/90">
          <span>{formatT(currentTime)}</span>
          <span className="mx-0.5 text-violet-500/75">/</span>
          <span>3:36</span>
        </p>
        <div
          className="mb-2 h-1 overflow-hidden rounded-full bg-violet-200/70"
          aria-hidden
        >
          <div
            className="h-full rounded-full bg-violet-600/90 transition-[width] duration-150 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={toggle}
            disabled={loadError}
            aria-label={playing ? "Tạm dừng" : "Phát"}
            className="flex h-9 min-w-[2.25rem] items-center justify-center rounded-full bg-violet-600 px-3 text-sm font-semibold text-white shadow-md transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {playing ? "❚❚" : "▶"}
          </button>
          <button
            type="button"
            onClick={stop}
            disabled={loadError}
            aria-label="Dừng và tua về đầu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-400/45 bg-white/35 text-xs font-bold text-violet-800 shadow-sm transition hover:bg-white/55 disabled:cursor-not-allowed disabled:opacity-45"
          >
            ⏹
          </button>
        </div>
        {loadError ? (
          <p className="mt-2 text-center text-[9px] leading-tight text-red-600">
            Chưa có file nhạc
          </p>
        ) : null}
        </div>
      </div>
    </div>
  );
}

export function MusicBirthdayPanel() {
  const audioRef = useBirthdayAudioRef();
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onError = () => setLoadError(true);
    el.addEventListener("error", onError);
    return () => el.removeEventListener("error", onError);
  }, [audioRef]);

  return (
    <>
      <h3 className="font-[family-name:var(--font-nunito)] text-lg font-bold text-violet-800">
        Bài hát &amp; lời
      </h3>
      <p className="mt-1 text-sm text-violet-600/90">
        Điều khiển phát / tạm dừng / dừng ở{" "}
        <span className="font-semibold text-violet-800">góc phải màn hình</span>
        .
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <LyricsScroller />
        <div className="flex flex-col items-center justify-center gap-3">
          <PhotoFrame
            src={PLACEHOLDER_IMG("thuc-album")}
            alt="Ảnh bìa album (placeholder)"
            variant="circle"
            className="h-36 w-36"
            tilt={false}
          />
          {loadError ? (
            <p className="max-w-[220px] text-center text-xs text-red-600">
              Chưa có file nhạc. Thêm{" "}
              <code className="rounded bg-violet-100 px-1 font-mono text-[10px]">
                sinh-nhat-2026.mp3
              </code>
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}
