import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  tools,
  getToolBySlug,
  SITE_URL,
  SITE_NAME,
  SITE_LAST_MODIFIED_ISO,
  SITE_X_URL,
  SITE_GITHUB_URL,
} from "@/lib/tools";
import { t, isValidLang, SUPPORTED_LANGS } from "@/lib/i18n";
import ToolClient from "./ToolClient";

export async function generateStaticParams() {
  return SUPPORTED_LANGS.flatMap((lang) =>
    tools.map((tool) => ({ lang, slug: tool.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) return {};
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: `${tool.title} — Free Online Tool`,
    description: tool.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/tools/${slug}/`,
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map((l) => [l, `${SITE_URL}/${l}/tools/${slug}/`]).concat([
          ["x-default", `${SITE_URL}/en/tools/${slug}/`],
        ])
      ),
    },
    openGraph: {
      title: `${tool.title} | ${SITE_NAME}`,
      description: tool.description,
      url: `${SITE_URL}/${lang}/tools/${slug}/`,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: "/globe.svg", alt: `${tool.title} on ${SITE_NAME}` }],
    },
    twitter: {
      card: "summary",
      title: `${tool.title} | ${SITE_NAME}`,
      description: tool.description,
      images: ["/globe.svg"],
      creator: "@hudijiang",
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  const tr = t(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: tool.title,
        description: tool.description,
        url: `${SITE_URL}/${lang}/tools/${slug}/`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        inLanguage: lang,
        author: { "@type": "Person", name: "hudijiang", url: SITE_X_URL },
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        dateModified: SITE_LAST_MODIFIED_ISO,
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@type": "FAQPage",
        mainEntity: tool.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/${lang}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: tool.title,
            item: `${SITE_URL}/${lang}/tools/${slug}/`,
          },
        ],
      },
      {
        "@type": "Person",
        name: "hudijiang",
        url: SITE_X_URL,
        sameAs: [SITE_X_URL, SITE_GITHUB_URL],
      },
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        sameAs: [SITE_X_URL, SITE_GITHUB_URL],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolClient tool={tool} lang={lang} tr={tr} />
    </>
  );
}
