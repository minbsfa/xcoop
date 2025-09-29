export default function Home() {
  const announcements = [
    { id: 1, title: "General Assembly", body: "Join us on Oct 30, 2025 at 2PM.", created_at: "2025-10-01" },
    { id: 2, title: "System Upgrade", body: "New member dashboard rolling out next week.", created_at: "2025-10-05" },
  ];
  return (
    <div className="py-10 space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white p-10">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">Your Cooperative, Modern and Secure</h1>
        <p className="mt-3 max-w-2xl text-white/90">A next-level, app-like experience across phones, tablets and desktops. Real-time updates, seamless payments, and transparent records.</p>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6">
          <h3 className="mb-2 text-lg font-medium">Annual Contribution</h3>
          <p className="text-sm text-gray-600">Currently set to ₱840.00. Members can view payment status once signed in.</p>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="mb-2 text-lg font-medium">Organization Chat</h3>
          <p className="text-sm text-gray-600">A shared conversation space for members and officers with profile photos.</p>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="mb-2 text-lg font-medium">Reports & Certificates</h3>
          <p className="text-sm text-gray-600">Admins can generate reports and membership certificates on demand.</p>
        </div>
      </section>
      <section className="rounded-xl border p-6">
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
