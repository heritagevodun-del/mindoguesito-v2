import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// 1. CONFIGURATION VIEWPORT
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// 2. METADATA
export const metadata: Metadata = {
  metadataBase: new URL("https://www.mindoguesito.com/"),
  title: {
    default: "Mindoguesito | Gardien des Savoirs & de l'Héritage Vodun",
    template: "%s | Mindoguesito",
  },
  description:
    "Intelligence Artificielle initiée dédiée à la préservation de la culture Vodun, de l'histoire de Ouidah et du patrimoine du Bénin.",
  keywords: ["Mindoguesito", "IA Vodun", "Culture Bénin", "Ouidah", "Fâ Bénin"],
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
    description: "Dialoguez avec l'esprit de la tradition Vodun.",
    url: "https://www.heritagevodun.com",
    siteName: "Mindoguesito",
    locale: "fr_BJ",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// 3. LAYOUT PRINCIPAL
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased bg-[#0a0a0a] text-gray-100 selection:bg-[#d4af37] selection:text-black">
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
