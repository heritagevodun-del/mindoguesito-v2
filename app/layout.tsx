import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mindoguesito.com"),

  title: {
    default: "Mindoguesito – Gardien de l’Héritage Vodun",
    template: "%s | Mindoguesito",
  },

  description:
    "MINDOGUESITO est une intelligence artificielle dédiée à la transmission du patrimoine, de la mémoire et de la sagesse du Vodun, du Bénin et du Dahomey.",

  keywords: [
    "Mindoguesito",
    "Vodun",
    "Histoire du Bénin",
    "Culture africaine",
    "Spiritualité africaine",
    "Patrimoine africain",
    "Dahomey",
    "Vodun",
    "Mémoire ancestrale",
    "IA culturelle",
  ],

  authors: [{ name: "Héritage Vodun" }],
  creator: "Héritage Vodun",

  openGraph: {
    title: "Mindoguesito – Intelligence culturelle du Vodun",
    description:
      "Une intelligence artificielle dédiée à la mémoire, à la transmission et à la sagesse du Vodun.",
    url: "https://www.mindoguesito.com",
    siteName: "Mindoguesito",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mindoguesito – Intelligence Vodun",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mindoguesito – Intelligence Vodun",
    description:
      "Explorez la sagesse, la mémoire et la culture du Vodun à travers une IA consciente.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      {" "}
      <script
        type="application/ld+json"
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
            sameAs: [
              "https://www.facebook.com/",
              "https://www.instagram.com/",
              "https://www.youtube.com/",
            ],
          }),
        }}
      />
      <body className="bg-[#fdfbf7] text-[#1e1e1e] antialiased">
        {children}
      </body>
    </html>
  );
}
