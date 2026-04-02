import type { MetadataRoute } from "next";
import { tools, SITE_URL, SITE_LAST_MODIFIED_ISO } from "@/lib/tools";
import { SUPPORTED_LANGS } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date(SITE_LAST_MODIFIED_ISO);

  for (const lang of SUPPORTED_LANGS) {
    entries.push({
      url: `${SITE_URL}/${lang}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: lang === "en" ? 1.0 : 0.8,
    });
    entries.push({
      url: `${SITE_URL}/${lang}/about/`,
      lastModified,
      changeFrequency: "monthly",
      priority: lang === "en" ? 0.6 : 0.4,
    });
  }

  for (const tool of tools) {
    for (const lang of SUPPORTED_LANGS) {
      entries.push({
        url: `${SITE_URL}/${lang}/tools/${tool.slug}/`,
        lastModified,
        changeFrequency: "monthly",
        priority: lang === "en" ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
