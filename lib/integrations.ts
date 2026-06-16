export type ExternalPublication = {
  title: string;
  year?: number;
  doi?: string;
  authors?: string[];
  source: "orcid" | "crossref" | "scholar";
};

type OrcidExternalId = {
  "external-id-type"?: string;
  "external-id-value"?: string;
};

type OrcidWorkSummary = {
  title?: { title?: { value?: string } };
  "publication-date"?: { year?: { value?: string } };
  "external-ids"?: { "external-id"?: OrcidExternalId[] };
};

type OrcidGroup = {
  "work-summary"?: OrcidWorkSummary[];
};

type OrcidWorksResponse = {
  group?: OrcidGroup[];
};

type CrossRefAuthor = {
  given?: string;
  family?: string;
};

type CrossRefItem = {
  title?: string[];
  issued?: { "date-parts"?: number[][] };
  DOI?: string;
  author?: CrossRefAuthor[];
};

type CrossRefResponse = {
  message?: {
    items?: CrossRefItem[];
  };
};

export async function fetchOrcidWorks(orcidId: string): Promise<ExternalPublication[]> {
  const response = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/works`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 * 60 * 24 }
  });
  if (!response.ok) throw new Error("ORCID request failed");
  const data = (await response.json()) as OrcidWorksResponse;
  return (data.group ?? []).map((group) => {
    const summary = group["work-summary"]?.[0];
    return {
      title: summary?.title?.title?.value ?? "Untitled",
      year: Number(summary?.["publication-date"]?.year?.value) || undefined,
      doi: summary?.["external-ids"]?.["external-id"]?.find((id) => id["external-id-type"] === "doi")?.[
        "external-id-value"
      ],
      source: "orcid" as const
    };
  });
}

export async function fetchCrossRefWorks(query: string): Promise<ExternalPublication[]> {
  const params = new URLSearchParams({ query, rows: "20" });
  const response = await fetch(`https://api.crossref.org/works?${params.toString()}`, {
    next: { revalidate: 60 * 60 * 24 }
  });
  if (!response.ok) throw new Error("CrossRef request failed");
  const data = (await response.json()) as CrossRefResponse;
  return (data.message?.items ?? []).map((item) => ({
    title: item.title?.[0] ?? "Untitled",
    year: item.issued?.["date-parts"]?.[0]?.[0],
    doi: item.DOI,
    authors: item.author?.map((author) => `${author.given ?? ""} ${author.family ?? ""}`.trim()),
    source: "crossref" as const
  }));
}

export function googleScholarNote() {
  return "Google Scholar não oferece API pública oficial. Para produção, prefira importação manual, SerpAPI mediante termos de uso, ou sincronização a partir de ORCID/CrossRef.";
}
