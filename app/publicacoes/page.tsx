import { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { PublicationDashboard } from "@/components/publications/publication-dashboard";
import { Badge } from "@/components/ui/badge";
import { getSyncedPublications } from "@/lib/orcid-publications";

export const metadata: Metadata = { title: "Publications" };

export default async function PublicacoesPage() {
  const sync = await getSyncedPublications();
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Bahia"
  }).format(new Date(sync.updatedAt));

  return (
    <div className="container py-12">
      <SectionHeading
        eyebrow="Publications"
        title="Complete list of peer-reviewed publications"
        description="Use text search to locate terms in titles, authors or journals. Combine year, type and theme filters to refine the list and export filtered results in BibTeX."
      />
      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <Badge variant={sync.source === "orcid" ? "accent" : "secondary"}>
          {sync.source === "orcid" ? "Synced via ORCID" : "Using local copy"}
        </Badge>
        <span>{sync.publications.length} records</span>
        <span>Last checked: {date}</span>
        {sync.error ? <span>ORCID unavailable: {sync.error}</span> : null}
      </div>
      <div className="mt-10">
        <PublicationDashboard publications={sync.publications} />
      </div>
    </div>
  );
}
