import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Initialisation de la base de données (Upstash)
const redis = Redis.fromEnv();

// --- 1. LECTURE DE L’ARCHIVE SPÉCIFIQUE ---
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.sub) {
      return NextResponse.json(
        { error: "Initiation requise" },
        { status: 401 },
      );
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
    console.error("[Erreur API - GET Chat] :", error);
    return NextResponse.json(
      { error: "L’esprit est silencieux" },
      { status: 500 },
    );
  }
}

// --- 2. SUPPRESSION DÉFINITIVE DE LA CONSULTATION ---
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.sub) {
      return NextResponse.json(
        { error: "Initiation requise" },
        { status: 401 },
      );
    }

    const resolvedParams = await params;
    const chatId = resolvedParams.id;
    const userId = token.sub;

    const chatOwner = await redis.hget(`chat:${chatId}`, "userId");
    if (chatOwner !== userId) {
      return NextResponse.json(
        { error: "Transgression interdite" },
        { status: 403 },
      );
    }

    // CORRECTION MAJEURE : Pipeline pour supprimer le Hash ET nettoyer l'index ZSET
    const pipeline = redis.pipeline();
    pipeline.del(`chat:${chatId}`);
    pipeline.zrem(`user:chats:${userId}`, chatId);
    await pipeline.exec();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Erreur API - DELETE Chat] :", error);
    return NextResponse.json(
      { error: "Échec de l’effacement" },
      { status: 500 },
    );
  }
}

// --- 3. MODIFICATION (Renommer / Épingler) ---
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.sub) {
      return NextResponse.json(
        { error: "Initiation requise" },
        { status: 401 },
      );
    }

    const resolvedParams = await params;
    const chatId = resolvedParams.id;

    const body = await req.json();
    const { title, pinned } = body;

    const chatOwner = await redis.hget(`chat:${chatId}`, "userId");
    if (chatOwner !== token.sub) {
      return NextResponse.json(
        { error: "Transgression interdite" },
        { status: 403 },
      );
    }

    // Sécurisation stricte des types de mise à jour
    const updates: Record<string, string | boolean> = {};
    if (title !== undefined) updates.title = title;
    if (pinned !== undefined) updates.pinned = pinned;

    // On s'assure de ne faire l'appel Redis que s'il y a des données à modifier
    if (Object.keys(updates).length > 0) {
      await redis.hset(`chat:${chatId}`, updates);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Erreur API - PATCH Chat] :", error);
    return NextResponse.json(
      { error: "Échec de la modification" },
      { status: 500 },
    );
  }
}
