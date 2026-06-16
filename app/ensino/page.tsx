import Image from "next/image";
import { Metadata } from "next";
import { ExternalLink, GraduationCap, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { youtubeChannel, youtubeCourses } from "@/data/youtube";

export const metadata: Metadata = {
  title: "Teaching",
  description: "University teaching and open online courses in ecology, biodiversity, biostatistics, scientific programming and data science."
};

const teachingAreas = [
  {
    title: "Ecology",
    description: "Courses focused on the ecological processes that structure populations, communities and ecosystems.",
    examples: ["Population Ecology", "Community Ecology", "Ecology and Society"]
  },
  {
    title: "Biostatistics",
    description: "Statistical methods applied to biological, ecological and evolutionary data.",
    examples: ["Biostatistics", "Introduction to Research Methods in Ecology and Applications"]
  },
  {
    title: "Scientific Programming",
    description: "Training in programming and data analysis using modern tools for scientific research.",
    examples: ["R programming applied to biodiversity studies"]
  },
  {
    title: "Geographic Information Systems (GIS)",
    description: "Geospatial methods applied to ecology, conservation and biogeography.",
    examples: ["GIS applied to Ecology"]
  }
];

export default function EnsinoPage() {
  return (
    <main>
      <section className="border-b bg-muted/35">
        <div className="container grid min-h-[70vh] items-center gap-10 py-14 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Badge variant="accent">Teaching</Badge>
            <h1 className="mt-5 font-serif text-4xl font-bold tracking-normal md:text-6xl">Teaching and Student Training</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              I teach undergraduate and graduate students in ecology, biodiversity, scientific programming and data science, while also making open educational materials available to the scientific community.
            </p>
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-lg border bg-card shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85"
              alt="Simple classroom setting"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="max-w-3xl">
          <Badge variant="secondary">University Teaching</Badge>
          <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">Courses Taught</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            At the Federal University of Bahia, I have taught undergraduate and graduate courses in ecology, biostatistics, scientific programming and geographic information systems.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {teachingAreas.map((area) => (
            <Card key={area.title} className="h-full">
              <CardContent className="p-6">
                <GraduationCap className="size-7 text-accent" />
                <h3 className="mt-4 font-serif text-2xl font-bold">{area.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{area.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {area.examples.map((example) => <Badge key={example} variant="secondary">{example}</Badge>)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/35 py-16">
        <div className="container">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <Badge variant="accent">Online Courses</Badge>
              <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">Open Courses and Educational Content</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Beyond university teaching, I maintain a YouTube channel with courses, tutorials and materials for students, researchers and professionals interested in ecology, biodiversity and data science.
              </p>
            </div>
            <Button asChild variant="outline">
              <a href={youtubeChannel.url}>Visit {youtubeChannel.handle} <ExternalLink /></a>
            </Button>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {youtubeCourses.map((course) => (
              <Card key={course.title} className="overflow-hidden">
                <div className="relative h-44 bg-muted">
                  <Image src={course.image} alt={course.title} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
                </div>
                <CardContent className="p-5">
                  <Badge variant="secondary">{course.level}</Badge>
                  <h3 className="mt-4 font-serif text-2xl font-bold">{course.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{course.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {course.topics.map((topic) => <Badge key={topic} variant="outline">{topic}</Badge>)}
                  </div>
                  <Button asChild className="mt-5" variant="outline">
                    <a href={course.url}>Watch on YouTube <PlayCircle /></a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="accent">Open Teaching</Badge>
          <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">Open Knowledge</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Scientific training should extend beyond the classroom. For this reason, a substantial part of the material produced for my courses is made freely available through courses, videos and online resources, expanding access to knowledge for students and researchers across institutions and countries.
          </p>
          <Button asChild size="lg" className="mt-7">
            <a href={youtubeChannel.url}>Visit YouTube Channel <ExternalLink /></a>
          </Button>
        </div>
      </section>
    </main>
  );
}
