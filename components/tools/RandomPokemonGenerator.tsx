"use client";
import { useState } from "react";
import type { Translations } from "@/lib/i18n";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: { name: string; value: number }[];
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

export default function RandomPokemonGenerator({ tr }: { tr: Translations }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const id = Math.floor(Math.random() * 1025) + 1;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon({
        id: data.id,
        name: data.name.replace(/-/g, " "),
        sprite:
          data.sprites.other?.["official-artwork"]?.front_default ||
          data.sprites.front_default,
        types: data.types.map((t: { type: { name: string } }) => t.type.name),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map(
          (a: { ability: { name: string } }) =>
            a.ability.name.replace(/-/g, " ")
        ),
        stats: data.stats.map((s: { stat: { name: string }; base_stat: number }) => ({
          name: s.stat.name.replace(/-/g, " "),
          value: s.base_stat,
        })),
      });
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
      <button
        onClick={generate}
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-900 font-semibold py-3 rounded-xl transition-colors text-lg"
      >
        {loading ? tr.loading : pokemon ? tr.regenerate : tr.poke_btn} ⚡
      </button>

      {pokemon && (
        <div className="bg-white border border-yellow-100 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {pokemon.sprite && (
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="w-36 h-36 object-contain"
              />
            )}
            <div className="flex-1 w-full">
              <p className="text-xs text-gray-400 mb-1">#{String(pokemon.id).padStart(3, "0")}</p>
              <h2 className="text-2xl font-extrabold text-gray-900 capitalize mb-3">
                {pokemon.name}
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                      TYPE_COLORS[type] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {type}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div className="bg-gray-50 rounded-xl p-2.5">
                  <p className="text-gray-400 text-xs">{tr.poke_height}</p>
                  <p className="font-semibold text-gray-800">{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-2.5">
                  <p className="text-gray-400 text-xs">{tr.poke_weight}</p>
                  <p className="font-semibold text-gray-800">{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-1">{tr.poke_abilities}</p>
                <p className="text-sm text-gray-700 capitalize">
                  {pokemon.abilities.join(", ")}
                </p>
              </div>
            </div>
          </div>
          {/* Stats */}
          <div className="mt-2">
            <p className="text-xs text-gray-400 mb-2">{tr.poke_stats}</p>
            <div className="space-y-2">
              {pokemon.stats.map((stat) => (
                <div key={stat.name} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 capitalize w-24 shrink-0">{stat.name}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (stat.value / 255) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-700 w-8 text-right">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
