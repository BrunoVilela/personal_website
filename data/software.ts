export type SoftwareMetric = {
  label: string;
  value: string;
};

export type SoftwareItem = {
  name: string;
  language: string;
  role: "Development" | "Collaboration";
  description: string;
  github: string;
  docs: string;
  examples: string[];
  metrics: SoftwareMetric[];
};

export const software: SoftwareItem[] = [
  {
    name: "letsR",
    language: "R",
    role: "Development",
    description: "Package to handle, process and analyze geographic species-distribution data and environmental variables in macroecology.",
    github: "https://github.com/macroecology/letsR",
    docs: "https://brunovilela.github.io/letsR/",
    examples: ["Richness maps", "Presence-absence matrices", "Beta diversity", "Species-area curves"],
    metrics: [
      { label: "CRAN downloads", value: "64.385" },
      { label: "30-day downloads", value: "674" },
      { label: "GitHub stars", value: "29" }
    ]
  },
  {
    name: "spThin",
    language: "R",
    role: "Collaboration",
    description: "Functions for spatial thinning of occurrence records, reducing autocorrelation and spatial bias before ecological modelling.",
    github: "https://github.com/mlammens/spThin",
    docs: "https://cran.r-project.org/package=spThin",
    examples: ["Spatial filtering", "Minimum distance between occurrences", "Preparation for niche models"],
    metrics: [
      { label: "CRAN downloads", value: "173.442" },
      { label: "30-day downloads", value: "1.776" },
      { label: "GitHub stars", value: "2" }
    ]
  },
  {
    name: "Wallace",
    language: "R/Shiny",
    role: "Collaboration",
    description: "Modular, open and reproducible application for ecological niche and species distribution modelling, with a Shiny graphical interface.",
    github: "https://github.com/wallaceEcoMod/wallace",
    docs: "https://wallaceecomod.github.io/wallace/",
    examples: ["Interactive SDM", "Reproducible workflows", "Map visualization", "Analysis export"],
    metrics: [
      { label: "CRAN downloads", value: "141.466" },
      { label: "30-day downloads", value: "1.235" },
      { label: "GitHub stars", value: "143" }
    ]
  },
  {
    name: "NUPEX",
    language: "R",
    role: "Development",
    description: "Package to support analyses of academic output from Lattes XML files and other administrative sources.",
    github: "https://github.com/BrunoVilela/NUPEX",
    docs: "https://github.com/BrunoVilela/NUPEX#readme",
    examples: ["Lattes XML import", "Academic indicators", "Output reports"],
    metrics: []
  },
  {
    name: "expowo",
    language: "R",
    role: "Collaboration",
    description: "Package to mine global plant diversity and distribution data from Plants of the World Online, producing lists, maps and charts.",
    github: "https://github.com/DBOSlab/expowo",
    docs: "https://dboslab.github.io/expowo/",
    examples: ["POWO mining", "Richness maps", "Taxonomic lists", "Discovery history"],
    metrics: [
      { label: "CRAN downloads", value: "11.450" },
      { label: "30-day downloads", value: "297" },
      { label: "GitHub stars", value: "9" }
    ]
  },
  {
    name: "randtip",
    language: "R",
    role: "Collaboration",
    description: "Package to expand incomplete molecular phylogenies by inserting missing taxa with controlled phylogenetic uncertainty.",
    github: "https://github.com/iramosgutierrez/randtip",
    docs: "https://github.com/iramosgutierrez/randtip#readme",
    examples: ["Phylogeny expansion", "Uncertain taxa", "Species-level trees"],
    metrics: [
      { label: "GitHub stars", value: "8" }
    ]
  },
  {
    name: "LCVP",
    language: "R/Data",
    role: "Collaboration",
    description: "Data package with the Leipzig Catalogue of Vascular Plants, used to access and export a global taxonomic list of vascular plants.",
    github: "https://github.com/idiv-biodiversity/LCVP",
    docs: "https://github.com/idiv-biodiversity/LCVP#readme",
    examples: ["Taxonomic catalogue", "Vascular plant data", "Integration with lcvplants"],
    metrics: [
      { label: "GitHub stars", value: "17" }
    ]
  }
];
