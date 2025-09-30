export default function AboutPage() {
  return (
    <div className="py-8 space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold" style={{color: "var(--brand)"}}>About the Cooperative</h1>
        <p className="text-[color:var(--muted)]">We are a member-driven association dedicated to transparent governance, timely updates, and accessible services for all members and officers.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="card p-4">
          <h3 className="font-medium">Mission</h3>
          <p className="text-sm text-[color:var(--muted)]">Empower members through community, education, and financial stewardship.</p>
        </div>
        <div className="card p-4">
          <h3 className="font-medium">Vision</h3>
          <p className="text-sm text-[color:var(--muted)]">A thriving cooperative recognized for integrity and service.</p>
        </div>
        <div className="card p-4">
          <h3 className="font-medium">Values</h3>
          <p className="text-sm text-[color:var(--muted)]">Transparency, inclusivity, and responsible growth.</p>
        </div>
      </section>
    </div>
  );
}


