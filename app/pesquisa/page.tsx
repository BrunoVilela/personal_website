import { Metadata } from "next";
import { ResearchStory } from "@/components/research/research-story";

export const metadata: Metadata = {
  title: "Research",
  description: "Integrated scientific program on biodiversity, macroecology, evolution, conservation, climate change, ecological niches and cultural evolution."
};

export default function PesquisaPage() {
  return <ResearchStory />;
}
