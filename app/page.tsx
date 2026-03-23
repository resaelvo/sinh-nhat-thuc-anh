import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center justify-center bg-zinc-100 px-6 py-16">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200/80 bg-white p-10 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
          Portfolio
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Thục Anh Birthday
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Trang scrapbook sinh nhật — mở để xem.
        </p>
        <Link
          href="/thuc-anh-birthday-2026"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
        >
          Vào trang sinh nhật 2026
        </Link>
      </main>
    </div>
  );
}
