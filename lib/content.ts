import { readFileSync } from "fs";
import path from "path";
import type { Publication } from "@/data/publications";
import type { SoftwareItem } from "@/data/software";
import type { Supervision } from "@/data/supervision";

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

export type PublicationsContent = {
  intro: { eyebrow: string; title: string; description: string };
  publications: Publication[];
};

export type MetricsContent = {
  source: string;
  updatedAt: string;
  citations: number;
  hIndex: number;
  i10Index: number;
  citationsSince2021: number;
  hIndexSince2021: number;
  i10IndexSince2021: number;
};

export type TeamContent = {
  title: string;
  alumniTitle: string;
  alumniDescription: string;
  members: Supervision[];
};

export type SoftwareContent = {
  intro: { eyebrow: string; title: string; description: string };
  items: SoftwareItem[];
};

export type TeachingContent = {
  hero: { eyebrow: string; title: string; description: string; image: string };
  university: {
    eyebrow: string;
    title: string;
    description: string;
    areas: Array<{ title: string; description: string; examples: string[] }>;
  };
  online: {
    eyebrow: string;
    title: string;
    description: string;
    channel: { url: string; handle: string; description: string };
    courses: Array<{ title: string; level: string; description: string; image: string; url: string; topics: string[] }>;
  };
  openTeaching: { eyebrow: string; title: string; description: string };
};

export type ContactContent = {
  intro: { eyebrow: string; title: string; description: string };
  email: string;
  address: string;
  mapQuery: string;
  form: {
    namePlaceholder: string;
    emailPlaceholder: string;
    institutionPlaceholder: string;
    messagePlaceholder: string;
    buttonLabel: string;
  };
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

export function getPublicationsContent() {
  return readJson<PublicationsContent>("content/publications/index.json");
}

export function getMetricsContent() {
  return readJson<MetricsContent>("content/metrics/index.json");
}

export function getTeamContent() {
  return readJson<TeamContent>("content/team/index.json");
}

export function getSoftwareContent() {
  return readJson<SoftwareContent>("content/software/index.json");
}

export function getTeachingContent() {
  return readJson<TeachingContent>("content/teaching/index.json");
}

export function getContactContent() {
  return readJson<ContactContent>("content/contact/index.json");
}
