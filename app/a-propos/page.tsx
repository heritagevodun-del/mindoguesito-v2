"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Book,
  Sparkles,
  User,
  ExternalLink,
  ArrowLeft,
  Quote,
} from "lucide-react";

export default function AboutPage() {
  // --- GESTION DU MENU MOBILE (Identique à l'accueil) ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-[#d4af37] selection:text-black flex flex-col">
      {/* --- HEADER (Standardisé) --- */}
      <header className="flex-none px-4 py-4 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d4af37]/20 flex items-center justify-between z-20 sticky top-0">
        <div className="flex items-center gap-3">
          {/* BOUTON HAMBURGER (Visible sur Mobile uniquement) */}
          <button
            className="md:hidden text-[#d4af37] p-1 hover:bg-white/5 rounded-md transition-colors"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={24} />
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b4513] flex items-center justify-center text-black font-bold text-base shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform">
              M
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif font-bold text-base text-[#d4af37] leading-tight tracking-wide group-hover:text-white transition-colors">
                MINDOGUESITO
              </h1>
              <p className="text-[9px] text-gray-400 font-medium tracking-widest uppercase">
                Gardien des Savoirs
              </p>
            </div>
          </Link>
        </div>

        {/* --- NAVIGATION DESKTOP --- */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-medium">
          <Link
            href="/journal"
            className="text-gray-400 hover:text-[#d4af37] transition-colors py-2 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
          >
            <Book size={14} /> Journal
          </Link>
          <Link
            href="/fonctionnalites"
            className="text-gray-400 hover:text-[#d4af37] transition-colors py-2 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
          >
            <Sparkles size={14} /> Fonctionnalités
          </Link>
          <div className="text-[#d4af37] bg-[#d4af37]/10 py-2 px-3 rounded-md flex items-center gap-2 border border-[#d4af37]/20">
            <User size={14} /> À Propos
          </div>
          <div className="h-4 w-[1px] bg-gray-700 mx-1"></div>
          <Link
            href="https://www.heritagevodun.com"
            target="_blank"
            className="text-[#d4af37] hover:text-white border border-[#d4af37]/30 hover:bg-[#d4af37]/10 transition-all py-1.5 px-3 rounded-full flex items-center gap-2"
          >
            Site Principal <ExternalLink size={12} />
          </Link>
        </nav>
      </header>

      {/* --- SIDEBAR MOBILE (Identique à l'accueil) --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#0f0f0f] border-r border-[#d4af37]/20 z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#333]">
          <h2 className="font-serif font-bold text-[#d4af37] tracking-wide">
            MINDOGUESITO
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-400 hover:text-white p-1"
            aria-label="Fermer le menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-2">
          <Link
            href="/"
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-300 hover:text-[#d4af37] hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3"
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Retour au Chat</span>
          </Link>
          <div className="h-[1px] w-full bg-gray-800 my-1"></div>
          <Link
            href="/journal"
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-300 hover:text-[#d4af37] hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3"
          >
            <Book size={18} className="text-[#d4af37]" />
            <span className="font-medium">Journal</span>
          </Link>
          <Link
            href="/fonctionnalites"
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-300 hover:text-[#d4af37] hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3"
          >
            <Sparkles size={18} className="text-[#d4af37]" />
            <span className="font-medium">Fonctionnalités</span>
          </Link>
          <div className="text-[#d4af37] bg-[#d4af37]/10 p-3 rounded-lg flex items-center gap-3 border border-[#d4af37]/20">
            <User size={18} />
            <span className="font-medium">À Propos</span>
          </div>

          <div className="h-[1px] w-full bg-gray-800 my-4"></div>

          <Link
            href="https://www.heritagevodun.com"
            target="_blank"
            className="text-[#d4af37] bg-[#d4af37]/10 font-medium p-3 rounded-lg border border-[#d4af37]/20 text-center hover:bg-[#d4af37]/20 transition-all flex items-center justify-center gap-2"
          >
            Visiter Héritage Vodun <ExternalLink size={16} />
          </Link>
        </div>
      </div>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-6 md:p-12 animate-fade-in">
        {/* Titre */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            L&apos;Esprit derrière{" "}
            <span className="text-[#d4af37]">le Code</span>
          </h1>
          <div className="h-1 w-20 bg-[#d4af37] rounded-full mx-auto md:mx-0"></div>
        </div>

        {/* Bloc 1 : La Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              <strong className="text-white">Mindoguesito</strong> n&apos;est
              pas une simple intelligence artificielle. C&apos;est une tentative
              audacieuse de préserver une mémoire millénaire dans un écrin
              numérique.
            </p>
            <p>
              Né de la volonté de rendre la culture Vodun accessible et
              compréhensible, ce projet sert de pont entre la tradition orale
              des anciens et la technologie d&apos;aujourd&apos;hui.
            </p>
          </div>
          <div className="bg-[#111] border border-[#333] p-8 rounded-2xl relative">
            <Quote
              size={40}
              className="text-[#d4af37]/20 absolute top-4 left-4"
            />
            <p className="font-serif italic text-xl text-center text-gray-200 mt-4">
              &quot;La technologie sans racine est une âme sans corps. Nous
              donnons au silicium la mémoire des ancêtres.&quot;
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#d4af37]"></div>
              <span className="text-sm text-[#d4af37] font-bold tracking-widest uppercase">
                L&apos;Architecte
              </span>
            </div>
          </div>
        </div>

        {/* Bloc 2 : Le lien avec Héritage Vodun */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#333] rounded-3xl p-8 md:p-10 mb-16">
          <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-3">
            <Book className="text-[#d4af37]" />
            Un Écosystème Connecté
          </h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Mindoguesito puise sa sagesse dans la vaste base de connaissances
            d&apos;<strong>Héritage Vodun</strong>. Chaque réponse est une
            synthèse des recherches approfondies menées sur le terrain, à Ouidah
            et au-delà.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="https://www.heritagevodun.com"
              target="_blank"
              className="px-6 py-2 bg-[#d4af37] text-black font-bold rounded-full hover:bg-[#b89628] transition-colors inline-flex items-center gap-2"
            >
              Explorer le Média <ExternalLink size={16} />
            </Link>
            <Link
              href="/"
              className="px-6 py-2 border border-[#333] text-gray-300 hover:text-white hover:border-gray-500 rounded-full transition-colors"
            >
              Retourner discuter
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center border-t border-[#d4af37]/10 mt-auto">
        <p className="text-xs text-gray-500">
          © 2026 Mindoguesito. Fait avec respect pour la tradition.
        </p>
      </footer>
    </div>
  );
}
