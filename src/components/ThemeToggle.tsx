"use client";

export default function ThemeToggle() {
  function setTheme(value: "one" | "two") {
    document.documentElement.setAttribute("data-theme", value);
  }
  return (
    <div className="flex items-center gap-2 text-xs text-slate-600">
      <button onClick={() => setTheme("one" as any)} className="rounded border px-2 py-1">1</button>
      <button onClick={() => setTheme("two" as any)} className="rounded border px-2 py-1">2</button>
      <button onClick={() => setTheme("three" as any)} className="rounded border px-2 py-1">3</button>
      <button onClick={() => setTheme("four" as any)} className="rounded border px-2 py-1">4</button>
      <button onClick={() => setTheme("five" as any)} className="rounded border px-2 py-1">5</button>
    </div>
  );
}


