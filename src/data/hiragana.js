// Complete hiragana character set
// Basic (46) + Dakuten (25) + Handakuten (5) = 76 total

export const hiragana = [
  // Vowels (5)
  { char: "あ", romaji: "a", group: "vowel", type: "basic" },
  { char: "い", romaji: "i", group: "vowel", type: "basic" },
  { char: "う", romaji: "u", group: "vowel", type: "basic" },
  { char: "え", romaji: "e", group: "vowel", type: "basic" },
  { char: "お", romaji: "o", group: "vowel", type: "basic" },

  // K-row (5)
  { char: "か", romaji: "ka", group: "k", type: "basic" },
  { char: "き", romaji: "ki", group: "k", type: "basic" },
  { char: "く", romaji: "ku", group: "k", type: "basic" },
  { char: "け", romaji: "ke", group: "k", type: "basic" },
  { char: "こ", romaji: "ko", group: "k", type: "basic" },

  // S-row (5)
  { char: "さ", romaji: "sa", group: "s", type: "basic" },
  { char: "し", romaji: "shi", group: "s", type: "basic" },
  { char: "す", romaji: "su", group: "s", type: "basic" },
  { char: "せ", romaji: "se", group: "s", type: "basic" },
  { char: "そ", romaji: "so", group: "s", type: "basic" },

  // T-row (5)
  { char: "た", romaji: "ta", group: "t", type: "basic" },
  { char: "ち", romaji: "chi", group: "t", type: "basic" },
  { char: "つ", romaji: "tsu", group: "t", type: "basic" },
  { char: "て", romaji: "te", group: "t", type: "basic" },
  { char: "と", romaji: "to", group: "t", type: "basic" },

  // N-row (5)
  { char: "な", romaji: "na", group: "n", type: "basic" },
  { char: "に", romaji: "ni", group: "n", type: "basic" },
  { char: "ぬ", romaji: "nu", group: "n", type: "basic" },
  { char: "ね", romaji: "ne", group: "n", type: "basic" },
  { char: "の", romaji: "no", group: "n", type: "basic" },

  // H-row (5)
  { char: "は", romaji: "ha", group: "h", type: "basic" },
  { char: "ひ", romaji: "hi", group: "h", type: "basic" },
  { char: "ふ", romaji: "fu", group: "h", type: "basic" },
  { char: "へ", romaji: "he", group: "h", type: "basic" },
  { char: "ほ", romaji: "ho", group: "h", type: "basic" },

  // M-row (5)
  { char: "ま", romaji: "ma", group: "m", type: "basic" },
  { char: "み", romaji: "mi", group: "m", type: "basic" },
  { char: "む", romaji: "mu", group: "m", type: "basic" },
  { char: "め", romaji: "me", group: "m", type: "basic" },
  { char: "も", romaji: "mo", group: "m", type: "basic" },

  // Y-row (3)
  { char: "や", romaji: "ya", group: "y", type: "basic" },
  { char: "ゆ", romaji: "yu", group: "y", type: "basic" },
  { char: "よ", romaji: "yo", group: "y", type: "basic" },

  // R-row (5)
  { char: "ら", romaji: "ra", group: "r", type: "basic" },
  { char: "り", romaji: "ri", group: "r", type: "basic" },
  { char: "る", romaji: "ru", group: "r", type: "basic" },
  { char: "れ", romaji: "re", group: "r", type: "basic" },
  { char: "ろ", romaji: "ro", group: "r", type: "basic" },

  // W-row (2) + N (1)
  { char: "わ", romaji: "wa", group: "w", type: "basic" },
  { char: "を", romaji: "wo", group: "w", type: "basic" },
  { char: "ん", romaji: "n", group: "n-single", type: "basic" },

  // === DAKUTEN (voiced) ===
  
  // G-row (5) - from K
  { char: "が", romaji: "ga", group: "g", type: "dakuten" },
  { char: "ぎ", romaji: "gi", group: "g", type: "dakuten" },
  { char: "ぐ", romaji: "gu", group: "g", type: "dakuten" },
  { char: "げ", romaji: "ge", group: "g", type: "dakuten" },
  { char: "ご", romaji: "go", group: "g", type: "dakuten" },

  // Z-row (5) - from S
  { char: "ざ", romaji: "za", group: "z", type: "dakuten" },
  { char: "じ", romaji: "ji", group: "z", type: "dakuten" },
  { char: "ず", romaji: "zu", group: "z", type: "dakuten" },
  { char: "ぜ", romaji: "ze", group: "z", type: "dakuten" },
  { char: "ぞ", romaji: "zo", group: "z", type: "dakuten" },

  // D-row (5) - from T
  { char: "だ", romaji: "da", group: "d", type: "dakuten" },
  { char: "ぢ", romaji: "ji", group: "d", type: "dakuten" },
  { char: "づ", romaji: "zu", group: "d", type: "dakuten" },
  { char: "で", romaji: "de", group: "d", type: "dakuten" },
  { char: "ど", romaji: "do", group: "d", type: "dakuten" },

  // B-row (5) - from H
  { char: "ば", romaji: "ba", group: "b", type: "dakuten" },
  { char: "び", romaji: "bi", group: "b", type: "dakuten" },
  { char: "ぶ", romaji: "bu", group: "b", type: "dakuten" },
  { char: "べ", romaji: "be", group: "b", type: "dakuten" },
  { char: "ぼ", romaji: "bo", group: "b", type: "dakuten" },

  // === HANDAKUTEN (semi-voiced) ===
  
  // P-row (5) - from H
  { char: "ぱ", romaji: "pa", group: "p", type: "handakuten" },
  { char: "ぴ", romaji: "pi", group: "p", type: "handakuten" },
  { char: "ぷ", romaji: "pu", group: "p", type: "handakuten" },
  { char: "ぺ", romaji: "pe", group: "p", type: "handakuten" },
  { char: "ぽ", romaji: "po", group: "p", type: "handakuten" },

  // === YŌON (combination characters) ===
  
  // K-yōon
  { char: "きゃ", romaji: "kya", group: "k-yoon", type: "yoon" },
  { char: "きゅ", romaji: "kyu", group: "k-yoon", type: "yoon" },
  { char: "きょ", romaji: "kyo", group: "k-yoon", type: "yoon" },
  
  // S-yōon
  { char: "しゃ", romaji: "sha", group: "s-yoon", type: "yoon" },
  { char: "しゅ", romaji: "shu", group: "s-yoon", type: "yoon" },
  { char: "しょ", romaji: "sho", group: "s-yoon", type: "yoon" },
  
  // C-yōon
  { char: "ちゃ", romaji: "cha", group: "c-yoon", type: "yoon" },
  { char: "ちゅ", romaji: "chu", group: "c-yoon", type: "yoon" },
  { char: "ちょ", romaji: "cho", group: "c-yoon", type: "yoon" },
  
  // N-yōon
  { char: "にゃ", romaji: "nya", group: "n-yoon", type: "yoon" },
  { char: "にゅ", romaji: "nyu", group: "n-yoon", type: "yoon" },
  { char: "にょ", romaji: "nyo", group: "n-yoon", type: "yoon" },
  
  // H-yōon
  { char: "ひゃ", romaji: "hya", group: "h-yoon", type: "yoon" },
  { char: "ひゅ", romaji: "hyu", group: "h-yoon", type: "yoon" },
  { char: "ひょ", romaji: "hyo", group: "h-yoon", type: "yoon" },
  
  // M-yōon
  { char: "みゃ", romaji: "mya", group: "m-yoon", type: "yoon" },
  { char: "みゅ", romaji: "myu", group: "m-yoon", type: "yoon" },
  { char: "みょ", romaji: "myo", group: "m-yoon", type: "yoon" },
  
  // R-yōon
  { char: "りゃ", romaji: "rya", group: "r-yoon", type: "yoon" },
  { char: "りゅ", romaji: "ryu", group: "r-yoon", type: "yoon" },
  { char: "りょ", romaji: "ryo", group: "r-yoon", type: "yoon" },
  
  // G-yōon (voiced)
  { char: "ぎゃ", romaji: "gya", group: "g-yoon", type: "yoon" },
  { char: "ぎゅ", romaji: "gyu", group: "g-yoon", type: "yoon" },
  { char: "ぎょ", romaji: "gyo", group: "g-yoon", type: "yoon" },
  
  // J-yōon (voiced)
  { char: "じゃ", romaji: "ja", group: "j-yoon", type: "yoon" },
  { char: "じゅ", romaji: "ju", group: "j-yoon", type: "yoon" },
  { char: "じょ", romaji: "jo", group: "j-yoon", type: "yoon" },
  
  // B-yōon (voiced)
  { char: "びゃ", romaji: "bya", group: "b-yoon", type: "yoon" },
  { char: "びゅ", romaji: "byu", group: "b-yoon", type: "yoon" },
  { char: "びょ", romaji: "byo", group: "b-yoon", type: "yoon" },
  
  // P-yōon (semi-voiced)
  { char: "ぴゃ", romaji: "pya", group: "p-yoon", type: "yoon" },
  { char: "ぴゅ", romaji: "pyu", group: "p-yoon", type: "yoon" },
  { char: "ぴょ", romaji: "pyo", group: "p-yoon", type: "yoon" },
];

// Get characters by type
export const getBasicHiragana = () => hiragana.filter(h => h.type === "basic");
export const getDakutenHiragana = () => hiragana.filter(h => h.type === "dakuten");
export const getHandakutenHiragana = () => hiragana.filter(h => h.type === "handakuten");
export const getYoonHiragana = () => hiragana.filter(h => h.type === "yoon");

// Get main hiragana (excluding yoon for simpler practice)
export const getMainHiragana = () => hiragana.filter(h => h.type !== "yoon");

// Total counts
export const TOTAL_MAIN = 76; // Basic + Dakuten + Handakuten
export const TOTAL_YOON = 33; // Combination characters
export const TOTAL_ALL = 109; // Everything

// Get characters by group
export const getByGroup = (group) => hiragana.filter(h => h.group === group);

// All groups in order
export const groups = [
  { id: "vowel", name: "Vowels", chars: "あいうえお" },
  { id: "k", name: "K-row", chars: "かきくけこ" },
  { id: "s", name: "S-row", chars: "さしすせそ" },
  { id: "t", name: "T-row", chars: "たちつてと" },
  { id: "n", name: "N-row", chars: "なにぬねの" },
  { id: "h", name: "H-row", chars: "はひふへほ" },
  { id: "m", name: "M-row", chars: "まみむめも" },
  { id: "y", name: "Y-row", chars: "やゆよ" },
  { id: "r", name: "R-row", chars: "らりるれろ" },
  { id: "w", name: "W-row", chars: "わをん" },
  { id: "g", name: "G-row (dakuten)", chars: "がぎぐげご" },
  { id: "z", name: "Z-row (dakuten)", chars: "ざじずぜぞ" },
  { id: "d", name: "D-row (dakuten)", chars: "だぢづでど" },
  { id: "b", name: "B-row (dakuten)", chars: "ばびぶべぼ" },
  { id: "p", name: "P-row (handakuten)", chars: "ぱぴぷぺぽ" },
];

// Yoon groups (combination characters)
export const yoonGroups = [
  { id: "k-yoon", name: "K-yōon", chars: "きゃきゅきょ" },
  { id: "s-yoon", name: "S-yōon", chars: "しゃしゅしょ" },
  { id: "c-yoon", name: "C-yōon", chars: "ちゃちゅちょ" },
  { id: "n-yoon", name: "N-yōon", chars: "にゃにゅにょ" },
  { id: "h-yoon", name: "H-yōon", chars: "ひゃひゅひょ" },
  { id: "m-yoon", name: "M-yōon", chars: "みゃみゅみょ" },
  { id: "r-yoon", name: "R-yōon", chars: "りゃりゅりょ" },
  { id: "g-yoon", name: "G-yōon", chars: "ぎゃぎゅぎょ" },
  { id: "j-yoon", name: "J-yōon", chars: "じゃじゅじょ" },
  { id: "b-yoon", name: "B-yōon", chars: "びゃびゅびょ" },
  { id: "p-yoon", name: "P-yōon", chars: "ぴゃぴゅぴょ" },
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
