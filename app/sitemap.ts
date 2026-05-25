import { MetadataRoute } from "next";
import { entries } from "./journal/data/entries";

// --- UTILITAIRE DE CONVERSION DE DATE ---
// Transforme "26 Décembre 2025" en objet Date valide pour le compilateur
function parseFrenchDate(dateString: string): Date {
  const monthMap: Record<string, string> = {
    Janvier: "01",
    Février: "02",
    Mars: "03",
    Avril: "04",
    Mai: "05",
    Juin: "06",
    Juillet: "07",
    Août: "08",
    Septembre: "09",
    Octobre: "10",
    Novembre: "11",
    Décembre: "12",
  };

  try {
    const parts = dateString.split(" ");
    if (parts.length === 3) {
      const day = parts[0].padStart(2, "0");
      const month = monthMap[parts[1]];
      const year = parts[2];

      if (day && month && year) {
        // Format ISO stricte pour éviter les erreurs de fuseau horaire
        return new Date(`${year}-${month}-${day}T12:00:00Z`);
      }
    }
    return new Date(); // Fallback de sécurité
  } catch (error) {
    return new Date(); // En cas d&apos;erreur, on utilise la date de compilation
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  // L&apos;URL souveraine de l&apos;application
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
  const dynamicRoutes: MetadataRoute.Sitemap = entries.map((entry) => ({
    url: `${baseUrl}/journal/${entry.id}`,
    // Utilisation de notre parseur sécurisé
    lastModified: parseFrenchDate(entry.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // On fusionne les deux tableaux pour la soumission finale
  return [...staticRoutes, ...dynamicRoutes];
}
