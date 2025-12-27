import Link from "next/link";
import { entries } from "./data/entries";

export const metadata = {
  title: "Le Journal Sacré | Mindoguesito",
  description:
    "Chroniques, légendes et savoirs cachés sur l'histoire du Vodun et de Ouidah.",
};

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-[#d4af37] selection:text-black">
      {/* --- HEADER --- */}
      <header className="px-6 py-4 border-b border-[#d4af37]/20 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b4513] flex items-center justify-center font-bold text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            M
          </div>
          <div>
            <span className="font-serif font-bold text-[#d4af37] tracking-wide block leading-none">
              LE GRIMOIRE
            </span>
            <span className="text-[9px] text-gray-500 uppercase tracking-widest">
              Archives Mindoguesito
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="group flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-[#d4af37] transition-colors border border-gray-800 hover:border-[#d4af37]/50 rounded-full px-4 py-2"
        >
          <span>←</span>
          <span className="group-hover:translate-x-1 transition-transform">
            Retour au Chat
          </span>
        </Link>
      </header>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="max-w-5xl mx-auto p-6 md:p-12 animate-fade-in">
        {/* TITRE DE SECTION */}
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-[#d4af37] drop-shadow-lg">
            Chroniques des Ancêtres
          </h1>
          <p className="text-gray-400 italic text-lg max-w-2xl mx-auto border-l-2 border-[#d4af37] pl-4">
            &quot;Celui qui ne sait pas d&apos;où il vient ne peut savoir où il
            va. Ici reposent les mémoires du temps.&quot;
          </p>
        </div>

        {/* GRILLE DES ARTICLES */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            /* CORRECTION : Ajout du LINK autour de la carte */
            <Link
              key={entry.id}
              href={`/journal/${entry.id}`}
              className="block h-full"
            >
              <article className="group bg-[#1a1a1a] p-6 rounded-2xl border border-[#333] hover:border-[#d4af37]/50 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] transition-all duration-300 flex flex-col h-full hover:-translate-y-1 cursor-pointer">
                {/* En-tête de carte */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] uppercase tracking-wider font-bold text-[#d4af37] bg-[#d4af37]/10 px-2 py-1 rounded-md border border-[#d4af37]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {entry.date}
                  </span>
                </div>

                {/* Titre */}
                <h2 className="text-xl font-serif font-bold mb-3 text-gray-100 group-hover:text-[#d4af37] transition-colors">
                  {entry.title}
                </h2>

                {/* Extrait */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-4">
                  {entry.excerpt} {/* Utilisation de l'excerpt pour l'aperçu */}
                </p>

                {/* Footer de carte */}
                <div className="mt-auto pt-4 border-t border-gray-800 flex items-center text-[#d4af37] text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Lire la chronique →
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* MESSAGE DE FIN */}
        <div className="mt-20 text-center border-t border-[#d4af37]/20 pt-8">
          <p className="text-gray-500 text-sm">
            Vous cherchez une histoire spécifique ? <br />
            <Link href="/" className="text-[#d4af37] hover:underline">
              Demandez directement à Mindoguesito.
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
