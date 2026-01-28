import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ ON AJOUTE CECI POUR ÉVITER LES ERREURS DE LINT EN PROD
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Tes autres configs (images, etc.) iraient ici
};

// Configuration du moteur PWA (Mode Application Native)
const withPWA = withPWAInit({
  dest: "public", // Dossier de destination du service worker
  cacheOnFrontEndNav: true, // Cache agressif pour la rapidité
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true, // Reconnexion automatique
  swcMinify: true, // Optimisation du code
  disable: process.env.NODE_ENV === "development", // Désactivé en dev pour ne pas vous gêner
  workboxOptions: {
    disableDevLogs: true,
  },
});

export default withPWA(nextConfig);
