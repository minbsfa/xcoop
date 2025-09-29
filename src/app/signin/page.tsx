"use server";

import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

async function requestMagicLink(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "").trim();
  if (!email) return { ok: false, error: "Email is required" } as const;
  const supabase = await getSupabaseServerClient();
  const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}`;
  const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
  if (error) return { ok: false, error: error.message } as const;
  return { ok: true } as const;
}

export default async function SignInPage() {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  if (data.session) redirect("/member/dashboard");

  async function action(formData: FormData) {
    "use server";
    return await requestMagicLink(formData);
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-6 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10">
      <form action={action} className="w-full max-w-sm space-y-4 rounded-xl border p-6">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-gray-500">We send a one-time secure link to your email.</p>
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-md border px-3 py-2"
        />
        <button className="w-full rounded-md bg-black px-3 py-2 text-white hover:opacity-90" type="submit">
          Send magic link
        </button>
      </form>
    </div>
  );
}



