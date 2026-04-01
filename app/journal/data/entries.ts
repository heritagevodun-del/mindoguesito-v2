// app/journal/data/entries.ts

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  excerpt: string; // Le résumé pour la carte
  content: string; // Le texte complet pour l'article (avec \n\n pour les paragraphes)
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
      "Dans la cosmogonie de Ouidah, le Python Royal (Dangbé) n'est pas un simple animal, c'est un ancêtre totémique, un protecteur spirituel.\n\nL'histoire raconte que lors d'une guerre terrible, le Roi Kpassè, fondateur de la ville, fut sauvé par une colonie de pythons qui le camouflèrent aux yeux de ses ennemis et de l'armée du Dahomey. Depuis ce jour, un pacte de sang lie le peuple Xwéda à ces reptiles inoffensifs. Tuer un python, même par accident, est un sacrilège absolu qui nécessite de lourdes cérémonies de purification.\n\nLe Temple, situé symboliquement face à la Basilique de l'Immaculée Conception, abrite des dizaines de pythons sacrés. Il reste le symbole vivant de cette cohabitation unique entre l'homme et la nature, illustrant la grande tolérance religieuse de la ville de Ouidah.",
    tags: ["Histoire", "Ouidah", "Dangbé"],
  },
  {
    id: "2",
    title: "Les Jumeaux (Hoho) : L'Énigme de la Double Âme",
    date: "24 Décembre 2025",
    excerpt:
      "Au Bénin, les jumeaux sont des divinités vivantes. Comprendre le culte des Ibeji, c'est toucher à la vision africaine de l'immortalité.",
    content:
      "Les 'Hoho' (ou Ibeji chez les Yoruba) ne sont pas des enfants ordinaires aux yeux du Vodun : ils partagent une âme unique scindée en deux corps. Leur naissance est perçue comme un prodige, apportant une bénédiction immense, mais aussi une grande responsabilité à la famille qui les accueille.\n\nSi l'un d'eux vient à quitter le monde des vivants, la tradition stipule qu'il n'est pas mort : il est simplement 'parti chercher du bois dans la forêt'. On sculpte alors une petite statuette de bois (Venavi) que la mère porte, nourrit, lave et habille exactement comme l'enfant vivant.\n\nCe culte des jumeaux est une leçon bouleversante d'amour éternel. Il enseigne que la mort physique ne brise jamais les liens de l'âme, et offre aux familles un processus de deuil d'une profonde sagesse psychologique.",
    tags: ["Culture", "Famille", "Immortalité"],
  },
  {
    id: "3",
    title: "Comprendre le Fâ : La Géomancie du Destin",
    date: "20 Décembre 2025",
    excerpt:
      "Le Fâ n'est pas de la magie, c'est une science mathématique binaire classée à l'UNESCO. C'est la boussole spirituelle du peuple Fon.",
    content:
      "Souvent confondu avec de la voyance de foire par les non-initiés, le Fâ est en réalité un système géomantique d'une complexité fascinante, basé sur 256 signes principaux (Odu). Originaire de la ville sainte d'Ifé, c'est la parole directe de la divinité Orunmila.\n\nLe Bokonon (le prêtre du Fâ) ne 'devine' pas l'avenir. Tel un informaticien ancestral, il utilise son chapelet sacré (l'Opele) pour générer des algorithmes binaires qui révèlent le 'Se' (le destin ou la signature vibratoire) de l'individu.\n\nConsulter le Fâ, c'est accepter de se regarder dans le miroir de son âme pour aligner sa vie avec les forces cosmiques. Chaque signe est accompagné de poèmes, d'interdits alimentaires et de paraboles qui guident le consultant vers la paix intérieure et le succès.",
    tags: ["Philosophie", "Science", "Sagesse"],
  },
  {
    id: "4",
    title: "Zangbeto : Les Gardiens de la Nuit",
    date: "18 Décembre 2025",
    excerpt:
      "Ils tournent, ils vrombissent, mais il n'y a personne sous la paille. Les Zangbeto sont la police traditionnelle qui veille quand Ouidah dort.",
    content:
      "Quand la nuit tombe sur le Bénin et que les rues se vident, les 'Gardiens de la Nuit' entrent en scène. Le Zangbeto se présente sous la forme d'une imposante meule de foin colorée qui glisse et tournoie sur le sol à une vitesse vertigineuse.\n\nMais ne vous y trompez pas : ce n'est pas du folklore pour touristes. Le Zangbeto est l'émanation d'une société secrète très stricte, chargée depuis des siècles de maintenir l'ordre, de chasser les mauvais esprits et de protéger le sommeil des justes.\n\nLe plus grand mystère de cette entité réside dans sa nature immatérielle. Au cours des cérémonies, la structure de paille est souvent retournée pour prouver qu'il n'y a aucun être humain à l'intérieur pour la faire bouger, seulement l'esprit protecteur de la communauté.",
    tags: ["Mystère", "Justice", "Tradition"],
  },
  {
    id: "5",
    title: "Les Mino : L'Épopée des Panthères Noires",
    date: "15 Décembre 2025",
    excerpt:
      "Redoutées par les colons et admirées par le monde, découvrez la véritable histoire des 'Amazones du Dahomey', l'élite militaire féminine.",
    content:
      "Elles se faisaient appeler 'Mino' (Nos Mères) en langue fon. Connues en Occident sous le nom d'Amazones du Dahomey, ces femmes formaient l'élite militaire absolue des rois Ghezo et Glele. \n\nArmées de fusils, de longues lames et entraînées à ne ressentir ni la douleur ni la peur, ces guerrières faisaient vœu de célibat pour se consacrer entièrement à la défense du royaume. Lors des assauts, elles étaient souvent les premières à franchir les défenses ennemies, provoquant la terreur par leur bravoure inégalée.\n\nLeur histoire, longtemps romancée ou déformée, témoigne de la place prépondérante et du courage de la femme dans l'histoire politique et militaire de l'Afrique de l'Ouest. Elles sont aujourd'hui un symbole éternel de résilience et de puissance féminine au Bénin.",
    tags: ["Histoire", "Femmes", "Dahomey"],
  },
  {
    id: "6",
    title: "La Porte de Non-Retour : Le Poids de la Mémoire",
    date: "10 Décembre 2025",
    excerpt:
      "Sur la plage de Djègbadji se dresse un monument solennel. Comprendre la Route des Esclaves, c'est honorer la mémoire de millions d'âmes.",
    content:
      "Sur la plage de sable fin de Ouidah se dresse une arche monumentale qui regarde l'océan Atlantique : La Porte de Non-Retour. Érigé en 1995 à l'initiative de l'UNESCO, ce monument marque l'ultime étape de la Route des Esclaves.\n\nC'est sur ce rivage précis que des millions de captifs, hommes, femmes et enfants, ont posé le pied sur la terre d'Afrique pour la toute dernière fois avant d'être embarqués vers les Amériques. Avant d'arriver à la plage, ils devaient tourner autour de 'l'Arbre de l'Oubli' pour effacer le souvenir de leur patrie, puis autour de 'l'Arbre du Retour' pour que leur âme puisse retrouver le chemin de la maison après leur mort.\n\nVisiter la Porte de Non-Retour n'est pas un simple acte touristique, c'est un pèlerinage émotionnel. C'est un lieu où le silence de l'océan nous rappelle le devoir impérieux de mémoire et célèbre la résilience invincible des peuples afro-descendants.",
    tags: ["Mémoire", "Ouidah", "Hommage"],
  },
];
