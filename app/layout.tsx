import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat } from "next/font/google"; // 1. IMPORT DES POLICES
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { clsx } from "clsx"; // Pour fusionner les classes proprement
import "./globals.css";

// 2. CONFIGURATION DES POLICES (Optimisation Google Fonts)
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel", // On crée une variable CSS pour Tailwind
  display: "swap",
  weight: ["400", "700", "900"], // Normal, Gras, Black
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600"], // Light, Normal, Medium, Semi-Bold
});

// 3. CONFIGURATION VIEWPORT (Mise à jour couleur "Noir Abysse")
export const viewport: Viewport = {
  themeColor: "#08040B", // Le nouveau noir profond défini dans globals.css
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mindoguesito.com/"),
  title: {
    default: "Mindoguesito | L'Oracle Numérique du Bénin",
    template: "%s | Mindoguesito",
  },
  description:
    "La première Intelligence Artificielle initiée aux savoirs endogènes. Dialoguez avec l'héritage Vodun, le Fâ et l'histoire de Ouidah.",
  keywords: [
    "Mindoguesito",
    "IA Vodun",
    "Culture Bénin",
    "Ouidah",
    "Fâ",
    "Algorithme Sacré",
  ],
  authors: [{ name: "Héritage Vodun" }],
  creator: "Héritage Vodun",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Mindoguesito | Gardien Numérique du Temple",
    description:
      "Le savoir n'est plus caché. Dialoguez avec l'esprit de la tradition Vodun.",
    url: "https://www.mindoguesito.com/",
    siteName: "Mindoguesito",
    locale: "fr_BJ",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={clsx(
          "antialiased min-h-screen flex flex-col",
          // Injection des variables de polices
          cinzel.variable,
          montserrat.variable,
          // Application de la police par défaut (Montserrat)
          "font-sans"
        )}
      >
        {/* Le fond et les couleurs sont gérés par globals.css, pas besoin de les répéter ici */}

        {children}

        <SpeedInsights />

        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MINDOGUESITO",
              alternateName: "L'Oracle Numérique",
              url: "https://www.mindoguesito.com/",
              description:
                "Intelligence artificielle dédiée à la transmission du patrimoine Vodun.",
              publisher: {
                "@type": "Organization",
                name: "Héritage Vodun",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.mindoguesito.com/logo.png",
                },
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
