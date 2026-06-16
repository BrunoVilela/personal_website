import type { Metadata, Viewport } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { Providers } from "@/components/providers";
import { SiteChrome } from "@/components/site/site-chrome";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Ecology and Data Science`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    "ecology",
    "biogeography",
    "macroecology",
    "biodiversity",
    "conservation",
    "data science",
    "UFBA"
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "profile",
    images: [{ url: "/og", width: 1200, height: 630, alt: siteConfig.name }]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og"]
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "pt-BR": "/",
      "en-US": "/en"
    },
    types: {
      "application/rss+xml": "/rss.xml"
    }
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#061d2f" }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Federal University of Bahia"
    },
    email: siteConfig.email,
    url: siteConfig.url,
    sameAs: [siteConfig.scholar, siteConfig.orcid, siteConfig.researchGate, siteConfig.github, siteConfig.linkedin, siteConfig.youtube],
    knowsAbout: [
      "Spatial Ecology",
      "Biogeography",
      "Macroecology",
      "Biodiversity",
      "Conservation",
      "Data Science"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
