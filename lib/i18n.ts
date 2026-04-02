export type Lang = "en" | "fr" | "es" | "de";
export const SUPPORTED_LANGS: Lang[] = ["en"];
export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
};

export interface Translations {
  // Common
  generate: string;
  regenerate: string;
  clear: string;
  copy: string;
  copied: string;
  result: string;
  loading: string;
  howToUse: string;
  faq: string;
  home: string;
  allTools: string;
  tagline: string;
  // Nav
  siteDesc: string;
  // Animal
  animal_name: string;
  animal_habitat: string;
  animal_diet: string;
  animal_fact: string;
  animal_btn: string;
  // Pokemon
  poke_btn: string;
  poke_type: string;
  poke_height: string;
  poke_weight: string;
  poke_abilities: string;
  poke_stats: string;
  // Basket
  basket_controls: string;
  basket_p1: string;
  basket_p2: string;
  basket_tip: string;
  // Pokemon Randomizer
  rand_team: string;
  rand_genFilter: string;
  rand_allGens: string;
  rand_btn: string;
  rand_reroll: string;
  // Object
  obj_btn: string;
  obj_category: string;
  obj_all: string;
  // Phone
  phone_count: string;
  phone_format: string;
  phone_btn: string;
  phone_copyAll: string;
  // Bible
  bible_btn: string;
  bible_book: string;
  bible_filter: string;
  bible_all: string;
  bible_old: string;
  bible_new: string;
  bible_share: string;
}

const en: Translations = {
  generate: "Generate",
  regenerate: "Generate Again",
  clear: "Clear",
  copy: "Copy",
  copied: "Copied!",
  result: "Result",
  loading: "Loading...",
  howToUse: "How to Use",
  faq: "Frequently Asked Questions",
  home: "Home",
  allTools: "All Tools",
  tagline: "Free Random Generators for Everyone",
  siteDesc: "Pick anything at random — animals, Pokémon, objects, phone numbers & more.",
  animal_name: "Animal",
  animal_habitat: "Habitat",
  animal_diet: "Diet",
  animal_fact: "Fun Fact",
  animal_btn: "Random Animal",
  poke_btn: "Random Pokémon",
  poke_type: "Type",
  poke_height: "Height",
  poke_weight: "Weight",
  poke_abilities: "Abilities",
  poke_stats: "Base Stats",
  basket_controls: "Controls",
  basket_p1: "Player 1: W key to jump/shoot",
  basket_p2: "Player 2: ↑ Arrow key to jump/shoot",
  basket_tip: "First to 5 points wins!",
  rand_team: "Your Random Team",
  rand_genFilter: "Filter by Generation",
  rand_allGens: "All Generations",
  rand_btn: "Randomize Team",
  rand_reroll: "Reroll",
  obj_btn: "Random Object",
  obj_category: "Category",
  obj_all: "All Categories",
  phone_count: "Number of phones",
  phone_format: "Format",
  phone_btn: "Generate Numbers",
  phone_copyAll: "Copy All",
  bible_btn: "Random Verse",
  bible_book: "Book",
  bible_filter: "Filter",
  bible_all: "Entire Bible",
  bible_old: "Old Testament",
  bible_new: "New Testament",
  bible_share: "Share Verse",
};

const fr: Translations = {
  generate: "Générer",
  regenerate: "Générer à nouveau",
  clear: "Effacer",
  copy: "Copier",
  copied: "Copié !",
  result: "Résultat",
  loading: "Chargement...",
  howToUse: "Comment utiliser",
  faq: "Questions fréquentes",
  home: "Accueil",
  allTools: "Tous les outils",
  tagline: "Générateurs aléatoires gratuits pour tous",
  siteDesc: "Choisissez au hasard — animaux, Pokémon, objets, numéros de téléphone et plus.",
  animal_name: "Animal",
  animal_habitat: "Habitat",
  animal_diet: "Régime",
  animal_fact: "Fait amusant",
  animal_btn: "Animal aléatoire",
  poke_btn: "Pokémon aléatoire",
  poke_type: "Type",
  poke_height: "Taille",
  poke_weight: "Poids",
  poke_abilities: "Capacités",
  poke_stats: "Stats de base",
  basket_controls: "Contrôles",
  basket_p1: "Joueur 1 : touche W pour sauter/tirer",
  basket_p2: "Joueur 2 : touche ↑ pour sauter/tirer",
  basket_tip: "Le premier à 5 points gagne !",
  rand_team: "Votre équipe aléatoire",
  rand_genFilter: "Filtrer par génération",
  rand_allGens: "Toutes les générations",
  rand_btn: "Randomiser l'équipe",
  rand_reroll: "Relancer",
  obj_btn: "Objet aléatoire",
  obj_category: "Catégorie",
  obj_all: "Toutes les catégories",
  phone_count: "Nombre de numéros",
  phone_format: "Format",
  phone_btn: "Générer les numéros",
  phone_copyAll: "Tout copier",
  bible_btn: "Verset aléatoire",
  bible_book: "Livre",
  bible_filter: "Filtre",
  bible_all: "Bible entière",
  bible_old: "Ancien Testament",
  bible_new: "Nouveau Testament",
  bible_share: "Partager le verset",
};

const es: Translations = {
  generate: "Generar",
  regenerate: "Generar de nuevo",
  clear: "Limpiar",
  copy: "Copiar",
  copied: "¡Copiado!",
  result: "Resultado",
  loading: "Cargando...",
  howToUse: "Cómo usar",
  faq: "Preguntas frecuentes",
  home: "Inicio",
  allTools: "Todas las herramientas",
  tagline: "Generadores aleatorios gratuitos para todos",
  siteDesc: "Elige al azar — animales, Pokémon, objetos, números de teléfono y más.",
  animal_name: "Animal",
  animal_habitat: "Hábitat",
  animal_diet: "Dieta",
  animal_fact: "Dato curioso",
  animal_btn: "Animal aleatorio",
  poke_btn: "Pokémon aleatorio",
  poke_type: "Tipo",
  poke_height: "Altura",
  poke_weight: "Peso",
  poke_abilities: "Habilidades",
  poke_stats: "Estadísticas base",
  basket_controls: "Controles",
  basket_p1: "Jugador 1: tecla W para saltar/lanzar",
  basket_p2: "Jugador 2: tecla ↑ para saltar/lanzar",
  basket_tip: "¡El primero en llegar a 5 puntos gana!",
  rand_team: "Tu equipo aleatorio",
  rand_genFilter: "Filtrar por generación",
  rand_allGens: "Todas las generaciones",
  rand_btn: "Aleatorizar equipo",
  rand_reroll: "Volver a tirar",
  obj_btn: "Objeto aleatorio",
  obj_category: "Categoría",
  obj_all: "Todas las categorías",
  phone_count: "Cantidad de números",
  phone_format: "Formato",
  phone_btn: "Generar números",
  phone_copyAll: "Copiar todo",
  bible_btn: "Versículo aleatorio",
  bible_book: "Libro",
  bible_filter: "Filtro",
  bible_all: "Toda la Biblia",
  bible_old: "Antiguo Testamento",
  bible_new: "Nuevo Testamento",
  bible_share: "Compartir versículo",
};

const de: Translations = {
  generate: "Generieren",
  regenerate: "Erneut generieren",
  clear: "Löschen",
  copy: "Kopieren",
  copied: "Kopiert!",
  result: "Ergebnis",
  loading: "Lädt...",
  howToUse: "Anleitung",
  faq: "Häufig gestellte Fragen",
  home: "Startseite",
  allTools: "Alle Tools",
  tagline: "Kostenlose Zufallsgeneratoren für alle",
  siteDesc: "Wähle zufällig — Tiere, Pokémon, Objekte, Telefonnummern und mehr.",
  animal_name: "Tier",
  animal_habitat: "Lebensraum",
  animal_diet: "Ernährung",
  animal_fact: "Spaßfakt",
  animal_btn: "Zufälliges Tier",
  poke_btn: "Zufälliges Pokémon",
  poke_type: "Typ",
  poke_height: "Größe",
  poke_weight: "Gewicht",
  poke_abilities: "Fähigkeiten",
  poke_stats: "Basiswerte",
  basket_controls: "Steuerung",
  basket_p1: "Spieler 1: W-Taste zum Springen/Schießen",
  basket_p2: "Spieler 2: ↑-Taste zum Springen/Schießen",
  basket_tip: "Wer zuerst 5 Punkte hat, gewinnt!",
  rand_team: "Dein zufälliges Team",
  rand_genFilter: "Nach Generation filtern",
  rand_allGens: "Alle Generationen",
  rand_btn: "Team randomisieren",
  rand_reroll: "Neu würfeln",
  obj_btn: "Zufälliges Objekt",
  obj_category: "Kategorie",
  obj_all: "Alle Kategorien",
  phone_count: "Anzahl der Nummern",
  phone_format: "Format",
  phone_btn: "Nummern generieren",
  phone_copyAll: "Alle kopieren",
  bible_btn: "Zufälliger Vers",
  bible_book: "Buch",
  bible_filter: "Filter",
  bible_all: "Gesamte Bibel",
  bible_old: "Altes Testament",
  bible_new: "Neues Testament",
  bible_share: "Vers teilen",
};

const translations: Record<Lang, Translations> = { en, fr, es, de };

export function t(lang: Lang): Translations {
  return translations[lang] ?? translations.en;
}

export function isValidLang(lang: string): lang is Lang {
  return SUPPORTED_LANGS.includes(lang as Lang);
}
