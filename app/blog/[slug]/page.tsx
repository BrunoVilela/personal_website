import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { posts } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  return { title: post?.title ?? "Blog" };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  return (
    <article className="container max-w-3xl py-12">
      <Badge variant="accent">{post.category}</Badge>
      <h1 className="mt-5 font-serif text-4xl font-bold text-balance">{post.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{post.date}</p>
      <div className="mt-5 flex flex-wrap gap-2">{post.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}</div>
      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <p>{post.content}</p>
        <p>
          Este post é um exemplo de conteúdo científico curto. Em produção, os textos podem ser carregados por MDX,
          CMS headless ou repositório Git, preservando revisão por pares interna e versionamento.
        </p>
      </div>
    </article>
  );
}
