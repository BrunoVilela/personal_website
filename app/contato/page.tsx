import { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getContactContent } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default function ContatoPage() {
  const content = getContactContent();
  return (
    <div className="container py-12">
      <SectionHeading eyebrow={content.intro.eyebrow} title={content.intro.title} description={content.intro.description} />
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardContent className="grid gap-4 p-6">
            <div className="grid gap-2 md:grid-cols-2"><Input placeholder={content.form.namePlaceholder} /><Input type="email" placeholder={content.form.emailPlaceholder} /></div>
            <Input placeholder={content.form.institutionPlaceholder} />
            <Textarea placeholder={content.form.messagePlaceholder} />
            <Button>{content.form.buttonLabel}</Button>
          </CardContent>
        </Card>
        <div className="grid gap-4">
          <Card><CardContent className="p-6"><Mail className="size-6 text-accent" /><h2 className="mt-3 font-serif text-xl font-bold">E-mail</h2><p className="mt-2 text-sm text-muted-foreground">{content.email}</p></CardContent></Card>
          <Card><CardContent className="p-6"><MapPin className="size-6 text-accent" /><h2 className="mt-3 font-serif text-xl font-bold">Address</h2><p className="mt-2 text-sm text-muted-foreground">{content.address}</p></CardContent></Card>
          <iframe title="UFBA map" className="min-h-72 w-full rounded-lg border" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(content.mapQuery)}&output=embed`} />
        </div>
      </div>
    </div>
  );
}
