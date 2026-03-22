"use client";
import { useState } from "react";
import type { Translations } from "@/lib/i18n";

interface Verse {
  book: string;
  ref: string;
  text: string;
  testament: "old" | "new";
}

const VERSES: Verse[] = [
  { book: "Genesis", ref: "Genesis 1:1", text: "In the beginning God created the heavens and the earth.", testament: "old" },
  { book: "Psalms", ref: "Psalm 23:1", text: "The LORD is my shepherd; I shall not want.", testament: "old" },
  { book: "Psalms", ref: "Psalm 46:1", text: "God is our refuge and strength, an ever-present help in trouble.", testament: "old" },
  { book: "Psalms", ref: "Psalm 119:105", text: "Your word is a lamp for my feet, a light on my path.", testament: "old" },
  { book: "Proverbs", ref: "Proverbs 3:5-6", text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", testament: "old" },
  { book: "Proverbs", ref: "Proverbs 31:25", text: "She is clothed with strength and dignity; she can laugh at the days to come.", testament: "old" },
  { book: "Isaiah", ref: "Isaiah 40:31", text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", testament: "old" },
  { book: "Isaiah", ref: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.", testament: "old" },
  { book: "Jeremiah", ref: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.", testament: "old" },
  { book: "Joshua", ref: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.", testament: "old" },
  { book: "Micah", ref: "Micah 6:8", text: "He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God.", testament: "old" },
  { book: "Matthew", ref: "Matthew 5:16", text: "In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.", testament: "new" },
  { book: "Matthew", ref: "Matthew 6:33", text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.", testament: "new" },
  { book: "Matthew", ref: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest.", testament: "new" },
  { book: "John", ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", testament: "new" },
  { book: "John", ref: "John 14:6", text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'", testament: "new" },
  { book: "John", ref: "John 16:33", text: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.", testament: "new" },
  { book: "Romans", ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", testament: "new" },
  { book: "Romans", ref: "Romans 8:38-39", text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.", testament: "new" },
  { book: "Romans", ref: "Romans 12:2", text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.", testament: "new" },
  { book: "1 Corinthians", ref: "1 Corinthians 13:4-5", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.", testament: "new" },
  { book: "Galatians", ref: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.", testament: "new" },
  { book: "Ephesians", ref: "Ephesians 2:8-9", text: "For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast.", testament: "new" },
  { book: "Ephesians", ref: "Ephesians 6:10", text: "Finally, be strong in the Lord and in his mighty power.", testament: "new" },
  { book: "Philippians", ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", testament: "new" },
  { book: "Philippians", ref: "Philippians 4:13", text: "I can do all this through him who gives me strength.", testament: "new" },
  { book: "2 Timothy", ref: "2 Timothy 1:7", text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", testament: "new" },
  { book: "Hebrews", ref: "Hebrews 11:1", text: "Now faith is confidence in what we hope for and assurance about what we do not see.", testament: "new" },
  { book: "James", ref: "James 1:17", text: "Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows.", testament: "new" },
  { book: "Revelation", ref: "Revelation 21:4", text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.", testament: "new" },
];

export default function RandomBibleVerseGenerator({ tr }: { tr: Translations }) {
  const [filter, setFilter] = useState<"all" | "old" | "new">("all");
  const [verse, setVerse] = useState<Verse | null>(null);
  const [copied, setCopied] = useState(false);

  function generate() {
    const pool = filter === "all" ? VERSES : VERSES.filter((v) => v.testament === filter);
    setVerse(pool[Math.floor(Math.random() * pool.length)]);
  }

  function copy() {
    if (!verse) return;
    navigator.clipboard.writeText(`${verse.text} — ${verse.ref}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
      <div className="flex gap-2">
        {(["all", "old", "new"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f === "all" ? tr.bible_all : f === "old" ? tr.bible_old : tr.bible_new}
          </button>
        ))}
      </div>

      <button
        onClick={generate}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {verse ? tr.regenerate : tr.bible_btn} ✝️
      </button>

      {verse && (
        <div className="bg-white border border-indigo-100 rounded-2xl p-6">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wide mb-3">
            {verse.book} · {verse.testament === "old" ? tr.bible_old : tr.bible_new}
          </p>
          <blockquote className="text-gray-800 text-base leading-relaxed italic mb-4">
            "{verse.text}"
          </blockquote>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-gray-700">— {verse.ref}</p>
            <button
              onClick={copy}
              className="text-xs text-gray-500 hover:text-indigo-600 border border-gray-200 hover:border-indigo-300 px-3 py-1 rounded-lg transition-colors"
            >
              {copied ? tr.copied : tr.copy}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
