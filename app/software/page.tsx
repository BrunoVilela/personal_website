import { Metadata } from "next";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { software } from "@/data/software";

export const metadata: Metadata = { title: "Software" };

export default function SoftwarePage() {
  return (
    <div className="container py-12">
      <SectionHeading eyebrow="Software" title="Open Scientific Tools" description="I develop and collaborate on open tools for biodiversity, macroecology, biogeography, phylogenetics and data science, mainly in R. Below is a selection of the main available packages and applications." />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {software.map((item) => (
          <Card key={item.name}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold">{item.name}</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="secondary">{item.language}</Badge>
                    <Badge variant="outline">{item.role}</Badge>
                  </div>
                </div>
                <Github className="size-6 text-accent" />
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.description}</p>
              {item.metrics.length ? (
                <div className="mt-5 grid gap-3 text-center text-sm sm:grid-cols-3">
                  {item.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-md bg-muted p-3">
                      <strong>{metric.value}</strong>
                      <span className="block text-xs text-muted-foreground">{metric.label}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-2">
                {item.examples.map((example) => <Badge key={example} variant="outline">{example}</Badge>)}
              </div>
              <div className="mt-6 flex gap-3">
                <Button asChild variant="outline"><a href={item.github}>GitHub <Github /></a></Button>
                <Button asChild><a href={item.docs}>Docs <ExternalLink /></a></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
