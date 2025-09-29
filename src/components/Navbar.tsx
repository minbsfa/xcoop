import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function Navbar() {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const isAuthed = !!data.session;
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b1220]/60 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold text-white">xcoop</Link>
        <nav className="hidden gap-6 md:flex">
          <Link href="/about" className="text-sm text-blue-200 hover:text-white">About</Link>
          <Link href="/contact" className="text-sm text-blue-200 hover:text-white">Contact</Link>
          <Link href={isAuthed ? "/member/dashboard" : "/signin"} className="text-sm text-blue-200 hover:text-white">{isAuthed ? "Dashboard" : "Sign in"}</Link>
        </nav>
        <Link href={isAuthed ? "/profile" : "/signin"} className="md:hidden text-sm text-blue-200">Profile</Link>
      </div>
    </header>
  );
}


