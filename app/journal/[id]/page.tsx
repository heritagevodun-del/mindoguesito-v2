"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { entries } from "../data/entries";
import { Menu, X, Book, Sparkles, ExternalLink, ArrowLeft } from "lucide-react";

export default function ArticlePage({ params }: { params: { id: string } }) {
  // On cherche l'article
  const entry = entries.find((e) => e.id === params.id);

  // Menu Mobile State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Si pas d'article, 404
  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-[#d4af37] selection:text-black flex flex-col">
      {/* --- HEADER (Harmonisé) --- */}
      <header className="flex-none px-4 py-4 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d4af37]/20 flex items-center justify-between z-20 sticky top-0">
        <div className="flex items-center gap-3">
          {/* BOUTON HAMBURGER */}
          <button
            className="md:hidden text-[#d4af37] p-1 hover:bg-white/5 rounded-md transition-colors"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={24} />
          </button>

          {/* RETOUR RAPIDE */}
          <Link
            href="/journal"
            className="flex items-center gap-2 text-gray-400 hover:text-[#d4af37] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b4513] flex items-center justify-center font-bold text-black text-sm shadow-[0_0_10px_rgba(212,175,55,0.2)] md:hidden">
              M
            </div>
            <span className="hidden md:flex items-center gap-2 text-sm font-medium">
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Retour au Grimoire
            </span>
          </Link>
        </div>

        {/* --- NAVIGATION DESKTOP --- */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-medium">
          <Link
            href="/journal"
            className="text-[#d4af37] hover:text-white transition-colors py-2 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
          >
            <Book size={14} /> Journal
          </Link>
          <Link
            href="/fonctionnalites"
            className="text-gray-400 hover:text-[#d4af37] transition-colors py-2 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
          >
            <Sparkles size={14} /> Fonctionnalités
          </Link>
          <div className="h-4 w-[1px] bg-gray-700 mx-1"></div>
          <Link
            href="/"
            className="text-gray-300 hover:text-white border border-gray-700 hover:border-[#d4af37] transition-all py-1.5 px-3 rounded-full flex items-center gap-2 group"
          >
            <Sparkles size={12} />
            Discuter avec l&apos;IA
          </Link>
        </nav>
      </header>

      {/* --- SIDEBAR MOBILE --- */}
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
            href="/journal"
            onClick={() => setIsSidebarOpen(false)}
            className="text-[#d4af37] bg-[#d4af37]/10 p-3 rounded-lg flex items-center gap-3 border border-[#d4af37]/20"
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Retour au Grimoire</span>
          </Link>

          <div className="h-[1px] w-full bg-gray-800 my-2"></div>

          <Link
            href="/"
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-300 hover:text-[#d4af37] hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3"
          >
            <Sparkles size={18} className="text-[#d4af37]" />
            <span className="font-medium">Discuter avec l&apos;IA</span>
          </Link>

          <Link
            href="/fonctionnalites"
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-300 hover:text-[#d4af37] hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3"
          >
            <Sparkles size={18} className="text-[#d4af37]" />
            <span className="font-medium">Fonctionnalités</span>
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

      {/* --- CONTENU DE L'ARTICLE --- */}
      <article className="max-w-3xl mx-auto px-6 py-10 animate-fade-in w-full">
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
