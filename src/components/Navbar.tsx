import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import ThemeToggle from "./ThemeToggle";

export default async function Navbar() {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const isAuthed = !!data.session;
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color:var(--border)] bg-[color:var(--accent-cream)]/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold text-[color:var(--brand)]">xcoop</Link>
        <nav className="hidden gap-6 md:flex items-center">
          <Link href="/" className="text-sm text-slate-700 hover:text-[color:var(--brand)]">Home</Link>
          <Link href="/about" className="text-sm text-slate-700 hover:text-[color:var(--brand)]">About</Link>
          <Link href="/contact" className="text-sm text-slate-700 hover:text-[color:var(--brand)]">Contact</Link>
          <Link href={isAuthed ? "/member/dashboard" : "/signin"} className="text-sm text-slate-700 hover:text-[color:var(--brand)]">{isAuthed ? "Dashboard" : "Sign in"}</Link>
          <ThemeToggle />
        </nav>
        <Link href={isAuthed ? "/profile" : "/signin"} className="md:hidden text-sm text-slate-700">Profile</Link>
      </div>
    </header>
  );
}


