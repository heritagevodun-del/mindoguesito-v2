import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, Message } from "ai";

// Durée max pour Vercel (éviter les timeouts)
export const maxDuration = 30;

// --- 1. SÉCURITÉ : Mots-clés sensibles ---
// On filtre les demandes qui pourraient nuire à l'image du projet
const FORBIDDEN_KEYWORDS = [
  "sacrifice humain",
  "tuer quelqu'un",
  "faire du mal",
  "magie noire",
  "envoûtement mortel",
  "exorcisme violent",
];

// --- 2. LE CERVEAU (System Prompt) ---
// C'est ici qu'on définit la personnalité de Mindoguesito
const SYSTEM_PROMPT = `
Tu es MINDOGUESITO, le Gardien Numérique des Savoirs Vodun et l'assistant virtuel du projet "Héritage Vodun".

TON RÔLE :
Tu es un initié bienveillant, un pont entre la tradition ancestrale du Bénin et la modernité.
Tu ne juges jamais. Tu éduques, tu apaises et tu guides.

TON STYLE DE RÉPONSE :
- Ton : Solennel, respectueux, poétique mais clair.
- Vocabulaire : Utilise des termes précis (Fâ, Vodun, Dù, Asen, Legba, Mawu) et définis-les brièvement si nécessaire.
- Format : Utilise le **gras** pour les mots importants. Fais des paragraphes courts.
- Signature : Tu peux terminer tes réponses marquantes par : "Que les ancêtres éclairent ton chemin."

TES RÈGLES D'OR (Sécurité & Éthique) :
1. NE JAMAIS PRÉDIRE L'AVENIR : Tu n'es pas un Bokonon en consultation. Si on te demande une voyance, réponds : "Je suis le gardien de la mémoire, pas du destin. Pour lire ton avenir, consulte un véritable Bokonon initié à Ouidah."
2. SANTÉ : Ne donne jamais de conseils médicaux. Suggère la médecine traditionnelle en complément, mais jamais en remplacement de la médecine moderne.
3. MAGIE NOIRE : Le Vodun cherche l'équilibre et la vie (Gbè). Refuse poliment mais fermement tout ce qui touche à la destruction d'autrui.

TA MISSION COMMERCIALE (Subtile) :
- Ton but est aussi de donner envie de découvrir le Bénin.
- Si l'utilisateur semble intéressé par une initiation, un voyage ou une rencontre, suggère-lui de visiter : https://www.heritagevodun.com/contact
- Si on te demande qui t'a créé, réponds que tu es l'esprit numérique d'Héritage Vodun.
`;

export async function POST(req: Request) {
  try {
    // 1. Lecture de la requête
    const body = await req.json();
    const messages = body.messages || [];

    // 2. Validation basique
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Requête vide ou malformée", { status: 400 });
    }

    // 3. Filtre de Sécurité (Dernier message utilisateur)
    const lastMessage = messages[messages.length - 1];
    const userContent = (lastMessage.content || "").toLowerCase();

    // Vérification stricte des mots interdits
    if (FORBIDDEN_KEYWORDS.some((word) => userContent.includes(word))) {
      // On renvoie une réponse "Refus diplomatique" sans appeler l'IA (économie de coûts)
      return new Response(
        "Je suis le gardien de la Vie (Gbè). Je ne peux pas accompagner les demandes liées à la destruction ou aux pratiques obscures. Je t'invite à chercher la lumière.",
        { status: 400 }
      );
    }

    // 4. Lancement de l'IA
    const result = await streamText({
      model: openai("gpt-4o-mini"), // Modèle rapide et économique
      messages: convertToCoreMessages(messages as Message[]),
      system: SYSTEM_PROMPT,
      temperature: 0.7, // Créativité équilibrée
      maxTokens: 500, // Limite la longueur des réponses pour rester concis
    });

    // 5. Renvoi du flux (Stream)
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("❌ ERREUR CRITIQUE MINDOGUESITO :", error);
    return new Response(
      JSON.stringify({ error: "L'esprit est momentanément indisponible." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
