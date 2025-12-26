export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const entries: JournalEntry[] = [
  {
    id: "1",
    title: "Le Temple des Pythons : Alliance Homme-Nature",
    date: "26 Décembre 2025",
    excerpt:
      "Pourquoi vénère-t-on le python à Ouidah ? Ce n'est pas de l'idolâtrie, mais le souvenir d'une alliance historique entre le roi Kpassè et les esprits de la forêt.",
    content:
      "Dans la cosmogonie de Ouidah, le python (Dangbé) n'est pas un dieu créateur, mais un ancêtre protecteur. La légende raconte que lors d'une guerre où le roi Kpassè fuyait, les pythons l'ont camouflé, le sauvant de ses ennemis. Depuis ce jour, tuer un python est un sacrilège. Le temple face à la Basilique incarne ce syncrétisme unique au monde : la cohabitation pacifique des croyances.",
    tags: ["Histoire", "Ouidah", "Dangbé"],
  },
  {
    id: "2",
    title: "Les Jumeaux (Hoho) : Bénédicition Divine",
    date: "24 Décembre 2025",
    excerpt:
      "Au Bénin, la naissance de jumeaux est un événement sacré. Ils sont considérés comme des divinités vivantes apportant bonheur et prospérité.",
    content:
      "Les 'Hoho' ne sont pas des enfants ordinaires. Ils partagent une âme scindée en deux corps. Lorsqu'un jumeau quitte ce monde, on sculpte une statuette (Ibeji) pour que son esprit continue de vivre parmi la famille. On les nourrit, on les lave, on les habille. C'est une leçon d'amour éternel qui dépasse la mort.",
    tags: ["Culture", "Famille", "Spiritualité"],
  },
  {
    id: "3",
    title: "Comprendre le Fâ : La Géomancie Sacrée",
    date: "20 Décembre 2025",
    excerpt:
      "Le Fâ n'est pas de la magie, c'est une science. C'est l'art de décoder le destin et de comprendre sa propre place dans l'univers.",
    content:
      "Souvent mal compris, le Fâ est un système binaire complexe (256 signes ou Odu) qui permet d'interroger la mémoire du monde. Le Bokonon (prêtre du Fâ) ne prédit pas l'avenir, il éclaire le présent. Il aide l'homme à s'aligner avec son 'Se' (son destin). C'est la boussole spirituelle du peuple Fon.",
    tags: ["Philosophie", "Science", "Sagesse"],
  },
];
