"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function updateSettings(formData: FormData) {
  "use server";
  const supabase = getSupabaseServerClient();
  const { data: session } = await supabase.auth.getSession();
  const uid = session.session?.user?.id;
  if (!uid) return { ok: false, error: "Not signed in" } as const;
  const annual = Number(formData.get("annual_contribution"));
  if (!Number.isFinite(annual) || annual <= 0) return { ok: false, error: "Invalid amount" } as const;
  const { error } = await supabase
    .from("settings")
    .update({ annual_contribution: annual, updated_by: uid, updated_at: new Date().toISOString() })
    .eq("id", true);
  if (error) return { ok: false, error: error.message } as const;
  redirect("/admin/settings");
}

export default async function SettingsPage() {
  const supabase = getSupabaseServerClient();
  const { data: session } = await supabase.auth.getSession();
  const uid = session.session?.user?.id;
  if (!uid) redirect("/ (auth)/signin".replace(" ", ""));
  const { data: me } = await supabase.from("profiles").select("role").eq("id", uid).single();
  if (me?.role !== "admin") redirect("/member/dashboard");
  const { data: s } = await supabase.from("settings").select("annual_contribution").eq("id", true).single();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <form action={updateSettings} className="max-w-md space-y-3 rounded-xl border p-4">
        <label className="block text-sm text-gray-500">Annual Contribution (PHP)</label>
        <input
          name="annual_contribution"
          type="number"
          step="0.01"
          defaultValue={s?.annual_contribution ?? 840}
          className="w-full rounded-md border px-3 py-2"
        />
        <button className="rounded-md bg-black px-3 py-2 text-white" type="submit">Save</button>
      </form>
    </div>
  );
}


