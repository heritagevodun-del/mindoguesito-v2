import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

// Le paramètre "params" est maintenant défini comme une Promesse
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // 1. Vérification de l&apos;identité
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.sub) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // 2. NOUVELLE NORME NEXT.JS : On "déballe" la promesse pour lire l&apos;ID
    const resolvedParams = await params;
    const chatId = resolvedParams.id;

    // 3. Récupération de l&apos;archive dans Redis
    const chatData = await redis.hgetall(`chat:${chatId}`);

    // 4. Sécurité : On vérifie que le chat existe ET qu&apos;il appartient à la bonne personne
    if (!chatData || chatData.userId !== token.sub) {
      return NextResponse.json(
        { error: "Consultation introuvable ou accès refusé" },
        { status: 404 },
      );
    }

    // 5. On renvoie uniquement le tableau des messages
    return NextResponse.json(chatData.messages || []);
  } catch (error) {
    console.error("Erreur lors de la récupération du chat:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
