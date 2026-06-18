"use client";

import { useState } from "react";
import { PublicationExplorer, type PublicationFilters } from "@/components/publications/publication-explorer";
import { PublicationInsights } from "@/components/publications/publication-insights";
import type { Publication } from "@/data/publications";
import type { MetricsContent } from "@/lib/content";

type Props = {
  publications: Publication[];
  metrics: MetricsContent;
};

export function PublicationDashboard({ publications, metrics }: Props) {
  const [filters, setFilters] = useState<PublicationFilters>({
    query: "",
    year: "All",
    type: "All",
    theme: "All"
  });

  function updateFilters(next: Partial<PublicationFilters>) {
    setFilters((current) => ({ ...current, ...next }));
  }

  function moveToPublicationList() {
    window.requestAnimationFrame(() => {
      document.getElementById("lista-publicacoes")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function applyWordFilter(word: string) {
    updateFilters({ query: word });
    moveToPublicationList();
  }

  function applyThemeFilter(theme: string) {
    updateFilters({ theme });
    moveToPublicationList();
  }

  return (
    <div className="grid gap-10">
      <PublicationInsights
        publications={publications}
        metrics={metrics}
        activeQuery={filters.query}
        activeTheme={filters.theme}
        onWordSelect={applyWordFilter}
        onThemeSelect={applyThemeFilter}
      />
      <PublicationExplorer publications={publications} filters={filters} onFiltersChange={updateFilters} />
    </div>
  );
}
