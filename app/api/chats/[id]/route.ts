// app/api/chats/[id]/route.ts
import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // 1. Vérification de l'identité
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.sub) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const chatId = params.id;

    // 2. Récupération de l'archive dans Redis
    const chatData = await redis.hgetall(`chat:${chatId}`);

    // 3. Sécurité : On vérifie que le chat existe ET qu'il appartient à la bonne personne
    if (!chatData || chatData.userId !== token.sub) {
      return NextResponse.json(
        { error: "Consultation introuvable ou accès refusé" },
        { status: 404 },
      );
    }

    // 4. On renvoie uniquement le tableau des messages
    return NextResponse.json(chatData.messages || []);
  } catch (error) {
    console.error("Erreur lors de la récupération du chat:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
