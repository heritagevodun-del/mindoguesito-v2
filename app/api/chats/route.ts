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
    // (Grâce à la commande zrange de Redis)
    const chatIds = await redis.zrange(`user:chats:${userId}`, 0, -1, {
      rev: true,
    });

    if (!chatIds || chatIds.length === 0) {
      return NextResponse.json([]); // Historique vide
    }

    // 3. Ultra-Performance : Le Pipeline Redis
    // Au lieu de faire 10 requêtes pour 10 chats, on fait 1 seule requête groupée
    const pipeline = redis.pipeline();
    chatIds.forEach((id) => pipeline.hget(`chat:${id}`, "title"));

    const titles = (await pipeline.exec()) as (string | null)[];

    // 4. Formatage de la réponse pour la Sidebar
    const chats = chatIds.map((id, index) => ({
      id: id as string,
      title: titles[index] || "Consultation du Fâ",
    }));

    return NextResponse.json(chats);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique :", error);
    return NextResponse.json(
      { error: "Impossible de lire les archives." },
      { status: 500 },
    );
  }
}
