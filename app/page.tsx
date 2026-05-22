import { Metadata } from "next";
import ChatClient from "./ChatClient";

// --- MÉTADONNÉES SPÉCIFIQUES À L’ACCUEIL (SEO) ---
export const metadata: Metadata = {
  title: "Mindoguesito | L’Oracle Numérique",
  description:
    "Interrogez l’Intelligence Artificielle initiée aux mystères du Vodun et du Fâ.",
  alternates: {
    canonical: "/",
  },
};

// --- POINT D’ENTRÉE PRINCIPAL (COMPOSANT SERVEUR) ---
export default function Home() {
  // Ce composant Serveur délègue l’affichage et la logique logicielle au composant Client
  return <ChatClient />;
}
