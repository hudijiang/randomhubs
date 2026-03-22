import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, tools } from "@/lib/tools";
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
  return {
    title: `About | ${SITE_NAME}`,
    description: `RandomHubs is a free collection of online random generators built by @hudijiang. Learn about our tools, mission, and how to contact us.`,
    alternates: {
      canonical: `${SITE_URL}/${lang}/about/`,
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map((l) => [l, `${SITE_URL}/${l}/about/`])
      ),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  const tr = t(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description:
          "Free online random generators — animals, Pokémon, objects, phone numbers, Bible verses, and more.",
      },
      {
        "@type": "Person",
        name: "hudijiang",
        url: "https://x.com/hudijiang",
        sameAs: ["https://x.com/hudijiang", "https://github.com/hudijiang"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${lang}/` },
          { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/${lang}/about/` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col min-h-screen font-sans">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href={`/${lang}/`} className="font-bold text-lg text-gray-900">
              🎲 {SITE_NAME}
            </Link>
            <div className="flex items-center gap-3">
              {SUPPORTED_LANGS.map((l) => (
                <Link
                  key={l}
                  href={`/${l}/about/`}
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

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
            <Link href={`/${lang}/`} className="hover:text-indigo-600 transition-colors">
              {tr.home}
            </Link>
            <span>/</span>
            <span className="text-gray-700">About</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
            About RandomHubs
          </h1>

          {/* About the site */}
          <section className="mb-10 prose prose-gray max-w-none">
            <div className="bg-indigo-50 rounded-2xl p-6 mb-6">
              <p className="text-gray-700 leading-relaxed">
                <strong>RandomHubs</strong> is a free collection of online random generator tools
                built for everyone — students, developers, gamers, teachers, and curious minds.
                Every tool on this site is 100% free, works instantly in your browser, and
                requires no account or download.
              </p>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-3">Our Tools</h2>
            <ul className="space-y-2 mb-8">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${lang}/tools/${tool.slug}/`}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    <span>{tool.icon}</span>
                    <span>{tool.title}</span>
                  </Link>
                  <p className="text-sm text-gray-500 ml-6">{tool.description}</p>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              We believe the best tools are simple, fast, and free. RandomHubs was built to
              provide high-quality random generators without the clutter, paywalls, or unnecessary
              sign-ups that plague many similar sites. We are continually adding new tools based
              on user interest and search demand.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-3">About the Author</h2>
            <div className="flex items-start gap-4 bg-gray-50 rounded-2xl p-6">
              <div className="flex-shrink-0 w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-2xl">
                🧑‍💻
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg mb-1">hudijiang</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Independent developer and web builder focused on creating useful, SEO-optimized
                  tools that help people find information and spark creativity. RandomHubs is one
                  of several tool sites built and maintained by hudijiang.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://x.com/hudijiang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    @hudijiang on X
                  </a>
                  <a
                    href="https://github.com/hudijiang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Have a question, suggestion, or found a bug? The best way to reach us is via X
                (formerly Twitter). We read every message and typically respond within 48 hours.
              </p>
              <a
                href="https://x.com/hudijiang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Message @hudijiang on X
              </a>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-8 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mb-4">
              <Link href={`/${lang}/`} className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                {tr.home}
              </Link>
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${lang}/tools/${tool.slug}/`}
                  className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  {tool.title}
                </Link>
              ))}
              <Link href={`/${lang}/about/`} className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                About
              </Link>
            </div>
            <p className="text-center text-xs text-gray-400">
              © {new Date().getFullYear()} {SITE_NAME} · randomhubs.com
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
