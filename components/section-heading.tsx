import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: Props) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <Badge variant="accent">{eyebrow}</Badge> : null}
      <h2 className="mt-4 font-serif text-3xl font-bold tracking-normal text-balance md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">{description}</p> : null}
    </div>
  );
}
