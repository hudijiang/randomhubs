export const SITE_URL = "https://randomhubs.com";
export const SITE_NAME = "RandomHubs";
export const SITE_DESCRIPTION =
  "Free online random generators — animals, Pokémon, objects, phone numbers, Bible verses, and more.";

export interface Tool {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  faq: { q: string; a: string }[];
}

export const tools: Tool[] = [
  {
    slug: "random-animal-generator",
    title: "Random Animal Generator",
    description:
      "Instantly discover a random animal with fun facts, habitat, and diet info. Great for kids, trivia, and learning.",
    icon: "🐾",
    category: "Nature",
    faq: [
      {
        q: "How does the random animal generator work?",
        a: "Click the button and a random animal is selected from our database of 60+ animals, showing its name, habitat, diet, and a fun fact.",
      },
      {
        q: "How many animals are in the database?",
        a: "We have over 60 animals covering mammals, birds, reptiles, fish, and insects from all around the world.",
      },
      {
        q: "Can I use this for educational purposes?",
        a: "Absolutely! The random animal generator is perfect for classrooms, trivia games, and learning about wildlife.",
      },
    ],
  },
  {
    slug: "random-pokemon-generator",
    title: "Random Pokémon Generator",
    description:
      "Generate a random Pokémon from all generations. Perfect for Nuzlocke challenges, team building, and fun.",
    icon: "⚡",
    category: "Games",
    faq: [
      {
        q: "Which Pokémon generations are included?",
        a: "All generations from Gen 1 (Kanto) through Gen 9 (Paldea), covering all 1025 Pokémon.",
      },
      {
        q: "What information is shown for each Pokémon?",
        a: "You'll see the Pokémon's official artwork, name, types, height, weight, and base stats.",
      },
      {
        q: "What is a Nuzlocke challenge?",
        a: "A Nuzlocke is a self-imposed challenge run where you can only use Pokémon you randomly encounter. This generator helps you pick your starter or team at random.",
      },
    ],
  },
  {
    slug: "basket-random-unblocked",
    title: "Basket Random Unblocked",
    description:
      "Play Basket Random unblocked at school or work. Wacky physics basketball game — 1 player or 2 players.",
    icon: "🏀",
    category: "Games",
    faq: [
      {
        q: "How do you play Basket Random?",
        a: "Press W (Player 1) or Up Arrow (Player 2) to jump and shoot. The physics are intentionally wacky — embrace the chaos!",
      },
      {
        q: "Is Basket Random free to play?",
        a: "Yes, completely free with no download required.",
      },
      {
        q: "Can I play Basket Random with a friend?",
        a: "Yes! Basket Random supports 2-player mode on the same keyboard — Player 1 uses W, Player 2 uses the Up Arrow key.",
      },
    ],
  },
  {
    slug: "pokemon-randomizer",
    title: "Pokémon Randomizer",
    description:
      "Generate a random Pokémon team of 6 for your next battle or Nuzlocke run. Filter by generation and type.",
    icon: "🎲",
    category: "Games",
    faq: [
      {
        q: "What is a Pokémon randomizer?",
        a: "A Pokémon randomizer generates a random team or selection of Pokémon, used for challenge runs, random battles, or just for fun.",
      },
      {
        q: "Can I filter by generation?",
        a: "Yes! You can filter to only get Pokémon from specific generations (Gen 1 through Gen 9).",
      },
      {
        q: "How is this different from the Random Pokémon Generator?",
        a: "The Randomizer generates a full team of 6 Pokémon at once, while the Random Pokémon Generator picks one at a time with more detailed stats.",
      },
    ],
  },
  {
    slug: "random-object-generator",
    title: "Random Object Generator",
    description:
      "Pick a random everyday object. Great for drawing prompts, creative writing, games, and imagination exercises.",
    icon: "🎯",
    category: "Tools",
    faq: [
      {
        q: "What is the random object generator used for?",
        a: "It's popular for drawing challenges, creative writing prompts, improv games, and classroom activities.",
      },
      {
        q: "How many objects are in the database?",
        a: "We have 200+ everyday objects across categories like household items, office supplies, food, clothing, and nature.",
      },
      {
        q: "Can I filter by category?",
        a: "Yes, you can choose to generate objects from specific categories or mix all categories together.",
      },
    ],
  },
  {
    slug: "random-phone-number-generator",
    title: "Random Phone Number Generator",
    description:
      "Generate random US phone numbers for testing, forms, and development. Multiple formats supported.",
    icon: "📞",
    category: "Tools",
    faq: [
      {
        q: "Are these real phone numbers?",
        a: "No, these are randomly generated numbers for testing purposes only. They are not assigned to any real person.",
      },
      {
        q: "What formats are available?",
        a: "You can generate numbers in (XXX) XXX-XXXX, XXX-XXX-XXXX, XXX.XXX.XXXX, or plain 10-digit format.",
      },
      {
        q: "How many numbers can I generate at once?",
        a: "You can generate between 1 and 100 random phone numbers at a time.",
      },
    ],
  },
  {
    slug: "random-bible-verse-generator",
    title: "Random Bible Verse Generator",
    description:
      "Receive a random Bible verse for daily inspiration, devotionals, or scripture study. KJV and NIV included.",
    icon: "✝️",
    category: "Inspiration",
    faq: [
      {
        q: "Which Bible translations are included?",
        a: "We include verses from the King James Version (KJV) and New International Version (NIV).",
      },
      {
        q: "Can I get a verse from a specific book?",
        a: "Yes, you can filter by Old Testament, New Testament, or specific books like Psalms or Proverbs.",
      },
      {
        q: "How many Bible verses are in the database?",
        a: "We have over 500 curated verses covering the most beloved and commonly referenced scriptures.",
      },
    ],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
