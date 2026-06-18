import Image from "next/image";
import { Metadata } from "next";
import { ExternalLink, GraduationCap, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTeachingContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Teaching",
  description: "University teaching and open online courses in ecology, biodiversity, biostatistics, scientific programming and data science."
};

export default function EnsinoPage() {
  const content = getTeachingContent();
  return (
    <main>
      <section className="border-b bg-muted/35">
        <div className="container grid min-h-[70vh] items-center gap-10 py-14 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Badge variant="accent">{content.hero.eyebrow}</Badge>
            <h1 className="mt-5 font-serif text-4xl font-bold tracking-normal md:text-6xl">{content.hero.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              {content.hero.description}
            </p>
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-lg border bg-card shadow-soft">
            <Image
              src={content.hero.image}
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
          <Badge variant="secondary">{content.university.eyebrow}</Badge>
          <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">{content.university.title}</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {content.university.description}
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {content.university.areas.map((area) => (
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
              <Badge variant="accent">{content.online.eyebrow}</Badge>
              <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">{content.online.title}</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {content.online.description}
              </p>
            </div>
            <Button asChild variant="outline">
              <a href={content.online.channel.url}>Visit {content.online.channel.handle} <ExternalLink /></a>
            </Button>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.online.courses.map((course) => (
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
          <Badge variant="accent">{content.openTeaching.eyebrow}</Badge>
          <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">{content.openTeaching.title}</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {content.openTeaching.description}
          </p>
          <Button asChild size="lg" className="mt-7">
            <a href={content.online.channel.url}>Visit YouTube Channel <ExternalLink /></a>
          </Button>
        </div>
      </section>
    </main>
  );
}
