"use client";
import { useState, useRef } from "react";
import type { Translations } from "@/lib/i18n";

const GENERATIONS = [
  { label: "Gen 1", min: 1, max: 151 },
  { label: "Gen 2", min: 152, max: 251 },
  { label: "Gen 3", min: 252, max: 386 },
  { label: "Gen 4", min: 387, max: 493 },
  { label: "Gen 5", min: 494, max: 649 },
  { label: "Gen 6", min: 650, max: 721 },
  { label: "Gen 7", min: 722, max: 809 },
  { label: "Gen 8", min: 810, max: 905 },
  { label: "Gen 9", min: 906, max: 1025 },
];

const ALL_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
  "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy",
];

const NATURES = [
  "Hardy", "Lonely", "Brave", "Adamant", "Naughty", "Bold", "Docile", "Relaxed",
  "Impish", "Lax", "Timid", "Hasty", "Serious", "Jolly", "Naive", "Modest", "Mild",
  "Quiet", "Bashful", "Rash", "Calm", "Gentle", "Sassy", "Careful", "Quirky",
];

const LEGENDARY_IDS = new Set([
  144, 145, 146, 150, 243, 244, 245, 249, 250, 377, 378, 379, 380, 381, 382, 383, 384,
  480, 481, 482, 483, 484, 485, 486, 487, 488, 638, 639, 640, 641, 642, 643, 644, 645, 646,
  716, 717, 718, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800,
  888, 889, 890, 894, 895, 896, 897, 898, 905,
  1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1020, 1021, 1022, 1023, 1024, 1025,
]);

const MYTHICAL_IDS = new Set([
  151, 251, 385, 386, 489, 490, 491, 492, 493, 494, 647, 648, 649,
  719, 720, 721, 801, 802, 807, 808, 809, 891, 892, 893, 1014, 1015, 1016, 1017,
]);

const TYPE_COLORS: Record<string, string> = {
  fire: "bg-orange-100 text-orange-700", water: "bg-blue-100 text-blue-700",
  grass: "bg-green-100 text-green-700", electric: "bg-yellow-100 text-yellow-700",
  psychic: "bg-pink-100 text-pink-700", ice: "bg-cyan-100 text-cyan-700",
  dragon: "bg-indigo-100 text-indigo-700", dark: "bg-gray-200 text-gray-700",
  fairy: "bg-pink-100 text-pink-600", normal: "bg-gray-100 text-gray-600",
  fighting: "bg-red-100 text-red-700", poison: "bg-purple-100 text-purple-700",
  ground: "bg-amber-100 text-amber-700", flying: "bg-sky-100 text-sky-700",
  bug: "bg-lime-100 text-lime-700", rock: "bg-stone-100 text-stone-700",
  ghost: "bg-violet-100 text-violet-700", steel: "bg-slate-100 text-slate-700",
};

interface PokemonResult {
  id: number;
  name: string;
  sprite: string;
  shinySprite: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: { name: string; value: number }[];
  nature: string;
  isShiny: boolean;
  gender: "♂" | "♀" | "—";
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickNUnique(pool: number[], n: number): number[] {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
}

async function fetchPokemon(id: number, shinyChance: number): Promise<PokemonResult> {
  const [pokeRes, specRes] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).catch(() => null),
  ]);
  const data = await pokeRes.json();
  const isShiny = Math.random() < shinyChance / 100;

  let gender: "♂" | "♀" | "—" = "—";
  if (specRes?.ok) {
    const sd = await specRes.json();
    const rate = sd.gender_rate;
    if (rate === -1) gender = "—";
    else if (rate === 0) gender = "♂";
    else if (rate === 8) gender = "♀";
    else gender = Math.random() < rate / 8 ? "♀" : "♂";
  }

  return {
    id: data.id,
    name: data.name.replace(/-/g, " "),
    sprite: data.sprites.other?.["official-artwork"]?.front_default || data.sprites.front_default || "",
    shinySprite: data.sprites.other?.["official-artwork"]?.front_shiny || data.sprites.front_shiny || "",
    types: data.types.map((t: { type: { name: string } }) => t.type.name),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map(
      (a: { ability: { name: string } }) => a.ability.name.replace(/-/g, " ")
    ),
    stats: data.stats.map((s: { stat: { name: string }; base_stat: number }) => ({
      name: s.stat.name.replace("special-", "Sp. ").replace(/-/g, " "),
      value: s.base_stat,
    })),
    nature: pickRandom(NATURES),
    isShiny,
    gender,
  };
}

export default function RandomPokemonGenerator({ tr }: { tr: Translations }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedGens, setSelectedGens] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [includeLegendary, setIncludeLegendary] = useState(true);
  const [includeMythical, setIncludeMythical] = useState(true);
  const [shinyChance, setShinyChance] = useState(1);
  const [showNature, setShowNature] = useState(true);
  const [showGender, setShowGender] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [results, setResults] = useState<PokemonResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const typeCache = useRef<Record<string, Set<number>>>({});

  const toggleGen = (i: number) =>
    setSelectedGens((prev) =>
      prev.includes(i) ? prev.filter((g) => g !== i) : [...prev, i]
    );

  const toggleType = (type: string) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  async function getTypeIds(type: string): Promise<Set<number>> {
    if (typeCache.current[type]) return typeCache.current[type];
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await res.json();
    const ids = new Set<number>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.pokemon.map((p: any) => {
        const parts = p.pokemon.url.split("/").filter(Boolean);
        return parseInt(parts[parts.length - 1]);
      }).filter((id: number) => id <= 1025)
    );
    typeCache.current[type] = ids;
    return ids;
  }

  async function generate() {
    if (selectedGens.length === 0) {
      setError("Please select at least one generation.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      let pool: number[] = [];
      for (const gi of selectedGens) {
        const g = GENERATIONS[gi];
        for (let id = g.min; id <= g.max; id++) pool.push(id);
      }
      if (!includeLegendary) pool = pool.filter((id) => !LEGENDARY_IDS.has(id));
      if (!includeMythical) pool = pool.filter((id) => !MYTHICAL_IDS.has(id));
      if (selectedTypes.length > 0) {
        const typeSets = await Promise.all(selectedTypes.map(getTypeIds));
        const union = new Set(typeSets.flatMap((s) => [...s]));
        pool = pool.filter((id) => union.has(id));
      }
      if (pool.length === 0) {
        setError("No Pokémon match your filters. Try relaxing them.");
        setLoading(false);
        return;
      }
      const ids = pickNUnique(pool, Math.min(quantity, pool.length));
      const pokemons = await Promise.all(ids.map((id) => fetchPokemon(id, shinyChance)));
      setResults(pokemons);
    } catch {
      setError("Failed to fetch. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const allGensSelected = selectedGens.length === GENERATIONS.length;

  const TOGGLES: [string, boolean, (v: boolean) => void][] = [
    ["Legendaries", includeLegendary, setIncludeLegendary],
    ["Mythicals", includeMythical, setIncludeMythical],
    ["Nature", showNature, setShowNature],
    ["Gender", showGender, setShowGender],
    ["Base Stats", showStats, setShowStats],
  ];

  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
      {/* Quantity slider */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Number of Pokémon:{" "}
          <span className="text-indigo-600 font-bold">{quantity}</span>
        </label>
        <input
          type="range" min={1} max={6} value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-full accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          {[1, 2, 3, 4, 5, 6].map((n) => <span key={n}>{n}</span>)}
        </div>
      </div>

      {/* Generations */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Generations</span>
          <button
            onClick={() =>
              setSelectedGens(allGensSelected ? [] : GENERATIONS.map((_, i) => i))
            }
            className="text-xs text-indigo-600 hover:underline"
          >
            {allGensSelected ? "Deselect All" : "Select All"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {GENERATIONS.map((g, i) => (
            <button
              key={i}
              onClick={() => toggleGen(i)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                selectedGens.includes(i)
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Type filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Type Filter{" "}
            <span className="text-xs font-normal text-gray-400">(any match)</span>
          </span>
          {selectedTypes.length > 0 && (
            <button
              onClick={() => setSelectedTypes([])}
              className="text-xs text-gray-400 hover:text-red-500"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ALL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`text-xs px-2.5 py-1 rounded-full capitalize font-medium transition-all ${
                selectedTypes.includes(type)
                  ? `${TYPE_COLORS[type]} ring-2 ring-offset-1 ring-current`
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles + Shiny */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {TOGGLES.map(([label, value, set]) => (
          <button
            key={label}
            onClick={() => set(!value)}
            className={`flex items-center gap-2 text-sm px-3 py-2 rounded-xl border transition-colors ${
              value
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "bg-white border-gray-200 text-gray-400"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                value ? "bg-indigo-600 border-indigo-600" : "border-gray-300"
              }`}
            />
            {label}
          </button>
        ))}
        <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-gray-200 bg-white">
          <span className="text-yellow-500">✨</span>
          <span className="text-gray-600 text-xs flex-shrink-0">Shiny</span>
          <select
            value={shinyChance}
            onChange={(e) => setShinyChance(Number(e.target.value))}
            className="flex-1 bg-transparent text-gray-700 text-xs focus:outline-none"
          >
            <option value={0}>Off</option>
            <option value={1}>1%</option>
            <option value={5}>5%</option>
            <option value={25}>25%</option>
            <option value={50}>50%</option>
            <option value={100}>Always ✨</option>
          </select>
        </div>
      </div>

      {/* Generate */}
      <button
        onClick={generate}
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-900 font-bold py-3 rounded-xl transition-colors text-lg"
      >
        {loading
          ? "Loading..."
          : results.length > 0
          ? "Generate Again ⚡"
          : "Generate Pokémon ⚡"}
      </button>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {/* Results */}
      {results.length > 0 && (
        <div
          className={`grid gap-4 ${
            results.length === 1 ? "" : "grid-cols-1 sm:grid-cols-2"
          }`}
        >
          {results.map((p, i) => {
            const sprite =
              p.isShiny && p.shinySprite ? p.shinySprite : p.sprite;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border p-4 ${
                  p.isShiny
                    ? "border-yellow-300 shadow-yellow-100 shadow-md"
                    : "border-gray-100"
                }`}
              >
                <div className="flex gap-4 items-start">
                  <div className="relative flex-shrink-0">
                    {sprite && (
                      <img
                        src={sprite}
                        alt={p.name}
                        className="w-24 h-24 object-contain"
                      />
                    )}
                    {p.isShiny && (
                      <span className="absolute -top-1 -right-1 text-lg">✨</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">
                      #{String(p.id).padStart(3, "0")}
                    </p>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-gray-900 capitalize">
                        {p.name}
                      </h3>
                      {showGender && (
                        <span
                          className={`text-sm font-bold ${
                            p.gender === "♂"
                              ? "text-blue-500"
                              : p.gender === "♀"
                              ? "text-pink-500"
                              : "text-gray-400"
                          }`}
                        >
                          {p.gender}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5 mb-2">
                      {p.types.map((type) => (
                        <span
                          key={type}
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                            TYPE_COLORS[type] ?? "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                    {showNature && (
                      <p className="text-xs text-gray-500">
                        <span className="font-medium text-gray-700">
                          {p.nature}
                        </span>{" "}
                        nature
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {(p.height / 10).toFixed(1)}m ·{" "}
                      {(p.weight / 10).toFixed(1)}kg
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {p.abilities.join(", ")}
                    </p>
                  </div>
                </div>
                {showStats && (
                  <div className="mt-3 space-y-1.5">
                    {p.stats.map((stat) => (
                      <div key={stat.name} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 capitalize w-20 shrink-0">
                          {stat.name}
                        </span>
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                          <div
                            className="bg-indigo-500 h-1.5 rounded-full"
                            style={{
                              width: `${Math.min(100, (stat.value / 255) * 100)}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-mono text-gray-700 w-7 text-right">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
