import Link from "next/link";
import { notFound } from "next/navigation";
import { entries } from "../data/entries"; // On remonte d'un cran (..) pour trouver le fichier data

// 1. GÉNÉRATION DES MÉTA-DONNÉES (Pour Google/SEO)
// Cette fonction s'exécute avant d'afficher la page pour définir le titre de l'onglet
export async function generateMetadata({ params }: { params: { id: string } }) {
  const entry = entries.find((e) => e.id === params.id);
  if (!entry) return { title: "Article Introuvable" };

  return {
    title: `${entry.title} | Mindoguesito`,
    description: entry.excerpt,
  };
}

// 2. LE COMPOSANT DE LA PAGE
export default function ArticlePage({ params }: { params: { id: string } }) {
  // On cherche l'article qui a le même ID que celui dans l'URL
  const entry = entries.find((e) => e.id === params.id);

  // Si l'article n'existe pas (ex: id=999), on affiche la page 404
  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-[#d4af37] selection:text-black">
      {/* HEADER SIMPLE DE NAVIGATION */}
      <nav className="px-6 py-6 max-w-4xl mx-auto flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-10">
        <Link
          href="/journal"
          className="group text-sm font-medium text-gray-400 hover:text-[#d4af37] transition-colors flex items-center gap-2"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>{" "}
          Retour au Grimoire
        </Link>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b4513] flex items-center justify-center font-bold text-black text-sm shadow-[0_0_10px_rgba(212,175,55,0.2)]">
          M
        </div>
      </nav>

      {/* CONTENU DE L'ARTICLE */}
      <article className="max-w-3xl mx-auto px-6 py-10 animate-fade-in">
        {/* EN-TÊTE ARTICLE */}
        <div className="mb-10 text-center">
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider font-bold text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#d4af37] mb-6 leading-tight drop-shadow-md">
            {entry.title}
          </h1>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
            Publié le {entry.date}
          </p>
        </div>

        {/* LIGNE DE SÉPARATION MAGIQUE */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-14 opacity-50"></div>

        {/* CORPS DU TEXTE */}
        <div className="prose prose-invert prose-lg mx-auto prose-p:text-gray-300 prose-headings:font-serif prose-headings:text-[#d4af37] prose-strong:text-white leading-loose text-justify">
          {/* whitespace-pre-wrap permet de respecter les sauts de ligne de votre texte */}
          <p className="whitespace-pre-wrap">{entry.content}</p>
        </div>

        {/* FOOTER INTERACTIF */}
        <div className="mt-20 pt-10 border-t border-[#333] flex flex-col items-center gap-6">
          <p className="text-gray-500 italic text-sm">
            Cette histoire vous a interpellé ?
          </p>
          <Link
            href="/"
            className="px-8 py-4 bg-[#d4af37] text-black font-bold text-sm uppercase tracking-wider rounded-full hover:bg-[#b89628] transition-all hover:scale-105 shadow-[0_0_25px_rgba(212,175,55,0.25)] flex items-center gap-2"
          >
            <span>💬</span> Discuter de ce sujet avec MINDOGUESITO
          </Link>
        </div>
      </article>
    </div>
  );
}
