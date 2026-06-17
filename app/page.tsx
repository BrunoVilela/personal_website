import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, ExternalLink, Github, GraduationCap, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animated";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/data/site";
import { researchThemes } from "@/data/research";
import { software } from "@/data/software";
import { getSyncedPublications } from "@/lib/orcid-publications";
import { getHomeContent } from "@/lib/content";
import { RecentPublicationsCarousel } from "@/components/home/recent-publications-carousel";

export default async function HomePage() {
  const content = getHomeContent();
  const sync = await getSyncedPublications();
  const recentPublications = [...sync.publications].sort((a, b) => b.year - a.year).slice(0, 5);

  return (
    <>
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden border-b bg-ocean-950 text-white">
        <Image
          src={content.hero.image}
          alt="Paisagem tropical exuberante representando biodiversidade"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/95 via-ocean-950/62 to-ocean-950/12" />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/70 via-transparent to-transparent" />
        <div className="container relative grid min-h-[calc(100vh-4rem)] items-end py-14 md:items-center">
          <FadeIn>
            <div className="max-w-3xl pb-8 md:pb-0">
              <Badge className="bg-white text-ocean-950">{content.hero.eyebrow}</Badge>
              <h1 className="mt-6 font-serif text-4xl font-bold tracking-normal text-balance md:text-6xl">
                {content.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 md:text-xl">
                {content.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-white text-ocean-950 hover:bg-white/90">
                  <Link href="/sobre">About Bruno <ArrowRight /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/35 bg-white/10 text-white hover:bg-white/18">
                  <a href={siteConfig.scholar}>Google Scholar <ExternalLink /></a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/35 bg-white/10 text-white hover:bg-white/18">
                  <a href={siteConfig.orcid}>ORCID <ExternalLink /></a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/35 bg-white/10 text-white hover:bg-white/18">
                  <a href={siteConfig.github}>GitHub <Github /></a>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-y bg-muted/45 py-16">
        <div className="container grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <SectionHeading
            eyebrow="Research Program"
            title="Big questions about biodiversity across space, time and culture."
            description="Six connected research lines organize the lab's work on biodiversity, evolution, climate change, conservation, cultural systems and open quantitative methods."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {researchThemes.map((theme, index) => (
              <Link
                key={theme.slug}
                href={`/pesquisa#${theme.slug}`}
                className="group relative overflow-hidden rounded-lg border bg-background p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-soft"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-forest-600 via-accent to-ocean-700 opacity-75" />
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowRight className="mt-1 size-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold leading-tight">{theme.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{theme.summary}</p>
                <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Explore research line
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RecentPublicationsCarousel publications={recentPublications} />

      <section className="bg-ocean-950 py-16 text-white">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Badge className="bg-white text-ocean-950">Scientific Software</Badge>
            <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">Open tools for quantitative ecology</h2>
            <p className="mt-4 text-white/72">Packages and applications for spatial modelling, macroecology, sampling bias, taxonomy and conservation assessment.</p>
            <Button asChild className="mt-6 bg-white text-ocean-950 hover:bg-white/90">
              <Link href="/software">View software <Code2 /></Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {software.slice(0, 4).map((item) => (
              <div key={item.name} className="rounded-lg border border-white/15 bg-white/8 p-4">
                <p className="font-semibold">{item.name}</p>
                <p className="mt-1 text-sm text-white/65">{item.language}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/40 py-16">
        <div className="container grid gap-6 md:grid-cols-3">
          {[
            { icon: Microscope, title: "Research", href: "/pesquisa" },
            { icon: BookOpen, title: "Publications", href: "/publicacoes" },
            { icon: GraduationCap, title: "Teaching", href: "/ensino" }
          ].map((item) => (
            <Link key={item.title} href={item.href} className="rounded-lg border bg-background p-6 hover:shadow-soft">
              <item.icon className="size-8 text-accent" />
              <h2 className="mt-4 font-serif text-2xl font-bold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">Open this section of the academic website.</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
