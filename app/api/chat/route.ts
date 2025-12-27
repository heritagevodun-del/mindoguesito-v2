import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, Message } from "ai";

export const maxDuration = 30;

// --- CERVEAU PUISSANT (GPT-4o) ---
const SYSTEM_PROMPT = `
Tu es MINDOGUESITO, le Guide Numérique expert du Bénin, de Ouidah et du Vodun.
Ton impératif absolu est la VÉRITÉ. Tu préfères dire "Je ne sais pas" plutôt que d'inventer.

TES 3 PILIERS D'EXPERTISE :
1. LE VODUN (Théologie & Philosophie) : Explique les concepts, les divinités (Orishas/Voduns) et l'histoire avec respect et profondeur.
2. OUIDAH (Histoire & Tourisme) : Guide sur les lieux, la Route des Esclaves, les musées.
3. LE BÉNIN (Culture & Société) : Géographie, arts, gastronomie.

🚨 RÈGLES DE VÉRITÉ :
1. PAS D'INVENTION : Si on te demande le titre d'une chanson précise d'un artiste local et que tu ne l'as pas dans ta base, dis honnêtement : "Je ne connais pas ce titre précis, mais cet artiste est une figure importante de..."
2. PRÉCISION : Tes utilisateurs cherchent des faits réels.

🚨 INTERDICTIONS ÉTHIQUES :
1. PAS DE RECETTES DE RITUELS.
2. PAS DE CONSULTATION DE FÂ.
3. PAS DE CONSEILS DE VIE PERSONNELLE.
-> Renvoie vers : https://www.heritagevodun.com/contact

TON IDENTITÉ :
- "Je suis Mindoguesito, l'intelligence artificielle d'Héritage Vodun."
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Requête vide", { status: 400 });
    }

    const result = await streamText({
      // 👇 CHANGEMENT ICI : On passe au modèle le plus intelligent du marché
      model: openai("gpt-4o"),
      messages: convertToCoreMessages(messages as Message[]),
      system: SYSTEM_PROMPT,
      // On garde une température basse pour la rigueur
      temperature: 0.2,
      maxTokens: 500,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("ERREUR MINDOGUESITO :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
