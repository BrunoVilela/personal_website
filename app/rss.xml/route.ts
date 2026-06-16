import { posts } from "@/data/blog";
import { siteConfig } from "@/data/site";

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel><title>${siteConfig.name}</title><link>${siteConfig.url}</link><description>${siteConfig.description}</description>${posts
    .map(
      (post) =>
        `<item><title>${post.title}</title><link>${siteConfig.url}/blog/${post.slug}</link><pubDate>${new Date(post.date).toUTCString()}</pubDate><description>${post.excerpt}</description></item>`
    )
    .join("")}</channel></rss>`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml" } });
}
