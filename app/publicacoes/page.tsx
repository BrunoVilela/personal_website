import { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { PublicationDashboard } from "@/components/publications/publication-dashboard";
import { Badge } from "@/components/ui/badge";
import { getMetricsContent, getPublicationsContent } from "@/lib/content";
import { getSyncedPublications } from "@/lib/orcid-publications";

export const metadata: Metadata = { title: "Publications" };

export default async function PublicacoesPage() {
  const content = getPublicationsContent();
  const metrics = getMetricsContent();
  const sync = await getSyncedPublications();
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Bahia"
  }).format(new Date(sync.updatedAt));

  return (
    <div className="container py-12">
      <SectionHeading
        eyebrow={content.intro.eyebrow}
        title={content.intro.title}
        description={content.intro.description}
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
        <PublicationDashboard publications={sync.publications} metrics={metrics} />
      </div>
    </div>
  );
}
