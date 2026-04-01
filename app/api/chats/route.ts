import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Connexion à la base de données
const redis = Redis.fromEnv();

// L'instruction GET pour récupérer l'historique
export async function GET(req: NextRequest) {
  try {
    // 1. Vérification de l'identité
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.sub) {
      return NextResponse.json(
        { error: "Non autorisé. Veuillez vous connecter." },
        { status: 401 },
      );
    }

    const userId = token.sub;

    // 2. Récupérer les ID des consultations, triés du plus récent au plus ancien
    const chatIds = await redis.zrange(`user:chats:${userId}`, 0, -1, {
      rev: true,
    });

    if (!chatIds || chatIds.length === 0) {
      return NextResponse.json([]); // Historique vide
    }

    // 3. ULTRA-PERFORMANCE : Le Pipeline Redis avec HMGET
    // On ne récupère QUE les métadonnées (titre et pinned).
    // Ne jamais charger les messages ici pour ne pas saturer la bande passante !
    const pipeline = redis.pipeline();
    chatIds.forEach((id) => pipeline.hmget(`chat:${id}`, "title", "pinned"));

    // Exécution groupée
    const results = (await pipeline.exec()) as [
      string | null,
      string | boolean | null,
    ][];

    // 4. Formatage de la réponse pour la Sidebar
    const chats = chatIds
      .map((id, index) => {
        const [title, pinned] = results[index] || [null, null];
        return {
          id: id as string,
          title: title, // Fini le fallback "Consultation du Fâ" forcé !
          pinned: pinned === "true" || pinned === true, // Gestion du booléen depuis Redis
        };
      })
      // On filtre pour ne pas afficher de chats corrompus/vides
      .filter((chat) => chat.title !== null);

    return NextResponse.json(chats);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique :", error);
    return NextResponse.json(
      { error: "Impossible de lire les archives." },
      { status: 500 },
    );
  }
}
