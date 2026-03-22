import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tools, getToolBySlug, SITE_URL, SITE_NAME } from "@/lib/tools";
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
    title: tool.title,
    description: tool.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/tools/${slug}/`,
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map((l) => [l, `${SITE_URL}/${l}/tools/${slug}/`])
      ),
    },
    openGraph: {
      title: `${tool.title} | ${SITE_NAME}`,
      description: tool.description,
      type: "website",
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
      },
      {
        "@type": "FAQPage",
        mainEntity: tool.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
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
