"use server";

import Link from "next/link";
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

async function signInWithPassword(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  if (!email || !password) return { ok: false, error: "Email and password are required" } as const;
  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message } as const;
  return { ok: true } as const;
}

export default async function SignInPage() {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  if (data.session) redirect("/member/dashboard");

  async function action(formData: FormData) {
    "use server";
    const res = await signInWithPassword(formData);
    if (res.ok) redirect("/member/dashboard");
    return res;
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-6">
      <form action={action} className="w-full max-w-sm space-y-4 rounded-xl border p-6">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-md border px-3 py-2"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Your password"
          className="w-full rounded-md border px-3 py-2"
        />
        <button className="w-full rounded-md text-white px-3 py-2 hover:opacity-90" style={{backgroundColor: "var(--brand)"}} type="submit">
          Sign in
        </button>
        <div className="text-center">
          <Link className="text-sm underline" href="/forgot-password">Forgot your password?</Link>
        </div>
      </form>
    </div>
  );
}



