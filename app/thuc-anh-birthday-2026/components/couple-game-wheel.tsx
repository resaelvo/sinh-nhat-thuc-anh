"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BUCKET_TASKS,
  CAPTION_IDEAS,
  COMPLIMENT_TOPICS,
  DARES_LIGHT,
  DATE_IDEAS,
  DRAW_PROMPTS,
  FIVE_SENSES_PROMPTS,
  FUTURE_SLICES,
  GUESS_SONG_CARDS,
  GRATITUDE_BLITZ_STARTERS,
  HOT_SEAT_THEMES,
  LOVE_LANGUAGE_MINI,
  MEMORY_QUIZ,
  MICRO_LETTER_TOPICS,
  NEVER_HAVE_I_COUPLE,
  NICKNAME_CHALLENGES,
  pickRandom,
  pickWheelIndexExcluding,
  PHOTO_POSE_CHALLENGES,
  PLAYLIST_MOODS,
  QUESTIONS_20_STYLE,
  SCAVENGER_ITEMS,
  sampleSpeedTotRound,
  SNACK_MOODS,
  SOFT_ROAST_TOPICS,
  SONG_DEDICATE_PROMPTS,
  STORY_STARTERS,
  SYNC_WORDS,
  THREE_THINGS_TOPICS,
  THIS_OR_THAT_PAIRS,
  TRUTHS,
  TWO_TRUTHS_THEMES,
  VIRTUAL_HUG_COPY,
  WHEEL_GAMES,
  type WheelGameId,
} from "./couple-game-data";

const SEGMENTS = WHEEL_GAMES.length;
const SEG_DEG = 360 / SEGMENTS;

const WEDGE_COLORS = [
  "#fce7f3",
  "#e0f2fe",
  "#fef3c7",
  "#ede9fe",
  "#d1fae5",
  "#fecdd3",
  "#cffafe",
  "#fde68a",
  "#e9d5ff",
  "#bbf7d0",
  "#fbcfe8",
  "#bae6fd",
  "#fef08a",
  "#ddd6fe",
  "#a7f3d0",
  "#fda4af",
  "#a5f3fc",
  "#fcd34d",
  "#c4b5fd",
  "#86efac",
  "#fdba74",
] as const;

function conicStops(): string {
  return Array.from({ length: SEGMENTS }, (_, i) => {
    const c = WEDGE_COLORS[i % WEDGE_COLORS.length]!;
    return `${c} ${i * SEG_DEG}deg ${(i + 1) * SEG_DEG}deg`;
  }).join(", ");
}

function gameIdAtIndex(i: number): WheelGameId {
  return WHEEL_GAMES[i]!.id;
}

function btnSecondary(
  extra = "",
): string {
  return `rounded-xl border-2 border-rose-200 bg-white px-3 py-2 font-[family-name:var(--font-be-vietnam-pro)] text-sm font-semibold text-rose-700 transition hover:bg-rose-50 ${extra}`;
}

function GamePlayPanel({ gameId }: { gameId: WheelGameId }) {
  const [truth, setTruth] = useState(() => pickRandom(TRUTHS));
  const [dare, setDare] = useState(() => pickRandom(DARES_LIGHT));
  const [tdMode, setTdMode] = useState<"truth" | "dare">("truth");

  const [q20, setQ20] = useState(() => pickRandom(QUESTIONS_20_STYLE));
  const [tot, setTot] = useState(() => pickRandom(THIS_OR_THAT_PAIRS));
  const [drawPrompt, setDrawPrompt] = useState(() => pickRandom(DRAW_PROMPTS));
  const [drawSec, setDrawSec] = useState<number | null>(null);
  const drawRunning = drawSec !== null && drawSec > 0;

  const [playlistMood, setPlaylistMood] = useState(() =>
    pickRandom(PLAYLIST_MOODS),
  );

  const [quiz, setQuiz] = useState(() => pickRandom(MEMORY_QUIZ));
  const [quizReveal, setQuizReveal] = useState(false);

  const [bucket, setBucket] = useState(() => pickRandom(BUCKET_TASKS));
  const [compliment, setCompliment] = useState(() =>
    pickRandom(COMPLIMENT_TOPICS),
  );
  const [scavenger, setScavenger] = useState(() =>
    pickRandom(SCAVENGER_ITEMS),
  );

  const [syncPhase, setSyncPhase] = useState<"idle" | "count" | "word">(
    "idle",
  );
  const [syncCount, setSyncCount] = useState(3);
  const [syncWord, setSyncWord] = useState(() => pickRandom(SYNC_WORDS));

  const [neverLine, setNeverLine] = useState(() =>
    pickRandom(NEVER_HAVE_I_COUPLE),
  );
  const [microTopic, setMicroTopic] = useState(() =>
    pickRandom(MICRO_LETTER_TOPICS),
  );
  const [songCard, setSongCard] = useState(() => pickRandom(GUESS_SONG_CARDS));
  const [songReveal, setSongReveal] = useState(false);
  const [photoPose, setPhotoPose] = useState(() =>
    pickRandom(PHOTO_POSE_CHALLENGES),
  );
  const [gratitudeStart, setGratitudeStart] = useState(() =>
    pickRandom(GRATITUDE_BLITZ_STARTERS),
  );
  const [gratSec, setGratSec] = useState<number | null>(null);
  const gratRunning = gratSec !== null && gratSec > 0;

  const [dateIdea, setDateIdea] = useState(() => pickRandom(DATE_IDEAS));
  const [nickChallenge, setNickChallenge] = useState(() =>
    pickRandom(NICKNAME_CHALLENGES),
  );
  const [twoTruthTheme, setTwoTruthTheme] = useState(() =>
    pickRandom(TWO_TRUTHS_THEMES),
  );
  const [snack, setSnack] = useState(() => pickRandom(SNACK_MOODS));

  const [hotSeat, setHotSeat] = useState(() => pickRandom(HOT_SEAT_THEMES));
  const [loveMini, setLoveMini] = useState(() => pickRandom(LOVE_LANGUAGE_MINI));
  const [loveReveal, setLoveReveal] = useState(false);
  const [captionIdea, setCaptionIdea] = useState(() =>
    pickRandom(CAPTION_IDEAS),
  );
  const [speedPairs, setSpeedPairs] = useState(() => sampleSpeedTotRound());
  const [speedIdx, setSpeedIdx] = useState(0);
  const [speedDone, setSpeedDone] = useState(false);
  const [futureSlice, setFutureSlice] = useState(() =>
    pickRandom(FUTURE_SLICES),
  );
  const [softRoast, setSoftRoast] = useState(() =>
    pickRandom(SOFT_ROAST_TOPICS),
  );
  const [songDedicate, setSongDedicate] = useState(() =>
    pickRandom(SONG_DEDICATE_PROMPTS),
  );
  const [hugLine, setHugLine] = useState(() => pickRandom(VIRTUAL_HUG_COPY));
  const [hugPhase, setHugPhase] = useState<"idle" | "count" | "done">("idle");
  const [hugCount, setHugCount] = useState(5);
  const [storyStart, setStoryStart] = useState(() =>
    pickRandom(STORY_STARTERS),
  );
  const [threeTopic, setThreeTopic] = useState(() =>
    pickRandom(THREE_THINGS_TOPICS),
  );

  useEffect(() => {
    if (!drawRunning) return;
    const id = setInterval(() => {
      setDrawSec((prev) => {
        if (prev === null || prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [drawRunning]);

  useEffect(() => {
    if (!gratRunning) return;
    const id = setInterval(() => {
      setGratSec((prev) => {
        if (prev === null || prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [gratRunning]);

  useEffect(() => {
    if (syncPhase !== "count") return;
    if (syncCount <= 0) {
      setSyncPhase("word");
      return;
    }
    const t = setTimeout(() => setSyncCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [syncPhase, syncCount]);

  useEffect(() => {
    if (hugPhase !== "count") return;
    if (hugCount <= 0) {
      setHugPhase("done");
      return;
    }
    const t = setTimeout(() => setHugCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [hugPhase, hugCount]);

  const startSync = useCallback(() => {
    setSyncWord((w) => pickRandom(SYNC_WORDS, w));
    setSyncCount(3);
    setSyncPhase("count");
  }, []);

  const startHug = useCallback(() => {
    setHugCount(5);
    setHugPhase("count");
  }, []);

  const wrap = "rounded-2xl border border-rose-200/90 bg-white/85 p-4 text-left shadow-sm backdrop-blur-sm";

  switch (gameId) {
    case "truth-dare":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Gợi ý — hai đứa chơi cùng, ai quay cũng được
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className={btnSecondary(
                tdMode === "truth" ? "border-rose-400 bg-rose-50" : "",
              )}
              onClick={() => setTdMode("truth")}
            >
              Thật
            </button>
            <button
              type="button"
              className={btnSecondary(
                tdMode === "dare" ? "border-rose-400 bg-rose-50" : "",
              )}
              onClick={() => setTdMode("dare")}
            >
              Dare nhẹ
            </button>
          </div>
          <p className="mt-4 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {tdMode === "truth" ? truth : dare}
          </p>
          <button
            type="button"
            className={`${btnSecondary("mt-3 w-full")}`}
            onClick={() => {
              if (tdMode === "truth")
                setTruth((t) => pickRandom(TRUTHS, t));
              else setDare((d) => pickRandom(DARES_LIGHT, d));
            }}
          >
            Lấy câu khác
          </button>
        </div>
      );

    case "twenty-questions":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Kiểu 20 câu hỏi — gửi cho nhau hoặc hỏi khi gọi
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-base font-semibold text-slate-900">
            {q20}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() => setQ20((q) => pickRandom(QUESTIONS_20_STYLE, q))}
          >
            Câu tiếp theo
          </button>
        </div>
      );

    case "this-or-that":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Hai đứa cùng chọn — không tranh luận sến, chỉ cười
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-rose-50 px-4 py-3 text-center font-[family-name:var(--font-nunito)] text-sm font-extrabold text-rose-900">
              A: {tot[0]}
            </div>
            <div className="rounded-xl bg-sky-50 px-4 py-3 text-center font-[family-name:var(--font-nunito)] text-sm font-extrabold text-sky-900">
              B: {tot[1]}
            </div>
          </div>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setTot((p) => {
                let n = pickRandom(THIS_OR_THAT_PAIRS);
                let g = 0;
                while (
                  g < 20 &&
                  THIS_OR_THAT_PAIRS.length > 1 &&
                  n[0] === p[0] &&
                  n[1] === p[1]
                ) {
                  n = pickRandom(THIS_OR_THAT_PAIRS);
                  g++;
                }
                return n;
              })
            }
          >
            Cặp mới
          </button>
        </div>
      );

    case "draw":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            1 phút — vẽ giấy hoặc app, chụp màn hình gửi nhau
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Đề:{" "}
            <span className="font-semibold text-slate-900">{drawPrompt}</span>
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {drawSec === null ? (
              <button
                type="button"
                className="rounded-xl border-2 border-rose-400 bg-rose-500 px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-extrabold uppercase tracking-wide text-white shadow-[3px_3px_0_rgba(190,24,93,0.35)] hover:bg-rose-600"
                onClick={() => setDrawSec(60)}
              >
                Bắt đầu 60 giây
              </button>
            ) : (
              <p className="font-[family-name:var(--font-nunito)] text-3xl font-extrabold tabular-nums text-rose-600">
                {drawSec === 0 ? "Hết giờ — gửi ảnh!" : `${drawSec}s`}
              </p>
            )}
            <button
              type="button"
              className={btnSecondary("")}
              onClick={() => {
                setDrawSec(null);
                setDrawPrompt((d) => pickRandom(DRAW_PROMPTS, d));
              }}
            >
              Đề mới & reset
            </button>
          </div>
        </div>
      );

    case "playlist":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Playlist theo mood — mở nhạc rồi nhắn cho nhau
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PLAYLIST_MOODS.map((m) => (
              <button
                key={m.mood}
                type="button"
                className={btnSecondary(
                  playlistMood.mood === m.mood
                    ? "border-rose-400 bg-rose-50"
                    : "",
                )}
                onClick={() => setPlaylistMood(m)}
              >
                {m.mood}
              </button>
            ))}
          </div>
          <p className="mt-4 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {playlistMood.tip}
          </p>
        </div>
      );

    case "memory-quiz":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Quiz kỷ niệm — không cần điểm, cần cười và nhớ lại
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm font-semibold text-slate-900">
            {quiz.q}
          </p>
          {!quizReveal ? (
            <button
              type="button"
              className={btnSecondary("mt-3")}
              onClick={() => setQuizReveal(true)}
            >
              Xem gợi ý chơi tiếp
            </button>
          ) : (
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 font-[family-name:var(--font-be-vietnam-pro)] text-sm text-amber-950">
              {quiz.reveal}
            </p>
          )}
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() => {
              setQuiz((q) => pickRandom(MEMORY_QUIZ, q));
              setQuizReveal(false);
            }}
          >
            Câu khác
          </button>
        </div>
      );

    case "bucket":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Một việc nhỏ — bàn với nhau để chốt lịch nếu muốn
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {bucket}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() => setBucket((b) => pickRandom(BUCKET_TASKS, b))}
          >
            Rút việc khác
          </button>
        </div>
      );

    case "compliment":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Chủ đề khen — nhắn hoặc nói thật khi gặp
          </p>
          <p className="mt-2 font-[family-name:var(--font-nunito)] text-lg font-extrabold text-rose-700">
            {compliment.topic}
          </p>
          <ul className="mt-2 list-inside list-disc font-[family-name:var(--font-be-vietnam-pro)] text-sm text-slate-700">
            {compliment.ideas.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setCompliment((c) => pickRandom(COMPLIMENT_TOPICS, c))
            }
          >
            Chủ đề khác
          </button>
        </div>
      );

    case "scavenger":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Tìm trong nhà — gọi video hoặc chụp ảnh gửi
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {scavenger}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setScavenger((s) => pickRandom(SCAVENGER_ITEMS, s))
            }
          >
            Nhiệm vụ khác
          </button>
        </div>
      );

    case "sync":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Bật video call — đếm cùng lúc, rồi cùng nói một từ
          </p>
          {syncPhase === "idle" && (
            <button
              type="button"
              className="mt-4 w-full rounded-xl border-2 border-rose-400 bg-rose-500 py-3 font-[family-name:var(--font-nunito)] text-sm font-extrabold uppercase tracking-wide text-white shadow-[3px_3px_0_rgba(190,24,93,0.35)] hover:bg-rose-600"
              onClick={startSync}
            >
              Bắt đầu 3 · 2 · 1
            </button>
          )}
          {syncPhase === "count" && syncCount > 0 && (
            <p className="mt-6 text-center font-[family-name:var(--font-nunito)] text-5xl font-extrabold tabular-nums text-rose-600">
              {syncCount}
            </p>
          )}
          {syncPhase === "word" && (
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600">Cùng nói (hoặc hét nhỏ):</p>
              <p className="mt-2 font-[family-name:var(--font-nunito)] text-3xl font-extrabold uppercase tracking-wide text-slate-900">
                “{syncWord}”
              </p>
              <button
                type="button"
                className={btnSecondary("mt-4 w-full")}
                onClick={() => {
                  setSyncPhase("idle");
                  setSyncCount(3);
                  setSyncWord((w) => pickRandom(SYNC_WORDS, w));
                }}
              >
                Chơi lại (từ mới)
              </button>
            </div>
          )}
        </div>
      );

    case "never-ever":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Chưa bao giờ… (phiên bản đôi)
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {neverLine}{" "}
            <span className="text-slate-500">
              — Hai đứa trả lời “rồi / chưa”, không cãi nhau.
            </span>
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setNeverLine((n) => pickRandom(NEVER_HAVE_I_COUPLE, n))
            }
          >
            Câu khác
          </button>
        </div>
      );

    case "micro-letter":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            ~30 giây — voice hoặc tin nhắn
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm font-semibold text-slate-900">
            {microTopic}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setMicroTopic((m) => pickRandom(MICRO_LETTER_TOPICS, m))
            }
          >
            Chủ đề khác
          </button>
        </div>
      );

    case "guess-song":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Gợi ý bằng chữ — đoán rồi hát thử / gửi link
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {songCard.hint}
          </p>
          {!songReveal ? (
            <button
              type="button"
              className={btnSecondary("mt-3")}
              onClick={() => setSongReveal(true)}
            >
              Xem gợi ý đáp án / cách chơi tiếp
            </button>
          ) : (
            <p className="mt-3 rounded-lg bg-violet-50 px-3 py-2 font-[family-name:var(--font-be-vietnam-pro)] text-sm text-violet-950">
              {songCard.answer}
            </p>
          )}
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() => {
              setSongCard((s) => pickRandom(GUESS_SONG_CARDS, s));
              setSongReveal(false);
            }}
          >
            Thẻ gợi ý khác
          </button>
        </div>
      );

    case "photo-pose":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Chụp hoặc ghép ảnh — không cần đẹp, cần vui
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {photoPose}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setPhotoPose((p) => pickRandom(PHOTO_POSE_CHALLENGES, p))
            }
          >
            Thử thách khác
          </button>
        </div>
      );

    case "gratitude-blitz":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            60 giây cảm ơn — đếm ngược
          </p>
          <p className="mt-2 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-700">
            {gratitudeStart}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {gratSec === null ? (
              <button
                type="button"
                className="rounded-xl border-2 border-rose-400 bg-rose-500 px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-extrabold uppercase tracking-wide text-white shadow-[3px_3px_0_rgba(190,24,93,0.35)] hover:bg-rose-600"
                onClick={() => setGratSec(60)}
              >
                Bắt đầu 60 giây
              </button>
            ) : (
              <p className="font-[family-name:var(--font-nunito)] text-3xl font-extrabold tabular-nums text-rose-600">
                {gratSec === 0 ? "Hết giờ — ôm (hoặc sticker)!" : `${gratSec}s`}
              </p>
            )}
            <button
              type="button"
              className={btnSecondary("")}
              onClick={() => {
                setGratSec(null);
                setGratitudeStart((g) =>
                  pickRandom(GRATITUDE_BLITZ_STARTERS, g),
                );
              }}
            >
              Luật khác & reset
            </button>
          </div>
        </div>
      );

    case "date-idea":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Gợi ý date — chỉnh theo hai đứa
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {dateIdea}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() => setDateIdea((d) => pickRandom(DATE_IDEAS, d))}
          >
            Ý khác
          </button>
        </div>
      );

    case "nickname-round":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Biệt danh — nói hoặc nhắn
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {nickChallenge}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setNickChallenge((n) => pickRandom(NICKNAME_CHALLENGES, n))
            }
          >
            Thử thách khác
          </button>
        </div>
      );

    case "two-truths-lie":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Mỗi người 3 câu — 2 thật 1 dối
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm font-semibold text-slate-900">
            {twoTruthTheme}
          </p>
          <p className="mt-2 font-[family-name:var(--font-be-vietnam-pro)] text-xs text-slate-600">
            Người kia đoán số thứ mấy là dối — đổi lượt.
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setTwoTruthTheme((t) => pickRandom(TWO_TRUTHS_THEMES, t))
            }
          >
            Chủ đề khác
          </button>
        </div>
      );

    case "snack-mood":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Mood ăn — rủ nhau gọi món hoặc ăn cùng lúc (online cũng được)
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SNACK_MOODS.map((m) => (
              <button
                key={m.mood}
                type="button"
                className={btnSecondary(
                  snack.mood === m.mood ? "border-rose-400 bg-rose-50" : "",
                )}
                onClick={() => setSnack(m)}
              >
                {m.mood}
              </button>
            ))}
          </div>
          <p className="mt-4 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {snack.idea}
          </p>
        </div>
      );

    case "five-senses":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Lần lượt 5 giác quan — mỗi người nói / nhắn 1 câu ngắn
          </p>
          <ul className="mt-3 space-y-2 font-[family-name:var(--font-be-vietnam-pro)] text-sm text-slate-800">
            {FIVE_SENSES_PROMPTS.map((line) => (
              <li
                key={line}
                className="rounded-lg border border-rose-100 bg-rose-50/50 px-3 py-2"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      );

    case "hot-seat":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Ghế nóng — tối đa 3 câu hỏi, trả lời thật
          </p>
          <p className="mt-2 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {hotSeat}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() => setHotSeat((h) => pickRandom(HOT_SEAT_THEMES, h))}
          >
            Chủ đề khác
          </button>
        </div>
      );

    case "love-language-mini":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Love language — trò chuyện, không thi
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm font-semibold text-slate-900">
            {loveMini.q}
          </p>
          {!loveReveal ? (
            <button
              type="button"
              className={btnSecondary("mt-3")}
              onClick={() => setLoveReveal(true)}
            >
              Gợi ý cách nói tiếp
            </button>
          ) : (
            <p className="mt-3 rounded-lg bg-sky-50 px-3 py-2 font-[family-name:var(--font-be-vietnam-pro)] text-sm text-sky-950">
              {loveMini.hint}
            </p>
          )}
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() => {
              setLoveMini((l) => pickRandom(LOVE_LANGUAGE_MINI, l));
              setLoveReveal(false);
            }}
          >
            Câu khác
          </button>
        </div>
      );

    case "caption-game":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Tưởng tượng ảnh — đặt caption
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {captionIdea}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setCaptionIdea((c) => pickRandom(CAPTION_IDEAS, c))
            }
          >
            Ý ảnh khác
          </button>
        </div>
      );

    case "speed-tot": {
      const pair = speedPairs[speedIdx];
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            This or that siêu tốc — mỗi lượt ≤ 5 giây
          </p>
          {!speedDone && pair ? (
            <>
              <p className="mt-2 text-center font-[family-name:var(--font-nunito)] text-sm font-extrabold text-rose-600">
                Lượt {speedIdx + 1} / 5
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl bg-rose-50 px-3 py-2.5 text-center font-[family-name:var(--font-nunito)] text-xs font-extrabold text-rose-900 sm:text-sm">
                  A: {pair[0]}
                </div>
                <div className="rounded-xl bg-sky-50 px-3 py-2.5 text-center font-[family-name:var(--font-nunito)] text-xs font-extrabold text-sky-900 sm:text-sm">
                  B: {pair[1]}
                </div>
              </div>
              <button
                type="button"
                className={btnSecondary("mt-3 w-full")}
                onClick={() => {
                  if (speedIdx < 4) setSpeedIdx((s) => s + 1);
                  else setSpeedDone(true);
                }}
              >
                {speedIdx < 4 ? "Lượt tiếp" : "Xong 5 lượt"}
              </button>
            </>
          ) : (
            <>
              <p className="mt-3 text-center font-[family-name:var(--font-be-vietnam-pro)] text-sm text-slate-700">
                Xong 5 lượt — vibe thắng là được cười.
              </p>
              <button
                type="button"
                className={btnSecondary("mt-3 w-full")}
                onClick={() => {
                  setSpeedPairs(sampleSpeedTotRound());
                  setSpeedIdx(0);
                  setSpeedDone(false);
                }}
              >
                Vòng mới
              </button>
            </>
          )}
        </div>
      );
    }

    case "future-slice":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Một “lát” tương lai — nói cho nhau nghe
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {futureSlice}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setFutureSlice((f) => pickRandom(FUTURE_SLICES, f))
            }
          >
            Lát khác
          </button>
        </div>
      );

    case "soft-roast":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Roast nhẹ — luật an toàn trong câu
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {softRoast}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setSoftRoast((r) => pickRandom(SOFT_ROAST_TOPICS, r))
            }
          >
            Prompt khác
          </button>
        </div>
      );

    case "song-dedicate":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Tặng bài + một lý do
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm leading-relaxed text-slate-800">
            {songDedicate}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setSongDedicate((s) => pickRandom(SONG_DEDICATE_PROMPTS, s))
            }
          >
            Gợi ý khác
          </button>
        </div>
      );

    case "virtual-hug":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Ôm ảo / ôm thật
          </p>
          <p className="mt-2 font-[family-name:var(--font-be-vietnam-pro)] text-sm text-slate-700">
            {hugLine}
          </p>
          {hugPhase === "idle" && (
            <button
              type="button"
              className="mt-4 w-full rounded-xl border-2 border-rose-400 bg-rose-500 py-3 font-[family-name:var(--font-nunito)] text-sm font-extrabold uppercase tracking-wide text-white shadow-[3px_3px_0_rgba(190,24,93,0.35)] hover:bg-rose-600"
              onClick={startHug}
            >
              Đếm 5 · 4 · 3 · 2 · 1
            </button>
          )}
          {hugPhase === "count" && hugCount > 0 && (
            <p className="mt-6 text-center font-[family-name:var(--font-nunito)] text-5xl font-extrabold tabular-nums text-rose-600">
              {hugCount}
            </p>
          )}
          {hugPhase === "done" && (
            <div className="mt-4 text-center">
              <p className="font-[family-name:var(--font-nunito)] text-2xl font-extrabold text-rose-600">
                Ôm! 🤗
              </p>
              <button
                type="button"
                className={btnSecondary("mt-4 w-full")}
                onClick={() => {
                  setHugPhase("idle");
                  setHugCount(5);
                  setHugLine((h) => pickRandom(VIRTUAL_HUG_COPY, h));
                }}
              >
                Cách ôm khác
              </button>
            </div>
          )}
        </div>
      );

    case "story-chain":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Người A mở đầu — người B nối một câu — đổi vai
          </p>
          <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50/80 px-3 py-2 font-[family-name:var(--font-be-vietnam-pro)] text-sm font-semibold text-amber-950">
            {storyStart}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setStoryStart((s) => pickRandom(STORY_STARTERS, s))
            }
          >
            Mở đầu khác
          </button>
        </div>
      );

    case "three-things":
      return (
        <div className={wrap}>
          <p className="font-[family-name:var(--font-be-vietnam-pro)] text-xs font-semibold uppercase tracking-wide text-rose-500">
            Đủ 3 ý — luân phiên hoặc cùng nói
          </p>
          <p className="mt-3 font-[family-name:var(--font-be-vietnam-pro)] text-sm font-semibold text-slate-900">
            {threeTopic}
          </p>
          <button
            type="button"
            className={btnSecondary("mt-3 w-full")}
            onClick={() =>
              setThreeTopic((t) => pickRandom(THREE_THINGS_TOPICS, t))
            }
          >
            Chủ đề khác
          </button>
        </div>
      );

    default:
      return null;
  }
}

export function CoupleGameWheel() {
  const rotation = useMotionValue(0);
  const rotationRef = useRef(0);
  const lastSpinIndexRef = useRef<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [playSession, setPlaySession] = useState(0);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setWinnerIndex(null);

    const i = pickWheelIndexExcluding(SEGMENTS, lastSpinIndexRef.current);
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    const targetRem = (360 - (i + 0.5) * SEG_DEG + 720) % 360;
    const currentRem = ((rotationRef.current % 360) + 360) % 360;
    let delta = targetRem - currentRem;
    if (delta <= 0) delta += 360;
    const nextTotal = rotationRef.current + fullSpins * 360 + delta;

    animate(rotation, nextTotal, {
      duration: 4.2,
      ease: [0.12, 0.8, 0.12, 1],
    }).then(() => {
      rotationRef.current = nextTotal;
      lastSpinIndexRef.current = i;
      setWinnerIndex(i);
      setPlaySession((s) => s + 1);
      setSpinning(false);
    });
  }, [rotation, spinning]);

  const activeId =
    winnerIndex !== null ? gameIdAtIndex(winnerIndex) : null;

  return (
    <div className="mt-8">
      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center overflow-visible px-0 sm:px-1">
        <div
          className="relative z-30 -mb-1 h-0 w-0 border-x-[18px] border-x-transparent border-t-[26px] border-t-rose-600 drop-shadow-[0_3px_6px_rgba(190,24,93,0.35)]"
          aria-hidden
        />

        <div className="relative aspect-square w-full max-w-[min(100%,400px)] sm:max-w-[min(100%,440px)] lg:max-w-[min(480px,94vw)]">
          <div
            className="pointer-events-none absolute -inset-3 rounded-full bg-gradient-to-br from-rose-200/50 via-amber-100/35 to-sky-200/45 blur-lg"
            aria-hidden
          />
          <motion.div
            className="absolute inset-0 box-border rounded-full border-[4px] border-white/90 shadow-[0_8px_0_rgba(225,29,72,0.12),0_20px_40px_rgba(225,29,72,0.18)] ring-2 ring-rose-300/40"
            style={{
              rotate: rotation,
              background: `conic-gradient(from 0deg, ${conicStops()})`,
            }}
          >
            {WHEEL_GAMES.map((item, i) => {
              const mid = i * SEG_DEG + SEG_DEG / 2;
              return (
                <div
                  key={item.id}
                  className="pointer-events-none absolute inset-0"
                  style={{ transform: `rotate(${mid}deg)` }}
                >
                  <span
                    className="absolute left-1/2 top-[5%] max-w-[5rem] -translate-x-1/2 whitespace-pre-line text-center font-[family-name:var(--font-nunito)] text-[0.5rem] font-extrabold leading-[1.06] tracking-tight text-slate-900/90 sm:top-[5.5%] sm:max-w-[5.6rem] sm:text-[0.56rem]"
                    style={{ transform: "rotate(90deg)" }}
                  >
                    {item.short}
                  </span>
                </div>
              );
            })}
          </motion.div>

          <div
            className="pointer-events-none absolute inset-[30%] rounded-full border-2 border-white/85 bg-gradient-to-br from-white/55 via-rose-50/35 to-sky-50/25 shadow-[inset_0_2px_12px_rgba(255,255,255,0.85)] backdrop-blur-[4px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-[30%] rounded-full ring-1 ring-rose-200/50"
            aria-hidden
          />
        </div>

        <button
          type="button"
          onClick={spin}
          disabled={spinning}
          className="mt-6 rounded-full border-2 border-rose-400 bg-white px-6 py-2.5 font-[family-name:var(--font-nunito)] text-sm font-extrabold uppercase tracking-wide text-rose-600 shadow-[4px_4px_0_rgba(225,29,72,0.2)] transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {spinning ? "Đang quay…" : "Quay"}
        </button>

        <div
          className="mt-4 w-full rounded-2xl border border-rose-200/80 bg-white/70 px-4 py-3 text-center backdrop-blur-sm"
          aria-live="polite"
        >
          {winnerIndex !== null ? (
            <>
              <p className="whitespace-pre-line font-[family-name:var(--font-nunito)] text-base font-extrabold text-slate-900">
                {WHEEL_GAMES[winnerIndex].short}
              </p>
              <p className="mt-1 font-[family-name:var(--font-be-vietnam-pro)] text-xs text-slate-600">
                {WHEEL_GAMES[winnerIndex].hint}
              </p>
            </>
          ) : (
            <p className="font-[family-name:var(--font-be-vietnam-pro)] text-sm text-slate-500">
              Bấm Quay — trò tương ứng sẽ mở bên dưới.
            </p>
          )}
        </div>

        {activeId && (
          <div className="mt-6 w-full">
            <GamePlayPanel key={playSession} gameId={activeId} />
          </div>
        )}
      </div>
    </div>
  );
}
