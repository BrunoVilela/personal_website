import { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicationChart, CitationChart } from "@/components/charts/impact-charts";
import { CoauthorNetwork } from "@/components/charts/coauthor-network";
import { CollaborationMap } from "@/components/maps/collaboration-map";

export const metadata: Metadata = { title: "Impacto Científico" };

export default function ImpactoPage() {
  return (
    <div className="container py-12">
      <SectionHeading eyebrow="Scientific impact" title="Dashboard of publications, citations and collaboration" description="Interactive visualizations with Recharts, D3.js and Leaflet. In production, data can come from ORCID, CrossRef, OpenAlex and institutional repositories." />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>Publications by year</CardTitle></CardHeader><CardContent><PublicationChart /></CardContent></Card>
        <Card><CardHeader><CardTitle>Citations by year</CardTitle></CardHeader><CardContent><CitationChart /></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Coauthorship network</CardTitle></CardHeader><CardContent><CoauthorNetwork /></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>World map of publications and collaborations</CardTitle></CardHeader><CardContent><CollaborationMap /></CardContent></Card>
      </div>
    </div>
  );
}
