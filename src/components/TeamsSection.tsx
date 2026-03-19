"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { continents, getCountriesByContinent, type CountryTeams, type TeamInfo } from "@/lib/worldTeams";
import TeamModal from "./TeamModal";

function ShirtIcon({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
      <path
        d="M12 6L8 10L5 8V20L10 22V36H30V22L35 20V8L32 10L28 6H12Z"
        fill={primary}
        stroke={secondary}
        strokeWidth="1.5"
      />
      <path d="M16 6C16 6 18 10 20 10C22 10 24 6 24 6" stroke={secondary} strokeWidth="1" />
      <rect x="17" y="18" width="6" height="8" rx="1" fill={secondary} opacity="0.3" />
    </svg>
  );
}

function TeamCard({
  team,
  country,
  flag,
  onSelect,
}: {
  team: TeamInfo;
  country: string;
  flag: string;
  onSelect: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
      className="flex items-center gap-3 p-3 bg-[var(--surface)] border border-[var(--border-clr)] rounded-xl hover:border-[var(--accent)]/30 transition-all group cursor-pointer"
    >
      <ShirtIcon primary={team.primary} secondary={team.secondary} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors truncate">
          {team.name}
        </div>
        <div className="text-[10px] text-[var(--muted)]">
          {flag} {country}
        </div>
      </div>
    </div>
  );
}

function CountryAccordion({
  country,
  data,
  onTeamSelect,
}: {
  country: string;
  data: CountryTeams;
  onTeamSelect: (team: TeamInfo, country: string, flag: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[var(--border-clr)] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-3 hover:bg-[var(--surface-hover)] transition-colors"
      >
        <span className="text-xl">{data.flag}</span>
        <span className="flex-1 text-left text-sm font-bold text-[var(--foreground)]">{country}</span>
        <span className="text-[10px] text-[var(--muted)] px-2 py-0.5 bg-[var(--surface)] rounded-full">
          {data.teams.length}
        </span>
        {open ? (
          <ChevronDown className="w-4 h-4 text-[var(--muted)]" />
        ) : (
          <ChevronRight className="w-4 h-4 text-[var(--muted)]" />
        )}
      </button>
      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 pt-0">
          {data.teams.map((team) => (
            <TeamCard
              key={team.name}
              team={team}
              country={country}
              flag={data.flag}
              onSelect={() => onTeamSelect(team, country, data.flag)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TeamsSection() {
  const [activeContinent, setActiveContinent] = useState<string>("Europe");
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<{
    team: TeamInfo;
    country: string;
    flag: string;
  } | null>(null);

  const countries = useMemo(() => {
    const list = getCountriesByContinent(activeContinent);
    if (!search) return list;
    const q = search.toLowerCase();
    return list.filter(
      ([name, data]) =>
        name.toLowerCase().includes(q) ||
        data.teams.some((t) => t.name.toLowerCase().includes(q))
    );
  }, [activeContinent, search]);

  return (
    <section id="teams" className="py-24 bg-[var(--background)] scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest">
            World Football
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[var(--foreground)] mt-2">
            All Teams
          </h2>
        </div>

        {/* Continent tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {continents.map((c) => (
            <button
              key={c}
              onClick={() => { setActiveContinent(c); setSearch(""); }}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                activeContinent === c
                  ? "bg-[var(--accent)] text-black"
                  : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border-clr)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teams or countries..."
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--surface)] border border-[var(--border-clr)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]/30 transition-colors"
          />
        </div>

        {/* Countries grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {countries.map(([name, data]) => (
            <CountryAccordion
              key={name}
              country={name}
              data={data}
              onTeamSelect={(team, country, flag) => setSelectedTeam({ team, country, flag })}
            />
          ))}
        </div>

        {selectedTeam && (
          <TeamModal
            team={selectedTeam.team}
            country={selectedTeam.country}
            flag={selectedTeam.flag}
            onClose={() => setSelectedTeam(null)}
          />
        )}

        {countries.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🌍</div>
            <p className="text-[var(--muted)]">No teams found</p>
          </div>
        )}
      </div>
    </section>
  );
}
