import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { clsx } from "clsx";
import "./globals.css";

// 1. CONFIGURATION DES POLICES (Optimisation du chargement)
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

// 2. CONFIGURATION VIEWPORT (Séparé de Metadata depuis Next.js 14)
export const viewport: Viewport = {
  themeColor: "#08040B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Empêche le zoom accidentel sur mobile (App-like feel)
};

// 3. METADATA
// URL de base dynamique pour supporter Vercel Preview & Production
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://www.mindoguesito.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
    "Tourisme Bénin",
  ],
  authors: [{ name: "Héritage Vodun", url: "https://www.heritagevodun.com" }],
  creator: "Héritage Vodun",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png", // Assure-toi que ce fichier existe dans /public
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
        url: "/mindoguesito-ia.jpg", // Next.js résoudra automatiquement avec metadataBase
        width: 1200,
        height: 630,
        alt: "Mindoguesito - Oracle Numérique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindoguesito | L'Oracle Numérique",
    description: "La première IA initiée aux savoirs du Bénin.",
    images: ["/mindoguesito-ia.png"],
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
          "antialiased min-h-screen flex flex-col bg-void text-gray-100",
          cinzel.variable,
          montserrat.variable,
          "font-sans", // La police par défaut définie dans Tailwind
        )}
      >
        {children}

        <SpeedInsights />

        {/* Schema.org pour le SEO Local et Culturel */}
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
