"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function createAnnouncement(formData: FormData) {
  "use server";
  const supabase = getSupabaseServerClient();
  const { data: session } = await supabase.auth.getSession();
  const uid = session.session?.user?.id;
  if (!uid) return { ok: false, error: "Not signed in" } as const;
  const title = String(formData.get("title") || "").trim();
  const body = String(formData.get("body") || "").trim();
  if (!title || !body) return { ok: false, error: "Title and body required" } as const;
  const { error } = await supabase.from("announcements").insert({ title, body, created_by: uid });
  if (error) return { ok: false, error: error.message } as const;
  redirect("/admin/announcements");
}

async function deleteAnnouncement(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) return { ok: false, error: error.message } as const;
  redirect("/admin/announcements");
}

export default async function AdminAnnouncementsPage() {
  const supabase = getSupabaseServerClient();
  const { data: session } = await supabase.auth.getSession();
  const uid = session.session?.user?.id;
  if (!uid) redirect("/ (auth)/signin".replace(" ", ""));
  const { data: me } = await supabase.from("profiles").select("role").eq("id", uid).single();
  if (me?.role !== "admin") redirect("/member/dashboard");

  const { data: items } = await supabase
    .from("announcements")
    .select("id, title, body, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Announcements</h1>
      <form action={createAnnouncement} className="space-y-3 rounded-xl border p-4">
        <input name="title" placeholder="Title" className="w-full rounded-md border px-3 py-2" />
        <textarea name="body" placeholder="Body" className="w-full rounded-md border px-3 py-2 min-h-24" />
        <button className="rounded-md bg-black px-3 py-2 text-white" type="submit">Publish</button>
      </form>
      <ul className="space-y-3">
        {(items ?? []).map((a) => (
          <li key={a.id} className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium">{a.title}</h2>
                <p className="text-sm text-gray-600 whitespace-pre-line">{a.body}</p>
              </div>
              <form action={deleteAnnouncement}>
                <input type="hidden" name="id" value={String(a.id)} />
                <button className="rounded-md border px-3 py-2 text-sm" type="submit">Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


