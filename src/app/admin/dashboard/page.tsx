import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const supabase = getSupabaseServerClient();
  const { data: session } = await supabase.auth.getSession();
  const user = session.session?.user;
  if (!user) redirect("/ (auth)/signin".replace(" ", ""));

  const { data: me } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (me?.role !== "admin") redirect("/member/dashboard");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Console</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <section className="rounded-xl border p-4">
          <h2 className="mb-2 font-medium">Payments overview</h2>
          <p className="text-sm text-gray-500">Reports and management coming next.</p>
        </section>
        <section className="rounded-xl border p-4">
          <h2 className="mb-2 font-medium">Members & Officers</h2>
          <p className="text-sm text-gray-500">CRUD and role management coming next.</p>
        </section>
        <section className="rounded-xl border p-4">
          <h2 className="mb-2 font-medium">Announcements</h2>
          <p className="text-sm text-gray-500">Create/edit posts for the public site.</p>
        </section>
      </div>
    </div>
  );
}


