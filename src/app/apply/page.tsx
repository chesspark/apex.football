"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Send } from "lucide-react";

export default function ApplyAmbassadorPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
    social: "",
    message: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Ambassador application — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCountry: ${form.country}\nCity: ${form.city}\nSocial / links: ${form.social}\n\nPitch:\n${form.message}`
    );
    window.location.href = `mailto:ambassadors@apex-football.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <div className="pt-28 pb-20 max-w-xl mx-auto px-4 sm:px-6">
        <Link
          href="/#become-ambassador"
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--accent)] mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Link>

        <h1 className="text-3xl font-black uppercase text-[var(--foreground)]">Devenir ambassadeur</h1>
        <p className="text-sm text-[var(--muted)] mt-2">
          Candidature en ligne — World 64 LLC / Apex Football. Remplis le formulaire : ton client mail s&apos;ouvrira
          avec le message prérempli (tu peux changer l&apos;adresse destinataire côté prod).
        </p>

        {sent ? (
          <p className="mt-8 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border-clr)] text-[var(--foreground)]">
            Si ton client mail ne s&apos;est pas ouvert, copie-colle ta candidature et envoie-la à l&apos;adresse
            indiquée par Apex.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-4">
            {(["name", "email", "country", "city", "social"] as const).map((field) => (
              <div key={field}>
                <label className="block text-xs font-bold uppercase text-[var(--muted)] mb-1">{field}</label>
                <input
                  required={field === "name" || field === "email"}
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  className="w-full rounded-lg border border-[var(--border-clr)] bg-[var(--surface)] px-3 py-2 text-[var(--foreground)]"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-bold uppercase text-[var(--muted)] mb-1">Ton pitch</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full rounded-lg border border-[var(--border-clr)] bg-[var(--surface)] px-3 py-2 text-[var(--foreground)]"
                placeholder="Pourquoi toi, ton réseau, ta ville, ton angle football…"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-fg)] font-bold uppercase text-sm"
            >
              <Send className="w-4 h-4" />
              Envoyer la candidature
            </button>
          </form>
        )}
      </div>
      <Footer />
    </main>
  );
}
