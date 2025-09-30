"use client";

export default function ThemeToggle() {
  function setTheme(value: "one" | "two") {
    document.documentElement.setAttribute("data-theme", value);
  }
  return (
    <div className="flex items-center gap-2 text-xs text-slate-600">
      <button onClick={() => setTheme("one")} className="rounded border px-2 py-1">Palette 1</button>
      <button onClick={() => setTheme("two")} className="rounded border px-2 py-1">Palette 2</button>
    </div>
  );
}


