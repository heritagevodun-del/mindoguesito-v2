import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. OPTIMISATION DES IMAGES
  // Indispensable pour éviter les erreurs si tu charges des images depuis une URL externe
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Autorise toutes les sources sécurisées (Flexibilité totale)
      },
    ],
  },

  // 2. REDIRECTIONS (Ton code existant préservé)
  async redirects() {
    return [
      {
        source: "/a-propos",
        destination: "/",
        permanent: true, // Code 308 : Redirection définitive (Bon pour Google)
      },
    ];
  },
};

// 3. MOTEUR PWA (Configuration "Native-Like")
const withPWA = withPWAInit({
  dest: "public",
  // Mise à jour instantanée
  register: true,
  skipWaiting: true, // Force le nouveau service worker à prendre le relais immédiatement

  // Cache intelligent (Tes réglages étaient bons, je les garde)
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,

  // Désactivation en mode Dev pour ne pas être gêné par le cache
  disable: process.env.NODE_ENV === "development",

  workboxOptions: {
    disableDevLogs: true,
  },
});

export default withPWA(nextConfig);
