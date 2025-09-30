"use server";

import Image from "next/image";
import { getSupabaseServerClient } from "@/lib/supabase/server";

async function submitContact(formData: FormData) {
  "use server";
  const supabase = await getSupabaseServerClient();
  const full_name = String(formData.get("full_name") || "").trim();
  const mobile = String(formData.get("mobile") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const recipient = String(formData.get("recipient") || "").trim();
  if (!full_name || !message || !recipient) return { ok: false, error: "Missing required fields" } as const;
  const { error } = await supabase.from("contacts").insert({ full_name, mobile, email, address, message, recipient });
  if (error) return { ok: false, error: error.message } as const;
  return { ok: true } as const;
}

export default async function ContactPage() {
  async function action(formData: FormData) {
    "use server";
    return await submitContact(formData);
  }

  return (
    <div className="py-8 grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold" style={{color: "var(--brand)"}}>Get in touch</h1>
        <p className="text-sm text-[color:var(--muted)]">We’d love to hear from you. Send your message to the appropriate officer.</p>
        <form action={action} className="card p-4 space-y-3">
          <input name="full_name" placeholder="Full name" className="w-full rounded-md border px-3 py-2" required />
          <div className="grid gap-3 md:grid-cols-2">
            <input name="mobile" placeholder="Mobile number" className="w-full rounded-md border px-3 py-2" />
            <input name="email" type="email" placeholder="Email address" className="w-full rounded-md border px-3 py-2" />
          </div>
          <input name="address" placeholder="Address" className="w-full rounded-md border px-3 py-2" />
          <select name="recipient" className="w-full rounded-md border px-3 py-2" required>
            <option value="">Send to…</option>
            <option>President</option>
            <option>Secretary</option>
            <option>Treasurer</option>
            <option>Auditor</option>
            <option>Administrator</option>
          </select>
          <textarea name="message" placeholder="Your message" className="w-full rounded-md border px-3 py-2 min-h-32" required />
          <button type="submit" className="rounded-md px-4 py-2 text-white" style={{backgroundColor: "var(--brand)"}}>Send</button>
        </form>
      </div>
      <div className="space-y-3">
        <div className="overflow-hidden rounded-xl border" style={{borderColor: "var(--border)"}}>
          <Image src="/address.JPG" alt="Office address" width={1200} height={900} className="w-full h-64 object-cover" />
        </div>
        <div className="card p-4">
          <h2 className="font-medium">SCNGMAI Office</h2>
          <p className="text-sm text-[color:var(--muted)]">Parrucho Street, Surigao City, Surigao del Norte</p>
        </div>
      </div>
    </div>
  );
}


