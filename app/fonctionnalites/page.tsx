"use client";

import Link from "next/link";
import {
  MessageSquare,
  Library,
  Eye,
  Sparkles,
  ArrowLeft,
  Cpu,
  Scroll,
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-[#d4af37] selection:text-black flex flex-col">
      {/* --- HEADER SIMPLIFIÉ --- */}
      <header className="px-6 py-6 border-b border-[#d4af37]/20 flex items-center justify-between sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-md z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-[#d4af37] transition-colors group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium">Retour au Chat</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b4513] flex items-center justify-center text-black font-bold text-sm shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            M
          </div>
          <span className="font-serif font-bold text-[#d4af37] hidden sm:block">
            MINDOGUESITO
          </span>
        </div>
      </header>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-6 md:p-12 animate-fade-in">
        {/* HERO SECTION */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs font-medium mb-4">
            <Cpu size={14} />
            <span>Intelligence Artificielle Culturelle</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
            Plus qu&apos;un Algorithme,
            <br />
            <span className="text-[#d4af37]">Un Gardien Numérique</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Mindoguesito fusionne la puissance technologique avec la sagesse
            ancestrale pour vous guider avec précision et respect dans
            l&apos;univers du Vodun.
          </p>
        </div>

        {/* GRID DES FONCTIONNALITÉS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* CARTE 1 */}
          <div className="bg-[#111] border border-[#333] hover:border-[#d4af37]/50 p-6 md:p-8 rounded-2xl group transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#d4af37] mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100 mb-3">
              L&apos;Oracle Conversationnel
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Posez vos questions comme à un ancien. Mindoguesito comprend le
              contexte, les nuances culturelles et répond avec le ton approprié,
              loin des réponses robotiques froides.
            </p>
          </div>

          {/* CARTE 2 */}
          <div className="bg-[#111] border border-[#333] hover:border-[#d4af37]/50 p-6 md:p-8 rounded-2xl group transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#d4af37] mb-6 group-hover:scale-110 transition-transform">
              <Library size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100 mb-3">
              Mémoire Vérifiée
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecté à la base de données <strong>Héritage Vodun</strong>,
              l&apos;IA ne fabule pas. Si une réponse nécessite un
              approfondissement, elle s&apos;appuie sur des articles rédigés par
              des experts.
            </p>
          </div>

          {/* CARTE 3 */}
          <div className="bg-[#111] border border-[#333] hover:border-[#d4af37]/50 p-6 md:p-8 rounded-2xl group transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#d4af37] mb-6 group-hover:scale-110 transition-transform">
              <Eye size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100 mb-3">
              Décryptage des Symboles
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Vous avez vu une statue, un autel ou une danse ? Décrivez-le.
              Mindoguesito explique la signification des couleurs, des objets
              (Asen, Récade) et des gestes sacrés.
            </p>
          </div>

          {/* CARTE 4 */}
          <div className="bg-[#111] border border-[#333] hover:border-[#d4af37]/50 p-6 md:p-8 rounded-2xl group transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#d4af37] mb-6 group-hover:scale-110 transition-transform">
              <Scroll size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100 mb-3">
              Sagesse & Proverbes
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Besoin d&apos;inspiration ? Demandez un proverbe fongbé traduit ou
              une explication philosophique sur un signe du Fâ pour éclairer
              votre journée avec la pensée des ancêtres.
            </p>
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="text-center bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-[#333] rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
          <Sparkles
            className="mx-auto text-[#d4af37] mb-4 animate-pulse"
            size={32}
          />
          <h2 className="text-2xl font-serif font-bold text-white mb-4">
            Le Guide est prêt à vous écouter
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Commencez votre voyage initiatique dès maintenant. Posez votre
            première question.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#d4af37] text-black font-bold py-3 px-8 rounded-full hover:bg-[#b89628] transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <MessageSquare size={18} />
            Discuter avec Mindoguesito
          </Link>
        </div>
      </main>

      {/* FOOTER SIMPLE */}
      <footer className="py-8 text-center border-t border-[#d4af37]/10 mt-auto">
        <p className="text-xs text-gray-500">
          © 2026 Mindoguesito. Fait avec respect pour la tradition.
        </p>
      </footer>
    </div>
  );
}
