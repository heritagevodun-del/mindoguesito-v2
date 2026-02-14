// utils/phonetics.ts

/**
 * Dictionnaire de correction phonétique pour le moteur TTS natif.
 * Clé = Mot écrit / Valeur = Prononciation forcée
 */
const PHONETIC_MAP: Record<string, string> = {
  Mindoguesito: "Minne-do-gué-si-to",
  Vodun: "Vau-doun",
  Fâ: "Faaa", // Allongement pour éviter le son "Fa" sec
  "DOBANOU-NOUTO": "Do-ba-nou Nou-to",
  Legba: "Lèg-ba",
  Mawu: "Ma-ou",
  Ouidah: "Oui-da",
  Zangbeto: "Zan-gbé-to",
  Kkiapay: "Ki-a-paye",
  Bénin: "Bénin",
  Ahouandjinou: "A-ouane-dji-nou",
  Kwabo: "Koua-bo",
};

/**
 * Prépare le texte pour la synthèse vocale :
 * 1. Retire le Markdown (*gras*, [liens], etc.)
 * 2. Retire les Emojis (pour éviter que l'IA ne lise "Visage souriant")
 * 3. Applique les corrections phonétiques du dictionnaire Vodun
 */
export function processTextForTTS(text: string): string {
  // 1. Nettoyage Markdown & Emojis & Caractères spéciaux
  let cleanText = text
    .replace(
      /[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F000}-\u{1F0FF}\u{1F018}-\u{1F270}\u{2934}\u{2935}\u{203C}\u{2049}\u{00A9}\u{00AE}\u{2122}\u{2139}\u{2194}-\u{2199}\u{2328}\u{3030}\u{303D}]/gu,
      "",
    )
    .replace(/[*_~`#]/g, "") // Retire gras, italique, code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Garde le texte des liens, retire l'URL
    .replace(/\s+/g, " ") // Remplace les espaces multiples par un seul
    .trim();

  // 2. Application du dictionnaire phonétique (Insensible à la casse)
  Object.keys(PHONETIC_MAP).forEach((key) => {
    // Regex globale insensible à la casse
    const regex = new RegExp(key, "gi");
    cleanText = cleanText.replace(regex, PHONETIC_MAP[key]);
  });

  return cleanText;
}
