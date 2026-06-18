export type ResearchPublicationExample = {
  title: string;
  year: number;
  journal: string;
  doi?: string;
  authors: string[];
  note: string;
};

export type ResearchTheme = {
  title: string;
  slug: string;
  image: string;
  imageAlt: string;
  summary: string;
  description: string;
  projects: string[];
  publications: ResearchPublicationExample[];
};

export const researchThemes: ResearchTheme[] = [
  {
    title: "Macroecology and Macroevolution",
    slug: "macroecologia-macroevolucao",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Tropical forest and landscape gradients viewed at broad spatial scale",
    summary: "Broad patterns of diversity, distribution and evolutionary history across continental and global scales.",
    description: "This research line integrates macroecology, biogeography and comparative methods to investigate how diversity, geographic distributions, niche specialization and evolutionary history are organized across space and time.",
    projects: ["Clade dynamics and age-dependent extinction", "Macroecological gradients", "Expansion of incomplete phylogenies", "Patterns of abundance and distribution"],
    publications: [
      { title: "The Clade Replacement Theory: a framework to study age-dependent extinction", year: 2024, journal: "Journal of Evolutionary Biology", doi: "10.1093/jeb/voae012", authors: ["Carlos Calderon Del Cid", "Fabricio Villalobos", "Ricardo Dobrovolski", "Juan D. Carrillo", "Daniele Silvestro", "Bruno Vilela"], note: "Conceptual contribution to understanding species age-dependent extinction and clade replacement." },
      { title: "Abundant-core thinking clarifies exceptions to the abundant-center distribution pattern", year: 2023, journal: "Ecography", doi: "10.1111/ecog.06365", authors: ["Trevor Fristoe", "Bruno Vilela", "James Brown", "Carlos A. Botero"], note: "Refines interpretations of abundance, range centers and macroecological exceptions." },
      { title: "Effects of phenotypic plasticity on diversification rates and adaptive evolution in simulated environments with different climatic and cost contexts", year: 2024, journal: "Ecological Modelling", doi: "10.1016/j.ecolmodel.2024.110983", authors: ["Emerson Campos Barbosa Junior", "Pavel Dodonov", "Hilton F. Japyassu", "Bruno Vilela"], note: "Uses simulations to evaluate how phenotypic plasticity can alter adaptation, diversification and evolutionary trajectories." }
    ]
  },
  {
    title: "Ecological Niche Studies",
    slug: "nicho-ecologico",
    image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Bee visiting a flower, representing the interaction between organisms and their environment",
    summary: "Climatic niches, organism-environment interactions, adaptation, biological invasions and potential distributions.",
    description: "Ecological niche studies connect geographic occurrence, environment, evolutionary history and spatial dynamics to understand where species live and how they respond to environmental change.",
    projects: ["Niche conservatism and adaptation", "Climate specialization", "Invasive species niches", "Phenotypic plasticity"],
    publications: [
      { title: "Age-related trends in niche position and specialization in Neotropical vertebrates", year: 2026, journal: "Ecography", doi: "10.1002/ecog.08192", authors: ["Carlos Calderon Del Cid", "Fabricio Villalobos", "Ricardo Dobrovolski", "Bruno Vilela"], note: "Links evolutionary age, niche position and specialization in Neotropical vertebrates." },
      { title: "Using fossil records to predict changes in niche and spatial dynamics in a broadly distributed coral reef: Niche conservatism and adaptation", year: 2024, journal: "Journal of Biogeography", doi: "10.1111/jbi.14856", authors: ["Umberto Diego Rodrigues de Oliveira", "Ricardo Dobrovolski", "Francisco Barros", "Carlos Daniel Perez", "Bruno Vilela"], note: "Combines fossils and modelling to study niche conservatism and adaptation in reefs." },
      { title: "Niche analyses and the potential distribution of four invasive bumblebees worldwide", year: 2024, journal: "Ecology and Evolution", doi: "10.1002/ece3.11200", authors: ["Tania Paola Lopez Aguilar", "Jose Montalva", "Bruno Vilela", "Mariana Arbetman", "Marcelo Adrian Aizen", "Carolina Morales", "Daniel de Paiva Silva"], note: "Evaluates niche dynamics and potential distributions of invasive bumblebees worldwide." }
    ]
  },
  {
    title: "Climate Change",
    slug: "mudancas-climaticas",
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Semi-arid landscape with dry vegetation, representing environmental challenges associated with climate change",
    summary: "Climate scenarios, species vulnerability, potential redistribution and environmental refugia.",
    description: "This research line evaluates how environmental change can reorganize distributions, niches and conservation risks, focusing on species, ecosystems and vulnerable regions.",
    projects: ["Climate risk for Cerrado plants", "Climate refugia", "Invasive species and climate", "Future environmental scenarios"],
    publications: [
      { title: "The potential effects of climate change on medicinal plants from the Brazilian Cerrado in South America", year: 2025, journal: "Biodiversity and Conservation", doi: "10.1007/s10531-025-03188-6", authors: ["Leonardo Almeida Guerra dos Santos", "Bruno Vilela", "Fernanda Goncalves de Sousa", "Washington Soares Ferreira Junior", "Daniel de Paiva Silva"], note: "Projects potential climate-change impacts on medicinal plants from the Brazilian Cerrado." },
      { title: "Are reptiles toast? A worldwide evaluation of Lepidosauria vulnerability to climate change", year: 2020, journal: "Climatic Change", doi: "10.1007/s10584-020-02687-5", authors: ["L. M. Diele-Viegas", "R. T. Figueroa", "Bruno Vilela", "C. F. D. Rocha", "collaborators"], note: "Evaluates biogeographic and phylogenetic patterns of Lepidosauria vulnerability to climate change." },
      { title: "Impacts of climate change on small-ranged amphibians of the Northern Atlantic Forest", year: 2018, journal: "Oecologia Australis", doi: "10.4257/oeco.2018.2202.03", authors: ["Bruno Vilela", "Filipe Augusto Nascimento", "Marcos Vinicius Carneiro Vital"], note: "Evaluates how future climate scenarios may affect range-restricted amphibians from the northern Atlantic Forest." }
    ]
  },
  {
    title: "Conservation",
    slug: "conservacao",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cachoeira_do_Burac%C3%A3o_-_Chapada_Diamantina.jpg",
    imageAlt: "Waterfall and canyon in Chapada Diamantina, representing preserved Brazilian ecosystems",
    summary: "Ecological evidence to guide biodiversity protection, protected areas and extinction-risk reduction.",
    description: "In this research line, I combine spatial data, ecological models and evolutionary metrics to support conservation decisions in Brazilian landscapes and threatened systems.",
    projects: ["Protected areas in Brazil", "Agroforests and biodiversity", "Conservation of threatened lineages", "Spatial planning"],
    publications: [
      { title: "The role of protected areas in maintaining natural vegetation in Brazil", year: 2021, journal: "Science Advances", doi: "10.1126/sciadv.abh2932", authors: ["Daniel Goncalves-Souza", "Bruno Vilela", "Benjamin Phalan", "Ricardo Dobrovolski"], note: "Evaluates the contribution of protected areas to maintaining natural vegetation at national scale." },
      { title: "Assessing the evolutionary distinctiveness of a highly threatened plant group: The urgency to preserve a unique lineage of evolution in Brazil", year: 2025, journal: "Plants People Planet", doi: "10.1002/ppp3.70088", authors: ["Najla Bastos Scheidegger", "Raquel C. Pizzardo", "Bruno Vilela", "Thuane Bochorny", "Juliana Gastaldello Rando"], note: "Highlights the importance of conserving an evolutionarily distinct and threatened plant lineage." },
      { title: "Social and Environmental Drivers of Birdwatching in Brazil: Implications for Conservation Planning", year: 2025, journal: "Tropical Conservation Science", doi: "10.1177/19400829251405826", authors: ["Rafael Felix", "Bruno Vilela", "Sidnei Santos", "Alexandre Igari", "Blandina Viana", "Charbel El-Hani"], note: "Connects social and environmental data to conservation planning based on birdwatching." }
    ]
  },
  {
    title: "Cultural Evolution",
    slug: "evolucao-cultural",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Agricultural landscape representing cultural evolution, farming and land use",
    summary: "Relationships among ecology, geography, cultural diversity, agriculture and social organization.",
    description: "This research line applies concepts from ecology and evolution to understand spatial patterns in cultural diversity, land-tenure systems, agriculture and social change.",
    projects: ["Origin of agriculture", "Biogeography of land ownership", "Historical population densities", "Environment and social organization"],
    publications: [
      { title: "Cultural transmission and ecological opportunity jointly shaped global patterns of reliance on agriculture", year: 2024, journal: "Nature Human Behaviour", authors: ["International collaboration", "Bruno Vilela"], note: "Investigates how cultural transmission and ecological opportunity contributed to global patterns of reliance on agriculture." },
      { title: "The biogeography and evolution of land ownership", year: 2023, journal: "Journal of Biogeography", doi: "10.1111/jbi.14603", authors: ["Hannah Haynie", "Geoff Kushnick", "Patrick Kavanagh", "Carol Ember", "Claire Bowern", "Bobbi Low", "Ty Tuff", "Bruno Vilela"], note: "Investigates biogeographic and evolutionary patterns associated with land ownership." },
      { title: "Hindcasting global population densities reveals forces enabling the origin of agriculture", year: 2024, journal: "Nature Human Behaviour", authors: ["International collaboration", "Bruno Vilela"], note: "Integrates human macroecology, population density and environmental conditions associated with the origin of agriculture." }
    ]
  },
  {
    title: "Methodological Development",
    slug: "desenvolvimento-metodologico",
    image: "/images/research/r-biodiversity-workstation.png",
    imageAlt: "R programming workstation with biodiversity data, maps and scientific visualizations",
    summary: "Methods, algorithms and open tools that expand the capacity to study biodiversity at broad scales.",
    description: "Methodological development transforms raw occurrence, taxonomy, distribution and academic-output data into reproducible analytical objects for the scientific community.",
    projects: ["letsR", "expowo", "NUPEX", "Teaching R to ecologists", "Reproducible analytical workflows"],
    publications: [
      { title: "letsR: a new R package for data handling and analysis in macroecology", year: 2015, journal: "Methods in Ecology and Evolution", doi: "10.1111/2041-210x.12401", authors: ["Bruno Vilela", "Fabricio Villalobos"], note: "Introduces an R package for handling distribution data and conducting macroecological analyses." },
      { title: "expowo: An R package for mining global plant diversity and distribution data", year: 2024, journal: "Applications in Plant Sciences", doi: "10.1002/aps3.11609", authors: ["Debora C. Zuanny", "Bruno Vilela", "Peter W. Moonlight", "Tiina E. Sarkinen", "Domingos Cardoso"], note: "Open tool for mining global plant diversity and distribution data." },
      { title: "The Challenges and Nuances of Teaching the R Programming Language to Ecologists", year: 2026, journal: "Oecologia Australis", authors: ["Mauricio Humberto Vancine", "Pavel Dodonov", "Bruno Vilela", "collaborators"], note: "Discusses training in R and data science for ecologists." }
    ]
  }
];
