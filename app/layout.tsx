import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

// 1. CONFIGURATION VIEWPORT (Mobile & PWA)
// C'est ici qu'on définit la couleur de la barre du navigateur et le comportement du zoom
export const viewport: Viewport = {
  themeColor: "#0a0a0a", // Noir profond (Thème Mindoguesito)
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// 2. METADATA (SEO, Titres, Icônes)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.heritagevodun.com"), // Remplacez par votre domaine final si besoin
  title: {
    default: "Mindoguesito | Gardien des Savoirs & de l'Héritage Vodun",
    template: "%s | Mindoguesito",
  },
  description:
    "Intelligence Artificielle initiée dédiée à la préservation de la culture Vodun, de l'histoire de Ouidah et du patrimoine du Bénin.",

  // Mots-clés pour Google
  keywords: [
    "Mindoguesito",
    "IA Vodun",
    "Culture Bénin",
    "Histoire de Ouidah",
    "Patrimoine immatériel",
    "Fâ Bénin",
    "Tradition africaine numérique",
    "Tourisme Ouidah",
  ],

  authors: [{ name: "Héritage Vodun" }],
  creator: "Héritage Vodun",

  // Liens PWA & Icônes (Gère automatiquement les balises <head>)
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png", // Next.js générera le lien apple-touch-icon automatiquement
  },

  // Affichage sur les Réseaux Sociaux (Open Graph)
  openGraph: {
    title: "Mindoguesito | Gardien Numérique du Temple",
    description:
      "Dialoguez avec l'esprit de la tradition Vodun et découvrez l'histoire du Dahomey.",
    url: "https://www.heritagevodun.com",
    siteName: "Mindoguesito",
    locale: "fr_BJ",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Assurez-vous d'avoir cette image dans /public
        width: 1200,
        height: 630,
        alt: "Mindoguesito - Gardien des Savoirs",
      },
    ],
  },

  // Affichage Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "Mindoguesito | IA Culturelle",
    description: "Dialoguez avec la mémoire des ancêtres du Bénin.",
    images: ["/og-image.jpg"],
  },
};

// 3. LAYOUT PRINCIPAL (Structure HTML)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased bg-[#0a0a0a] text-gray-100 selection:bg-[#d4af37] selection:text-black">
        {children}

        {/* DONNÉES STRUCTURÉES (JSON-LD pour Google) */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MINDOGUESITO",
              url: "https://www.heritagevodun.com",
              description:
                "Intelligence artificielle dédiée à la transmission du patrimoine, de la mémoire et de la sagesse du Vodun.",
              inLanguage: "fr",
              publisher: {
                "@type": "Organization",
                name: "Héritage Vodun",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.heritagevodun.com/logo.png",
                },
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
