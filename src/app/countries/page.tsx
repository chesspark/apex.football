import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { APEX_ROOT_DOMAIN } from "@/lib/apex-subdomain-host";
import { getAllCountryDirectLinks } from "@/lib/country-subdomain-links";
import { Globe2, Link2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Country links — Apex.Football",
  description:
    "Direct subdomain URL for every country: ISO2 code or English name slug. Works on apex.football, apex.world, or your configured root domain.",
};

export default function CountriesPage() {
  const root = APEX_ROOT_DOMAIN;
  const rows = getAllCountryDirectLinks(root);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="flex items-start gap-3 mb-6">
          <Globe2 className="w-8 h-8 text-[#D4AF37] shrink-0 mt-1" aria-hidden />
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Country access</h1>
            <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
              Every country has at least one working host:{" "}
              <strong className="text-[var(--foreground)]">ISO 3166-1 alpha-2</strong> as the subdomain (
              <code className="text-[#D4AF37]">ba</code>, <code className="text-[#D4AF37]">fr</code>,{" "}
              <code className="text-[#D4AF37]">de</code>…). Optional aliases (e.g.{" "}
              <code className="text-[#D4AF37]">bosna</code> → Bosnia and Herzegovina) are listed in code.
            </p>
            <p className="mt-3 text-xs text-[var(--muted)]">
              Active root domain for this deployment:{" "}
              <strong className="text-[var(--foreground)]">{root}</strong> — set{" "}
              <code className="text-emerald-400/90">NEXT_PUBLIC_APEX_ROOT_DOMAIN</code> for{" "}
              <code className="text-emerald-400/90">apex.world</code> or{" "}
              <code className="text-emerald-400/90">apex.football</code>.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border-clr)] overflow-hidden bg-[var(--surface)]/30">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-[var(--border-clr)] bg-[var(--surface)]/60 text-[10px] uppercase tracking-wider text-[var(--muted)]">
                  <th className="py-3 px-3 font-bold">Country (EN)</th>
                  <th className="py-3 px-3 font-bold">ISO2</th>
                  <th className="py-3 px-3 font-bold">
                    <span className="inline-flex items-center gap-1">
                      <Link2 className="w-3 h-3" aria-hidden />
                      Direct (ISO)
                    </span>
                  </th>
                  <th className="py-3 px-3 font-bold hidden md:table-cell">Name slug</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.iso2} className="border-b border-[var(--border-clr)]/60 hover:bg-[var(--surface)]/40">
                    <td className="py-2.5 px-3 font-medium">{r.nameEn}</td>
                    <td className="py-2.5 px-3 font-mono text-xs text-[var(--muted)]">{r.iso2}</td>
                    <td className="py-2.5 px-3">
                      <a
                        href={r.urlIso}
                        className="text-[#D4AF37] hover:underline break-all font-mono text-xs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {r.urlIso.replace(/^https:\/\//, "")}
                      </a>
                    </td>
                    <td className="py-2.5 px-3 hidden md:table-cell">
                      <a
                        href={r.urlSlug}
                        className="text-[var(--muted)] hover:text-[var(--accent)] break-all font-mono text-xs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {r.urlSlug.replace(/^https:\/\//, "")}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-8 text-xs text-[var(--muted)] leading-relaxed">
          Example: <strong className="text-[var(--foreground)]">Bosnia and Herzegovina</strong> — ISO link{" "}
          <code className="text-[#D4AF37]">ba.{root}</code>; alias <code className="text-[#D4AF37]">bosna.{root}</code>{" "}
          (and <code className="text-[#D4AF37]">bih.{root}</code>) also resolve when DNS wildcard matches{" "}
          <code>*.{root}</code>.
        </p>
      </div>
      <Footer />
    </main>
  );
}
