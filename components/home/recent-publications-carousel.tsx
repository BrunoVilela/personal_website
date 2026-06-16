"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Publication } from "@/data/publications";

export function RecentPublicationsCarousel({ publications }: { publications: Publication[] }) {
  const items = useMemo(() => publications.slice(0, 5), [publications]);
  const [index, setIndex] = useState(0);
  const current = items[index] ?? items[0];

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % items.length), 10000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (!current) return null;

  return (
    <section className="container py-16">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <Badge variant="accent">Recent Publications</Badge>
          <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">Latest published research</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            The five most recent publications of the lab.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/publicacoes">View all publications <ArrowRight /></Link>
          </Button>
        </div>
        <div className="overflow-hidden rounded-lg border bg-card shadow-soft">
          <AnimatePresence mode="wait">
            <motion.article
              key={current.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid min-h-[340px] content-between gap-6 p-6 md:p-8"
            >
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{current.year}</Badge>
                  <Badge variant="outline">{current.theme}</Badge>
                  <Badge variant="outline">{current.journal}</Badge>
                </div>
                <h3 className="mt-5 font-serif text-2xl font-bold leading-tight md:text-3xl">{current.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{current.abstract}</p>
                <p className="mt-4 text-sm text-muted-foreground">
                  {current.authors.slice(0, 5).join(", ")}{current.authors.length > 5 ? " et al." : ""}
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2">
                  {items.map((item, itemIndex) => (
                    <button
                      key={item.title}
                      type="button"
                      aria-label={`Show publication ${itemIndex + 1}`}
                      onClick={() => setIndex(itemIndex)}
                      className={itemIndex === index ? "h-2.5 w-8 rounded-full bg-accent" : "h-2.5 w-2.5 rounded-full bg-muted-foreground/30"}
                    />
                  ))}
                </div>
                {(current.doi || current.externalUrl) ? (
                  <Button asChild>
                    <a href={current.doi ? `https://doi.org/${current.doi}` : current.externalUrl}>Open publication <ExternalLink /></a>
                  </Button>
                ) : null}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
