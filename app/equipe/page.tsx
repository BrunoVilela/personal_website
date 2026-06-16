import { Metadata } from "next";
import { ExternalLink, FileText, GraduationCap, IdCard, Search } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supervision } from "@/data/supervision";

export const metadata: Metadata = { title: "Team" };

export default function EquipePage() {
  const current = supervision.filter((item) => item.status === "Em andamento");
  const completed = supervision.filter((item) => item.status === "Concluída");

  return (
    <div className="container py-12">
      <section>
        <SectionHeading
          title="Current Team"
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {current.map((item) => (
            <TeamCard key={supervisionKey(item)} item={item} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          title="Alumni"
          description="Former PhD, MSc, undergraduate research and thesis supervisees."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {completed.map((item) => (
            <TeamCard key={supervisionKey(item)} item={item} />
          ))}
        </div>
      </section>

    </div>
  );
}

function supervisionKey(item: (typeof supervision)[number]) {
  return `${item.student}-${item.title}-${item.level}-${item.status}-${item.year}`;
}

function TeamCard({ item }: { item: (typeof supervision)[number] }) {
  const levelLabel = formatLevel(item.level);
  const statusLabel = item.status === "Em andamento" ? "Ongoing" : "Completed";
  const orientationLabel = item.orientation ? formatOrientation(item.orientation) : null;
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {item.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.photo} alt={item.student} className="size-16 rounded-md object-cover" />
          ) : (
            <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-secondary text-3xl" aria-hidden="true">
              {item.emoji ?? "🎓"}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-serif text-xl font-bold leading-tight">{item.student}</h3>
            <p className="mt-1 text-sm text-accent">{item.status === "Em andamento" ? "Current supervisee" : "Alumnus/Alumna"}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="mt-4" variant={item.status === "Em andamento" ? "accent" : "secondary"}>{statusLabel}</Badge>
          <Badge variant="outline">{levelLabel}</Badge>
          {orientationLabel ? <Badge variant="outline">{orientationLabel}</Badge> : null}
          <Badge variant="outline">{item.year}</Badge>
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.title}</p>
        <p className="mt-3 text-sm font-medium">{item.program}</p>
        <p className="text-sm text-muted-foreground">{item.institution}</p>
        {item.funding ? <p className="mt-2 text-xs uppercase tracking-wide text-accent">{item.funding}</p> : null}
        <div className="mt-5 flex flex-wrap gap-2">
          {item.lattes ? <ProfileButton href={item.lattes} label="Lattes" icon="lattes" /> : null}
          {item.scholar ? <ProfileButton href={item.scholar} label="Scholar" icon="scholar" /> : null}
          {item.orcid ? <ProfileButton href={item.orcid} label="ORCID" icon="orcid" /> : null}
          {item.thesisUrl ? <ProfileButton href={item.thesisUrl} label={item.level === "Doutorado" ? "Thesis" : "Dissertation"} icon="thesis" /> : null}
          {!item.lattes && !item.scholar && !item.orcid && !item.thesisUrl ? (
            <span className="text-xs text-muted-foreground">No public profiles found.</span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

function formatLevel(level: (typeof supervision)[number]["level"]) {
  const labels = {
    Doutorado: "PhD",
    Mestrado: "MSc",
    "Iniciação Científica": "Undergraduate Research",
    TCC: "Undergraduate Thesis"
  } as const;
  return labels[level];
}

function formatOrientation(orientation: NonNullable<(typeof supervision)[number]["orientation"]>) {
  const labels = {
    "Orientação principal": "Main supervision",
    Coorientação: "Co-supervision",
    Orientação: "Supervision"
  } as const;
  return labels[orientation];
}

function ProfileButton({ href, label, icon }: { href: string; label: string; icon: "lattes" | "scholar" | "orcid" | "thesis" }) {
  const Icon = icon === "thesis" ? FileText : icon === "scholar" ? Search : icon === "orcid" ? IdCard : GraduationCap;
  return (
    <Button asChild size="sm" variant="outline">
      <a href={href}>
        <Icon /> {label} <ExternalLink className="size-3" />
      </a>
    </Button>
  );
}
