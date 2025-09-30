export default function AboutPage() {
  return (
    <div className="py-8 space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold" style={{color: "var(--brand)"}}>About the Cooperative</h1>
        <p className="text-[color:var(--muted)]">We are a member-driven association dedicated to transparent governance, timely updates, and accessible services for all members and officers.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <InteractiveCard title="Mission" details="We empower members through community programs, continuous learning, and responsible financial stewardship that uplifts families and local enterprises." />
        <InteractiveCard title="Vision" details="A thriving, inclusive cooperative recognized for integrity, service excellence, and sustainable growth across Surigao and beyond." />
        <InteractiveCard title="Values" details="Transparency in decisions, inclusivity across backgrounds, accountability for resources, and compassion in service." />
      </section>
    </div>
  );
}

function InteractiveCard({ title, details }: { title: string; details: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border" style={{borderColor: "var(--border)"}}>
      <div className="p-4 transition-transform duration-300 group-hover:scale-105">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-[color:var(--muted)]">Hover to learn more…</p>
      </div>
      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 p-4">
        <h3 className="font-medium" style={{color: "var(--brand)"}}>{title}</h3>
        <p className="text-sm text-[color:var(--muted)]">{details}</p>
      </div>
    </div>
  );
}


