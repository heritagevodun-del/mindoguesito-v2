import { Metadata } from "next";
import ChatClient from "./ChatClient";

// L'INJECTION SEO CANONIQUE EST ICI
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  // Ce composant "Serveur" appelle simplement l'interface "Client"
  return <ChatClient />;
}
