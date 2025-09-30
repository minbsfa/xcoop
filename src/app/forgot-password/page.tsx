"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

async function resetPassword(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "").trim();
  if (!email) return { ok: false, error: "Email is required" } as const;
  const supabase = await getSupabaseServerClient();
  const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/signin`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) return { ok: false, error: error.message } as const;
  return { ok: true } as const;
}

export default function ForgotPasswordPage() {
  async function action(formData: FormData) {
    "use server";
    return await resetPassword(formData);
  }
  return (
    <div className="min-h-dvh flex items-center justify-center p-6">
      <form action={action} className="w-full max-w-sm space-y-4 rounded-xl border p-6">
        <h1 className="text-2xl font-semibold">Reset password</h1>
        <p className="text-sm text-[color:var(--muted)]">We’ll email you a link to set a new password.</p>
        <input name="email" type="email" required placeholder="you@example.com" className="w-full rounded-md border px-3 py-2" />
        <button type="submit" className="w-full rounded-md text-white px-3 py-2 hover:opacity-90" style={{backgroundColor: "var(--brand)"}}>Send reset link</button>
      </form>
    </div>
  );
}


