"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Book,
  Sparkles,
  User,
  ExternalLink,
  ArrowLeft,
  Calendar,
  Tag,
  Crown,
} from "lucide-react";
import { entries } from "./data/entries";

import Logo from "@/components/Logo";

export default function JournalPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-[#d4af37]/30 selection:text-white flex flex-col overflow-x-hidden">
      {/* 1. FOND DYNAMIQUE HARMONISÉ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-[#2a1b3d]/20 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vh] h-[40vh] bg-[#d4af37]/10 blur-[80px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      {/* --- HEADER --- */}
      <header className="flex-none px-6 py-5 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-50 shadow-sm">
        <div className="flex items-center gap-3">
          {/* BOUTON HAMBURGER MOBILE */}
          <button
            className="md:hidden text-[#d4af37] p-2 hover:bg-white/5 rounded-full transition-colors active:scale-95"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} />
          </button>

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <div className="hidden sm:block">
              <span className="font-serif font-bold text-[#d4af37] tracking-wide block leading-none">
                LE GRIMOIRE
              </span>
              <span className="text-[9px] text-gray-500 font-sans uppercase tracking-[0.2em] font-bold mt-1 block">
                Archives Mindoguesito
              </span>
            </div>
          </div>
        </div>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-medium">
          <div className="text-[#d4af37] bg-[#d4af37]/10 py-1.5 px-3 rounded-md flex items-center gap-2 border border-[#d4af37]/20">
            <Book size={14} /> Journal
          </div>

          <Link
            href="/fonctionnalites"
            className="text-gray-400 hover:text-[#d4af37] transition-colors py-1.5 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
          >
            <Sparkles size={14} /> Pouvoirs
          </Link>

          <button
            onClick={() => setIsAboutOpen(true)}
            className="text-gray-400 hover:text-[#d4af37] transition-colors py-1.5 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
            aria-label="Ouvrir À Propos"
          >
            <User size={14} /> À Propos
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

          <Link
            href="/"
            className="text-gray-300 hover:text-white border border-white/20 hover:border-[#d4af37] transition-all py-1.5 px-4 rounded-full flex items-center gap-2 group hover:bg-white/5"
          >
            <ArrowLeft
              size={12}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Retour au Temple
          </Link>
        </nav>
      </header>

      {/* --- SIDEBAR MOBILE --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-[#0c0510] border-r border-[#d4af37]/20 z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Logo className="w-6 h-6" />
                  <span className="font-serif font-bold text-[#d4af37] text-sm tracking-wide">
                    LE GRIMOIRE
                  </span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Fermer le menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col p-4 gap-1">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-[#d4af37] hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3 text-sm"
                >
                  <ArrowLeft size={16} /> Retour au Chat
                </Link>

                <div className="h-[1px] w-full bg-white/5 my-2"></div>

                <div className="text-[#d4af37] bg-[#d4af37]/10 p-3 rounded-lg flex items-center gap-3 text-sm border border-[#d4af37]/10">
                  <Book size={16} /> Journal
                </div>

                <Link
                  href="/fonctionnalites"
                  className="text-gray-300 hover:text-[#d4af37] hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3 text-sm"
                >
                  <Sparkles size={16} /> Pouvoirs
                </Link>

                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsAboutOpen(true);
                  }}
                  className="w-full text-left text-gray-300 hover:text-[#d4af37] hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3 text-sm"
                  aria-label="Ouvrir À Propos"
                >
                  <User size={16} /> À Propos
                </button>

                <div className="h-[1px] w-full bg-white/5 my-4"></div>

                <Link
                  href="https://www.heritagevodun.com"
                  target="_blank"
                  className="text-[#d4af37] bg-[#d4af37]/5 p-3 rounded-lg border border-[#d4af37]/10 flex items-center justify-center gap-2 text-sm hover:bg-[#d4af37]/10 transition-colors"
                >
                  Héritage Vodun <ExternalLink size={14} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- MODALE À PROPOS --- */}
      <AnimatePresence>
        {isAboutOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#050505]/90 backdrop-blur-md z-[60] flex items-center justify-center p-4"
              onClick={() => setIsAboutOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed z-[70] w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#121212]/95 backdrop-blur-xl border border-[#d4af37]/20 rounded-2xl shadow-2xl custom-scrollbar"
            >
              <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-xl p-6 border-b border-white/5 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                  <Logo className="w-8 h-8" />
                  <h2 className="font-serif font-bold text-xl text-[#d4af37]">
                    L&apos;Esprit du Code
                  </h2>
                </div>
                <button
                  onClick={() => setIsAboutOpen(false)}
                  className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-colors"
                  aria-label="Fermer la fenêtre"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-8 text-gray-300 font-sans leading-relaxed">
                <section>
                  <h3 className="flex items-center gap-2 text-white font-serif font-bold text-lg mb-3">
                    <Sparkles size={18} className="text-[#d4af37]" /> La Mission
                  </h3>
                  <p className="text-sm">
                    Mindoguesito n&apos;est pas une simple intelligence
                    artificielle. C&apos;est une tentative audacieuse de
                    fusionner la technologie de pointe avec la sagesse
                    millénaire du <span className="text-[#d4af37]">Vodun</span>.
                  </p>
                </section>
                <section>
                  <h3 className="flex items-center gap-2 text-white font-serif font-bold text-lg mb-3">
                    <Crown size={18} className="text-[#d4af37]" />{" "}
                    L&apos;Héritage
                  </h3>
                  <p className="text-sm">
                    Initié par le projet <strong>Héritage Vodun</strong>, cet
                    oracle numérique a été conçu pour respecter les codes et la
                    solennité de la tradition.
                  </p>
                </section>
                <div className="p-6 border-t border-white/5 bg-black/20 text-center rounded-b-xl">
                  <p className="text-xs text-gray-500 uppercase tracking-widest">
                    Fait avec respect à Cotonou, Bénin
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="max-w-6xl mx-auto p-6 md:p-12 w-full z-10">
        {/* TITRE DE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#fceeb5] drop-shadow-sm">
            Chroniques des Ancêtres
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-[#d4af37]/30"></div>
            <p className="text-gray-400 italic text-lg max-w-xl font-serif">
              &quot;Celui qui ne sait pas d&apos;où il vient ne peut savoir où
              il va.&quot;
            </p>
            <div className="h-[1px] w-12 bg-[#d4af37]/30"></div>
          </div>
        </motion.div>

        {/* GRILLE DES ARTICLES (Optimisée SEO) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/journal/${entry.id}`}
                className="block h-full group"
                title={`Lire l'article : ${entry.title}`}
              >
                <article className="bg-[#121212]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-[#d4af37]/30 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 relative overflow-hidden shadow-lg">
                  {/* Lueur au survol */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  {/* En-tête */}
                  <header className="flex justify-between items-start mb-4 relative z-10">
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-[#d4af37] bg-[#d4af37]/10 px-2 py-1 rounded-md border border-[#d4af37]/20"
                        >
                          <Tag size={10} /> {tag}
                        </span>
                      ))}
                    </div>
                    <time
                      dateTime={entry.date}
                      className="flex items-center gap-1 text-[10px] text-gray-500 font-mono"
                    >
                      <Calendar size={10} /> {entry.date}
                    </time>
                  </header>

                  {/* Titre */}
                  <h2 className="text-xl font-serif font-bold mb-3 text-white group-hover:text-[#d4af37] transition-colors relative z-10">
                    {entry.title}
                  </h2>

                  {/* Extrait */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-4 relative z-10">
                    {entry.excerpt}
                  </p>

                  {/* Footer */}
                  <footer className="mt-auto pt-4 border-t border-white/5 flex items-center text-[#d4af37] text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 relative z-10">
                    Lire la chronique{" "}
                    <ArrowLeft className="rotate-180 ml-2" size={12} />
                  </footer>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* MESSAGE DE FIN */}
        <div className="mt-20 text-center border-t border-white/10 pt-8 pb-8">
          <p className="text-gray-500 text-sm">
            Vous cherchez une histoire spécifique ? <br />
            <Link
              href="/"
              className="text-[#d4af37] hover:underline decoration-dotted flex items-center justify-center gap-1 mt-2 transition-all hover:text-white"
            >
              <Sparkles size={14} /> Demandez directement à Mindoguesito.
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
