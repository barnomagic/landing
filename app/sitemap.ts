import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/modelos";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://pausastudio.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/catalogo", "/pedi-a-medida", "/nosotros", "/contacto"];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  for (const slug of getAllSlugs()) {
    entries.push({
      url: `${SITE_URL}/catalogo/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  return entries;
}
