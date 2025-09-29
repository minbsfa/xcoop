import Gallery from "@/components/Gallery";

export default function Home() {
  const announcements = [
    { id: 1, title: "General Assembly", body: "Join us on Oct 30, 2025 at 2PM.", created_at: "2025-10-01" },
    { id: 2, title: "System Upgrade", body: "New member dashboard rolling out next week.", created_at: "2025-10-05" },
  ];
  return (
    <div className="py-10 space-y-10">
      <section className="rounded-2xl bg-[color:var(--brand)] text-white p-10">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">Your Cooperative, Modern and Clear</h1>
        <p className="mt-3 max-w-2xl text-white/90">A clean, responsive interface across phones, tablets and desktops. Real-time updates and transparent records.</p>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" style={{color: "var(--brand)"}}>Moments from our community</h2>
        <Gallery />
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        <div className="card p-6 border-[color:var(--accent-yellow)]/30">
          <h3 className="mb-2 text-lg font-medium">Member-first</h3>
          <p className="text-sm text-[color:var(--muted-2)]">Simple access to announcements and personal records after sign-in.</p>
        </div>
        <div className="card p-6 border-[color:var(--accent-yellow)]/30">
          <h3 className="mb-2 text-lg font-medium">Community</h3>
          <p className="text-sm text-[color:var(--muted-2)]">Stay updated with organization news and activities.</p>
        </div>
        <div className="card p-6 border-[color:var(--accent-yellow)]/30">
          <h3 className="mb-2 text-lg font-medium">Privacy</h3>
          <p className="text-sm text-[color:var(--muted-2)]">No browser storage; data securely served from our backend.</p>
        </div>
      </section>
      <section className="rounded-xl border border-[color:var(--border)] p-6 bg-[color:var(--accent-cream)]/30">
        <h2 className="mb-4 text-xl font-semibold">Latest Announcements</h2>
        <ul className="divide-y">
          {announcements.map(a => (
            <li key={a.id} className="py-3">
              <p className="text-sm text-gray-500">{new Date(a.created_at).toLocaleDateString()}</p>
              <h3 className="font-medium">{a.title}</h3>
              <p className="text-gray-700">{a.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
