import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function MemberDashboard() {
  const supabase = await getSupabaseServerClient();
  const [{ data: sessionData }, { data: profile }] = await Promise.all([
    supabase.auth.getSession(),
    supabase.from("profiles").select("full_name, role, avatar_url, birthdate").eq("id", (await supabase.auth.getUser()).data.user?.id ?? "").single(),
  ]);

  const user = sessionData.session?.user;

  const mockAnnouncements = [
    { id: 1, title: "Loan program update", body: "New terms available for small loans.", created_at: "2025-10-06" },
  ];
  const mockBirthdays = [
    { name: "Jennie", date: "2025-10-10", avatar: "https://i.pravatar.cc/80?img=1" },
    { name: "Dolly", date: "2025-10-15", avatar: "https://i.pravatar.cc/80?img=2" },
  ];
  const mockMessages = [
    { author: "Ma'am Jenn", text: "Good night everyone!", side: "left", avatar: "https://i.pravatar.cc/40?img=3" },
    { author: profile?.full_name ?? "You", text: "Good night ma'am!", side: "right", avatar: "https://i.pravatar.cc/40?img=4" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Welcome {profile?.full_name ?? user?.email}</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <section className="rounded-xl border p-4 md:col-span-2">
          <h2 className="mb-2 font-medium">Announcements</h2>
          <ul className="divide-y">
            {mockAnnouncements.map(a => (
              <li key={a.id} className="py-3">
                <p className="text-xs text-gray-500">{new Date(a.created_at).toLocaleDateString()}</p>
                <h3 className="font-medium">{a.title}</h3>
                <p className="text-gray-700 text-sm">{a.body}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border p-4">
          <h2 className="mb-2 font-medium">Birthdays</h2>
          <ul className="space-y-3">
            {mockBirthdays.map(b => (
              <li key={b.name} className="flex items-center gap-3">
                <img src={b.avatar} alt="" className="h-8 w-8 rounded-full" />
                <div>
                  <p className="text-sm font-medium">{b.name}</p>
                  <p className="text-xs text-gray-500">{new Date(b.date).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <section className="rounded-xl border p-4">
        <h2 className="mb-2 font-medium">Organization Chat</h2>
        <div className="space-y-2">
          {mockMessages.map((m, i) => (
            <div key={i} className={`flex ${m.side === "right" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${m.side === "right" ? "bg-indigo-600 text-white" : "bg-gray-100"}`}>
                <p className="text-[10px] opacity-70 mb-0.5">{m.author}</p>
                <p>{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


