import InteractiveCard from "@/components/InteractiveCard";

export default function AboutPage() {
  return (
    <div className="py-8 space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold" style={{color: "var(--brand)"}}>About the Cooperative</h1>
        <p className="text-[color:var(--muted)]">We are a member-driven association dedicated to transparent governance, timely updates, and accessible services for all members and officers.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        <InteractiveCard title="Mission" excerpt="Empower members through programs and stewardship." details={"We empower members through community programs, continuous learning, and responsible financial stewardship that uplifts families and local enterprises."} />
        <InteractiveCard title="Vision" excerpt="A thriving, inclusive cooperative." details={"A thriving, inclusive cooperative recognized for integrity, service excellence, and sustainable growth across Surigao and beyond."} />
        <InteractiveCard title="Values" excerpt="Transparency, inclusivity, compassion." details={"Transparency in decisions, inclusivity across backgrounds, accountability for resources, and compassion in service."} />
      </section>
    </div>
  );
}


