import Link from "next/link";
import { ExternalLink, Github, Mail, MapPin } from "lucide-react";
import { navigation, siteConfig } from "@/data/site";

const profileLinks = [
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "Instagram", href: siteConfig.instagram },
  { label: "YouTube", href: siteConfig.youtube },
  { label: "CV", href: siteConfig.cv },
  { label: "Lattes", href: siteConfig.lattes },
  { label: "Google Scholar", href: siteConfig.scholar },
  { label: "GitHub", href: siteConfig.github },
  { label: "ResearchGate", href: siteConfig.researchGate },
  { label: "Research ID", href: siteConfig.researchId },
  { label: "ORCID", href: siteConfig.orcid }
];

export function Footer() {
  return (
    <footer className="border-t bg-ocean-950 text-white">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.25fr_0.8fr_1.25fr]">
        <div>
          <h2 className="font-serif text-2xl font-bold">{siteConfig.name}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/72">
            Professor of Ecology at UFBA, working on biogeography, macroecology, conservation and ecological data science.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/78">
            <span className="inline-flex items-center gap-2"><Mail className="size-4" /> {siteConfig.email}</span>
            <span className="inline-flex items-center gap-2"><MapPin className="size-4" /> Salvador, Brazil</span>
            <a className="inline-flex items-center gap-2 hover:text-white" href={siteConfig.github}><Github className="size-4" /> GitHub</a>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/55">Navigation</h3>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {navigation.map((item) => <Link className="text-white/72 hover:text-white" href={item.href} key={item.href}>{item.label}</Link>)}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/55">Profiles and Networks</h3>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {profileLinks.map((item) => (
              <a key={item.label} href={item.href} className="inline-flex items-center gap-1 rounded-md border border-white/15 px-2.5 py-1.5 text-white/78 hover:border-white/45 hover:text-white">
                {item.label} <ExternalLink className="size-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
