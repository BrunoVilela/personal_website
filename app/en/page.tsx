import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";

export default function EnglishPage() {
  return (
    <div className="container py-12">
      <SectionHeading eyebrow="English" title="Spatial Ecology, Biogeography and Data Science" description="English-language structure is ready for full bilingual content. The Portuguese pages currently contain the complete example content." />
      <Button asChild className="mt-8"><Link href="/">Portuguese version</Link></Button>
    </div>
  );
}
