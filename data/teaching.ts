export const courses = [
  {
    name: "Population and Community Ecology",
    term: "Undergraduate and graduate",
    syllabus: "Population dynamics, ecological interactions, community structure, diversity, niche, coexistence and conservation.",
    readings: ["Begon, Townsend & Harper", "Gotelli", "Ricklefs", "Vellend"],
    materials: ["Classes on population growth", "Community ecology practicals", "Ecological datasets"],
    exercises: ["Population models in R", "Rarefaction curves", "Alpha, beta and gamma diversity"],
    code: ["scripts/modelos-populacionais.R", "scripts/diversidade-comunidades.R"]
  },
  {
    name: "R Programming Applied to Biodiversity Studies",
    term: "Undergraduate and graduate",
    syllabus: "Foundations of R programming, project organization, data manipulation, visualization, APIs, spatial analysis and reproducibility.",
    readings: ["R for Data Science", "Wilson et al. on good computational practices", "Hampton et al. on ecological data science"],
    materials: ["RStudio projects", "tidyverse tutorials", "Introduction to GBIF data and spatial packages"],
    exercises: ["Cleaning occurrence data", "Maps with sf and terra", "Reproducible reports in Quarto"],
    code: ["scripts/intro-r-biodiversidade.R", "scripts/gbif-workflow.R"]
  },
  {
    name: "Biostatistics",
    term: "Undergraduate and graduate",
    syllabus: "Statistical inference, linear models, generalized models, sampling design, multivariate statistics and ecological interpretation.",
    readings: ["Zuur et al.", "Quinn & Keough", "Legendre & Legendre", "Gelman et al."],
    materials: ["Linear model notes", "Exercise spreadsheets", "Visualization tutorials"],
    exercises: ["GLMs for count data", "PCA and NMDS", "PERMANOVA and assumption checks"],
    code: ["scripts/glm-bioestatistica.R", "scripts/multivariada.R"]
  }
];
