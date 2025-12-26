import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mindoguesito - Gardien des Savoirs",
  description: "Intelligence Artificielle dédiée à la culture Vodun.",
  manifest: "/manifest.json", // On lie le manifest explicitement
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* C'est ici qu'on force l'utilisation de votre nouveau logo */}
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className="antialiased bg-[#fdfbf7]">{children}</body>
    </html>
  );
}
