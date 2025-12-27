import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mindoguesito.com"),
  title: {
    default: "Mindoguesito – Gardien de l’Héritage Vodun",
    template: "%s | Mindoguesito",
  },
  description:
    "MINDOGUESITO est une intelligence artificielle dédiée à la transmission de la mémoire, de la sagesse et du patrimoine du Vodun.",
  keywords: [
    "Mindoguesito",
    "Vodun",
    "Culture africaine",
    "Histoire du Bénin",
    "Spiritualité africaine",
    "Patrimoine africain",
  ],
  openGraph: {
    title: "Mindoguesito – Intelligence Vodun",
    description: "Une IA dédiée à la transmission du savoir et de la mémoire.",
    url: "https://www.mindoguesito.com",
    siteName: "Mindoguesito",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Mindoguesito",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindoguesito",
    description: "L’intelligence culturelle du Vodun.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Favicon */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* PWA / Mobile */}
        <meta name="theme-color" content="#fdfbf7" />

        {/* SEO STRUCTURÉ */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MINDOGUESITO",
              url: "https://www.mindoguesito.com",
              description:
                "MINDOGUESITO est une intelligence artificielle dédiée à la transmission du patrimoine, de la mémoire et de la sagesse du Vodun.",
              inLanguage: "fr",
              publisher: {
                "@type": "Organization",
                name: "MINDOGUESITO",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.mindoguesito.com/logo.png",
                },
              },
            }),
          }}
        />
      </head>

      <body className="bg-[#fdfbf7] text-[#1e1e1e] antialiased">
        {children}
      </body>
    </html>
  );
}
