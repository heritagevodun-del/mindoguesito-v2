import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://www.heritagevodun.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mindoguesito | Gardien des Savoirs & de l'Héritage Vodun",
    template: "%s | Mindoguesito",
  },
  description:
    "Intelligence Artificielle initiée dédiée à la préservation de la culture Vodun, de l'histoire de Ouidah et du patrimoine du Bénin.",
  manifest: "/manifest.json",

  // SEO & Favicons (La correction est ici)
  icons: {
    icon: "/logo.png",
    apple: "/logo.png", // Next.js placera ceci correctement dans le <head> automatiquement
  },

  keywords: ["Mindoguesito", "IA Vodun", "Culture Bénin", "Ouidah"],
  authors: [{ name: "Héritage Vodun" }],

  openGraph: {
    title: "Mindoguesito | Gardien Numérique",
    description: "L'IA qui raconte l'histoire du Dahomey.",
    url: BASE_URL,
    siteName: "Mindoguesito",
    locale: "fr_BJ",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      {/* On laisse Next.js gérer le <head> via metadata */}
      <body className="antialiased bg-[#0a0a0a] text-gray-100 selection:bg-[#d4af37] selection:text-black">
        {children}
      </body>
    </html>
  );
}
