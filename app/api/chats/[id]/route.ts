import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

// 1. LECTURE DE L'ARCHIVE
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.sub) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const resolvedParams = await params;
    const chatId = resolvedParams.id;

    const chatData = await redis.hgetall(`chat:${chatId}`);

    if (!chatData || chatData.userId !== token.sub) {
      return NextResponse.json(
        { error: "Consultation introuvable ou accès refusé" },
        { status: 404 },
      );
    }

    return NextResponse.json(chatData.messages || []);
  } catch (error) {
    console.error("Erreur lors de la récupération du chat:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// 2. SUPPRESSION DE LA CONSULTATION
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.sub) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const resolvedParams = await params;
    const chatId = resolvedParams.id;

    const chatOwner = await redis.hget(`chat:${chatId}`, "userId");
    if (chatOwner !== token.sub) {
      return NextResponse.json({ error: "Interdit" }, { status: 403 });
    }

    await redis.del(`chat:${chatId}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// 3. MODIFICATION (Renommer / Épingler)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.sub) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const resolvedParams = await params;
    const chatId = resolvedParams.id;

    const body = await req.json();
    const { title, pinned } = body;

    const chatOwner = await redis.hget(`chat:${chatId}`, "userId");
    if (chatOwner !== token.sub) {
      return NextResponse.json({ error: "Interdit" }, { status: 403 });
    }

    // CORRECTION TYPE STRICT (Fini le "any")
    const updates: Record<string, string | boolean> = {};
    if (title !== undefined) updates.title = title;
    if (pinned !== undefined) updates.pinned = pinned;

    await redis.hset(`chat:${chatId}`, updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la modification:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
