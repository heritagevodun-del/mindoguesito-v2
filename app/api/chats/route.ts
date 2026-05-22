import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Initialisation de la connexion à la base de données Upstash
const redis = Redis.fromEnv();

export async function GET(req: NextRequest) {
  try {
    // --- 1. VÉRIFICATION DE L&apos;IDENTITÉ (SÉCURITÉ) ---
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.sub) {
      return NextResponse.json(
        {
          error:
            "Non autorisé. L&apos;accès aux archives nécessite une initiation.",
        },
        { status: 401 },
      );
    }

    const userId = token.sub;

    // --- 2. RÉCUPÉRATION DES IDENTIFIANTS (Tri chronologique inversé) ---
    const chatIds = await redis.zrange(`user:chats:${userId}`, 0, -1, {
      rev: true,
    });

    // Si le registre est vide, on retourne une liste propre
    if (!chatIds || chatIds.length === 0) {
      return NextResponse.json([]);
    }

    // --- 3. OPTIMISATION RÉSEAU (PIPELINE REDIS) ---
    // Regroupement des requêtes pour une exécution en millisecondes
    const pipeline = redis.pipeline();
    chatIds.forEach((id) => pipeline.hmget(`chat:${id}`, "title", "pinned"));

    const results = await pipeline.exec();

    // --- 4. FORMATAGE ET TYPAGE STRICT ---
    const chats = chatIds
      .map((id, index) => {
        // Typage sécurisé (unknown) pour garantir la validation ESLint
        const chatData = results[index] as Record<string, unknown> | null;

        return {
          id: id as string,
          // Fallback de sécurité si le titre a été corrompu dans Redis
          title: chatData?.title
            ? String(chatData.title)
            : "Consultation innommée",
          pinned: chatData?.pinned === "true" || chatData?.pinned === true,
        };
      })
      .filter((chat) => chat.title !== null);

    return NextResponse.json(chats);
  } catch (error) {
    console.error(
      "[Erreur API Mémoire] Échec de la récupération des archives :",
      error,
    );
    // Renvoi d&apos;un tableau vide avec un code 500 pour ne pas briser l&apos;UI côté client
    return NextResponse.json([], { status: 500 });
  }
}
