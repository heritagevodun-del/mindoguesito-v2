import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.sub) {
      return NextResponse.json(
        { error: "Non autorisé. Veuillez vous connecter." },
        { status: 401 },
      );
    }

    const userId = token.sub;

    const chatIds = await redis.zrange(`user:chats:${userId}`, 0, -1, {
      rev: true,
    });

    if (!chatIds || chatIds.length === 0) {
      return NextResponse.json([]);
    }

    const pipeline = redis.pipeline();
    chatIds.forEach((id) => pipeline.hmget(`chat:${id}`, "title", "pinned"));

    const results = await pipeline.exec();

    const chats = chatIds
      .map((id, index) => {
        // CORRECTION STRICTE : On remplace "any" par "unknown" pour satisfaire ESLint
        const chatData = results[index] as Record<string, unknown> | null;

        return {
          id: id as string,
          title: chatData?.title ? String(chatData.title) : null,
          pinned: chatData?.pinned === "true" || chatData?.pinned === true,
        };
      })
      .filter((chat) => chat.title !== null);

    return NextResponse.json(chats);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique :", error);
    // On renvoie un tableau vide en cas d'erreur pour ne pas faire crasher l'interface
    return NextResponse.json([], { status: 500 });
  }
}
