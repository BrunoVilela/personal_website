import { Metadata } from "next";
import { Download } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { publications } from "@/data/publications";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "CV" };

export default function CvPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <SectionHeading eyebrow="CV online" title={siteConfig.name} description={`${siteConfig.title}. ${siteConfig.institution}.`} />
        <Button variant="outline"><Download /> PDF</Button>
      </div>
      <section className="mt-10 grid gap-8">
        <div><h2 className="font-serif text-2xl font-bold">Interesses</h2><p className="mt-3 text-muted-foreground">Ecologia espacial, macroecologia, biogeografia, conservação, evolução, modelagem ecológica e ciência de dados.</p></div>
        <div><h2 className="font-serif text-2xl font-bold">Selected publications</h2><ul className="mt-4 grid gap-3">{publications.slice(0, 5).map((paper) => <li key={paper.title} className="rounded-lg border p-4"><strong>{paper.year}</strong> {paper.title}. <span className="text-muted-foreground">{paper.journal}</span></li>)}</ul></div>
        <div><h2 className="font-serif text-2xl font-bold">Experience</h2><p className="mt-3 text-muted-foreground">Professor of Ecology, leadership in open-science projects and software development for quantitative ecology.</p></div>
      </section>
    </div>
  );
}
