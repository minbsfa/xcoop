import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = getSupabaseServerClient();
  const { data: session } = await supabase.auth.getSession();
  const user = session.session?.user;
  if (!user) redirect("/ (auth)/signin".replace(" ", ""));
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, avatar_url, birthdate")
    .eq("id", user.id)
    .single();

  return (
    <div className="py-8 space-y-2">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p>Email: {user.email}</p>
      <p>Full name: {profile?.full_name ?? "—"}</p>
      <p>Role: {profile?.role ?? "member"}</p>
      {profile?.birthdate && <p>Birthday: {new Date(profile.birthdate).toLocaleDateString()}</p>}
    </div>
  );
}


