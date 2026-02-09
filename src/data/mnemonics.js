// Mnemonic hints for hiragana characters
// Based on common associations and visual similarities

export const mnemonics = {
  // Vowels
  "あ": "Looks like an 'a'pple core with a stem",
  "い": "Two sticks (ii = two in Japanese!)",
  "う": "A sideways 'u' for an eel (unagi)",
  "え": "An 'e'xotic bird's head",
  "お": "A man carrying something 'o'ver his shoulder",

  // K-row
  "か": "A 'ka'te with a sword (k sound)",
  "き": "A 'key' on a keyring",
  "く": "A bird's beak saying 'coo'",
  "け": "A 'ke'g of beer being poured",
  "こ": "Two worms in a 'co'coon",

  // S-row
  "さ": "A 'sa'murai slashing",
  "し": "A fishhook - 'she' went fishing",
  "す": "A 'su'shi hanging from a hook",
  "せ": "'Say' something to the mouth (looks like lips)",
  "そ": "A sewing needle with thread (so + thread)",

  // T-row
  "た": "A person 'ta'pping their foot",
  "ち": "A 'chee'rful face smiling",
  "つ": "'Tsu'nami wave",
  "て": "A dog's 'te'il wagging",
  "と": "A 'to'e with a toenail",

  // N-row
  "な": "A 'na'nny crossing her arms",
  "に": "A smiling face on 'knee' (ni sounds like knee)",
  "ぬ": "Eating 'noo'dles with chopsticks",
  "ね": "A 'ne't catching something",
  "の": "'No' means 'of' - like a nose sniffing",

  // H-row
  "は": "'Ha!' someone laughing",
  "ひ": "'He' (sounds like hee) is smiling",
  "ふ": "'Fu'ji mountain with snow on top",
  "へ": "A mountain 'hey'!",
  "ほ": "'Ho' ho ho - Santa's face",

  // M-row
  "ま": "'Ma'ma duck leading ducklings",
  "み": "Lucky number '21' - very 'me'!",
  "む": "'Moo' - a cow's face with horns",
  "め": "An 'eye' (me = eye in Japanese)",
  "も": "More hooks! (mo = more)",

  // Y-row
  "や": "'Ya'cht sailing",
  "ゆ": "A fish saying 'you!'",
  "よ": "'Yo'ga pose",

  // R-row
  "ら": "'Ra' - the sun god's head",
  "り": "'Ree'ds swaying in the wind",
  "る": "A 'roo' (kangaroo) hopping",
  "れ": "'Ray' of light bending",
  "ろ": "'Ro'bot arm",

  // W-row
  "わ": "A 'wa'ter wave",
  "を": "Looks like を! (rare character, just memorize)",
  "ん": "Hmm... thinking (ん = 'n' sound)",

  // Dakuten - G row
  "が": "Ka with voice marks = 'ga'",
  "ぎ": "Ki with voice marks = 'gi'",
  "ぐ": "Ku with voice marks = 'gu'",
  "げ": "Ke with voice marks = 'ge'",
  "ご": "Ko with voice marks = 'go'",

  // Dakuten - Z row
  "ざ": "Sa + voice = 'za'",
  "じ": "Shi + voice = 'ji'",
  "ず": "Su + voice = 'zu'",
  "ぜ": "Se + voice = 'ze'",
  "ぞ": "So + voice = 'zo'",

  // Dakuten - D row
  "だ": "Ta + voice = 'da'",
  "ぢ": "Chi + voice = 'ji' (rare)",
  "づ": "Tsu + voice = 'zu' (rare)",
  "で": "Te + voice = 'de'",
  "ど": "To + voice = 'do'",

  // Dakuten - B row
  "ば": "Ha + voice = 'ba'",
  "び": "Hi + voice = 'bi'",
  "ぶ": "Fu + voice = 'bu'",
  "べ": "He + voice = 'be'",
  "ぼ": "Ho + voice = 'bo'",

  // Handakuten - P row
  "ぱ": "Ha + circle = 'pa' (pop!)",
  "ぴ": "Hi + circle = 'pi' (peep!)",
  "ぷ": "Fu + circle = 'pu' (puff!)",
  "ぺ": "He + circle = 'pe'",
  "ぽ": "Ho + circle = 'po' (pop!)",
};

export const getMnemonic = (char) => mnemonics[char] || null;
