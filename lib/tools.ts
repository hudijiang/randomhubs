export const SITE_URL = "https://randomhubs.com";
export const SITE_NAME = "RandomHubs";
export const SITE_DESCRIPTION =
  "Free online random generators — animals, Pokémon, objects, phone numbers, Bible verses, and more.";
export const SITE_X_URL = "https://x.com/hudijiang";
export const SITE_GITHUB_URL = "https://github.com/hudijiang";
export const SITE_LAST_MODIFIED_ISO = "2026-04-02T00:00:00.000Z";

export interface Tool {
  slug: string;
  title: string;
  description: string;
  intro: string;
  icon: string;
  category: string;
  howToUse: string[];
  faq: { q: string; a: string }[];
}

export const tools: Tool[] = [
  {
    slug: "random-animal-generator",
    title: "Random Animal Generator",
    description:
      "Instantly discover a random animal with fun facts, habitat, and diet info. Great for kids, trivia, and learning.",
    intro:
      "Our free random animal generator picks a surprise animal from a database of 60+ species — from lions and elephants to axolotls and manta rays. Each result includes the animal's natural habitat, diet type, and a fun fact you might not know. Whether you're a teacher looking for a wildlife quiz tool, a parent playing trivia with kids, or just curious about the animal kingdom, this random animal picker is the fastest way to discover something new. No sign-up, no ads blocking the tool — just click and explore.",
    icon: "🐾",
    category: "Nature",
    howToUse: [
      'Click the "Random Animal" button to instantly generate a random animal.',
      "Read the animal's habitat, diet, and fun fact card that appears below.",
      'Click "Generate Again" to pick another random animal from our database.',
    ],
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
      "Generate a random Pokémon from all 9 generations. Perfect for Nuzlocke challenges, team building, and fun.",
    intro:
      "This random Pokémon generator pulls from all 1,025 Pokémon across Gen 1 (Kanto) through Gen 9 (Paldea) using live PokéAPI data. Filter by generation, type, legendary status, and more to find exactly the kind of random Pokémon you need. Each result shows the official artwork, types, nature, gender, and base stats. Use it for Nuzlocke challenge runs, random team building, Pokémon trivia, or just to discover a Pokémon you've never used before. Shiny variants are included with a configurable shiny rate.",
    icon: "⚡",
    category: "Games",
    howToUse: [
      "Set your filters: choose generations, types, legendary/mythical options, and how many Pokémon to generate (1–6).",
      'Click "Generate Pokémon" to fetch a random Pokémon with live data from PokéAPI.',
      "Toggle Nature, Gender, and Base Stats on or off, and adjust the shiny chance to your liking.",
    ],
    faq: [
      {
        q: "Which Pokémon generations are included?",
        a: "All generations from Gen 1 (Kanto) through Gen 9 (Paldea), covering all 1025 Pokémon.",
      },
      {
        q: "What information is shown for each Pokémon?",
        a: "You'll see the Pokémon's official artwork, name, types, height, weight, nature, gender, and base stats.",
      },
      {
        q: "What is a Nuzlocke challenge?",
        a: "A Nuzlocke is a self-imposed challenge run where you can only use Pokémon you randomly encounter. This random Pokémon generator helps you pick your starter or team at random.",
      },
    ],
  },
  {
    slug: "basket-random-unblocked",
    title: "Basket Random Unblocked",
    description:
      "Play Basket Random unblocked at school or work. Wacky physics basketball game — 1 player or 2 players.",
    intro:
      "Basket Random is a hilarious physics-based basketball game you can play unblocked directly in your browser — no download, no Flash, no install required. The ragdoll controls make every shot unpredictable and fun. Play solo against the AI or challenge a friend in 2-player mode on the same keyboard. Basket Random unblocked works at school, work, or anywhere games aren't restricted, because it runs as a standard web page. First player to score 5 baskets wins the match.",
    icon: "🏀",
    category: "Games",
    howToUse: [
      'Click "Play Basket Random" to load the game directly in your browser.',
      "Player 1 presses W to jump and shoot. Player 2 presses the Up Arrow key.",
      "Score 5 baskets before your opponent to win the round. Play Basket Random unblocked anytime!",
    ],
    faq: [
      {
        q: "How do you play Basket Random?",
        a: "Press W (Player 1) or Up Arrow (Player 2) to jump and shoot. The physics are intentionally wacky — embrace the chaos!",
      },
      {
        q: "Is Basket Random free to play?",
        a: "Yes, Basket Random is completely free to play with no download required.",
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
    intro:
      "The Pokémon Randomizer generates a full random team of up to 6 Pokémon at once, perfect for Nuzlocke runs, random battles, and challenge playthroughs. Filter by generation (Gen 1–9) to keep your team era-appropriate, or mix all generations for a wild team composition. Each Pokémon shows its sprite and types. Don't like one pick? Hit the individual reroll button to swap just that slot without regenerating the whole team. This Pokémon randomizer is the fastest way to create an unexpected, balanced-ish random team.",
    icon: "🎲",
    category: "Games",
    howToUse: [
      "Select a generation filter (or leave on All Generations) then click Randomize Team.",
      "Your random Pokémon team of 6 appears with sprites and types.",
      'Click the "Reroll" button under any individual Pokémon to swap just that slot.',
    ],
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
        a: "The Pokémon Randomizer generates a full team of 6 at once, while the Random Pokémon Generator picks one at a time with more detailed stats like nature, gender, and base stats.",
      },
    ],
  },
  {
    slug: "random-object-generator",
    title: "Random Object Generator",
    description:
      "Pick a random everyday object. Great for drawing prompts, creative writing, games, and imagination exercises.",
    intro:
      "The random object generator picks a surprise everyday item from 200+ objects across six categories: household, office, food, clothing, nature, and tools. It's widely used for drawing challenges (\"draw a random object in 5 minutes\"), creative writing prompts, improv comedy warm-ups, and classroom creativity exercises. Filter by category to narrow results, or leave it open for a truly random object from any category. Each click gives you a new random object to spark your imagination.",
    icon: "🎯",
    category: "Tools",
    howToUse: [
      'Choose a category from the dropdown (or select "All Categories" for maximum randomness).',
      'Click "Random Object" to instantly pick a random everyday object.',
      "Use the object as a drawing prompt, writing subject, or game challenge. Click again for a new one.",
    ],
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
        a: "Yes, you can choose to generate random objects from specific categories or mix all categories together.",
      },
    ],
  },
  {
    slug: "random-phone-number-generator",
    title: "Random Phone Number Generator",
    description:
      "Generate random US phone numbers for testing, forms, and development. Multiple formats supported.",
    intro:
      "This random phone number generator creates fake US phone numbers instantly — useful for software testing, form validation, database seeding, UI mockups, and any situation where you need realistic-looking but non-functional phone numbers. All generated numbers use real US area codes so they pass basic format checks, but are not assigned to any real person. Choose from four formats: (XXX) XXX-XXXX, XXX-XXX-XXXX, XXX.XXX.XXXX, or plain 10-digit. Generate 1 to 100 random phone numbers at once and copy them all with one click.",
    icon: "📞",
    category: "Tools",
    howToUse: [
      "Set the number of phone numbers to generate (1–100) and choose your preferred format.",
      'Click "Generate Numbers" to instantly create random US phone numbers.',
      'Click "Copy All" to copy all generated numbers to your clipboard for use in your project.',
    ],
    faq: [
      {
        q: "Are these real phone numbers?",
        a: "No, these are randomly generated phone numbers for testing purposes only. They are not assigned to any real person.",
      },
      {
        q: "What formats are available?",
        a: "You can generate random phone numbers in (XXX) XXX-XXXX, XXX-XXX-XXXX, XXX.XXX.XXXX, or plain 10-digit format.",
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
    intro:
      "The random Bible verse generator selects a scripture from our collection of 500+ carefully curated verses spanning both the Old and New Testament. Use it for daily devotionals, morning inspiration, Bible study groups, or whenever you need a word of encouragement. Filter by Old Testament, New Testament, or draw from the entire Bible. Each random Bible verse includes the book name and reference so you can find it in your own Bible. Copy the verse with one click to share on social media, in a message, or in your journal.",
    icon: "✝️",
    category: "Inspiration",
    howToUse: [
      "Select a filter: Entire Bible, Old Testament, or New Testament.",
      'Click "Random Verse" to receive a random Bible verse with its full reference.',
      "Copy the verse to your clipboard or click again for a new random Bible verse.",
    ],
    faq: [
      {
        q: "Which Bible translations are included?",
        a: "We include verses from the King James Version (KJV) and New International Version (NIV).",
      },
      {
        q: "Can I get a verse from a specific book?",
        a: "Yes, you can filter by Old Testament or New Testament to narrow your random Bible verse selection.",
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
