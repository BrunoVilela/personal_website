import { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContatoPage() {
  return (
    <div className="container py-12">
      <SectionHeading eyebrow="Contact" title="Get in touch" description="For collaborations, supervision, science communication or academic activities, use the form or institutional contact channels." />
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardContent className="grid gap-4 p-6">
            <div className="grid gap-2 md:grid-cols-2"><Input placeholder="Name" /><Input type="email" placeholder="E-mail" /></div>
            <Input placeholder="Institution" />
            <Textarea placeholder="Message" />
            <Button>Send message</Button>
          </CardContent>
        </Card>
        <div className="grid gap-4">
          <Card><CardContent className="p-6"><Mail className="size-6 text-accent" /><h2 className="mt-3 font-serif text-xl font-bold">E-mail</h2><p className="mt-2 text-sm text-muted-foreground">{siteConfig.email}</p></CardContent></Card>
          <Card><CardContent className="p-6"><MapPin className="size-6 text-accent" /><h2 className="mt-3 font-serif text-xl font-bold">Address</h2><p className="mt-2 text-sm text-muted-foreground">{siteConfig.address}</p></CardContent></Card>
          <iframe title="UFBA map" className="min-h-72 w-full rounded-lg border" loading="lazy" src="https://www.google.com/maps?q=Instituto%20de%20Biologia%20UFBA%20Salvador&output=embed" />
        </div>
      </div>
    </div>
  );
}
