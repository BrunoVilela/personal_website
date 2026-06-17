"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Award, BookOpen, ChevronLeft, ChevronRight, ExternalLink, Newspaper, Quote, TrendingUp } from "lucide-react";
import { ResponsiveContainer, Tooltip, Treemap } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatNumber } from "@/lib/utils";
import { scholarMetrics } from "@/data/site";
import type { Publication } from "@/data/publications";

type Props = {
  publications: Publication[];
  activeQuery?: string;
  activeTheme?: string;
  onWordSelect?: (word: string) => void;
  onThemeSelect?: (theme: string) => void;
};

const stopWords = new Set([
  "the", "and", "with", "from", "under", "using", "para", "sobre", "das", "dos", "uma", "como", "em", "de", "do", "da", "e", "a", "o", "of", "in", "to", "for", "on", "by", "an", "as", "or", "no", "na", "nos", "nas", "um", "ao", "aos"
]);

const themePalette = [
  { fill: "#d7f4e6", stroke: "#4a9b6b", text: "#174d34" },
  { fill: "#dbeafe", stroke: "#4f7fc4", text: "#163f73" },
  { fill: "#fef3c7", stroke: "#c4952d", text: "#6f4b09" },
  { fill: "#fae8ff", stroke: "#a855b7", text: "#6d287a" },
  { fill: "#fee2e2", stroke: "#d46a6a", text: "#7f1d1d" },
  { fill: "#ccfbf1", stroke: "#2e9d8d", text: "#12564b" },
  { fill: "#e0e7ff", stroke: "#6474c7", text: "#313a83" },
  { fill: "#ffedd5", stroke: "#d17835", text: "#7c3f12" },
  { fill: "#dcfce7", stroke: "#47a667", text: "#14532d" },
  { fill: "#fce7f3", stroke: "#c95f99", text: "#831843" }
];

type ThemeTreemapNode = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  size?: number;
  index?: number;
};

export function PublicationInsights({ publications, activeQuery = "", activeTheme = "All", onWordSelect, onThemeSelect }: Props) {
  const [activeHighlight, setActiveHighlight] = useState(0);
  const totalArticles = publications.filter((publication) => publication.type === "Article").length;
  const journals = Array.from(new Set(publications.map((publication) => publication.journal).filter(Boolean))).sort();
  const wordCloud = buildWordCloud(publications);
  const themeData = Array.from(
    publications.reduce((map, publication) => {
      for (const theme of getThemes(publication)) map.set(theme, (map.get(theme) ?? 0) + 1);
      return map;
    }, new Map<string, number>())
  )
    .map(([name, size]) => ({ name, size }))
    .sort((a, b) => b.size - a.size)
    .map((item, index) => ({ ...item, index }));
  const highlightedPublications = useMemo(
    () => keyPublications.map((keyPublication) => ({
      ...keyPublication,
      publication: findPublication(publications, keyPublication.match)
    })),
    [publications]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHighlight((current) => (current + 1) % highlightedPublications.length);
    }, 10000);
    return () => window.clearInterval(interval);
  }, [highlightedPublications.length]);

  function showPreviousHighlight() {
    setActiveHighlight((current) => (current - 1 + highlightedPublications.length) % highlightedPublications.length);
  }

  function showNextHighlight() {
    setActiveHighlight((current) => (current + 1) % highlightedPublications.length);
  }

  return (
    <section className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard icon={BookOpen} label="Articles" value={totalArticles} detail="peer-reviewed publications" />
        <MetricCard icon={Quote} label="Citations" value={scholarMetrics.citations} detail="total from Google Scholar" />
        <MetricCard icon={TrendingUp} label="H-index" value={scholarMetrics.hIndex} detail="h-index reported by Google Scholar" />
        <MetricCard icon={Newspaper} label="Journals" value={journals.length} detail="distinct scientific journals" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Title Word Cloud</CardTitle>
            <p className="text-sm text-muted-foreground">Click a word to filter the publication list by that term.</p>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-64 flex-wrap content-center items-center gap-3">
              {wordCloud.map((word) => (
                <button
                  key={word.term}
                  type="button"
                  className={cn(
                    "rounded-md bg-secondary px-2 py-1 font-semibold text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    activeQuery.toLowerCase() === word.term && "bg-accent text-accent-foreground"
                  )}
                  style={{ fontSize: `${word.size}px` }}
                  onClick={() => onWordSelect?.(word.term)}
                >
                  {word.term}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thematic publication space</CardTitle>
            <p className="text-sm text-muted-foreground">Click a theme in the chart to filter the publication list.</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={themeData}
                  dataKey="size"
                  nameKey="name"
                  stroke="transparent"
                  fill="transparent"
                  content={<ThemeTreemapTile activeTheme={activeTheme} />}
                  onClick={(node: unknown) => {
                    const theme = getThemeNodeName(node);
                    if (theme) onThemeSelect?.(theme);
                  }}
                >
                  <Tooltip
                    formatter={(value, name) => [`${value} publications`, name]}
                    contentStyle={{ borderRadius: 8, borderColor: "hsl(var(--border))", fontSize: 12 }}
                  />
                </Treemap>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {themeData.map((theme) => (
                <button
                  key={theme.name}
                  type="button"
                  onClick={() => onThemeSelect?.(theme.name)}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors hover:bg-accent hover:text-accent-foreground",
                    activeTheme === theme.name && "border-accent bg-accent text-accent-foreground"
                  )}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Featured publications</CardTitle>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous featured publication"
              onClick={showPreviousHighlight}
              className="inline-flex size-9 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next featured publication"
              onClick={showNextHighlight}
              className="inline-flex size-9 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border bg-background">
            <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${activeHighlight * 100}%)` }}>
              {highlightedPublications.map((keyPublication, index) => {
                const publication = keyPublication.publication;
                return (
                  <article key={keyPublication.title} className="grid min-w-full gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className={cn("relative min-h-72 overflow-hidden lg:min-h-[28rem]", keyPublication.imageFit === "contain" ? "bg-white" : "bg-muted")}>
                      <Image
                        src={keyPublication.imageUrl}
                        alt={keyPublication.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 38vw, 100vw"
                        priority={index === 0}
                        className={keyPublication.imageFit === "contain" ? "object-contain" : "object-cover"}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ocean-950/90 to-transparent p-4 text-white">
                        <p className="text-xs font-medium uppercase tracking-wider text-white/75">{keyPublication.imageCredit}</p>
                        <p className="mt-1 text-sm font-semibold">{publication?.journal ?? keyPublication.journal}</p>
                      </div>
                    </div>
                    <div className="flex min-h-72 flex-col justify-between p-5 md:p-7 lg:min-h-[28rem]">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-accent">
                          <Award className="size-4" />
                          <span className="text-xs font-semibold uppercase">Highlight {index + 1} of {highlightedPublications.length}</span>
                          <span className="text-xs text-muted-foreground">{publication?.year ?? keyPublication.year}</span>
                        </div>
                        <h3 className="mt-4 font-serif text-2xl font-bold leading-tight md:text-3xl">{publication?.title ?? keyPublication.title}</h3>
                        <p className="mt-4 text-sm leading-6 text-muted-foreground md:text-base">{keyPublication.reason}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {keyPublication.themes.map((theme) => <Badge key={theme} variant="secondary">{theme}</Badge>)}
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                        {publication?.doi ? (
                          <a className="inline-flex items-center gap-1 rounded-md bg-accent px-3 py-2 font-semibold text-accent-foreground hover:opacity-90" href={`https://doi.org/${publication.doi}`}>
                            Open DOI <ExternalLink className="size-3" />
                          </a>
                        ) : null}
                        <span className="text-muted-foreground">{publication?.journal ?? keyPublication.journal}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            {highlightedPublications.map((keyPublication, index) => (
              <button
                key={keyPublication.title}
                type="button"
                aria-label={`Show highlight ${index + 1}`}
                onClick={() => setActiveHighlight(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeHighlight === index ? "w-8 bg-accent" : "w-2.5 bg-muted-foreground/35 hover:bg-accent/70"
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function ThemeTreemapTile(props: ThemeTreemapNode & { activeTheme?: string }) {
  const { x = 0, y = 0, width = 0, height = 0, name = "", size = 0, index = 0, activeTheme } = props;
  if (width <= 0 || height <= 0 || !name || size <= 0) return null;
  const palette = themePalette[index % themePalette.length];
  const isActive = activeTheme === name;
  const innerWidth = Math.max(0, width - 24);
  const innerHeight = Math.max(0, height - 18);
  const fontSize = Math.max(9, Math.min(13, Math.floor(Math.min(width / 9, height / 3.8))));
  const label = fitTreemapLabel(name, innerWidth, fontSize);
  const clipId = `theme-tile-${normalizeText(name).replace(/\s+/g, "-")}-${index}`;
  const labelTextLength = Math.min(innerWidth, label.length * fontSize * 0.58);
  const showLabel = Boolean(label) && innerWidth >= 34 && innerHeight >= 22;
  const showCount = width > 118 && height > 62;

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <rect x={x + 8} y={y + 8} width={Math.max(0, width - 16)} height={Math.max(0, height - 16)} rx={8} ry={8} />
        </clipPath>
      </defs>
      <rect
        x={x + 3}
        y={y + 3}
        width={Math.max(0, width - 6)}
        height={Math.max(0, height - 6)}
        rx={10}
        ry={10}
        fill={palette.fill}
        stroke={isActive ? "hsl(var(--accent))" : palette.stroke}
        strokeWidth={isActive ? 3 : 1.5}
        opacity={isActive ? 1 : 0.88}
      />
      {showLabel ? (
        <g clipPath={`url(#${clipId})`} pointerEvents="none">
          <text
            x={x + 14}
            y={y + Math.min(27, Math.max(20, height / 2))}
            fill={palette.text}
            fontSize={fontSize}
            fontFamily="var(--font-serif), Georgia, serif"
            fontWeight={700}
            textLength={labelTextLength}
            lengthAdjust="spacingAndGlyphs"
          >
            {label}
          </text>
          {showCount ? (
            <text
              x={x + 14}
              y={y + Math.min(48, height - 14)}
              fill={palette.text}
              fontSize={10.5}
              fontFamily="var(--font-sans), system-ui, sans-serif"
              opacity={0.72}
            >
              {size} publications
            </text>
          ) : null}
        </g>
      ) : null}
    </g>
  );
}

function fitTreemapLabel(value: string, maxWidth: number, fontSize: number) {
  const averageCharacterWidth = fontSize * 0.58;
  const maxCharacters = Math.floor(maxWidth / averageCharacterWidth);
  if (maxCharacters < 4) return "";
  if (value.length <= maxCharacters) return value;
  return `${value.slice(0, Math.max(1, maxCharacters - 3)).trim()}...`;
}

function MetricCard({ icon: Icon, label, value, detail }: { icon: typeof BookOpen; label: string; value: number; detail: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <Icon className="size-6 text-accent" />
        <p className="mt-4 text-3xl font-bold text-accent">{formatNumber(value)}</p>
        <p className="mt-1 font-medium">{label}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}

function buildWordCloud(publications: Publication[]) {
  const counts = new Map<string, number>();
  for (const publication of publications) {
    const words = publication.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3 && !stopWords.has(word));
    for (const word of words) counts.set(word, (counts.get(word) ?? 0) + 1);
  }

  const values = Array.from(counts.values());
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 1);

  return Array.from(counts.entries())
    .map(([term, count]) => ({ term, count, size: scale(count, min, max) }))
    .sort((a, b) => b.count - a.count || a.term.localeCompare(b.term))
    .slice(0, 36);
}

function scale(value: number, min: number, max: number) {
  if (max === min) return 18;
  return Math.round(14 + ((value - min) / (max - min)) * 20);
}

const keyPublications = [
  {
    match: "letsR: a new R package",
    title: "letsR: a new R package for data handling and analysis in macroecology",
    year: 2015,
    journal: "Methods in Ecology and Evolution",
    imageUrl: "/images/publications/letsr-figure-1.jpg",
    imageAlt: "Figure from the letsR article showing global amphibian range maps, species richness, description year and analytical examples",
    imageCredit: "Figure from the letsR article | Methods in Ecology and Evolution",
    imageFit: "contain",
    themes: ["Macroecology", "Data Science", "Computational Ecology"],
    reason: "Major methodological contribution to open tools for macroecology and reproducible analysis in R."
  },
  {
    match: "The Clade Replacement Theory",
    title: "The Clade Replacement Theory: a framework to study age-dependent extinction",
    year: 2024,
    journal: "Journal of Evolutionary Biology",
    imageUrl: "/images/publications/clade-replacement-fig2.jpeg",
    imageAlt: "Figure from the Clade Replacement Theory article showing environmental stability, ecological shifts and age-dependent extinction rates",
    imageCredit: "Figure from the Clade Replacement article | Journal of Evolutionary Biology",
    imageFit: "contain",
    themes: ["Macroevolution", "Evolution", "Biodiversity"],
    reason: "Theoretical contribution linking lineage age, environmental instability and extinction at macroevolutionary scales."
  },
  {
    match: "Effects of phenotypic plasticity",
    title: "Effects of phenotypic plasticity on diversification rates and adaptive evolution",
    year: 2024,
    journal: "Ecological Modelling",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/Red-eyed_tree_frog_Belize_03.jpg",
    imageAlt: "Photograph of a red-eyed tree frog on a leaf, used as an illustration of phenotypic plasticity",
    imageCredit: "Illustrative photo | Wikimedia Commons CC0",
    themes: ["Evolution", "Ecological Modelling", "Computational Ecology"],
    reason: "Simulation-based eco-evolutionary model investigating plasticity, adaptation, extinction and diversification."
  },
  {
    match: "Hindcasting global population densities",
    title: "Hindcasting global population densities reveals forces enabling the origin of agriculture",
    year: 2023,
    journal: "Nature Human Behaviour",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Agricultural landscape viewed from above, representing the origin of agriculture and population densities",
    imageCredit: "Representative scientific image | Unsplash",
    themes: ["Cultural Evolution", "Agriculture", "Human Ecology", "Macroecology", "Data Science"],
    reason: "Integrates ecology, cultural evolution and human macroecology to investigate conditions associated with the origin of agriculture."
  },
  {
    match: "Using fossil records to predict",
    title: "Using fossil records to predict changes in niche and spatial dynamics in a broadly distributed coral reef",
    year: 2024,
    journal: "Journal of Biogeography",
    imageUrl: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Coral reef representing biogeography, paleoecology and coral spatial dynamics",
    imageCredit: "Representative scientific image | Unsplash",
    themes: ["Biogeography", "Paleoecology", "Ecological Modelling", "Conservation"],
    reason: "Combines fossils, distribution models and environmental reconstructions to study spatial and niche dynamics in reefs."
  }
];

function findPublication(publications: Publication[], match: string) {
  const normalizedMatch = normalizeText(match);
  return publications.find((publication) => normalizeText(publication.title).includes(normalizedMatch));
}

function getThemes(publication: Publication) {
  return publication.themes?.length ? publication.themes : [publication.theme];
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getThemeNodeName(node: unknown) {
  if (typeof node === "object" && node !== null && "name" in node) {
    const name = (node as { name?: unknown }).name;
    return typeof name === "string" ? name : undefined;
  }
  return undefined;
}
