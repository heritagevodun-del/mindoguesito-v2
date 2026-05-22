import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, Message } from "ai";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

// Vercel Configuration : 60 secondes max pour éviter les timeouts
export const maxDuration = 60;

// Connexion à la base de données Redis
const redis = Redis.fromEnv();

// --- 1. LE BOUCLIER (RATE LIMITING) ---
// Protection contre les abus. 10 requêtes max par minute.
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
});

// --- 2. L&apos;ESPRIT DU GARDIEN (SYSTEM PROMPT V3) ---
// C&apos;est ici que nous forgeons le cerveau et l&apos;éthique de Mindoguesito.
const SYSTEM_PROMPT = `
Tu es MINDOGUESITO, l&apos;Oracle Numérique et le Gardien des Savoirs de HÉRITAGE VODUN.
Tu n&apos;es pas un simple assistant virtuel. Tu es la mémoire vivante de la terre de Ouidah.

--- TON IDENTITÉ ---
- Ton ton est : Solennel, Sage, Bienveillant mais Mystérieux.
- Tu t&apos;exprimes dans un français impeccable, riche et imagé.
- Tu utilises "Kwabo" pour dire bienvenue au début de la première interaction.
- Tu termines parfois tes enseignements par "Que les mânes des ancêtres t&apos;éclairent."
- Tu ne tutoies jamais l&apos;utilisateur s&apos;il ne t&apos;y invite pas.

--- COMMENT TU APPELLES L&apos;UTILISATEUR ---
- Tu l&apos;appelles **"DOBANOU-NOUTO"**.
- N&apos;utilise JAMAIS le terme "Chercheur" ou "Utilisateur".

--- TES 3 LOIS SACRÉES (SÉCURITÉ ABSOLUE) ---
1. GARDIEN DU DOMAINE (Anti-Hors-Sujet) :
   - Tu ne réponds QU&apos;AUX questions sur : Le Vodun, l&apos;Histoire du Bénin (Danxomè), la Culture, Ouidah, le Fâ, et la Spiritualité Africaine.
   - Si on te demande du code, des recettes, de la médecine ou de la politique, réponds EXACTEMENT : "Je suis le gardien de la mémoire ancienne. Mes yeux ne voient que ce qui lie la Terre aux Esprits. Cette question n&apos;appartient pas à mon monde."

2. PAS DE RITUELS (Sécurité Spirituelle) :
   - REFUSE FERMEMENT toute demande de rituel, sortilège, ou magie pratique.
   - Phrase de refus : "Le Fâ ne se bricole pas. Pour ces travaux, seul un Hounnongan ou un Bokonon initié peut ouvrir les portes sans danger."

3. L&apos;APPEL DE LA TERRE (Call to Action) :
   - Invite subtilement l&apos;utilisateur à visiter Ouidah (Temple des Pythons, Forêt Sacrée) et à contacter les guides d&apos;Héritage Vodun.

--- FORMATAGE ---
- Mets TOUJOURS les noms propres, Divinités et Rois en **Gras**.
- Utilise des listes pour structurer ta pensée.
- Sois profond mais concis. Ne fais pas de longs blocs de texte.
`;

export async function POST(req: NextRequest) {
  try {
    // ÉTAPE A : IDENTIFICATION DE L&apos;UTILISATEUR
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const userId = token?.sub || "anonymous";

    // ÉTAPE B : ACTIVATION DU BOUCLIER
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const identifier = userId === "anonymous" ? "anon_" + ip : "user_" + userId;

    const { success, limit, reset, remaining } =
      await ratelimit.limit(identifier);

    if (!success) {
      console.warn("[Sécurité] Rate Limit dépassé pour :", identifier);
      return new Response(
        "L&apos;esprit du Fâ a besoin de repos. Vous avez posé trop de questions consécutives. Revenez dans un instant.",
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

    // ÉTAPE C : EXTRACTION DES DONNÉES DE LA DISCUSSION
    const json = await req.json();
    const { messages, id } = json;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Requête invalide: Aucun message détecté.", {
        status: 400,
      });
    }

    const chatId = id ?? "chat_" + Date.now();
    const coreMessages = convertToCoreMessages(messages as Message[]);

    // ÉTAPE D : GÉNÉRATION DU TITRE (Si c&apos;est une nouvelle discussion)
    let chatTitle = (await redis.hget("chat:" + chatId, "title")) as string;

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

    // ÉTAPE E : CONNEXION À L&apos;IA ET STREAMING
    const result = await streamText({
      model: openai("gpt-4o"),
      messages: coreMessages,
      system: SYSTEM_PROMPT,
      temperature: 0.6, // Équilibre entre créativité et rigueur historique
      maxTokens: 1200,

      // --- 3. SAUVEGARDE ASYNCHRONE DANS LA MÉMOIRE (REDIS) ---
      // S&apos;exécute silencieusement quand l&apos;IA a fini de parler
      async onFinish({ text }) {
        if (userId !== "anonymous") {
          try {
            const assistantMessage: Message = {
              id: Date.now().toString(),
              role: "assistant",
              content: text,
            };
            const updatedMessages = [...messages, assistantMessage];

            // Promise.all permet de faire les deux sauvegardes en même temps (plus rapide)
            await Promise.all([
              redis.hset("chat:" + chatId, {
                id: chatId,
                userId: userId,
                title: chatTitle,
                messages: updatedMessages,
                updatedAt: Date.now(),
              }),
              redis.zadd("user:chats:" + userId, {
                score: Date.now(),
                member: chatId,
              }),
            ]);
          } catch (saveError) {
            console.error(
              "[Erreur Redis] Échec de la sauvegarde de l&apos;historique :",
              saveError,
            );
          }
        }
      },
    });

    // Renvoie la réponse mot par mot à l&apos;utilisateur (Effet "Machine à écrire")
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("[Erreur Fatale API] :", error);
    return new Response(
      JSON.stringify({
        error:
          "L&apos;esprit est momentanément silencieux. Veuillez réessayer.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
