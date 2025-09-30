"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export default function InteractiveCard({
  title,
  excerpt,
  details,
}: {
  title: string;
  excerpt: string;
  details: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="group relative w-full text-left overflow-hidden rounded-2xl border p-4 transition-transform duration-300 hover:scale-105 focus:scale-105 focus:outline-none"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-[color:var(--muted)]">{excerpt}</p>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/30"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl focus:outline-none"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <Dialog.Title className="mb-2 text-xl font-semibold" style={{ color: "var(--brand)" }}>
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-[color:var(--muted)] whitespace-pre-line">
            {details}
          </Dialog.Description>
          <div className="mt-6 flex justify-end">
            <Dialog.Close className="rounded-md border px-3 py-1.5 text-sm">Close</Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}


