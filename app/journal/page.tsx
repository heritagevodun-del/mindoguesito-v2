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
} from "lucide-react";
import { entries } from "./data/entries";

// Note: Dans un composant client ("use client"), on ne peut pas exporter de metadata directement.
// Si vous voulez des métadonnées SEO spécifiques, il faut soit le faire dans un layout.tsx parent,
// soit utiliser un composant serveur pour la page et un composant client pour le contenu.
// Pour l'instant, je garde la structure client pour gérer le menu mobile.

export default function JournalPage() {
  // --- GESTION DU MENU MOBILE (Standardisé) ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-[#d4af37] selection:text-black flex flex-col">
      {/* --- HEADER (Standardisé avec le Chat et À Propos) --- */}
      <header className="flex-none px-4 py-4 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d4af37]/20 flex items-center justify-between z-20 sticky top-0">
        <div className="flex items-center gap-3">
          {/* BOUTON HAMBURGER (Mobile) */}
          <button
            className="md:hidden text-[#d4af37] p-1 hover:bg-white/5 rounded-md transition-colors"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={24} />
          </button>

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b4513] flex items-center justify-center text-black font-bold text-base shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              M
            </div>
            <div>
              <span className="font-serif font-bold text-[#d4af37] tracking-wide block leading-none">
                LE GRIMOIRE
              </span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest hidden sm:block">
                Archives Mindoguesito
              </span>
            </div>
          </div>
        </div>

        {/* --- NAVIGATION DESKTOP --- */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-medium">
          {/* Bouton actif (Journal) */}
          <div className="text-[#d4af37] bg-[#d4af37]/10 py-2 px-3 rounded-md flex items-center gap-2 border border-[#d4af37]/20">
            <Book size={14} /> Journal
          </div>

          <Link
            href="/fonctionnalites"
            className="text-gray-400 hover:text-[#d4af37] transition-colors py-2 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
          >
            <Sparkles size={14} /> Fonctionnalités
          </Link>
          <Link
            href="/a-propos"
            className="text-gray-400 hover:text-[#d4af37] transition-colors py-2 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
          >
            <User size={14} /> À Propos
          </Link>
          <div className="h-4 w-[1px] bg-gray-700 mx-1"></div>

          {/* Bouton Retour Chat (Spécifique à cette page, remplace "Site Principal" ou s'ajoute) */}
          <Link
            href="/"
            className="text-gray-300 hover:text-white border border-gray-700 hover:border-[#d4af37] transition-all py-1.5 px-3 rounded-full flex items-center gap-2 group"
          >
            <ArrowLeft
              size={12}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Retour au Chat
          </Link>
        </nav>
      </header>

      {/* --- SIDEBAR MOBILE (Overlay + Drawer) --- */}
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

          {/* Lien Actif */}
          <div className="text-[#d4af37] bg-[#d4af37]/10 p-3 rounded-lg flex items-center gap-3 border border-[#d4af37]/20">
            <Book size={18} />
            <span className="font-medium">Journal</span>
          </div>

          <Link
            href="/fonctionnalites"
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-300 hover:text-[#d4af37] hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3"
          >
            <Sparkles size={18} className="text-[#d4af37]" />
            <span className="font-medium">Fonctionnalités</span>
          </Link>
          <Link
            href="/a-propos"
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-300 hover:text-[#d4af37] hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3"
          >
            <User size={18} className="text-[#d4af37]" />
            <span className="font-medium">À Propos</span>
          </Link>

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

      {/* --- CONTENU PRINCIPAL (Votre Grille) --- */}
      <main className="max-w-6xl mx-auto p-6 md:p-12 animate-fade-in w-full">
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
                  {entry.excerpt}
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
        <div className="mt-20 text-center border-t border-[#d4af37]/20 pt-8 pb-8">
          <p className="text-gray-500 text-sm">
            Vous cherchez une histoire spécifique ? <br />
            <Link
              href="/"
              className="text-[#d4af37] hover:underline flex items-center justify-center gap-1 mt-2"
            >
              <Sparkles size={14} /> Demandez directement à Mindoguesito.
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
