import { MetadataRoute } from "next";
import { navigation, siteConfig } from "@/data/site";
import { posts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = navigation.concat([{ label: "CV", href: "/cv" }, { label: "Admin", href: "/admin" }]);
  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route.href === "/" ? 1 : 0.7
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
