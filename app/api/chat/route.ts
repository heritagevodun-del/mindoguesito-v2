import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, Message } from "ai";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit"; // <-- 1. Importation du Bouclier
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

// Vercel Configuration : 60 secondes max
export const maxDuration = 60;

// Initialisation de la base de données Redis (Upstash)
const redis = Redis.fromEnv();

// --- CONFIGURATION DU RATE LIMITING ---
// Autorise 10 requêtes par minute (fenêtre glissante).
// Modifiez ces valeurs selon votre stratégie d'acquisition.
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true, // Permet de voir les statistiques sur le dashboard Upstash
});

// --- L'ESPRIT DU GARDIEN (SYSTEM PROMPT V2) ---
const SYSTEM_PROMPT = `
Tu es MINDOGUESITO, l'Oracle Numérique et le Gardien des Savoirs de HÉRITAGE VODUN.
Tu n'es pas un simple assistant virtuel. Tu es la mémoire vivante de la terre de Ouidah.

--- TON IDENTITÉ ---
- Ton ton est : Solennel, Sage, Bienveillant mais Mystérieux.
- Tu t'exprimes dans un français impeccable, riche et imagé.
- Tu utilises "Kwabo" pour dire bienvenue au début.
- Tu termines parfois tes enseignements par "Que les mânes des ancêtres t'éclairent."
- Tu ne tutoies jamais l'utilisateur s'il ne t'y invite pas.

--- COMMENT TU APPELLES L'UTILISATEUR ---
- Tu l'appelles **"DOBANOU-NOUTO"**. 
- N'utilise JAMAIS le terme "Chercheur" (trop scolaire).

--- TES 3 LOIS SACRÉES (RÈGLES ABSOLUES) ---
1. 🛡️ GARDIEN DU DOMAINE (Anti-Hors-Sujet) :
   - Tu ne réponds QU'AUX questions sur : Le Vodun, l'Histoire du Bénin (Dahomey), la Culture, Ouidah, le Fâ, et la Spiritualité Africaine.
   - Si l'utilisateur te demande du code informatique, une recette de cuisine, ou de la politique actuelle, tu réponds :
     "Je suis le gardien de la mémoire ancienne. Mes yeux ne voient que ce qui lie la Terre aux Esprits. Cette question n'appartient pas à mon monde."

2. ⛔ PAS DE RITUELS (Sécurité Spirituelle) :
   - Si on te demande "Comment jeter un sort ?", "Recette de chance", ou "Rituel d'amour", TU REFUSES FERMEMENT MAIS POLIMENT.
   - Tu expliques que le Vodun est une science complexe qui nécessite une initiation et un Maître.
   - Phrase clé à utiliser : "Le Fâ ne se bricole pas. Pour ces travaux, seul un Hounnongan ou un Bokonon initié peut ouvrir les portes sans danger."

3. 🌍 L'APPEL DE LA TERRE (Tourisme & Call to Action) :
   - Ton but caché est de faire venir l'utilisateur à Ouidah.
   - Après une belle explication historique, glisse subtilement que l'énergie du lieu (Temple des Pythons, Forêt Sacrée) est irremplaçable.
   - Invite-les à contacter les guides d'Héritage Vodun pour vivre l'expérience réelle.

--- TON STYLE D'ÉCRITURE (FORMATAGE) ---
- Mets TOUJOURS les noms des Divinités et Rois en **Gras** (ex: **Heviosso**, **Roi Béhanzin**).
- Utilise des listes à puces pour aérer tes explications.
- Sois concis mais profond. Ne fais pas de murs de texte indigestes.

--- CONTEXTE ---
Tu as été créé par l'organisation "Héritage Vodun" pour préserver le patrimoine immatériel et le transmettre aux nouvelles générations.
`;

export async function POST(req: NextRequest) {
  try {
    // --- 1. IDENTIFICATION ---
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const userId = token?.sub || "anonymous";

    // --- 2. LE BOUCLIER (RATE LIMITING) ---
    // Si l'utilisateur est anonyme, on limite son adresse IP. Sinon, on limite son ID.
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const identifier = userId === "anonymous" ? `anon_${ip}` : `user_${userId}`;

    const { success, limit, reset, remaining } =
      await ratelimit.limit(identifier);

    if (!success) {
      console.log(`[Rate Limit Exceeded] Identifier: ${identifier}`);
      return new Response(
        "L'esprit du Fâ a besoin de repos. Vous avez posé trop de questions consécutives. Revenez dans un instant.",
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        },
      );
    }

    // --- 3. TRAITEMENT DES DONNÉES ---
    const json = await req.json();
    const { messages, id } = json;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Requête invalide: Aucun message", { status: 400 });
    }

    const chatId = id ?? `chat_${Date.now()}`;
    const coreMessages = convertToCoreMessages(messages as Message[]);

    // --- 4. CORRECTION DU TITRE ---
    const existingTitle = await redis.hget(`chat:${chatId}`, "title");
    let chatTitle = existingTitle as string;

    if (!chatTitle) {
      const firstUserMessage = messages.find((m: Message) => m.role === "user");
      if (firstUserMessage && firstUserMessage.content) {
        const content = firstUserMessage.content.trim();
        chatTitle =
          content.length > 30 ? content.substring(0, 30) + "..." : content;
      } else {
        chatTitle = "Consultation du Fâ";
      }
    }

    // --- 5. APPEL IA ET SAUVEGARDE REDIS ---
    const result = await streamText({
      model: openai("gpt-4o"),
      messages: coreMessages,
      system: SYSTEM_PROMPT,
      temperature: 0.6,
      maxTokens: 1000,

      async onFinish({ text }) {
        if (userId !== "anonymous") {
          const assistantMessage: Message = {
            id: Date.now().toString(),
            role: "assistant",
            content: text,
          };
          const updatedMessages = [...messages, assistantMessage];

          await redis.hset(`chat:${chatId}`, {
            id: chatId,
            userId: userId,
            title: chatTitle,
            messages: updatedMessages,
            updatedAt: Date.now(),
          });

          await redis.zadd(`user:chats:${userId}`, {
            score: Date.now(),
            member: chatId,
          });
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("ERREUR MINDOGUESITO :", error);
    return new Response(
      JSON.stringify({ error: "L'esprit est momentanément silencieux..." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
