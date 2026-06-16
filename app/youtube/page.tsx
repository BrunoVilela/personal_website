import { Metadata } from "next";
import { ExternalLink, PlayCircle } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { youtubeChannel, youtubeCourses } from "@/data/youtube";

export const metadata: Metadata = { title: "YouTube Courses" };

export default function YoutubePage() {
  return (
    <div className="container py-12">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="YouTube"
            title="Open courses and lectures"
            description={youtubeChannel.description}
          />
          <Button asChild className="mt-7" size="lg">
            <a href={youtubeChannel.url}>Visit {youtubeChannel.handle} <ExternalLink /></a>
          </Button>
        </div>
        <div className="aspect-video overflow-hidden rounded-lg border bg-ocean-950">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed?listType=user_uploads&list=BrunoVilelaEco"
            title="Bruno Vilela Eco YouTube channel"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {youtubeCourses.map((course) => (
          <Card key={course.title}>
            <CardContent className="p-6">
              <PlayCircle className="size-9 text-accent" />
              <Badge className="mt-4" variant="secondary">{course.level}</Badge>
              <h2 className="mt-4 font-serif text-2xl font-bold">{course.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{course.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {course.topics.map((topic) => <Badge key={topic} variant="outline">{topic}</Badge>)}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
