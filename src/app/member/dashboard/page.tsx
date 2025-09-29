import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function MemberDashboard() {
  const supabase = getSupabaseServerClient();
  const [{ data: sessionData }, { data: profile }] = await Promise.all([
    supabase.auth.getSession(),
    supabase.from("profiles").select("full_name, role, avatar_url, birthdate").eq("id", (await supabase.auth.getUser()).data.user?.id ?? "").single(),
  ]);

  const user = sessionData.session?.user;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Welcome {profile?.full_name ?? user?.email}</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <section className="rounded-xl border p-4 md:col-span-2">
          <h2 className="mb-2 font-medium">Announcements</h2>
          {/* Placeholder feed */}
          <p className="text-sm text-gray-500">Announcements will appear here.</p>
        </section>
        <section className="rounded-xl border p-4">
          <h2 className="mb-2 font-medium">Birthdays</h2>
          <p className="text-sm text-gray-500">Birthday celebrants list.</p>
        </section>
      </div>
      <section className="rounded-xl border p-4">
        <h2 className="mb-2 font-medium">Organization Chat</h2>
        <p className="text-sm text-gray-500">Real-time chat UI coming next.</p>
      </section>
    </div>
  );
}


