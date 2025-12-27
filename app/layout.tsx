import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mindoguesito – Gardien de l’Héritage Vodun",
    template: "%s | Mindoguesito",
  },
  description:
    "MINDOGUESITO est une intelligence artificielle dédiée à la transmission du patrimoine, de la mémoire et de la sagesse du Vodun.",
  metadataBase: new URL("https://www.mindoguesito.com"),
  openGraph: {
    title: "Mindoguesito",
    description:
      "Une intelligence artificielle dédiée à la mémoire, la sagesse et l’héritage du Vodun.",
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
    description: "La mémoire vivante du Vodun",
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
        {/* Données structurées SEO (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MINDOGUESITO",
              url: "https://www.mindoguesito.com",
              description:
                "Une intelligence artificielle dédiée à la transmission du patrimoine, de la mémoire et de la sagesse du Vodun.",
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
