import ChatClient from "@/app/ChatClient";

// Ce composant Serveur asynchrone intercepte l'ID dans l'URL (/c/123)
// et charge notre interface d'IA en lui passant cet ID.
export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // On "déballe" la promesse pour lire l'ID (Nouvelle norme Next.js 15+)
  const resolvedParams = await params;

  return <ChatClient existingChatId={resolvedParams.id} />;
}
