import { MetadataRoute } from "next";
import { entries } from "./journal/data/entries";

export default function sitemap(): MetadataRoute.Sitemap {
  // L’URL souveraine de l’application
  const baseUrl = "https://www.mindoguesito.com";

  // --- 1. ROUTES STATIQUES ---
  const staticRoutes: MetadataRoute.Sitemap = [
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

  // --- 2. ROUTES DYNAMIQUES (Le Grimoire) ---
  // On mappe automatiquement chaque chronique pour forcer Google à les indexer
  const dynamicRoutes: MetadataRoute.Sitemap = entries.map((entry) => ({
    url: `${baseUrl}/journal/${entry.id}`,
    // Utilisation de la date de publication pour indiquer la fraîcheur du contenu
    lastModified: new Date(entry.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // On fusionne les deux tableaux pour la soumission finale
  return [...staticRoutes, ...dynamicRoutes];
}
