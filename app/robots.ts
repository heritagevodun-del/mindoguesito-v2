import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.mindoguesito.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/", // On protège toujours le cerveau de l'IA
    },
    // On indique le chemin officiel du sitemap
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
