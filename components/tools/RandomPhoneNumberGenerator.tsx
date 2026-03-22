"use client";
import { useState } from "react";
import type { Translations } from "@/lib/i18n";

const FORMATS = [
  { label: "(XXX) XXX-XXXX", value: "paren" },
  { label: "XXX-XXX-XXXX", value: "dash" },
  { label: "XXX.XXX.XXXX", value: "dot" },
  { label: "XXXXXXXXXX", value: "plain" },
];

// Common US area codes (not fake/reserved)
const AREA_CODES = [
  201, 202, 203, 205, 206, 207, 208, 209, 210, 212, 213, 214, 215, 216, 217,
  218, 219, 224, 225, 228, 229, 231, 234, 239, 240, 248, 251, 252, 253, 254,
  256, 260, 262, 267, 269, 270, 272, 276, 281, 301, 302, 303, 304, 305, 307,
  308, 309, 310, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 323, 325,
  330, 331, 334, 336, 337, 339, 340, 347, 351, 352, 360, 361, 385, 386, 401,
  402, 404, 405, 406, 407, 408, 409, 410, 412, 413, 414, 415, 417, 419, 423,
  424, 425, 430, 432, 434, 435, 440, 442, 443, 458, 469, 470, 475, 478, 479,
  480, 484, 501, 502, 503, 504, 505, 507, 508, 509, 510, 512, 513, 515, 516,
  517, 518, 520, 530, 531, 539, 540, 541, 551, 559, 561, 562, 563, 564, 567,
  570, 571, 573, 574, 575, 580, 585, 586, 601, 602, 603, 605, 606, 607, 608,
  609, 610, 612, 614, 615, 616, 617, 618, 619, 620, 623, 626, 628, 629, 630,
  631, 636, 641, 646, 650, 651, 657, 660, 661, 662, 667, 669, 678, 681, 682,
  701, 702, 703, 704, 706, 707, 708, 712, 713, 714, 715, 716, 717, 718, 719,
  720, 724, 725, 727, 731, 732, 734, 737, 740, 747, 754, 757, 760, 762, 763,
  765, 769, 770, 772, 773, 774, 775, 779, 781, 785, 786, 801, 802, 803, 804,
  805, 806, 808, 810, 812, 813, 814, 815, 816, 817, 818, 828, 830, 831, 832,
  843, 845, 847, 848, 850, 856, 857, 858, 859, 860, 862, 863, 864, 865, 870,
  872, 878, 901, 903, 904, 906, 907, 908, 909, 910, 912, 913, 914, 915, 916,
  917, 918, 919, 920, 925, 928, 929, 931, 936, 937, 940, 941, 947, 949, 951,
  952, 954, 956, 959, 970, 971, 972, 973, 975, 978, 979, 980, 984, 985, 989,
];

function rand(n: number) {
  return Math.floor(Math.random() * n);
}

function generateNumber(format: string): string {
  const area = AREA_CODES[rand(AREA_CODES.length)];
  const mid = String(rand(800) + 100); // 100-899 to avoid 555 reserved blocks mostly
  const last = String(rand(10000)).padStart(4, "0");
  switch (format) {
    case "paren": return `(${area}) ${mid}-${last}`;
    case "dash": return `${area}-${mid}-${last}`;
    case "dot": return `${area}.${mid}.${last}`;
    default: return `${area}${mid}${last}`;
  }
}

export default function RandomPhoneNumberGenerator({ tr }: { tr: Translations }) {
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState("paren");
  const [numbers, setNumbers] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  function generate() {
    setNumbers(Array.from({ length: count }, () => generateNumber(format)));
  }

  function copyAll() {
    navigator.clipboard.writeText(numbers.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {tr.phone_count} (1–100)
          </label>
          <input
            type="number"
            value={count}
            min={1}
            max={100}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {tr.phone_format}
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {FORMATS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
      >
        {tr.phone_btn} 📞
      </button>

      {numbers.length > 0 && (
        <div className="bg-white border border-indigo-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-500">{numbers.length} numbers generated</p>
            <button
              onClick={copyAll}
              className="text-xs text-gray-500 hover:text-indigo-600 border border-gray-200 hover:border-indigo-300 px-3 py-1 rounded-lg transition-colors"
            >
              {copied ? tr.copied : tr.phone_copyAll}
            </button>
          </div>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {numbers.map((num, i) => (
              <p key={i} className="font-mono text-sm text-gray-800 py-1 border-b border-gray-50 last:border-0">
                {num}
              </p>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center">
        ⚠️ For testing purposes only. Not real phone numbers.
      </p>
    </div>
  );
}
