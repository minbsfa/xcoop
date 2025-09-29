import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function Navbar() {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const isAuthed = !!data.session;
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold">xcoop</Link>
        <nav className="hidden gap-6 md:flex">
          <Link href="/about" className="text-sm text-gray-600 hover:text-black">About</Link>
          <Link href="/contact" className="text-sm text-gray-600 hover:text-black">Contact</Link>
          <Link href={isAuthed ? "/member/dashboard" : "/signin"} className="text-sm text-gray-600 hover:text-black">{isAuthed ? "Dashboard" : "Sign in"}</Link>
        </nav>
        <Link href={isAuthed ? "/profile" : "/signin"} className="md:hidden text-sm">Profile</Link>
      </div>
    </header>
  );
}


