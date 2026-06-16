import Link from "next/link";
import { Metadata } from "next";
import { Rss } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/blog";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  return (
    <div className="container py-12">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionHeading eyebrow="Scientific blog" title="Notes on research, teaching and data science" description="Structure compatible with Markdown/MDX, tags, global search and RSS." />
        <Button asChild variant="outline"><a href="/rss.xml">RSS <Rss /></a></Button>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">{categories.map((category) => <Badge key={category} variant="secondary">{category}</Badge>)}</div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug}>
            <CardContent className="p-6">
              <Badge variant="accent">{post.category}</Badge>
              <p className="mt-4 text-sm text-muted-foreground">{post.date}</p>
              <h2 className="mt-2 font-serif text-xl font-bold"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">{post.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
