// src/app/journal/data/entries.ts

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  excerpt: string; // Le résumé pour la carte
  content: string; // Le texte complet pour l'article
  tags: string[];
}

export const entries: JournalEntry[] = [
  {
    id: "1",
    title: "Le Temple des Pythons : Le Pacte Xwéda",
    date: "26 Décembre 2025",
    excerpt:
      "Pourquoi vénère-t-on le python à Ouidah ? Découvrez l'histoire du roi Kpassè et de son alliance éternelle avec l'esprit Dangbé.",
    content:
      "Dans la cosmogonie de Ouidah, le Python Royal (Dangbé) n'est pas un simple animal, c'est un ancêtre totémique. L'histoire raconte que lors d'une guerre terrible, le Roi Kpassè, fondateur de la ville, fut sauvé par une colonie de pythons qui le camouflèrent aux yeux de ses ennemis. Depuis ce jour, un pacte de sang lie le peuple Xwéda à ces reptiles inoffensifs. Tuer un python est un sacrilège absolu. Le Temple, situé face à la Basilique, reste le symbole vivant de cette cohabitation unique entre l'homme et la nature.",
    tags: ["Histoire", "Ouidah", "Dangbé"],
  },
  {
    id: "2",
    title: "Les Jumeaux (Hoho) : L'Énigme de la Double Âme",
    date: "24 Décembre 2025",
    excerpt:
      "Au Bénin, les jumeaux sont des divinités vivantes. Comprendre le culte des Ibeji, c'est toucher à la vision africaine de l'immortalité.",
    content:
      "Les 'Hoho' ne sont pas des enfants ordinaires aux yeux du Vodun : ils partagent une âme unique scindée en deux corps. Ils apportent une bénédiction immense à la famille qui les accueille. Si l'un d'eux vient à quitter le monde des vivants, il n'est pas mort : il est 'parti chercher du bois'. On sculpte alors une statuette (Venavi ou Ibeji) que l'on nourrit et habille comme l'enfant vivant. C'est une leçon bouleversante d'amour éternel qui transcende la mort physique.",
    tags: ["Culture", "Famille", "Immortalité"],
  },
  {
    id: "3",
    title: "Comprendre le Fâ : La Géomancie du Destin",
    date: "20 Décembre 2025",
    excerpt:
      "Le Fâ n'est pas de la magie, c'est une science mathématique binaire classée à l'UNESCO. C'est la boussole spirituelle du peuple Fon.",
    content:
      "Souvent confondu avec de la voyance de foire, le Fâ est en réalité un système géomantique d'une complexité fascinante, basé sur 256 signes (Odu). Originaire d'Ifé, c'est la parole de la divinité Orunmila. Le Bokonon (prêtre du Fâ) ne 'devine' pas : il décode des algorithmes sacrés pour révéler le 'Se' (le destin) de l'individu. Consulter le Fâ, c'est accepter de se regarder dans le miroir de l'âme pour aligner sa vie avec les forces cosmiques.",
    tags: ["Philosophie", "Science", "Sagesse"],
  },
  {
    id: "4",
    title: "Zangbeto : Les Gardiens de la Nuit",
    date: "18 Décembre 2025",
    excerpt:
      "Ils tournent, ils vrombissent, mais il n'y a personne sous la paille. Les Zangbeto sont la police traditionnelle qui veille quand Ouidah dort.",
    content:
      "Quand la nuit tombe sur le Bénin, les 'Gardiens de la Nuit' sortent. Le Zangbeto ressemble à une meule de foin vivante qui tournoie à une vitesse vertigineuse. Mais ne vous y trompez pas : ce n'est pas du folklore. C'est une société secrète chargée de maintenir l'ordre, de chasser les sorciers et de protéger le sommeil des justes. On dit que sous le masque de paille, il n'y a pas d'homme, seulement l'esprit protecteur du village.",
    tags: ["Mystère", "Justice", "Tradition"],
  },
];
