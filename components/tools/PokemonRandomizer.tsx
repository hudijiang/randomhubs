"use client";
import { useState } from "react";
import type { Translations } from "@/lib/i18n";

const GEN_RANGES: Record<string, [number, number]> = {
  "Gen 1": [1, 151],
  "Gen 2": [152, 251],
  "Gen 3": [252, 386],
  "Gen 4": [387, 493],
  "Gen 5": [494, 649],
  "Gen 6": [650, 721],
  "Gen 7": [722, 809],
  "Gen 8": [810, 905],
  "Gen 9": [906, 1025],
};

interface TeamMember {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

const TYPE_COLORS: Record<string, string> = {
  fire: "bg-orange-100 text-orange-700",
  water: "bg-blue-100 text-blue-700",
  grass: "bg-green-100 text-green-700",
  electric: "bg-yellow-100 text-yellow-700",
  psychic: "bg-pink-100 text-pink-700",
  ice: "bg-cyan-100 text-cyan-700",
  dragon: "bg-indigo-100 text-indigo-700",
  dark: "bg-gray-200 text-gray-700",
  fairy: "bg-pink-100 text-pink-600",
  normal: "bg-gray-100 text-gray-600",
  fighting: "bg-red-100 text-red-700",
  poison: "bg-purple-100 text-purple-700",
  ground: "bg-amber-100 text-amber-700",
  flying: "bg-sky-100 text-sky-700",
  bug: "bg-lime-100 text-lime-700",
  rock: "bg-stone-100 text-stone-700",
  ghost: "bg-violet-100 text-violet-700",
  steel: "bg-slate-100 text-slate-700",
};

async function fetchPokemon(id: number): Promise<TeamMember> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return {
    id: data.id,
    name: data.name.replace(/-/g, " "),
    sprite: data.sprites.front_default,
    types: data.types.map((t: { type: { name: string } }) => t.type.name),
  };
}

function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function PokemonRandomizer({ tr }: { tr: Translations }) {
  const [gen, setGen] = useState("all");
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);

  async function randomize() {
    setLoading(true);
    try {
      const [min, max] =
        gen === "all" ? [1, 1025] : GEN_RANGES[gen] ?? [1, 1025];
      const ids = Array.from({ length: 6 }, () => randomInRange(min, max));
      const members = await Promise.all(ids.map(fetchPokemon));
      setTeam(members);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  async function reroll(index: number) {
    const [min, max] =
      gen === "all" ? [1, 1025] : GEN_RANGES[gen] ?? [1, 1025];
    const newMember = await fetchPokemon(randomInRange(min, max));
    setTeam((prev) => prev.map((m, i) => (i === index ? newMember : m)));
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={gen}
          onChange={(e) => setGen(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
        >
          <option value="all">{tr.rand_allGens}</option>
          {Object.keys(GEN_RANGES).map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button
          onClick={randomize}
          disabled={loading}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-colors"
        >
          {loading ? tr.loading : tr.rand_btn} 🎲
        </button>
      </div>

      {team.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-3">{tr.rand_team}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col items-center gap-1"
              >
                {member.sprite && (
                  <img
                    src={member.sprite}
                    alt={member.name}
                    className="w-20 h-20 object-contain"
                  />
                )}
                <p className="text-xs font-bold text-gray-900 capitalize text-center">
                  {member.name}
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.types.map((type) => (
                    <span
                      key={type}
                      className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${
                        TYPE_COLORS[type] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => reroll(i)}
                  className="text-xs text-indigo-500 hover:text-indigo-700 mt-1"
                >
                  🔄 {tr.rand_reroll}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
