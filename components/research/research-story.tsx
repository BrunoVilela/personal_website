
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ExternalLink, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/animated";
import { researchThemes, type ResearchTheme } from "@/data/research";
import { cn } from "@/lib/utils";

const themeQuestions: Record<string, string[]> = {
  "macroecologia-macroevolucao": [
    "Why do the tropics have more species?",
    "How does evolution generate biodiversity?",
    "Which factors explain the global distribution of organisms?",
    "How have historical events shaped life today?"
  ],
  "nicho-ecologico": [
    "What determines where a species can live?",
    "How do niches evolve?",
    "How do invasive species colonize new environments?",
    "How can future distributions be predicted?"
  ],
  "mudancas-climaticas": [
    "Which species are most vulnerable?",
    "Where will future climate refugia be?",
    "How will biodiversity respond to global warming?",
    "Which regions require greater conservation attention?"
  ],
  conservacao: [
    "Which species are most threatened?",
    "Where should conservation efforts be concentrated?",
    "How can protected areas be optimized?",
    "How can extinction risks be reduced?"
  ],
  "evolucao-cultural": [
    "How are cultures distributed across the planet?",
    "Which factors influence linguistic diversity?",
    "Are there similar patterns in biological and cultural diversity?",
    "How do environmental changes affect cultural systems?"
  ],
  "desenvolvimento-metodologico": [
    "How can biodiversity analyses become more reproducible?",
    "Which tools accelerate open science?",
    "How can spatial, taxonomic and evolutionary data be integrated?",
    "How can new researchers be trained in data science?"
  ]
};

const themeStory: Record<string, { title: string; text: string }> = {
  "macroecologia-macroevolucao": {
    title: "Why is biodiversity not evenly distributed across the planet?",
    text: "We investigate the ecological and evolutionary processes responsible for global biodiversity patterns. Our goal is to understand how species arise, persist and disappear through time and space."
  },
  "nicho-ecologico": {
    title: "How do species respond to the environments in which they live?",
    text: "We seek to understand how organisms interact with environmental conditions and how these relationships change through evolution and global change."
  },
  "mudancas-climaticas": {
    title: "How will life respond to climate change?",
    text: "We use ecological and climate models to understand how species, ecosystems and entire regions may be affected by ongoing environmental change."
  },
  conservacao: {
    title: "Transforming scientific knowledge into conservation action",
    text: "Our research aims to provide scientific evidence to support decisions for biodiversity protection and conservation planning."
  },
  "evolucao-cultural": {
    title: "Understanding cultural diversity through the lenses of ecology and evolution",
    text: "We apply concepts originally developed to study biodiversity to understand global patterns of cultural, linguistic and human diversity."
  },
  "desenvolvimento-metodologico": {
    title: "Developing tools to expand the frontiers of science",
    text: "We create methods, algorithms and software that help researchers worldwide investigate questions related to biodiversity, conservation and evolution."
  }
};

const diagramOrder = [
  "macroecologia-macroevolucao",
  "nicho-ecologico",
  "mudancas-climaticas",
  "conservacao",
  "evolucao-cultural",
  "desenvolvimento-metodologico"
];


export function ResearchStory() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, 170]);
  const activeInitial = researchThemes.find((theme) => theme.slug === "macroecologia-macroevolucao") ?? researchThemes[0];
  const [activeTheme, setActiveTheme] = useState(activeInitial);
  const orderedThemes = diagramOrder.map((slug) => researchThemes.find((theme) => theme.slug === slug)).filter(Boolean) as ResearchTheme[];

  function scrollToProgram() {
    document.getElementById("programa-integrado")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <section className="relative flex min-h-screen items-center overflow-hidden text-white">
        <motion.div style={{ y: heroY }} className="absolute inset-0 -top-24 bottom-0">
          <Image
            src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2200&q=90"
            alt="Panoramic view of a lush tropical forest representing biodiversity and ecological complexity"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ocean-950/58" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background to-transparent" />
        <div className="container relative z-10 py-24">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="max-w-4xl">
            <Badge variant="secondary" className="bg-white/14 text-white backdrop-blur">Scientific Program</Badge>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-bold tracking-normal text-balance md:text-7xl">Understanding the diversity of life on Earth</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/86 md:text-2xl">From biodiversity to human cultures, we investigate the processes that shape life across space, time and environmental change.</p>
            <Button onClick={scrollToProgram} size="lg" className="mt-8 bg-white text-ocean-950 hover:bg-white/90">
              Explore our research <ArrowDown />
            </Button>
          </motion.div>
        </div>
      </section>

      <nav className="sticky top-16 z-30 border-y bg-background/92 backdrop-blur supports-[backdrop-filter]:bg-background/78">
        <div className="container flex gap-2 overflow-x-auto py-3">
          {orderedThemes.map((theme) => (
            <a key={theme.slug} href={`#${theme.slug}`} className="shrink-0 rounded-md border bg-card px-3 py-2 text-xs font-semibold transition-colors hover:border-accent hover:text-accent md:text-sm">
              {theme.title}
            </a>
          ))}
        </div>
      </nav>

      <section id="programa-integrado" className="container scroll-mt-20 py-20">
        <FadeIn>
          <div className="max-w-3xl">
            <Badge variant="accent">Integrated Scientific Program</Badge>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">An integrated research program</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">Our research seeks to understand how ecological, evolutionary, environmental and cultural processes interact to shape biological and human diversity from local to global scales.</p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <FadeIn>
            <div className="relative min-h-[34rem] overflow-hidden rounded-lg border bg-card p-6 scientific-grid">
              <div className="absolute left-1/2 top-1/2 z-10 grid size-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-background text-center shadow-soft">
                <div>
                  <Leaf className="mx-auto size-7 text-accent" />
                  <p className="mt-2 font-serif text-2xl font-bold">Biodiversity</p>
                </div>
              </div>
              <div className="grid min-h-[30rem] grid-cols-2 content-between gap-4 md:grid-cols-3">
                {orderedThemes.map((theme, index) => (
                  <button
                    key={theme.slug}
                    type="button"
                    onMouseEnter={() => setActiveTheme(theme)}
                    onFocus={() => setActiveTheme(theme)}
                    onClick={() => setActiveTheme(theme)}
                    className={cn(
                      "relative z-20 rounded-lg border bg-background/92 p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      activeTheme.slug === theme.slug && "border-accent bg-accent text-accent-foreground"
                    )}
                  >
                    <span className="text-xs font-semibold uppercase opacity-75">0{index + 1}</span>
                    <span className="mt-2 block font-serif text-lg font-bold leading-tight">{theme.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-lg border bg-card p-6">
              <Badge variant="secondary">Theme in focus</Badge>
              <h3 className="mt-4 font-serif text-3xl font-bold">{activeTheme.title}</h3>
              <p className="mt-4 leading-7 text-muted-foreground">{activeTheme.summary}</p>
              <h4 className="mt-6 font-semibold">Associated projects</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeTheme.projects.slice(0, 4).map((project) => <Badge key={project} variant="outline">{project}</Badge>)}
              </div>
              <h4 className="mt-6 font-semibold">Related publications</h4>
              <div className="mt-3 grid gap-3">
                {activeTheme.publications.slice(0, 2).map((publication) => (
                  <a key={publication.title} href={publication.doi ? `https://doi.org/${publication.doi}` : "/publicacoes"} className="rounded-md border bg-background p-3 text-sm transition-colors hover:border-accent">
                    <span className="font-medium leading-snug">{publication.title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{publication.journal}, {publication.year}</span>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="grid gap-0">
        {orderedThemes.map((theme, index) => (
          <ResearchThemeSection key={theme.slug} theme={theme} index={index} />
        ))}
      </section>

      <section className="container py-20">
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="accent">Synthesis</Badge>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">Big questions, multiple scales</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">From species evolution to human cultural diversity, our research seeks to understand how complex systems emerge, change and persist over time.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mx-auto mt-10 max-w-5xl rounded-lg border bg-card p-8 text-center shadow-soft">
            <div className="mx-auto grid size-40 place-items-center rounded-full border bg-background p-4 text-center font-serif text-lg font-bold text-accent md:size-48">Origin, maintenance and future of biological and cultural diversity</div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {orderedThemes.map((theme) => <Badge key={theme.slug} variant="secondary">{theme.title}</Badge>)}
            </div>
          </div>
        </FadeIn>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link href="/equipe">Meet our team <ArrowRight /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="/publicacoes">Explore our publications <ArrowRight /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="/contato">Get in touch <ArrowRight /></Link></Button>
        </div>
      </section>
    </main>
  );
}

function ResearchThemeSection({ theme, index }: { theme: ResearchTheme; index: number }) {
  const story = themeStory[theme.slug];
  const questions = themeQuestions[theme.slug] ?? [];
  return (
    <section id={theme.slug} className={cn("scroll-mt-20 py-20", index % 2 === 0 ? "bg-background" : "bg-muted/35")}>
      <div className="container grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <FadeIn>
          <div className="relative min-h-[28rem] overflow-hidden rounded-lg border bg-muted shadow-soft">
            <Image src={theme.image} alt={theme.imageAlt} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" unoptimized={theme.image.includes("commons.wikimedia.org")} />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div>
            <Badge variant="accent">Research Line {index + 1}</Badge>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">{theme.title}</h2>
            <h3 className="mt-5 font-serif text-2xl font-bold leading-tight text-accent">{story.title}</h3>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{story.text}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {questions.map((question) => (
                <div key={question} className="rounded-lg border bg-card p-4 text-sm leading-6 text-muted-foreground">{question}</div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="outline"><Link href="/publicacoes">Publications <ArrowRight /></Link></Button>
            </div>
          </div>
        </FadeIn>
      </div>
      <div className="container mt-10">
        <div className="flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="secondary">Selected Publications</Badge>
            <h3 className="mt-3 font-serif text-3xl font-bold">Evidence and contributions from this research line</h3>
          </div>
          <Button asChild variant="outline">
            <Link href="/publicacoes">View all related publications <ArrowRight /></Link>
          </Button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {theme.publications.slice(0, 5).map((publication) => (
            <FadeIn key={publication.title}>
              <Card className="h-full">
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{publication.year}</Badge>
                    <span className="text-xs font-medium text-muted-foreground">{publication.journal}</span>
                  </div>
                  <h4 className="mt-3 font-serif text-lg font-bold leading-snug">{publication.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{publication.authors.join(", ")}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{publication.note}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    {publication.doi ? <a className="inline-flex items-center gap-1 font-medium text-accent hover:underline" href={`https://doi.org/${publication.doi}`}>DOI {publication.doi} <ExternalLink className="size-3" /></a> : null}
                    <Link className="font-medium text-accent hover:underline" href="/publicacoes">Publication link</Link>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
