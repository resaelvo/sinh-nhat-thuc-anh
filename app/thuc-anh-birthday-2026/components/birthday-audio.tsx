"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BIRTHDAY_THEME_MP3,
  BIRTHDAY_THEME_OGG,
  BLOW_FRAMES_REQUIRED,
  BLOW_RMS_THRESHOLD,
  MIC_WARMUP_MS,
} from "./constants";

const BirthdayAudioContext = createContext<React.RefObject<HTMLAudioElement | null> | null>(
  null,
);

export function useBirthdayAudioRef() {
  const ref = useContext(BirthdayAudioContext);
  if (!ref) {
    throw new Error("useBirthdayAudioRef must be used inside BirthdayAudioRoot");
  }
  return ref;
}

function CandleFlame({
  index,
  extinguished,
}: {
  index: number;
  extinguished: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="pointer-events-none h-10 w-6 origin-bottom rounded-[50%_50%_40%_40%] bg-gradient-to-t from-amber-500 via-yellow-300 to-yellow-100 shadow-[0_0_12px_rgba(251,191,36,0.9)] sm:h-12 sm:w-7"
        animate={
          extinguished
            ? { opacity: 0, scaleY: 0.15, scaleX: 0.4, y: 6 }
            : {
                opacity: [0.92, 1, 0.88, 1],
                scaleY: [1, 1.12, 0.96, 1],
                scaleX: [1, 0.94, 1.04, 1],
              }
        }
        transition={
          extinguished
            ? { duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }
            : { duration: 0.55 + index * 0.04, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <div className="mt-0.5 h-10 w-2 rounded-sm bg-gradient-to-b from-amber-50 to-amber-200 shadow-inner ring-1 ring-amber-400/50 sm:h-12 sm:w-2.5" />
    </div>
  );
}

function SplashBirthdayCake({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 240 150"
        className="w-[min(100%,17rem)] drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:w-72"
        aria-hidden
      >
        <defs>
          <linearGradient id="cake-low" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
          <linearGradient id="cake-high" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fce7f3" />
            <stop offset="100%" stopColor="#f9a8d4" />
          </linearGradient>
          <linearGradient id="frost-drip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#fdf2f8" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <ellipse cx="120" cy="138" rx="108" ry="12" fill="#94a3b8" />
        <ellipse cx="120" cy="134" rx="92" ry="7" fill="#cbd5e1" />
        <path
          d="M 32 132 L 38 82 Q 120 72 202 82 L 208 132 Q 120 124 32 132 Z"
          fill="url(#cake-low)"
          stroke="#be123c"
          strokeWidth="1.2"
        />
        <path
          d="M 58 86 L 62 48 Q 120 38 178 48 L 182 86 Q 120 80 58 86 Z"
          fill="url(#cake-high)"
          stroke="#db2777"
          strokeWidth="1"
        />
        <path
          d="M 62 50 Q 75 58 88 52 Q 100 60 112 52 Q 125 58 138 50 Q 150 56 162 50 Q 175 56 178 50 L 176 58 Q 120 68 64 58 Z"
          fill="url(#frost-drip)"
        />
        <circle cx="88" cy="62" r="5" fill="#dc2626" />
        <circle cx="120" cy="58" r="5.5" fill="#dc2626" />
        <circle cx="152" cy="62" r="5" fill="#dc2626" />
        <path
          d="M 88 57 l1 -4 M 120 53 l0 -5 M 152 57 l-1 -4"
          stroke="#166534"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <ellipse cx="120" cy="44" rx="14" ry="8" fill="#f472b6" opacity="0.9" />
        <ellipse cx="108" cy="44" rx="8" ry="10" fill="#ec4899" />
        <ellipse cx="132" cy="44" rx="8" ry="10" fill="#ec4899" />
      </svg>
    </div>
  );
}

function BirthdayCandleSplash({ onComplete }: { onComplete: () => void }) {
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const [micError, setMicError] = useState<string | null>(null);
  const [micListening, setMicListening] = useState(false);
  const [extinguished, setExtinguished] = useState(false);
  const [meter, setMeter] = useState(0);

  const streamRef = useRef<MediaStream | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number>(0);
  const blowStreakRef = useRef(0);
  const micStartedAtRef = useRef(0);
  const doneRef = useRef(false);

  const stopMic = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    void ctxRef.current?.close();
    ctxRef.current = null;
    analyserRef.current = null;
  }, []);

  useEffect(() => () => stopMic(), [stopMic]);

  const startMic = useCallback(async () => {
    setMicError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicError("Trình duyệt không hỗ trợ micro.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      streamRef.current = stream;
      const ctx = new AudioContext();
      await ctx.resume();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.25;
      src.connect(analyser);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
      micStartedAtRef.current = performance.now();
      blowStreakRef.current = 0;
      setMicListening(true);
    } catch {
      setMicError("Cần quyền micro để thổi nến. Hãy cho phép và thử lại.");
    }
  }, []);

  useEffect(() => {
    if (!micListening || extinguished) return;
    const analyser = analyserRef.current;
    if (!analyser) return;

    const buf = new Float32Array(analyser.fftSize);

    const tick = () => {
      if (doneRef.current) return;
      analyser.getFloatTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
      const rms = Math.sqrt(sum / buf.length);
      setMeter(Math.min(1, rms * 16));

      const warmed =
        performance.now() - micStartedAtRef.current > MIC_WARMUP_MS;

      if (warmed && rms > BLOW_RMS_THRESHOLD) {
        blowStreakRef.current += 1;
        if (blowStreakRef.current >= BLOW_FRAMES_REQUIRED) {
          doneRef.current = true;
          cancelAnimationFrame(rafRef.current);
          setMicListening(false);
          setExtinguished(true);
          stopMic();
          window.setTimeout(() => onCompleteRef.current(), 950);
          return;
        }
      } else {
        blowStreakRef.current = Math.max(0, blowStreakRef.current - 0.65);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [micListening, extinguished, stopMic]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-b from-slate-950/92 via-rose-950/82 to-slate-950/95 px-5 py-10 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="splash-candle-title"
    >
      <p
        id="splash-candle-title"
        className="font-[family-name:var(--font-nunito)] text-center text-2xl font-extrabold text-rose-100 sm:text-3xl"
      >
        Thổi nến nhé 🎂
      </p>
      <p className="mt-2 max-w-md text-center font-[family-name:var(--font-be-vietnam-pro)] text-sm text-rose-200/90">
        Bật micro, rồi <strong className="text-white">thổi nhẹ gần mic</strong> (không cần quá mạnh)
      </p>

      <div className="relative mt-8 flex flex-col items-center gap-1">
        <div className="relative z-999 flex items-center justify-center gap-2 sm:gap-3 bottom-[-3.6rem]">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-[100%] bg-amber-400/30 blur-2xl"
            aria-hidden
          />
          {[0, 1, 2].map((i) => (
            <CandleFlame key={i} index={i} extinguished={extinguished} />
          ))}
        </div>
        <SplashBirthdayCake className="z-9999" />
      </div>

      <div className="mt-10 w-full max-w-xs">
        {!micListening ? (
          <button
            type="button"
            onClick={startMic}
            className="w-full rounded-2xl border-2 border-rose-400 bg-rose-500 px-6 py-3.5 font-[family-name:var(--font-be-vietnam-pro)] text-base font-semibold text-white shadow-lg transition hover:bg-rose-600"
          >
            Cho phép micro &amp; bắt đầu
          </button>
        ) : (
          <div className="space-y-2 text-center">
            <p className="font-[family-name:var(--font-be-vietnam-pro)] text-sm text-amber-100">
              Đang nghe mic… <span className="text-white">Thổi mạnh vào mic</span>
            </p>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-slate-800"
              aria-hidden
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-200"
                animate={{ width: `${Math.round(meter * 100)}%` }}
                transition={{ type: "tween", duration: 0.08 }}
              />
            </div>
          </div>
        )}
        {micError ? (
          <p className="mt-3 text-center font-[family-name:var(--font-be-vietnam-pro)] text-xs text-red-300">
            {micError}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}

export function BirthdayAudioRoot({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [entered, setEntered] = useState(false);

  const finishSplash = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      el.muted = false;
      void el.play().catch(() => {});
    }
    setEntered(true);
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    void el.play().catch(() => {});
  }, []);

  return (
    <BirthdayAudioContext.Provider value={audioRef}>
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        loop
        muted={!entered}
        className="hidden"
      >
        {BIRTHDAY_THEME_OGG ? (
          <source src={BIRTHDAY_THEME_OGG} type="audio/ogg" />
        ) : null}
        <source src={BIRTHDAY_THEME_MP3} type="audio/mpeg" />
      </audio>

      {!entered ? <BirthdayCandleSplash onComplete={finishSplash} /> : null}

      {children}
    </BirthdayAudioContext.Provider>
  );
}
