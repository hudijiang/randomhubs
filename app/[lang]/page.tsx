import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { tools, SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/tools";
import { t, isValidLang, SUPPORTED_LANGS, LANG_LABELS, type Lang } from "@/lib/i18n";

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const tr = t(lang);
  return {
    title: `${SITE_NAME} — ${tr.tagline}`,
    description: SITE_DESCRIPTION,
    alternates: {
      canonical: `${SITE_URL}/${lang}/`,
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map((l) => [l, `${SITE_URL}/${l}/`])
      ),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  const tr = t(lang);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href={`/${lang}/`} className="font-bold text-lg text-gray-900">
            🎲 {SITE_NAME}
          </Link>
          <div className="flex items-center gap-3">
            {SUPPORTED_LANGS.map((l) => (
              <Link
                key={l}
                href={`/${l}/`}
                className={`text-sm px-2 py-1 rounded-lg transition-colors ${
                  l === lang
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {LANG_LABELS[l as Lang]}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          {tr.tagline}
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">{tr.siteDesc}</p>
      </section>

      {/* Tools Grid */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${lang}/tools/${tool.slug}/`}
              className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-indigo-200 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">{tool.icon}</div>
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                {tool.category}
              </span>
              <h2 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                {tool.title}
              </h2>
              <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} {SITE_NAME} · randomhubs.com
      </footer>
    </div>
  );
}
