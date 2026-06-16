export type Publication = {
  title: string;
  year: number;
  type: "Article" | "Book" | "Chapter" | "Preprint";
  theme: string;
  themes?: string[];
  authors: string[];
  journal: string;
  doi?: string;
  pdf?: string;
  citations: number;
  abstract: string;
  externalUrl?: string;
  scholarUrl?: string;
  source?: string;
  citationSource?: string;
};

export const publications: Publication[] = [
  {
    title: "White muscle and mitochondrial traits under different locomotor demands in Amazonian fishes",
    year: 2026,
    type: "Article",
    theme: "Comparative Ecology",
    themes: ["Comparative Ecology", "Functional Ecology", "Physiology", "Biodiversity"],
    authors: ["André Cruz", "Waldir Heinrichs-Caldas", "Bruno Vilela de Moraes e Silva", "Adalberto Luis Val"],
    journal: "Comparative Biochemistry and Physiology. Part A, Molecular & Integrative Physiology",
    citations: 0,
    abstract: "Accepted article imported from the Lattes CV, focused on white-muscle and mitochondrial traits in Amazonian fishes."
  },
  {
    title: "The role of cacao agroforests as foraging grounds for two bat species in southern Bahia, Brazil",
    year: 2026,
    type: "Article",
    theme: "Conservation",
    themes: ["Conservation", "Agroforestry", "Biodiversity", "Human Ecology"],
    authors: ["Enée Gottschalk", "Bruno Vilela de Moraes e Silva", "Karla Vieira Morato", "Deborah Faria"],
    journal: "Forest Ecology and Management",
    doi: "10.1016/j.foreco.2026.123528",
    citations: 0,
    abstract: "Study on the role of cacao agroforests as foraging areas for bats in southern Bahia."
  },
  {
    title: "The Challenges and Nuances of Teaching the R Programming Language to Ecologists",
    year: 2026,
    type: "Article",
    theme: "Data Science",
    themes: ["Data Science", "Teaching", "Computational Ecology"],
    authors: ["Maurício Humberto Vancine", "Pavel Dodonov", "Bruno Vilela de Moraes e Silva", "Diele-Viegas, L. M.", "Victor Casagrande Souza", "Felipe Alvarez Silva Nunes", "Ana Julia Oliveira Silva", "Beatriz Milz"],
    journal: "Oecologia Australis",
    citations: 0,
    abstract: "Accepted article on pedagogical challenges in teaching the R language to ecologists."
  },
  {
    title: "Feeding induces morphological remodeling but not metabolic activation in Boa constrictor (Serpentes, Boidae)",
    year: 2026,
    type: "Article",
    theme: "Evolution",
    themes: ["Evolution", "Physiology", "Functional Ecology"],
    authors: ["Helena Rachel da Mota Araujo", "José Eduardo de Carvalho", "Bruno Vilela de Moraes e Silva", "André Luís da Cruz"],
    journal: "Comparative Biochemistry and Physiology B-Biochemistry & Molecular Biology",
    doi: "10.1016/j.cbpb.2026.111207",
    citations: 0,
    abstract: "Article on morphological remodeling and metabolic responses associated with feeding in Boa constrictor."
  },
  {
    title: "Age-related trends in niche position and specialization in Neotropical vertebrates",
    year: 2026,
    type: "Article",
    theme: "Macroecology",
    themes: ["Macroecology", "Ecological Niche", "Biogeography", "Macroevolution"],
    authors: ["Carlos Calderon Del Cid", "Fabrício Villalobos", "Ricardo Dobrovolski", "Bruno Vilela de Moraes e Silva"],
    journal: "Ecography",
    doi: "10.1002/ecog.08192",
    citations: 0,
    abstract: "Analyzes age-related trends in niche position and specialization in Neotropical vertebrates."
  },
  {
    title: "Unraveling the species complex of the fire bee Oxytrigona tataira (Hymenoptera, Apidae, Meliponini): an integrative approach",
    year: 2025,
    type: "Article",
    theme: "Biogeography",
    themes: ["Biogeography", "Taxonomy", "Biodiversity"],
    authors: ["Ramon Limas Ramos", "Favizia Freitas de Oliveira", "Tiago Mauricio Francoy", "Bruno Vilela de Moraes e Silva", "Alessandra Selbach Schnadelbach"],
    journal: "Apidologie",
    doi: "10.1007/s13592-024-01136-x",
    citations: 0,
    abstract: "Integrative approach to understand the species complex of the fire bee Oxytrigona tataira."
  },
  {
    title: "The potential effects of climate change on medicinal plants from the Brazilian Cerrado in South America",
    year: 2025,
    type: "Article",
    theme: "Conservation",
    themes: ["Climate Change", "Conservation", "Ecological Modelling", "Biodiversity"],
    authors: ["Leonardo Almeida Guerra dos Santos", "Bruno Vilela de Moraes e Silva", "Fernanda Gonçalves de Sousa", "Washington Soares Ferreira Junior", "Daniel de Paiva Silva"],
    journal: "Biodiversity and Conservation",
    doi: "10.1007/s10531-025-03188-6",
    citations: 0,
    abstract: "Assesses potential climate-change effects on medicinal plants from the Brazilian Cerrado."
  },
  {
    title: "Social and Environmental Drivers of Birdwatching in Brazil: Implications for Conservation Planning",
    year: 2025,
    type: "Article",
    theme: "Conservation",
    themes: ["Conservation", "Human Ecology", "Biodiversity"],
    authors: ["Rafael Félix", "Bruno Vilela de Moraes e Silva", "Sidnei Santos", "Alexandre Igari", "Blandina Viana", "Charbel El-Hani"],
    journal: "Tropical Conservation Science",
    doi: "10.1177/19400829251405826",
    citations: 0,
    abstract: "Investigates social and environmental drivers of birdwatching in Brazil and implications for conservation planning."
  },
  {
    title: "Assessing the evolutionary distinctiveness of a highly threatened plant group: The urgency to preserve a unique lineage of evolution in Brazil",
    year: 2025,
    type: "Article",
    theme: "Evolution",
    themes: ["Evolution", "Conservation", "Biodiversity"],
    authors: ["Najla Bastos Scheidegger", "Raquel C. Pizzardo", "Bruno Vilela de Moraes e Silva", "Thuane Bochorny", "Juliana Gastaldello Rando"],
    journal: "Plants People Planet",
    doi: "10.1002/ppp3.70088",
    citations: 0,
    abstract: "Assesses evolutionary distinctiveness in a highly threatened plant group in Brazil."
  },
  {
    title: "expowo: An R package for mining global plant diversity and distribution data",
    year: 2024,
    type: "Article",
    theme: "Data Science",
    themes: ["Data Science", "Biodiversity", "Biogeography", "Computational Ecology"],
    authors: ["Débora C. Zuanny", "Bruno Vilela de Moraes e Silva", "Peter W. Moonlight", "Tiina E. Särkinen", "Domingos Cardoso"],
    journal: "Applications in Plant Sciences",
    doi: "10.1002/aps3.11609",
    citations: 0,
    abstract: "R package for mining global plant diversity and distribution data."
  },
  {
    title: "Using fossil records to predict changes in niche and spatial dynamics in a broadly distributed coral reef: Niche conservatism and adaptation",
    year: 2024,
    type: "Article",
    theme: "Biogeography",
    themes: ["Biogeography", "Paleoecology", "Ecological Modelling", "Conservation"],
    authors: ["Umberto Diego Rodrigues de Oliveira", "Ricardo Dobrovolski", "Francisco Barros", "Carlos Daniel Pérez", "Bruno Vilela de Moraes e Silva"],
    journal: "Journal of Biogeography",
    doi: "10.1111/jbi.14856",
    citations: 0,
    abstract: "Uses fossil records to predict niche shifts and spatial dynamics in coral reefs."
  },
  {
    title: "The Clade Replacement Theory: a framework to study age-dependent extinction",
    year: 2024,
    type: "Article",
    theme: "Macroevolution",
    themes: ["Macroevolution", "Evolution", "Biodiversity"],
    authors: ["Carlos Calderón Del Cid", "Fabricio Villalobos", "Ricardo Dobrovolski", "Juan D. Carrillo", "Daniele Silvestro", "Bruno Vilela de Moraes e Silva"],
    journal: "Journal of Evolutionary Biology",
    doi: "10.1093/jeb/voae012",
    citations: 0,
    abstract: "Proposes a framework to study age-dependent extinction in clades."
  },
  {
    title: "Niche analyses and the potential distribution of four invasive bumblebees worldwide",
    year: 2024,
    type: "Article",
    theme: "Ecological Modelling",
    themes: ["Ecological Modelling", "Ecological Niche", "Biogeography", "Invasion Biology"],
    authors: ["Tania Paola Lopez Aguilar", "Jose Montalva", "Bruno Vilela de Moraes e Silva", "Mariana Arbetman", "Marcelo Adrian Aizen", "Carolina Morales", "Daniel de Paiva Silva"],
    journal: "Ecology and Evolution",
    doi: "10.1002/ece3.11200",
    citations: 0,
    abstract: "Analyzes niche and global potential distribution of four invasive bumblebees."
  },
  {
    title: "Effects of phenotypic plasticity on diversification rates and adaptive evolution in simulated environments with different climatic and cost contexts",
    year: 2024,
    type: "Article",
    theme: "Evolution",
    themes: ["Evolution", "Ecological Modelling", "Computational Ecology"],
    authors: ["Emerson Campos Barbosa Júnior", "Pavel Dodonov", "Hilton F. Japyassú", "Bruno Vilela de Moraes e Silva"],
    journal: "Ecological Modelling",
    doi: "10.1016/j.ecolmodel.2024.110983",
    citations: 0,
    abstract: "Simulation-based study on phenotypic plasticity, diversification and adaptive evolution."
  },
  {
    title: "The biogeography and evolution of land ownership",
    year: 2023,
    type: "Article",
    theme: "Biogeography",
    themes: ["Cultural Evolution", "Biogeography", "Human Ecology"],
    authors: ["Hannah Haynie", "Geoff Kushnick", "Patrick Kavanagh", "Carol Ember", "Claire Bowern", "Bobbi Low", "Ty Tuff", "Bruno Vilela de Moraes e Silva"],
    journal: "Journal of Biogeography",
    doi: "10.1111/jbi.14603",
    citations: 0,
    abstract: "Interdisciplinary research on the biogeography and evolution of land ownership."
  },
  {
    title: "Abundant-core thinking clarifies exceptions to the abundant-center distribution pattern",
    year: 2023,
    type: "Article",
    theme: "Macroecology",
    themes: ["Macroecology", "Biogeography", "Spatial Ecology"],
    authors: ["Trevor Fristoe", "Bruno Vilela de Moraes e Silva", "James Brown", "Carlos A. Botero"],
    journal: "Ecography",
    doi: "10.1111/ecog.06365",
    citations: 0,
    abstract: "Discusses exceptions to the abundant-center pattern from a macroecological perspective."
  },
  {
    title: "A generalized framework to expand incomplete phylogenies using non-molecular phylogenetic information",
    year: 2023,
    type: "Article",
    theme: "Macroevolution",
    themes: ["Macroevolution", "Phylogenetics", "Data Science", "Biodiversity"],
    authors: ["Ignacio Ramos-Gutiérrez", "Herlander Lima", "Bruno Vilela de Moraes e Silva", "Rafael Molina-Venegas"],
    journal: "Global Ecology and Biogeography",
    doi: "10.1111/geb.13733",
    citations: 0,
    abstract: "Framework to expand incomplete phylogenies using non-molecular phylogenetic information."
  },
  {
    title: "The role of protected areas in maintaining natural vegetation in Brazil",
    year: 2021,
    type: "Article",
    theme: "Conservation",
    themes: ["Conservation", "Spatial Ecology", "Biodiversity"],
    authors: ["Daniel Gonçalves-Souza", "Bruno Vilela de Moraes e Silva", "Benjamin Phalan", "Ricardo Dobrovolski"],
    journal: "Science Advances",
    doi: "10.1126/sciadv.abh2932",
    citations: 0,
    abstract: "Assesses the role of protected areas in maintaining natural vegetation in Brazil."
  },
  {
    title: "letsR: a new R package for data handling and analysis in macroecology",
    year: 2015,
    type: "Article",
    theme: "Macroecology",
    themes: ["Macroecology", "Data Science", "Computational Ecology"],
    authors: ["Bruno Vilela de Moraes e Silva", "Fabricio Villalobos"],
    journal: "Methods in Ecology and Evolution",
    doi: "10.1111/2041-210x.12401",
    citations: 0,
    abstract: "The letsR package paper for data handling and macroecological analyses in R."
  }
];

export function publicationToBibtex(publication: Publication) {
  const key = `${publication.authors[0].split(" ").pop()}${publication.year}${publication.title.split(" ")[0]}`.replace(
    /[^A-Za-z0-9]/g,
    ""
  );
  return `@article{${key},
  title={${publication.title}},
  author={${publication.authors.join(" and ")}},
  journal={${publication.journal}},
  year={${publication.year}}${publication.doi ? `,\n  doi={${publication.doi}}` : ""}
}`;
}
