import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function Navbar() {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const isAuthed = !!data.session;
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold text-slate-900">xcoop</Link>
        <nav className="hidden gap-6 md:flex">
          <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900">About</Link>
          <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900">Contact</Link>
          <Link href={isAuthed ? "/member/dashboard" : "/signin"} className="text-sm text-slate-600 hover:text-slate-900">{isAuthed ? "Dashboard" : "Sign in"}</Link>
        </nav>
        <Link href={isAuthed ? "/profile" : "/signin"} className="md:hidden text-sm text-slate-700">Profile</Link>
      </div>
    </header>
  );
}


