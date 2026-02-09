// Complete katakana character set
// Basic (46) + Dakuten (25) + Handakuten (5) + Yōon (33) = 109 total

export const katakana = [
  // Vowels (5)
  { char: "ア", romaji: "a", group: "vowel", type: "basic" },
  { char: "イ", romaji: "i", group: "vowel", type: "basic" },
  { char: "ウ", romaji: "u", group: "vowel", type: "basic" },
  { char: "エ", romaji: "e", group: "vowel", type: "basic" },
  { char: "オ", romaji: "o", group: "vowel", type: "basic" },

  // K-row (5)
  { char: "カ", romaji: "ka", group: "k", type: "basic" },
  { char: "キ", romaji: "ki", group: "k", type: "basic" },
  { char: "ク", romaji: "ku", group: "k", type: "basic" },
  { char: "ケ", romaji: "ke", group: "k", type: "basic" },
  { char: "コ", romaji: "ko", group: "k", type: "basic" },

  // S-row (5)
  { char: "サ", romaji: "sa", group: "s", type: "basic" },
  { char: "シ", romaji: "shi", group: "s", type: "basic" },
  { char: "ス", romaji: "su", group: "s", type: "basic" },
  { char: "セ", romaji: "se", group: "s", type: "basic" },
  { char: "ソ", romaji: "so", group: "s", type: "basic" },

  // T-row (5)
  { char: "タ", romaji: "ta", group: "t", type: "basic" },
  { char: "チ", romaji: "chi", group: "t", type: "basic" },
  { char: "ツ", romaji: "tsu", group: "t", type: "basic" },
  { char: "テ", romaji: "te", group: "t", type: "basic" },
  { char: "ト", romaji: "to", group: "t", type: "basic" },

  // N-row (5)
  { char: "ナ", romaji: "na", group: "n", type: "basic" },
  { char: "ニ", romaji: "ni", group: "n", type: "basic" },
  { char: "ヌ", romaji: "nu", group: "n", type: "basic" },
  { char: "ネ", romaji: "ne", group: "n", type: "basic" },
  { char: "ノ", romaji: "no", group: "n", type: "basic" },

  // H-row (5)
  { char: "ハ", romaji: "ha", group: "h", type: "basic" },
  { char: "ヒ", romaji: "hi", group: "h", type: "basic" },
  { char: "フ", romaji: "fu", group: "h", type: "basic" },
  { char: "ヘ", romaji: "he", group: "h", type: "basic" },
  { char: "ホ", romaji: "ho", group: "h", type: "basic" },

  // M-row (5)
  { char: "マ", romaji: "ma", group: "m", type: "basic" },
  { char: "ミ", romaji: "mi", group: "m", type: "basic" },
  { char: "ム", romaji: "mu", group: "m", type: "basic" },
  { char: "メ", romaji: "me", group: "m", type: "basic" },
  { char: "モ", romaji: "mo", group: "m", type: "basic" },

  // Y-row (3)
  { char: "ヤ", romaji: "ya", group: "y", type: "basic" },
  { char: "ユ", romaji: "yu", group: "y", type: "basic" },
  { char: "ヨ", romaji: "yo", group: "y", type: "basic" },

  // R-row (5)
  { char: "ラ", romaji: "ra", group: "r", type: "basic" },
  { char: "リ", romaji: "ri", group: "r", type: "basic" },
  { char: "ル", romaji: "ru", group: "r", type: "basic" },
  { char: "レ", romaji: "re", group: "r", type: "basic" },
  { char: "ロ", romaji: "ro", group: "r", type: "basic" },

  // W-row (2) + N (1)
  { char: "ワ", romaji: "wa", group: "w", type: "basic" },
  { char: "ヲ", romaji: "wo", group: "w", type: "basic" },
  { char: "ン", romaji: "n", group: "n-single", type: "basic" },

  // === DAKUTEN (voiced) ===
  
  // G-row (5) - from K
  { char: "ガ", romaji: "ga", group: "g", type: "dakuten" },
  { char: "ギ", romaji: "gi", group: "g", type: "dakuten" },
  { char: "グ", romaji: "gu", group: "g", type: "dakuten" },
  { char: "ゲ", romaji: "ge", group: "g", type: "dakuten" },
  { char: "ゴ", romaji: "go", group: "g", type: "dakuten" },

  // Z-row (5) - from S
  { char: "ザ", romaji: "za", group: "z", type: "dakuten" },
  { char: "ジ", romaji: "ji", group: "z", type: "dakuten" },
  { char: "ズ", romaji: "zu", group: "z", type: "dakuten" },
  { char: "ゼ", romaji: "ze", group: "z", type: "dakuten" },
  { char: "ゾ", romaji: "zo", group: "z", type: "dakuten" },

  // D-row (5) - from T
  { char: "ダ", romaji: "da", group: "d", type: "dakuten" },
  { char: "ヂ", romaji: "ji", group: "d", type: "dakuten" },
  { char: "ヅ", romaji: "zu", group: "d", type: "dakuten" },
  { char: "デ", romaji: "de", group: "d", type: "dakuten" },
  { char: "ド", romaji: "do", group: "d", type: "dakuten" },

  // B-row (5) - from H
  { char: "バ", romaji: "ba", group: "b", type: "dakuten" },
  { char: "ビ", romaji: "bi", group: "b", type: "dakuten" },
  { char: "ブ", romaji: "bu", group: "b", type: "dakuten" },
  { char: "ベ", romaji: "be", group: "b", type: "dakuten" },
  { char: "ボ", romaji: "bo", group: "b", type: "dakuten" },

  // === HANDAKUTEN (semi-voiced) ===
  
  // P-row (5) - from H
  { char: "パ", romaji: "pa", group: "p", type: "handakuten" },
  { char: "ピ", romaji: "pi", group: "p", type: "handakuten" },
  { char: "プ", romaji: "pu", group: "p", type: "handakuten" },
  { char: "ペ", romaji: "pe", group: "p", type: "handakuten" },
  { char: "ポ", romaji: "po", group: "p", type: "handakuten" },

  // === YŌON (combination characters) ===
  
  // K-yōon
  { char: "キャ", romaji: "kya", group: "k-yoon", type: "yoon" },
  { char: "キュ", romaji: "kyu", group: "k-yoon", type: "yoon" },
  { char: "キョ", romaji: "kyo", group: "k-yoon", type: "yoon" },
  
  // S-yōon
  { char: "シャ", romaji: "sha", group: "s-yoon", type: "yoon" },
  { char: "シュ", romaji: "shu", group: "s-yoon", type: "yoon" },
  { char: "ショ", romaji: "sho", group: "s-yoon", type: "yoon" },
  
  // C-yōon
  { char: "チャ", romaji: "cha", group: "c-yoon", type: "yoon" },
  { char: "チュ", romaji: "chu", group: "c-yoon", type: "yoon" },
  { char: "チョ", romaji: "cho", group: "c-yoon", type: "yoon" },
  
  // N-yōon
  { char: "ニャ", romaji: "nya", group: "n-yoon", type: "yoon" },
  { char: "ニュ", romaji: "nyu", group: "n-yoon", type: "yoon" },
  { char: "ニョ", romaji: "nyo", group: "n-yoon", type: "yoon" },
  
  // H-yōon
  { char: "ヒャ", romaji: "hya", group: "h-yoon", type: "yoon" },
  { char: "ヒュ", romaji: "hyu", group: "h-yoon", type: "yoon" },
  { char: "ヒョ", romaji: "hyo", group: "h-yoon", type: "yoon" },
  
  // M-yōon
  { char: "ミャ", romaji: "mya", group: "m-yoon", type: "yoon" },
  { char: "ミュ", romaji: "myu", group: "m-yoon", type: "yoon" },
  { char: "ミョ", romaji: "myo", group: "m-yoon", type: "yoon" },
  
  // R-yōon
  { char: "リャ", romaji: "rya", group: "r-yoon", type: "yoon" },
  { char: "リュ", romaji: "ryu", group: "r-yoon", type: "yoon" },
  { char: "リョ", romaji: "ryo", group: "r-yoon", type: "yoon" },
  
  // G-yōon (voiced)
  { char: "ギャ", romaji: "gya", group: "g-yoon", type: "yoon" },
  { char: "ギュ", romaji: "gyu", group: "g-yoon", type: "yoon" },
  { char: "ギョ", romaji: "gyo", group: "g-yoon", type: "yoon" },
  
  // J-yōon (voiced)
  { char: "ジャ", romaji: "ja", group: "j-yoon", type: "yoon" },
  { char: "ジュ", romaji: "ju", group: "j-yoon", type: "yoon" },
  { char: "ジョ", romaji: "jo", group: "j-yoon", type: "yoon" },
  
  // B-yōon (voiced)
  { char: "ビャ", romaji: "bya", group: "b-yoon", type: "yoon" },
  { char: "ビュ", romaji: "byu", group: "b-yoon", type: "yoon" },
  { char: "ビョ", romaji: "byo", group: "b-yoon", type: "yoon" },
  
  // P-yōon (semi-voiced)
  { char: "ピャ", romaji: "pya", group: "p-yoon", type: "yoon" },
  { char: "ピュ", romaji: "pyu", group: "p-yoon", type: "yoon" },
  { char: "ピョ", romaji: "pyo", group: "p-yoon", type: "yoon" },
];

// Get characters by type
export const getBasicKatakana = () => katakana.filter(k => k.type === "basic");
export const getDakutenKatakana = () => katakana.filter(k => k.type === "dakuten");
export const getHandakutenKatakana = () => katakana.filter(k => k.type === "handakuten");
export const getYoonKatakana = () => katakana.filter(k => k.type === "yoon");

// Get main katakana (excluding yoon for simpler practice)
export const getMainKatakana = () => katakana.filter(k => k.type !== "yoon");

// Total counts
export const TOTAL_MAIN = 76; // Basic + Dakuten + Handakuten
export const TOTAL_YOON = 33; // Combination characters
export const TOTAL_ALL = 109; // Everything

// Get characters by group
export const getByGroup = (group) => katakana.filter(k => k.group === group);

// All groups in order
export const groups = [
  { id: "vowel", name: "Vowels", chars: "アイウエオ" },
  { id: "k", name: "K-row", chars: "カキクケコ" },
  { id: "s", name: "S-row", chars: "サシスセソ" },
  { id: "t", name: "T-row", chars: "タチツテト" },
  { id: "n", name: "N-row", chars: "ナニヌネノ" },
  { id: "h", name: "H-row", chars: "ハヒフヘホ" },
  { id: "m", name: "M-row", chars: "マミムメモ" },
  { id: "y", name: "Y-row", chars: "ヤユヨ" },
  { id: "r", name: "R-row", chars: "ラリルレロ" },
  { id: "w", name: "W-row", chars: "ワヲン" },
  { id: "g", name: "G-row (dakuten)", chars: "ガギグゲゴ" },
  { id: "z", name: "Z-row (dakuten)", chars: "ザジズゼゾ" },
  { id: "d", name: "D-row (dakuten)", chars: "ダヂヅデド" },
  { id: "b", name: "B-row (dakuten)", chars: "バビブベボ" },
  { id: "p", name: "P-row (handakuten)", chars: "パピプペポ" },
];

// Yoon groups (combination characters)
export const yoonGroups = [
  { id: "k-yoon", name: "K-yōon", chars: "キャキュキョ" },
  { id: "s-yoon", name: "S-yōon", chars: "シャシュショ" },
  { id: "c-yoon", name: "C-yōon", chars: "チャチュチョ" },
  { id: "n-yoon", name: "N-yōon", chars: "ニャニュニョ" },
  { id: "h-yoon", name: "H-yōon", chars: "ヒャヒュヒョ" },
  { id: "m-yoon", name: "M-yōon", chars: "ミャミュミョ" },
  { id: "r-yoon", name: "R-yōon", chars: "リャリュリョ" },
  { id: "g-yoon", name: "G-yōon", chars: "ギャギュギョ" },
  { id: "j-yoon", name: "J-yōon", chars: "ジャジュジョ" },
  { id: "b-yoon", name: "B-yōon", chars: "ビャビュビョ" },
  { id: "p-yoon", name: "P-yōon", chars: "ピャピュピョ" },
];

// All groups combined
export const allGroups = [...groups, ...yoonGroups];

// Shuffle utility
export const shuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Common loanword vocabulary for context
export const commonWords = [
  // Food & Drink
  { word: "コーヒー", romaji: "koohii", english: "coffee" },
  { word: "ケーキ", romaji: "keeki", english: "cake" },
  { word: "パン", romaji: "pan", english: "bread" },
  { word: "ハンバーガー", romaji: "hanbaagaa", english: "hamburger" },
  { word: "ピザ", romaji: "piza", english: "pizza" },
  
  // Technology
  { word: "コンピューター", romaji: "konpyuutaa", english: "computer" },
  { word: "スマホ", romaji: "sumaho", english: "smartphone" },
  { word: "テレビ", romaji: "terebi", english: "television" },
  { word: "インターネット", romaji: "intaanetto", english: "internet" },
  
  // Places
  { word: "ホテル", romaji: "hoteru", english: "hotel" },
  { word: "レストラン", romaji: "resutoran", english: "restaurant" },
  { word: "アメリカ", romaji: "amerika", english: "America" },
];
