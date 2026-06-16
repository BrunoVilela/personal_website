"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { publications } from "@/data/publications";
import { posts } from "@/data/blog";
import { researchThemes } from "@/data/research";
import { software } from "@/data/software";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function GlobalSearch({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const items = useMemo(
    () => [
      ...publications.map((item) => ({ title: item.title, href: "/publicacoes", type: "Publication" })),
      ...posts.map((item) => ({ title: item.title, href: `/blog/${item.slug}`, type: "Blog" })),
      ...researchThemes.map((item) => ({ title: item.title, href: `/pesquisa#${item.slug}`, type: "Research" })),
      ...software.map((item) => ({ title: item.name, href: "/software", type: "Software" }))
    ],
    []
  );
  const results = items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45" />
        <Dialog.Content className="fixed left-1/2 top-20 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 rounded-lg border bg-background p-4 shadow-soft">
          <div className="flex items-center gap-2">
            <Search className="size-5 text-muted-foreground" />
            <Input autoFocus placeholder="Search publications, themes, software and posts" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Dialog.Close asChild>
              <Button size="icon" variant="ghost" aria-label="Close search">
                <X />
              </Button>
            </Dialog.Close>
          </div>
          <div className="mt-4 grid gap-2">
            {(query ? results : items.slice(0, 6)).map((item) => (
              <Link
                key={`${item.type}-${item.title}`}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className="rounded-md border p-3 hover:bg-muted"
              >
                <span className="block text-xs font-semibold uppercase text-accent">{item.type}</span>
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
