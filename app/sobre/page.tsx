import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Award, BookOpen, ExternalLink, FileText, GraduationCap, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { getAboutContent, getMetricsContent, getSoftwareContent, getTeamContent } from "@/lib/content";
import { getSyncedPublications } from "@/lib/orcid-publications";
import { projects } from "@/data/lab";
import { researchThemes } from "@/data/research";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Academic, scientific and institutional trajectory of Bruno Vilela de Moraes e Silva."
};

export default async function SobrePage() {
  const content = getAboutContent();
  const metrics = getMetricsContent();
  const team = getTeamContent();
  const software = getSoftwareContent();
  const sync = await getSyncedPublications();
  const completedPhd = team.members.filter((item) => item.level === "Doutorado" && item.status === "Concluída").length;
  const completedMsc = team.members.filter((item) => item.level === "Mestrado" && item.status === "Concluída").length;
  const completedTcc = team.members.filter((item) => item.level === "TCC" && item.status === "Concluída").length;
  const currentStudents = team.members.filter((item) => item.status === "Em andamento").length;
  const resourceStats = [
    { label: "Publications", value: sync.publications.length, suffix: "+" },
    { label: "Citations", value: metrics.citations },
    { label: "H-index", value: metrics.hIndex },
    { label: "Completed PhDs", value: completedPhd },
    { label: "Completed MScs", value: completedMsc },
    { label: "Completed undergraduate theses", value: completedTcc },
    { label: "Current supervisees", value: currentStudents },
    { label: "Software tools", value: software.items.length },
    { label: "Projects", value: projects.length }
  ];
  const supervisionLevels = [
    { level: "Doutorado", label: "PhD" },
    { level: "Mestrado", label: "MSc" },
    { level: "Iniciação Científica", label: "Undergraduate Research" },
    { level: "TCC", label: "Undergraduate Thesis" }
  ] as const;
  const supervisionSummary = supervisionLevels.map((entry) => ({
    ...entry,
    current: team.members.filter((item) => item.level === entry.level && item.status === "Em andamento").length,
    completed: team.members.filter((item) => item.level === entry.level && item.status === "Concluída").length
  }));

  return (
    <main>
      <section className="border-b bg-muted/35">
        <div className="container grid min-h-[78vh] items-center gap-10 py-14 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-lg border bg-card shadow-soft">
            <Image src={content.hero.photo} alt={content.hero.name} fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-[center_16%]" />
          </div>
          <div>
            <Badge variant="accent">About</Badge>
            <h1 className="mt-5 font-serif text-4xl font-bold tracking-normal md:text-6xl">{content.hero.name}</h1>
            <div className="mt-6 space-y-1 text-lg leading-8 text-muted-foreground">
              <p className="font-medium text-foreground">{content.hero.title}</p>
              <p>{content.hero.unit}</p>
              <p>{content.hero.institution}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {content.hero.areas.map((area) => <Badge key={area} variant="secondary">{area}</Badge>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><a href={content.cvUrl}>CV PDF <FileText /></a></Button>
              <Button asChild variant="outline" size="lg"><a href={content.lattesUrl}>Lattes <ExternalLink /></a></Button>
              <Button asChild variant="outline" size="lg"><Link href="/publicacoes">Publications <BookOpen /></Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr]">
          <article>
            <SectionHeading eyebrow="Biography" title="Academic and Scientific Trajectory" />
            <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
              {content.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <Card className="h-fit">
            <CardContent className="p-6">
              <Award className="size-8 text-accent" />
              <h2 className="mt-4 font-serif text-2xl font-bold">Recognitions</h2>
              <div className="mt-5 grid gap-4">
                {content.awards.map((award) => <p key={award} className="border-l-2 border-accent pl-4 text-sm leading-6 text-muted-foreground">{award}</p>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y bg-muted/35 py-16">
        <div className="container">
          <SectionHeading eyebrow="Indicators" title="Output, impact and student training" description="Indicators calculated from local data synchronized with ORCID/Lattes and public Google Scholar metrics." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {resourceStats.map((metric) => (
              <Card key={metric.label}>
                <CardContent className="p-5">
                  <p className="text-3xl font-bold text-accent">{formatNumber(metric.value)}{metric.suffix ?? ""}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <SectionHeading eyebrow="Timeline" title="Academic Timeline" />
        <div className="mt-8 grid gap-4">
          {content.timeline.map((item) => (
            <div key={`${item.period}-${item.title}`} className="grid gap-3 rounded-lg border bg-background p-5 md:grid-cols-[170px_1fr]">
              <p className="font-semibold text-accent">{item.period}</p>
              <div>
                <h2 className="font-serif text-xl font-bold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/35 py-16">
        <div className="container grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading eyebrow="Research" title="An integrated research program" description={content.researchOverview} />
            <Button asChild className="mt-6"><Link href="/pesquisa">Explore research lines <ExternalLink /></Link></Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {researchThemes.slice(0, 6).map((theme) => (
              <Link key={theme.slug} href={`/pesquisa#${theme.slug}`} className="rounded-lg border bg-background p-5 hover:shadow-soft">
                <h3 className="font-serif text-xl font-bold">{theme.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{theme.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Training" title="Human Resource Training" description="Summary of ongoing and completed supervisions recorded in imported CV data." />
            <Button asChild variant="outline" className="mt-6"><Link href="/equipe">View team and supervisions <Users /></Link></Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {supervisionSummary.map((item) => (
              <Card key={item.level}>
                <CardContent className="p-5">
                  <GraduationCap className="size-7 text-accent" />
                  <h3 className="mt-4 font-serif text-xl font-bold">{item.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.current} ongoing | {item.completed} completed</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <SectionHeading eyebrow="Profiles" title="CV and academic profiles" />
        <div className="mt-8 flex flex-wrap gap-3">
          {Object.entries(content.profiles).map(([label, url]) => (
            <Button key={label} asChild variant="outline"><a href={url}>{label} <ExternalLink /></a></Button>
          ))}
          <Button asChild><a href={content.cvUrl}>CV PDF <FileText /></a></Button>
        </div>
      </section>
    </main>
  );
}
