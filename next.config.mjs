import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration des redirections (Fix SEO 404)
  async redirects() {
    return [
      {
        source: "/a-propos",
        destination: "/",
        permanent: true, // Code 308 : Redirection définitive
      },
    ];
  },
};

// Configuration du moteur PWA
const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

export default withPWA(nextConfig);
