"use client";
import { useState } from "react";
import type { Translations } from "@/lib/i18n";

export default function BasketRandomUnblocked({ tr }: { tr: Translations }) {
  const [started, setStarted] = useState(false);

  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
      {/* Controls info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-indigo-50 rounded-xl p-4 text-center">
          <p className="text-2xl mb-2">⌨️</p>
          <p className="text-sm font-semibold text-indigo-700">{tr.basket_controls}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-blue-500 mb-1">👤 {tr.basket_p1}</p>
          <p className="text-xs font-semibold text-green-600">👤 {tr.basket_p2}</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <p className="text-2xl mb-1">🏆</p>
          <p className="text-sm text-orange-700">{tr.basket_tip}</p>
        </div>
      </div>

      {/* Game embed */}
      {!started ? (
        <button
          onClick={() => setStarted(true)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors text-lg"
        >
          🏀 Play Basket Random
        </button>
      ) : (
        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-black">
          <iframe
            src="https://classroom6x.com/games/basket-random"
            title="Basket Random Unblocked"
            className="w-full"
            style={{ height: "500px" }}
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      )}

      <p className="text-xs text-gray-400 text-center">
        Click Play to load the game. Works on desktop browsers.
      </p>
    </div>
  );
}
