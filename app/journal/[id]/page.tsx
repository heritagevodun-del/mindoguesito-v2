import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Calendar, Tag, MessageSquare } from "lucide-react";
import { entries } from "../data/entries";
import JournalNavigation from "@/components/JournalNavigation";

// --- 1. GÉNÉRATION DYNAMIQUE DU SEO ---
// Cette fonction permet à Google de comprendre le contenu de chaque article individuellement
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const entry = entries.find((e) => e.id === resolvedParams.id);

  if (!entry) {
    return { title: "Chronique introuvable | Mindoguesito" };
  }

  return {
    title: `${entry.title} | Le Grimoire Mindoguesito`,
    description: entry.excerpt,
    openGraph: {
      title: entry.title,
      description: entry.excerpt,
      type: "article",
      publishedTime: entry.date,
      tags: entry.tags,
    },
  };
}

// --- 2. COMPOSANT SERVEUR PRINCIPAL ---
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const entry = entries.find((e) => e.id === resolvedParams.id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-[#d4af37]/30 selection:text-white flex flex-col overflow-x-hidden">
      {/* FOND DYNAMIQUE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-[#2a1b3d]/20 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vh] h-[40vh] bg-[#d4af37]/5 blur-[80px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      {/* INJECTION DE LA NAVIGATION CLIENT (Isolée pour préserver le SEO) */}
      <JournalNavigation />

      {/* --- CONTENU DE L’ARTICLE --- */}
      <article className="max-w-3xl mx-auto px-6 py-12 w-full z-10">
        {/* EN-TÊTE ARTICLE */}
        <div className="mb-10 text-center animate-fade-in-up">
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20"
              >
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-md">
            {entry.title}
          </h1>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2">
            <Calendar size={12} /> Publié le {entry.date}
          </p>
        </div>

        {/* LIGNE DE SÉPARATION MAGIQUE */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-14 opacity-50"></div>

        {/* CORPS DU TEXTE */}
        <div className="prose prose-invert prose-lg mx-auto prose-p:text-gray-300 prose-headings:font-serif prose-headings:text-[#d4af37] prose-strong:text-white leading-loose text-justify font-sans prose-a:text-[#d4af37]">
          <p className="whitespace-pre-wrap">{entry.content}</p>
        </div>

        {/* FOOTER INTERACTIF */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col items-center gap-6">
          <p className="text-gray-500 italic text-sm font-serif">
            Cette histoire vous a interpellé ?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-[#1a1a1a] border border-[#d4af37]/30 text-gray-200 font-bold py-4 px-10 rounded-full hover:border-[#d4af37] hover:text-[#d4af37] transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.05)] hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] text-lg"
          >
            <MessageSquare size={18} /> Discuter de ce sujet
          </Link>
        </div>
      </article>
    </div>
  );
}
