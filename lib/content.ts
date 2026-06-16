import { readFileSync } from "fs";
import path from "path";

export type AboutContent = {
  hero: { name: string; title: string; unit: string; institution: string; areas: string[]; photo: string };
  biography: string[];
  cvUrl: string;
  lattesUrl: string;
  awards: string[];
  timeline: Array<{ period: string; title: string; description: string }>;
  researchOverview: string;
  collaborationText: string;
  profiles: Record<string, string>;
};

export type HomeContent = {
  hero: { eyebrow: string; title: string; subtitle: string; image: string };
  linkedin: { title: string; description: string; url: string };
};

function readJson<T>(relativePath: string): T {
  const filePath = path.join(process.cwd(), relativePath);
  return JSON.parse(readFileSync(filePath, "utf8")) as T;
}

export function getAboutContent() {
  return readJson<AboutContent>("content/about/index.json");
}

export function getHomeContent() {
  return readJson<HomeContent>("content/home/index.json");
}
