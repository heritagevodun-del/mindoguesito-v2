import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // ✅ VOTRE VRAI DOMAINE
  const baseUrl = "https://www.mindoguesito.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fonctionnalites`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
