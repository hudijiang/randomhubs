"use client";
import { useState } from "react";
import type { Translations } from "@/lib/i18n";

const ANIMALS = [
  { name: "Lion", habitat: "Savanna", diet: "Carnivore", fact: "Lions are the only cats that live in groups called prides.", emoji: "🦁" },
  { name: "Elephant", habitat: "Grasslands & Forests", diet: "Herbivore", fact: "Elephants are the only animals that can't jump.", emoji: "🐘" },
  { name: "Dolphin", habitat: "Ocean", diet: "Carnivore", fact: "Dolphins sleep with one eye open.", emoji: "🐬" },
  { name: "Penguin", habitat: "Antarctica", diet: "Carnivore", fact: "Penguins propose with pebbles.", emoji: "🐧" },
  { name: "Giraffe", habitat: "Savanna", diet: "Herbivore", fact: "A giraffe's tongue is 45–50 cm long and blue-black.", emoji: "🦒" },
  { name: "Octopus", habitat: "Ocean", diet: "Carnivore", fact: "Octopuses have three hearts and blue blood.", emoji: "🐙" },
  { name: "Cheetah", habitat: "Savanna", diet: "Carnivore", fact: "Cheetahs can accelerate from 0 to 60 mph in 3 seconds.", emoji: "🐆" },
  { name: "Flamingo", habitat: "Lakes & Lagoons", diet: "Omnivore", fact: "Flamingos are pink because of the shrimp they eat.", emoji: "🦩" },
  { name: "Koala", habitat: "Eucalyptus Forest", diet: "Herbivore", fact: "Koalas sleep up to 22 hours a day.", emoji: "🐨" },
  { name: "Wolf", habitat: "Forests & Tundra", diet: "Carnivore", fact: "Wolves howl to communicate across long distances.", emoji: "🐺" },
  { name: "Shark", habitat: "Ocean", diet: "Carnivore", fact: "Sharks have existed for over 400 million years.", emoji: "🦈" },
  { name: "Peacock", habitat: "Forests & Farmland", diet: "Omnivore", fact: "Only male peacocks have the colorful tail feathers.", emoji: "🦚" },
  { name: "Panda", habitat: "Mountain Forests", diet: "Herbivore", fact: "Giant pandas eat up to 38 kg of bamboo per day.", emoji: "🐼" },
  { name: "Kangaroo", habitat: "Grasslands", diet: "Herbivore", fact: "Kangaroos can't walk backwards.", emoji: "🦘" },
  { name: "Owl", habitat: "Forests", diet: "Carnivore", fact: "Owls can rotate their heads 270 degrees.", emoji: "🦉" },
  { name: "Gorilla", habitat: "Tropical Forests", diet: "Herbivore", fact: "Gorillas can catch human colds and other illnesses.", emoji: "🦍" },
  { name: "Polar Bear", habitat: "Arctic", diet: "Carnivore", fact: "Polar bear fur is actually transparent, not white.", emoji: "🐻‍❄️" },
  { name: "Chameleon", habitat: "Tropical Forests", diet: "Carnivore", fact: "Chameleons change color to communicate, not just to camouflage.", emoji: "🦎" },
  { name: "Hummingbird", habitat: "Gardens & Forests", diet: "Omnivore", fact: "Hummingbirds can fly backwards.", emoji: "🐦" },
  { name: "Crocodile", habitat: "Rivers & Swamps", diet: "Carnivore", fact: "Crocodiles haven't changed much in 200 million years.", emoji: "🐊" },
  { name: "Zebra", habitat: "Savanna", diet: "Herbivore", fact: "Every zebra has a unique stripe pattern, like fingerprints.", emoji: "🦓" },
  { name: "Parrot", habitat: "Tropical Forests", diet: "Omnivore", fact: "Some parrots can live over 80 years.", emoji: "🦜" },
  { name: "Jellyfish", habitat: "Ocean", diet: "Carnivore", fact: "Jellyfish have no brain, heart, or bones.", emoji: "🪼" },
  { name: "Fox", habitat: "Forests & Urban", diet: "Omnivore", fact: "Foxes use Earth's magnetic field to hunt prey.", emoji: "🦊" },
  { name: "Sloth", habitat: "Tropical Rainforest", diet: "Herbivore", fact: "Sloths take two weeks to digest a single leaf.", emoji: "🦥" },
  { name: "Manta Ray", habitat: "Ocean", diet: "Filter-feeder", fact: "Manta rays have the largest brain-to-body ratio of any fish.", emoji: "🐟" },
  { name: "Snow Leopard", habitat: "Mountain Ranges", diet: "Carnivore", fact: "Snow leopards can't roar — they chuff and growl instead.", emoji: "🐈" },
  { name: "Platypus", habitat: "Rivers & Streams", diet: "Carnivore", fact: "The platypus is one of the few venomous mammals.", emoji: "🦦" },
  { name: "Bald Eagle", habitat: "Forests near water", diet: "Carnivore", fact: "Bald eagles can see 4–8 times farther than humans.", emoji: "🦅" },
  { name: "Axolotl", habitat: "Lakes", diet: "Carnivore", fact: "Axolotls can regenerate entire limbs, heart tissue, and parts of their brain.", emoji: "🐸" },
];

export default function RandomAnimalGenerator({ tr }: { tr: Translations }) {
  const [animal, setAnimal] = useState<(typeof ANIMALS)[0] | null>(null);

  function generate() {
    setAnimal(ANIMALS[Math.floor(Math.random() * ANIMALS.length)]);
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
      <button
        onClick={generate}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors text-lg"
      >
        {animal ? tr.regenerate : tr.animal_btn} 🐾
      </button>

      {animal && (
        <div className="bg-white border border-indigo-100 rounded-2xl p-6 text-center space-y-4">
          <div className="text-7xl">{animal.emoji}</div>
          <h2 className="text-2xl font-extrabold text-gray-900">{animal.name}</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-indigo-50 rounded-xl p-3">
              <p className="text-indigo-500 font-medium text-xs mb-1">{tr.animal_habitat}</p>
              <p className="text-gray-800 font-semibold">{animal.habitat}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <p className="text-green-500 font-medium text-xs mb-1">{tr.animal_diet}</p>
              <p className="text-gray-800 font-semibold">{animal.diet}</p>
            </div>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-left">
            <p className="text-amber-600 font-medium text-xs mb-1">💡 {tr.animal_fact}</p>
            <p className="text-gray-700 text-sm leading-relaxed">{animal.fact}</p>
          </div>
        </div>
      )}
    </div>
  );
}
