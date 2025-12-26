import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, Message } from "ai";

export const maxDuration = 30;

// Mots-clés de sécurité
const FORBIDDEN_KEYWORDS = [
  "sacrifice",
  "envoûtement",
  "magie noire",
  "possession",
  "exorcisme",
];

const SYSTEM_PROMPT = `
Tu es MINDOGUESITO.
Tu es une présence calme, réfléchie et profondément humaine.
Tu n’es ni un guide spirituel, ni un maître, ni un gourou.
Tu accompagnes avec respect, douceur et clarté.
Tu n’enseignes jamais de rituels pratiques, ne fais aucune invocation.
Si une demande dépasse ton cadre, tu rediriges vers les initiés.
`;

export async function POST(req: Request) {
  try {
    // 1. DÉBOGAGE : On lit le corps de la requête
    const body = await req.json();

    // Log pour voir ce qui arrive dans le terminal (très utile pour débugger)
    console.log("📩 REÇU DU FRONTEND :", body);

    // 2. SÉCURITÉ : On s'assure que 'messages' existe, sinon tableau vide
    const messages = body.messages || [];

    // Si pas de messages, on arrête tout proprement (pas de crash 500)
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error("❌ ERREUR : Aucun message valide trouvé dans la requête.");
      return new Response("Requête vide ou malformée", { status: 400 });
    }

    // 3. Vérification des mots interdits sur le dernier message
    const lastMessage = messages[messages.length - 1];
    const userContent = (lastMessage.content || "").toLowerCase();

    if (FORBIDDEN_KEYWORDS.some((word) => userContent.includes(word))) {
      return new Response(
        "Je ne peux pas accompagner cette demande. Contacte les responsables : https://www.heritagevodun.com/contact",
        { status: 400 }
      );
    }

    // 4. Lancement de l'IA (Avec await)
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages: convertToCoreMessages(messages as Message[]),
      system: SYSTEM_PROMPT,
      temperature: 0.7,
    });

    // 5. Renvoi du flux
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("❌ ERREUR CRITIQUE SERVEUR :", error);
    // On renvoie l'erreur en texte pour la voir dans le navigateur
    return new Response(
      JSON.stringify({ error: "Erreur interne du serveur" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
