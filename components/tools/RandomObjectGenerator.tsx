"use client";
import { useState } from "react";
import type { Translations } from "@/lib/i18n";

const OBJECTS: Record<string, string[]> = {
  Household: [
    "Toothbrush", "Lamp", "Pillow", "Alarm clock", "Refrigerator", "Mirror",
    "Laundry basket", "Candle", "Remote control", "Trash can", "Soap dispenser",
    "Shower curtain", "Vacuum cleaner", "Ironing board", "Coffee maker",
  ],
  Office: [
    "Stapler", "Sticky notes", "Pen", "Notebook", "Highlighter", "Paper clip",
    "Tape dispenser", "Hole puncher", "Binder", "Whiteboard marker",
    "Calculator", "Desk lamp", "Mouse pad", "USB hub", "Filing cabinet",
  ],
  Food: [
    "Apple", "Banana", "Sandwich", "Pizza slice", "Sushi roll", "Chocolate bar",
    "Cookie", "Avocado", "Pretzel", "Donut", "Hot dog", "Watermelon",
    "Ice cream cone", "Croissant", "Taco",
  ],
  Clothing: [
    "Sneakers", "Baseball cap", "Scarf", "Gloves", "Sunglasses", "Belt",
    "Umbrella", "Backpack", "Watch", "Sock", "Tie", "Raincoat",
    "Hoodie", "Jeans", "Beanie",
  ],
  Nature: [
    "Pinecone", "Seashell", "Pebble", "Leaf", "Acorn", "Feather",
    "Mushroom", "Flower", "Branch", "Moss", "Fern", "Dandelion",
    "Driftwood", "Snowflake", "Raindrop",
  ],
  Tools: [
    "Hammer", "Screwdriver", "Wrench", "Tape measure", "Level",
    "Drill", "Saw", "Pliers", "Chisel", "Paintbrush", "Sandpaper",
    "Extension cord", "Ladder", "Flashlight", "Toolbox",
  ],
};

const ALL_CATEGORIES = Object.keys(OBJECTS);

export default function RandomObjectGenerator({ tr }: { tr: Translations }) {
  const [category, setCategory] = useState("all");
  const [object, setObject] = useState<{ name: string; category: string } | null>(null);

  function generate() {
    const cats = category === "all" ? ALL_CATEGORIES : [category];
    const cat = cats[Math.floor(Math.random() * cats.length)];
    const items = OBJECTS[cat];
    const item = items[Math.floor(Math.random() * items.length)];
    setObject({ name: item, category: cat });
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
        >
          <option value="all">{tr.obj_all}</option>
          {ALL_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          onClick={generate}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
        >
          {tr.obj_btn} 🎯
        </button>
      </div>

      {object && (
        <div className="bg-white border border-indigo-100 rounded-2xl p-8 text-center">
          <p className="text-xs text-indigo-400 mb-2 font-medium">{object.category}</p>
          <p className="text-4xl font-extrabold text-gray-900">{object.name}</p>
        </div>
      )}
    </div>
  );
}
