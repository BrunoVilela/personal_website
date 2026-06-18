import { publications, type Publication } from "@/data/publications";

const ORCID_ID = "0000-0003-4072-0558";
const ORCID_API = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;
const CROSSREF_HEADERS = {
  Accept: "application/json",
  "User-Agent": "BrunoVilelaAcademicWebsite/1.0 (mailto:bruno.vilela@ufba.br)"
};

export type PublicationSync = {
  publications: Publication[];
  source: "orcid" | "local";
  updatedAt: string;
  error?: string;
};

type OrcidText = { value?: string };
type OrcidDate = { year?: OrcidText; month?: OrcidText; day?: OrcidText };
type OrcidExternalId = {
  "external-id-type"?: string;
  "external-id-value"?: string;
  "external-id-url"?: { value?: string };
};
type OrcidWorkSummary = {
  title?: { title?: OrcidText; subtitle?: OrcidText };
  "journal-title"?: OrcidText;
  type?: string;
  url?: { value?: string };
  "publication-date"?: OrcidDate;
  "external-ids"?: { "external-id"?: OrcidExternalId[] };
};
type OrcidGroup = { "work-summary"?: OrcidWorkSummary[] };
type OrcidWorksResponse = { group?: OrcidGroup[] };

type CrossRefAuthor = { given?: string; family?: string };
type CrossRefWork = {
  title?: string[];
  "container-title"?: string[];
  author?: CrossRefAuthor[];
  issued?: { "date-parts"?: number[][] };
  DOI?: string;
  URL?: string;
  type?: string;
  "is-referenced-by-count"?: number;
};
type CrossRefResponse = { message?: CrossRefWork };

export async function getSyncedPublications(): Promise<PublicationSync> {
  try {
    const response = await fetch(ORCID_API, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 * 60 * 24 }
    });

    if (!response.ok) {
      throw new Error(`ORCID returned status ${response.status}`);
    }

    const data = (await response.json()) as OrcidWorksResponse;
    const orcidWorks = await Promise.all((data.group ?? []).map(toPublication));
    const validWorks = orcidWorks.filter((item): item is Publication => Boolean(item));
    const merged = mergePublications(validWorks, publications);

    return {
      publications: merged,
      source: validWorks.length > 0 ? "orcid" : "local",
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    return {
      publications,
      source: "local",
      updatedAt: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Failed to synchronize ORCID"
    };
  }
}

async function toPublication(group: OrcidGroup): Promise<Publication | null> {
  const summary = group["work-summary"]?.[0];
  const title = clean(summary?.title?.title?.value);
  if (!summary || !title) return null;

  const doi = findExternalId(summary, "doi");
  const crossref = doi ? await fetchCrossRefByDoi(doi) : await fetchCrossRefByTitle(title);
  const resolvedDoi = doi || clean(crossref?.DOI);
  const parsedYearValue = summary["publication-date"]?.year?.value;
  const parsedYear = parsedYearValue ? Number(parsedYearValue) : undefined;
  const localPublication = findLocalPublication(title, resolvedDoi);
  const year = resolvePublicationYear(crossref, parsedYear, localPublication?.year);
  const journal =
    clean(crossref?.["container-title"]?.[0]) ||
    clean(summary["journal-title"]?.value) ||
    localPublication?.journal ||
    "ORCID-indexed publication";
  const authors = crossref?.author?.map((author) => `${author.given ?? ""} ${author.family ?? ""}`.trim()).filter(Boolean);
  const titleForDisplay = clean(crossref?.title?.[0]) || title;

  return {
    title: titleForDisplay,
    year,
    type: mapWorkType(crossref?.type ?? summary.type),
    theme: inferThemes(`${title} ${journal}`)[0],
    themes: inferThemes(`${titleForDisplay} ${journal}`),
    authors: authors?.length ? authors : localPublication?.authors ?? ["Bruno Vilela de Moraes e Silva"],
    journal,
    doi: resolvedDoi ?? localPublication?.doi,
    citations: crossref?.["is-referenced-by-count"] ?? localPublication?.citations ?? 0,
    abstract:
      localPublication?.abstract ??
      "Record synchronized automatically from the public ORCID profile. Bibliographic metadata are enriched through DOI/CrossRef when available.",
    externalUrl: resolvedDoi ? `https://doi.org/${resolvedDoi}` : localPublication?.externalUrl ?? summary.url?.value,
    scholarUrl: googleScholarArticleUrl(titleForDisplay),
    source: crossref ? "ORCID + CrossRef" : "ORCID",
    citationSource: crossref ? "CrossRef" : undefined
  };
}

async function fetchCrossRefByDoi(doi: string): Promise<CrossRefWork | null> {
  try {
    const response = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
      headers: CROSSREF_HEADERS,
      next: { revalidate: 60 * 60 * 24 }
    });
    if (!response.ok) return null;
    const data = (await response.json()) as CrossRefResponse;
    return data.message ?? null;
  } catch {
    return null;
  }
}

async function fetchCrossRefByTitle(title: string): Promise<CrossRefWork | null> {
  try {
    const response = await fetch(`https://api.crossref.org/works?query.title=${encodeURIComponent(title)}&rows=5`, {
      headers: CROSSREF_HEADERS,
      next: { revalidate: 60 * 60 * 24 }
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { message?: { items?: CrossRefWork[] } };
    const items = data.message?.items ?? [];
    const normalizedTitle = normalize(title);
    return (
      items.find((item) => normalize(clean(item.title?.[0])) === normalizedTitle) ??
      items.find((item) => normalize(clean(item.title?.[0])).includes(normalizedTitle) || normalizedTitle.includes(normalize(clean(item.title?.[0])))) ??
      null
    );
  } catch {
    return null;
  }
}

function findExternalId(summary: OrcidWorkSummary, type: string) {
  return clean(
    summary["external-ids"]?.["external-id"]?.find((item) => item["external-id-type"]?.toLowerCase() === type)?.[
      "external-id-value"
    ]
  );
}

function findLocalPublication(title: string, doi?: string) {
  const normalizedTitle = normalize(title);
  const normalizedDoi = doi?.toLowerCase();
  return publications.find((publication) => {
    if (normalizedDoi && publication.doi?.toLowerCase() === normalizedDoi) return true;
    const localTitle = normalize(publication.title);
    return localTitle === normalizedTitle || localTitle.includes(normalizedTitle) || normalizedTitle.includes(localTitle);
  });
}

function resolvePublicationYear(crossref: CrossRefWork | null, parsedYear?: number, fallbackYear?: number) {
  const crossrefYear = crossref?.issued?.["date-parts"]?.[0]?.[0];
  if (typeof crossrefYear === "number" && Number.isFinite(crossrefYear)) return crossrefYear;
  if (typeof parsedYear === "number" && Number.isFinite(parsedYear)) return parsedYear;
  if (typeof fallbackYear === "number" && Number.isFinite(fallbackYear)) return fallbackYear;
  return 0;
}

function mergePublications(primary: Publication[], fallback: Publication[]) {
  const indexByKey = new Map<string, number>();
  const merged: Publication[] = [];
  for (const item of [...primary, ...fallback]) {
    const key = item.doi ? `doi:${item.doi.toLowerCase()}` : `title:${normalize(item.title)}`;
    const normalizedItem = { ...item, scholarUrl: item.scholarUrl ?? googleScholarArticleUrl(item.title) };
    const existingIndex = indexByKey.get(key);
    if (existingIndex === undefined) {
      indexByKey.set(key, merged.length);
      merged.push(normalizedItem);
      continue;
    }
    merged[existingIndex] = mergePublicationMetadata(merged[existingIndex], normalizedItem);
  }
  return enrichKeyPublicationThemes(merged).sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

function mergePublicationMetadata(primary: Publication, fallback: Publication): Publication {
  const primaryHasOnlyDefaultAuthor =
    primary.authors.length <= 1 && normalize(primary.authors[0] ?? "") === normalize("Bruno Vilela de Moraes e Silva");

  return {
    ...primary,
    authors: primaryHasOnlyDefaultAuthor && fallback.authors.length > 1 ? fallback.authors : primary.authors,
    journal: primary.journal === "ORCID-indexed publication" && fallback.journal ? fallback.journal : primary.journal,
    doi: primary.doi ?? fallback.doi,
    citations: primary.citations || fallback.citations,
    abstract: primary.abstract || fallback.abstract,
    externalUrl: primary.externalUrl ?? fallback.externalUrl,
    scholarUrl: primary.scholarUrl ?? fallback.scholarUrl,
    themes: primary.themes?.length ? primary.themes : fallback.themes,
    theme: primary.theme || fallback.theme
  };
}


function enrichKeyPublicationThemes(items: Publication[]) {
  const overrides: { match: string; themes: string[]; year?: number; authors?: string[]; doi?: string; journal?: string }[] = [
    {
      match: "effects of polycyclic aromatic hydrocarbons on biomarker responses",
      themes: ["Physiology", "Ecotoxicology", "Biodiversity"],
      year: 2021,
      doi: "10.1007/s11356-021-13952-0",
      journal: "Environmental Science and Pollution Research",
      authors: ["Leticia Aguilar", "Maurilio Lara-Flores", "Jaime Rendon-von Osten", "Jorge Alejandro Kurczyn Robledo", "Bruno Vilela de Moraes e Silva", "Andre Cruz"]
    },
    {
      match: "invasive plants in brazil climate change effects",
      themes: ["Climate Change", "Conservation", "Invasion Biology", "Ecological Modelling"],
      year: 2021,
      doi: "10.1007/s10530-021-02460-4",
      journal: "Biological Invasions",
      authors: ["Luiza Gabriela Fulgencio-Lima", "Andre Felipe A. Andrade", "Bruno Vilela de Moraes e Silva", "Dilermando P. Lima-Junior", "Rodrigo Antonio de Souza", "Luciano F. Sgarbi", "Juliana Simiao-Ferreira", "Paulo De Marco Jr", "Daniel P. Silva"]
    },
    {
      match: "first records of chthonerpeton arii",
      themes: ["Biodiversity", "Biogeography", "Herpetology"],
      year: 2013,
      doi: "10.15560/9.4.818",
      journal: "Check List",
      authors: ["Adriano Oliveira Maciel", "Bruno Vilela de Moraes e Silva", "Filipe Augusto Cavalcanti do Nascimento", "Diva Maria Borges-Nojosa", "Daniel Cassiano Lima"]
    },
    {
      match: "new records and geographic distribution map of dendropsophus haddadi",
      themes: ["Biodiversity", "Biogeography", "Herpetology"],
      year: 2012,
      doi: "10.15560/8.2.248",
      journal: "Check List",
      authors: ["Jose Vieira de Araujo-Neto", "Bruno Vilela de Moraes e Silva", "Jessica Yara Araujo Galdino", "Filipe Augusto Cavalcanti do Nascimento", "Barnagleison da Silva Lisboa"]
    },
    {
      match: "siphlophis compressus daudin 1803",
      themes: ["Biodiversity", "Biogeography", "Herpetology"],
      year: 2011,
      journal: "Cuadernos de Herpetologia",
      authors: ["Bruno Vilela de Moraes e Silva", "Marcelo G L", "Ubiratan Goncalves", "Gabriel Omar Skuk Sugliano"]
    },
    {
      match: "intercontinental invasion dynamics of cercopagis pengoi",
      themes: ["Biodiversity", "Invasion Biology", "Biogeography", "Conservation"],
      year: 2024,
      doi: "10.1007/s10113-024-02244-1",
      journal: "Regional Environmental Change",
      authors: ["Rafael L. Macedo", "Gabriel Klippel", "Daniel P. Silva", "Phillip J. Haubrock", "Bruno Vilela", "Stefano Mammola", "Odete Rocha", "Ana Clara S. Franco"]
    },
    {
      match: "effect of behavioural plasticity and environmental properties",
      themes: ["Data Science", "Ecological Modelling", "Conservation"],
      year: 2022,
      doi: "10.1016/j.ecolmodel.2022.110071",
      journal: "Ecological Modelling",
      authors: ["Emerson Campos Barbosa Junior", "Vitor Passos Rios", "Pavel Dodonov", "Bruno Vilela", "Hilton F. Japyassu"]
    },
    {
      match: "reproductive notes and larval development of macrogenioglottus alipioi",
      themes: ["Biodiversity", "Herpetology", "Natural History"],
      year: 2022,
      doi: "10.11606/issn.2316-9079.v21i2p181-203",
      journal: "Phyllomedusa: Journal of Herpetology",
      authors: ["Filipe Augusto C. Nascimento", "Anyelet Valencia Aguilar", "Andre Pansonato", "Barnagleison S. Lisboa", "Bruno Vilela"]
    },
    {
      match: "drivers of global variation in land ownership",
      themes: ["Cultural Evolution", "Human Ecology", "Macroecology"],
      year: 2020,
      doi: "10.1111/ecog.05205",
      journal: "Ecography",
      authors: [
        "Patrick H. Kavanagh",
        "Hannah J. Haynie",
        "Geoff Kushnick",
        "Bruno Vilela",
        "Ty Tuff",
        "Claire Bowern",
        "Bobbi S. Low",
        "Carol R. Ember",
        "Kathryn R. Kirby",
        "Carlos A. Botero",
        "Michael C. Gavin"
      ]
    },
    {
      match: "pathways to social inequality",
      themes: ["Cultural Evolution", "Human Ecology", "Evolution"],
      year: 2021,
      doi: "10.1017/ehs.2021.32",
      journal: "Evolutionary Human Sciences",
      authors: [
        "Hannah J. Haynie",
        "Patrick H. Kavanagh",
        "Fiona M. Jordan",
        "Carol R. Ember",
        "Russell D. Gray",
        "Simon J. Greenhill",
        "Kathryn R. Kirby",
        "Geoff Kushnick",
        "Bobbi S. Low",
        "Ty Tuff",
        "Bruno Vilela",
        "Carlos A. Botero",
        "Michael C. Gavin"
      ]
    },
    {
      match: "are reptiles toast",
      themes: ["Conservation", "Climate Change", "Biodiversity"],
      year: 2020,
      doi: "10.1007/s10584-020-02687-5",
      journal: "Climatic Change",
      authors: ["L. M. Diele-Viegas", "R. T. Figueroa", "B. Vilela", "C. F. D. Rocha"]
    },
    {
      match: "assessing spatial and temporal biases and gaps",
      themes: ["Biogeography", "Data Science", "Spatial Ecology", "Biodiversity"],
      year: 2020,
      doi: "10.3897/BDJ.8.e53474",
      journal: "Biodiversity Data Journal",
      authors: ["Cristina Ronquillo", "Fernanda Alves-Martins", "Vicente Mazimpaka", "Thadeu Sobral-Souza", "Bruno Vilela-Silva", "Nagore G. Medina", "Joaquin Hortal"]
    },
    {
      match: "cultural transmission and ecological opportunity",
      themes: ["Cultural Evolution", "Agriculture", "Human Ecology", "Macroecology"],
      year: 2020,
      doi: "10.1017/ehs.2020.55",
      journal: "Evolutionary Human Sciences",
      authors: ["Bruno Vilela", "Trevor Fristoe", "Ty Tuff", "Patrick H. Kavanagh", "Hannah J. Haynie", "Russell D. Gray", "Michael C. Gavin", "Carlos A. Botero"]
    },
    {
      match: "global expansion of covid 19 pandemic",
      themes: ["Human Ecology", "Macroecology", "Data Science"],
      year: 2020,
      doi: "10.7717/peerj.9708",
      journal: "PeerJ",
      authors: ["Marco Tulio Pacheco Coelho", "Joao Fabricio Mota Rodrigues", "Anderson Matos Medina", "Paulo Scalco", "Levi Carina Terribile", "Bruno Vilela", "Jose Alexandre Felizola Diniz-Filho", "Ricardo Dobrovolski"]
    },
    {
      match: "ecological niche evolution on diversification patterns of birds",
      themes: ["Evolution", "Macroevolution", "Biogeography", "Ecological Niche"],
      year: 2020,
      doi: "10.1371/journal.pone.0238729",
      journal: "PLOS ONE",
      authors: ["Ricardo Ribeiro da Silva", "Bruno Vilela", "Daniel Paiva Silva", "Andre Felipe Alves de Andrade", "Pablo Vieira Cerqueira", "Gabriela Silva Ribeiro Goncalves", "Marcos Persio Dantas Santos"]
    },
    {
      match: "colonizing the east and the west",
      themes: ["Biogeography", "Ecological Niche", "Invasion Biology"],
      year: 2019,
      doi: "10.1007/s13592-019-00711-x",
      journal: "Apidologie",
      authors: ["Daniel P. Silva", "Ana Carollina F. Castro", "Bruno Vilela", "Xin Rui Ong", "Jennifer C. Thomas", "Abdulaziz S. Alqarni", "Michael S. Engel", "John S. Ascher"]
    },
    {
      match: "impacts of climate change on small ranged amphibians",
      themes: ["Climate Change", "Biogeography", "Conservation", "Herpetology"],
      year: 2018,
      doi: "10.4257/oeco.2018.2202.03",
      journal: "Oecologia Australis",
      authors: ["Bruno Vilela", "Filipe Augusto Nascimento", "Marcos Vinicius Carneiro Vital"]
    },
    {
      match: "no deaths in the desert",
      themes: ["Conservation", "Climate Change", "Ecological Modelling"],
      year: 2018,
      doi: "10.1111/icad.12318",
      journal: "Insect Conservation and Diversity",
      authors: ["Daniel Paiva Silva", "Rebecca M. Dew", "Bruno Vilela", "Mark I. Stevens", "Michael P. Schwarz"]
    },
    {
      match: "the global geography of human subsistence",
      themes: ["Cultural Evolution", "Human Ecology", "Macroecology"],
      year: 2018,
      doi: "10.1098/rsos.171897",
      journal: "Royal Society Open Science",
      authors: ["Michael C. Gavin", "Patrick H. Kavanagh", "Hannah J. Haynie", "Claire Bowern", "Carol R. Ember", "Russell D. Gray", "Fiona M. Jordan", "Kathryn R. Kirby", "Geoff Kushnick", "Bobbi S. Low", "Bruno Vilela", "Carlos A. Botero"]
    },
    {
      match: "wallace a flexible platform",
      themes: ["Ecological Niche", "Biogeography", "Ecological Modelling", "Data Science"],
      year: 2018,
      doi: "10.1111/2041-210X.12945",
      journal: "Methods in Ecology and Evolution",
      authors: ["Jamie M. Kass", "Bruno Vilela", "Matthew E. Aiello-Lammens", "Robert Muscarella", "Cory Merow", "Robert P. Anderson"]
    },
    {
      match: "spatial relationships between above ground biomass",
      themes: ["Spatial Ecology", "Biodiversity", "Conservation"],
      year: 2017,
      doi: "10.1371/journal.pone.0186742",
      journal: "PLOS ONE",
      authors: ["Minerva Singh", "Daniel A. Friess", "Bruno Vilela", "Jose Don T. De Alban", "Angelica Kristina V. Monzon", "Rizza Karen A. Veridiano", "Roven D. Tumaneng"]
    },
    {
      match: "stacked species distribution and macroecological models",
      themes: ["Macroecology", "Biogeography", "Ecological Modelling", "Biodiversity"],
      year: 2017,
      doi: "10.1111/icad.12240",
      journal: "Insect Conservation and Diversity",
      authors: ["Renata Alves da Mata", "Rosana Tidon", "Guilherme de Oliveira", "Bruno Vilela", "Jose Alexandre Felizola Diniz-Filho", "Thiago Fernando Rangel", "Levi Carina Terribile"]
    },
    {
      match: "structural bias in aggregated species level variables",
      themes: ["Biogeography", "Data Science", "Macroecology"],
      year: 2017,
      doi: "10.1111/jbi.12953",
      journal: "Journal of Biogeography",
      authors: ["Bradford A. Hawkins", "Boris Leroy", "Miguel A. Rodriguez", "Alexander Singer", "Bruno Vilela", "Fabricio Villalobos", "Xiangping Wang", "David Zeleny"]
    },
    {
      match: "contextualized niche shifts upon independent invasions",
      themes: ["Biogeography", "Ecological Niche", "Invasion Biology"],
      year: 2016,
      doi: "10.1007/s10530-016-1204-4",
      journal: "Biological Invasions",
      authors: ["Daniel P. Silva", "Bruno Vilela", "Bruno A. Buzatto", "Armin P. Moczek", "Joaquin Hortal"]
    },
    {
      match: "reproduction of agalychnis granulosa",
      themes: ["Biodiversity", "Herpetology", "Natural History"],
      year: 2014,
      doi: "10.1080/00222933.2014.897764",
      journal: "Journal of Natural History",
      authors: ["Bruno Vilela", "Barnagleison Silva Lisboa", "Filipe Augusto Cavalcanti do Nascimento"]
    },
    {
      match: "spthin an r package",
      themes: ["Biogeography", "Ecological Niche", "Data Science", "Ecological Modelling", "Spatial Ecology"],
      year: 2015,
      doi: "10.1111/ecog.01132",
      journal: "Ecography",
      authors: ["Matthew E. Aiello-Lammens", "Robert A. Boria", "Aleksandar Radosavljevic", "Bruno Vilela", "Robert P. Anderson"]
    },
    {
      match: "body size extinction risk and knowledge bias",
      themes: ["Conservation", "Biodiversity", "Herpetology"],
      year: 2014,
      doi: "10.1371/journal.pone.0113429",
      journal: "PLOS ONE",
      authors: ["Bruno Vilela", "Fabricio Villalobos", "Miguel Angel Rodriguez", "Levi Carina Terribile"]
    },
    {
      match: "sister neotropical orchid bees",
      themes: ["Biogeography", "Ecological Niche", "Ecological Modelling", "Evolution"],
      year: 2014,
      doi: "10.1371/journal.pone.0113246",
      journal: "PLOS ONE",
      authors: ["Daniel P. Silva", "Bruno Vilela", "Paulo De Marco", "Andre Nemesio"]
    },
    {
      match: "gabriel omar skuk sugliano",
      themes: ["Obituary"],
      year: 2011,
      doi: "10.1590/S1984-46702011000300018",
      journal: "Zoologia",
      authors: ["Filipe A. Nascimento", "Bruno Vilela", "Barnagleison Lisboa"]
    },
    { match: "letsr a new r package", themes: ["Macroecology", "Data Science", "Computational Ecology"] },
    { match: "expowo", themes: ["Data Science", "Biodiversity", "Biogeography", "Computational Ecology"] },
    { match: "clade replacement theory", themes: ["Macroevolution", "Evolution", "Biodiversity"] },
    { match: "effects of phenotypic plasticity", themes: ["Evolution", "Macroevolution", "Ecological Modelling", "Computational Ecology"] },
    {
      match: "hindcasting global population densities",
      themes: ["Cultural Evolution", "Agriculture", "Human Ecology", "Macroecology", "Data Science"],
      year: 2018,
      doi: "10.1038/s41562-018-0358-8",
      journal: "Nature Human Behaviour",
      authors: ["Patrick H. Kavanagh", "Bruno Vilela", "Hannah J. Haynie", "Ty Tuff", "Matheus Lima-Ribeiro", "Russell D. Gray", "Carlos A. Botero", "Michael C. Gavin"]
    },
    { match: "origin of agriculture", themes: ["Cultural Evolution", "Agriculture", "Human Ecology", "Macroecology"] },
    { match: "biogeography and evolution of land ownership", themes: ["Cultural Evolution", "Biogeography", "Human Ecology"] },
    { match: "using fossil records to predict", themes: ["Biogeography", "Paleoecology", "Ecological Modelling", "Conservation"] },
    { match: "protected areas", themes: ["Conservation", "Spatial Ecology", "Biodiversity"] },
    { match: "birdwatching", themes: ["Conservation", "Human Ecology", "Biodiversity"] },
    { match: "gabriel omar skuk sugliano", themes: ["Obituary"] }
  ];

  return items.map((item) => {
    const title = normalize(item.title);
    const override = overrides.find((entry) => title.includes(entry.match));
    if (!override) return item;
    const doi = override.doi ?? item.doi;
    return {
      ...item,
      theme: override.themes[0],
      themes: override.themes,
      year: override.year ?? item.year,
      authors: override.authors ?? item.authors,
      doi,
      journal: override.journal ?? item.journal,
      externalUrl: doi ? `https://doi.org/${doi}` : item.externalUrl
    };
  });
}

function mapWorkType(type?: string): Publication["type"] {
  switch (type) {
    case "book":
      return "Book";
    case "book-chapter":
      return "Chapter";
    case "preprint":
      return "Preprint";
    default:
      return "Article";
  }
}

function inferThemes(value: string) {
  const text = normalize(value);
  const themes: string[] = [];
  if (text.includes("agriculture") || text.includes("agricultural") || text.includes("land ownership") || text.includes("cultural") || text.includes("linguistic") || text.includes("human population") || text.includes("population densities")) themes.push("Cultural Evolution");
  if (text.includes("agriculture") || text.includes("agricultural")) themes.push("Agriculture");
  if (text.includes("human") || text.includes("land ownership") || text.includes("birdwatching") || text.includes("population densities")) themes.push("Human Ecology");
  if (text.includes("conservation") || text.includes("conservacao") || text.includes("protected") || text.includes("extinction risk") || text.includes("vulnerability")) themes.push("Conservation");
  if (text.includes("climate") || text.includes("warming") || text.includes("future scenario")) themes.push("Climate Change");
  if (text.includes("evolution") || text.includes("evolucao") || text.includes("phylogen") || text.includes("diversification") || text.includes("clade")) themes.push("Evolution");
  if (text.includes("clade") || text.includes("diversification") || text.includes("macroevolution")) themes.push("Macroevolution");
  if (text.includes("biogeograph") || text.includes("distribution") || text.includes("range") || text.includes("niche")) themes.push("Biogeography");
  if (text.includes("niche")) themes.push("Ecological Niche");
  if (text.includes("macroecolog") || text.includes("large scale") || text.includes("global")) themes.push("Macroecology");
  if (text.includes(" r ") || text.includes("package") || text.includes("data") || text.includes("model") || text.includes("algorithm") || text.includes("workflow")) themes.push("Data Science");
  if (text.includes("model") || text.includes("simulation") || text.includes("predict")) themes.push("Ecological Modelling");
  if (text.includes("spatial") || text.includes("space") || text.includes("map")) themes.push("Spatial Ecology");
  return themes.length ? Array.from(new Set(themes)) : ["Biodiversity"];
}

function clean(value?: string) {
  return (value ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function googleScholarArticleUrl(title: string) {
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`;
}
