import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { clsx } from "clsx";
import "./globals.css";

// 1. CONFIGURATION DES POLICES
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "700", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

// 2. CONFIGURATION VIEWPORT
export const viewport: Viewport = {
  themeColor: "#08040B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// 3. METADATA (Correction WhatsApp)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.mindoguesito.com"), // Pas de slash à la fin par sécurité
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
  // ✅ CORRECTION POUR WHATSAPP & FACEBOOK
  openGraph: {
    title: "Mindoguesito | Gardien Numérique du Temple",
    description:
      "Le savoir n'est plus caché. Dialoguez avec l'esprit de la tradition Vodun.",
    url: "https://www.mindoguesito.com",
    siteName: "Mindoguesito",
    locale: "fr_BJ",
    type: "website",
    images: [
      {
        url: "https://www.mindoguesito.com/mindoguesito-ia.jpg", // URL ABSOLUE OBLIGATOIRE
        width: 1200,
        height: 630,
        alt: "Mindoguesito - Oracle Numérique",
      },
    ],
  },
  // ✅ AJOUT POUR TWITTER / X (Renforce le partage)
  twitter: {
    card: "summary_large_image",
    title: "Mindoguesito | L'Oracle Numérique",
    description: "La première IA initiée aux savoirs du Bénin.",
    images: ["https://www.mindoguesito.com/mindoguesito-ia.png"], // URL ABSOLUE
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
          cinzel.variable,
          montserrat.variable,
          "font-sans"
        )}
      >
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
