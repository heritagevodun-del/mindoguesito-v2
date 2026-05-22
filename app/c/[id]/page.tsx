import { Metadata } from "next";
import ChatClient from "@/app/ChatClient";

// --- 1. MÉTADONNÉES DE L'ONGLET ---
// Indique à l'utilisateur qu'il a plongé dans les archives d'une discussion
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Consultation | Mindoguesito",
    description: "Reprise de votre dialogue avec l’Oracle Numérique.",
  };
}

// --- 2. POINT D’ENTRÉE DYNAMIQUE (COMPOSANT SERVEUR) ---
// Ce composant asynchrone intercepte l’ID dans l’URL (/c/123)
// et charge notre interface d’IA en lui passant cet identifiant.
export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // On "déballe" la promesse pour lire l’ID (Norme stricte Next.js 15+)
  const resolvedParams = await params;

  return <ChatClient existingChatId={resolvedParams.id} />;
}
