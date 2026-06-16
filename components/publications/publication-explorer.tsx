"use client";

import { useMemo } from "react";
import { Download, ExternalLink, FileText, Search, X } from "lucide-react";
import { publicationToBibtex, type Publication } from "@/data/publications";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export type PublicationFilters = {
  query: string;
  year: string;
  type: string;
  theme: string;
};

type Props = {
  publications: Publication[];
  filters: PublicationFilters;
  onFiltersChange: (filters: Partial<PublicationFilters>) => void;
};

export function PublicationExplorer({ publications, filters, onFiltersChange }: Props) {
  const { query, year, type, theme } = filters;
  const years = ["All", ...Array.from(new Set(publications.map((p) => String(p.year))))];
  const types = ["All", ...Array.from(new Set(publications.map((p) => p.type)))];
  const themes = ["All", ...Array.from(new Set(publications.flatMap((p) => getThemes(p))))];

  const filtered = useMemo(
    () =>
      publications.filter((publication) => {
        const haystack = `${publication.title} ${publication.authors.join(" ")} ${publication.journal}`.toLowerCase();
        return (
          haystack.includes(query.toLowerCase()) &&
          (year === "All" || String(publication.year) === year) &&
          (type === "All" || publication.type === type) &&
          (theme === "All" || getThemes(publication).includes(theme))
        );
      }),
    [query, year, type, theme, publications]
  );

  function exportBibtex() {
    const blob = new Blob([filtered.map(publicationToBibtex).join("\n\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bruno-vilela-publications.bib";
    link.click();
    URL.revokeObjectURL(url);
  }

  function clearFilters() {
    onFiltersChange({ query: "", year: "All", type: "All", theme: "All" });
  }

  const hasActiveFilter = query || year !== "All" || type !== "All" || theme !== "All";

  return (
    <div id="lista-publicacoes" className="grid gap-6">
      <div className="grid gap-3 rounded-lg border bg-card p-4 md:grid-cols-[1.5fr_repeat(3,1fr)_auto_auto]">
        <label className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search by title, author or journal"
            value={query}
            onChange={(event) => onFiltersChange({ query: event.target.value })}
          />
        </label>
        {[
          { value: year, key: "year" as const, options: years, label: "Year" },
          { value: type, key: "type" as const, options: types, label: "Type" },
          { value: theme, key: "theme" as const, options: themes, label: "Theme" }
        ].map((filter) => (
          <select
            key={filter.label}
            aria-label={filter.label}
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={filter.value}
            onChange={(event) => onFiltersChange({ [filter.key]: event.target.value })}
          >
            {filter.options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        ))}
        <Button onClick={exportBibtex} variant="outline">
          <Download /> BibTeX
        </Button>
        <Button onClick={clearFilters} variant="ghost" disabled={!hasActiveFilter}>
          <X /> Clear
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        {filtered.length} publication{filtered.length === 1 ? "" : "s"} found.
      </p>

      <div className="grid gap-4">
        {filtered.map((publication) => (
          <Card key={publication.title}>
            <CardContent className="p-5">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{publication.year}</Badge>
                <Badge variant="outline">{publication.type}</Badge>
                {getThemes(publication).map((item) => <Badge key={item} variant="accent">{item}</Badge>)}
              </div>
              <h2 className="mt-3 font-serif text-xl font-bold">{publication.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{publication.authors.join(", ")}</p>
              <p className="mt-1 text-sm font-medium">{publication.journal}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{publication.abstract}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                {publication.scholarUrl ? (
                  <a className="inline-flex items-center gap-1 text-accent hover:underline" href={publication.scholarUrl}>
                    {publication.citations > 0 ? `${publication.citations} citations` : "Citations"}
                    {publication.citationSource ? ` (${publication.citationSource})` : " on Scholar"}
                    <ExternalLink className="size-3" />
                  </a>
                ) : (
                  <span>{publication.citations} citations</span>
                )}
                {publication.doi ? (
                  <a className="inline-flex items-center gap-1 text-accent hover:underline" href={`https://doi.org/${publication.doi}`}>
                    DOI <ExternalLink className="size-3" />
                  </a>
                ) : null}
                {publication.pdf ? (
                  <a className="inline-flex items-center gap-1 text-accent hover:underline" href={publication.pdf}>
                    PDF <FileText className="size-3" />
                  </a>
                ) : null}
                {publication.externalUrl && !publication.doi ? (
                  <a className="inline-flex items-center gap-1 text-accent hover:underline" href={publication.externalUrl}>
                    Source <ExternalLink className="size-3" />
                  </a>
                ) : null}
                {publication.source ? <span className="text-xs text-muted-foreground">{publication.source}</span> : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function getThemes(publication: Publication) {
  return publication.themes?.length ? publication.themes : [publication.theme];
}
