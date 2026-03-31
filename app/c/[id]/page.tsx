// app/c/[id]/page.tsx
import ChatClient from "@/app/ChatClient";

// Ce composant Serveur intercepte l'ID dans l'URL (/c/123)
// et charge notre interface d'IA en lui passant cet ID.
export default function ChatPage({ params }: { params: { id: string } }) {
  return <ChatClient existingChatId={params.id} />;
}
