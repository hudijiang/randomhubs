"use client";
import Link from "next/link";
import type { Tool } from "@/lib/tools";
import type { Translations, Lang } from "@/lib/i18n";
import { SUPPORTED_LANGS, LANG_LABELS } from "@/lib/i18n";
import { SITE_NAME, tools } from "@/lib/tools";

import RandomAnimalGenerator from "@/components/tools/RandomAnimalGenerator";
import RandomPokemonGenerator from "@/components/tools/RandomPokemonGenerator";
import BasketRandomUnblocked from "@/components/tools/BasketRandomUnblocked";
import PokemonRandomizer from "@/components/tools/PokemonRandomizer";
import RandomObjectGenerator from "@/components/tools/RandomObjectGenerator";
import RandomPhoneNumberGenerator from "@/components/tools/RandomPhoneNumberGenerator";
import RandomBibleVerseGenerator from "@/components/tools/RandomBibleVerseGenerator";

const TOOL_COMPONENTS: Record<string, React.ComponentType<{ tr: Translations }>> = {
  "random-animal-generator": RandomAnimalGenerator,
  "random-pokemon-generator": RandomPokemonGenerator,
  "basket-random-unblocked": BasketRandomUnblocked,
  "pokemon-randomizer": PokemonRandomizer,
  "random-object-generator": RandomObjectGenerator,
  "random-phone-number-generator": RandomPhoneNumberGenerator,
  "random-bible-verse-generator": RandomBibleVerseGenerator,
};

export default function ToolClient({
  tool,
  lang,
  tr,
}: {
  tool: Tool;
  lang: string;
  tr: Translations;
}) {
  const ToolComponent = TOOL_COMPONENTS[tool.slug];

  return (
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
                href={`/${l}/tools/${tool.slug}/`}
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

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href={`/${lang}/`} className="hover:text-indigo-600 transition-colors">
            {tr.home}
          </Link>
          <span>/</span>
          <span className="text-gray-700">{tool.title}</span>
        </nav>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{tool.icon}</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              {tool.title}
            </h1>
          </div>
          <p className="text-gray-500 text-base leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Ad placeholder top */}
        <div className="w-full h-20 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-300 text-xs mb-6">
          Advertisement
        </div>

        {/* Tool */}
        {ToolComponent ? (
          <ToolComponent tr={tr} />
        ) : (
          <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-400">
            Tool coming soon
          </div>
        )}

        {/* Ad placeholder bottom */}
        <div className="w-full h-20 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-300 text-xs mt-6 mb-8">
          Advertisement
        </div>

        {/* How to Use */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{tr.howToUse}</h2>
          <div className="bg-indigo-50 rounded-2xl p-5 text-gray-700 text-sm leading-relaxed space-y-2">
            <p>1. Click the generate button to get a random result.</p>
            <p>2. Use filters or options to customize your output.</p>
            <p>3. Copy or share the result as needed.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{tr.faq}</h2>
          <div className="space-y-4">
            {tool.faq.map((item, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            More Free Random Generators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tools
              .filter((t) => t.slug !== tool.slug)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/${lang}/tools/${related.slug}/`}
                  className="flex items-center gap-3 bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 rounded-xl p-4 transition-all group"
                >
                  <span className="text-2xl flex-shrink-0">{related.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                      {related.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                      {related.description}
                    </p>
                  </div>
                </Link>
              ))}
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
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/${lang}/tools/${t.slug}/`}
                className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
              >
                {t.title}
              </Link>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400">
            © {new Date().getFullYear()} {SITE_NAME} · randomhubs.com
          </p>
        </div>
      </footer>
    </div>
  );
}
