import type { MetadataRoute } from "next";
import { tools, SITE_URL } from "@/lib/tools";
import { SUPPORTED_LANGS } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Homepage for each lang
  for (const lang of SUPPORTED_LANGS) {
    entries.push({
      url: `${SITE_URL}/${lang}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: lang === "en" ? 1.0 : 0.8,
    });
  }

  // Tool pages
  for (const tool of tools) {
    for (const lang of SUPPORTED_LANGS) {
      entries.push({
        url: `${SITE_URL}/${lang}/tools/${tool.slug}/`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: lang === "en" ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
