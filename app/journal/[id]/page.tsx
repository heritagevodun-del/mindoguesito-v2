"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Book,
  Sparkles,
  ExternalLink,
  ArrowLeft,
  Calendar,
  Tag,
  User,
  Crown,
  MessageSquare, // ✅ AJOUT DE L'IMPORT MANQUANT ICI
} from "lucide-react";
import { entries } from "../data/entries";

// ✅ IMPORT DU LOGO
import Logo from "@/components/Logo";

export default function ArticlePage({ params }: { params: { id: string } }) {
  const entry = entries.find((e) => e.id === params.id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  if (!entry) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-void text-gray-100 font-sans selection:bg-gold/30 selection:text-white flex flex-col overflow-x-hidden">
      {/* 1. FOND DYNAMIQUE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-spirit/10 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vh] h-[40vh] bg-gold/5 blur-[80px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      {/* --- HEADER --- */}
      <header className="flex-none px-6 py-5 border-b border-white/5 flex items-center justify-between sticky top-0 bg-void/80 backdrop-blur-xl z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-gold p-2 hover:bg-white/5 rounded-full transition-colors active:scale-95"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} />
          </button>

          <Link
            href="/journal"
            className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors group"
          >
            <div className="md:hidden">
              <Logo className="w-8 h-8" />
            </div>
            <span className="hidden md:flex items-center gap-2 text-sm font-medium font-sans">
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Retour au Grimoire
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-2 text-xs font-medium">
          <Link
            href="/journal"
            className="text-gold hover:text-white transition-colors py-1.5 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
          >
            <Book size={14} /> Journal
          </Link>
          <Link
            href="/fonctionnalites"
            className="text-gray-400 hover:text-gold transition-colors py-1.5 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
          >
            <Sparkles size={14} /> Pouvoirs
          </Link>

          <button
            onClick={() => setIsAboutOpen(true)}
            className="text-gray-400 hover:text-gold transition-colors py-1.5 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
            aria-label="À Propos"
          >
            <User size={14} /> À Propos
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

          <Link
            href="/"
            className="text-gray-300 hover:text-white border border-white/20 hover:border-gold transition-all py-1.5 px-4 rounded-full flex items-center gap-2 group hover:bg-white/5"
          >
            <Sparkles size={12} />
            Discuter avec l&apos;IA
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
              className="fixed top-0 left-0 h-full w-[280px] bg-[#0c0510] border-r border-gold/20 z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Logo className="w-6 h-6" />
                  <span className="font-serif font-bold text-gold text-sm tracking-wide">
                    MINDOGUESITO
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
                  href="/journal"
                  className="text-gold bg-gold/10 p-3 rounded-lg flex items-center gap-3 text-sm border border-gold/10"
                >
                  <ArrowLeft size={16} /> Retour au Grimoire
                </Link>

                <div className="h-[1px] w-full bg-white/5 my-2"></div>

                <Link
                  href="/"
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-300 hover:text-gold hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3 text-sm"
                >
                  <Sparkles size={16} /> Discuter avec l&apos;IA
                </Link>

                <Link
                  href="/fonctionnalites"
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-300 hover:text-gold hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3 text-sm"
                >
                  <Sparkles size={16} className="text-gold" /> Pouvoirs
                </Link>

                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsAboutOpen(true);
                  }}
                  className="w-full text-left text-gray-300 hover:text-gold hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3 text-sm"
                  aria-label="À Propos"
                >
                  <User size={16} /> À Propos
                </button>

                <div className="h-[1px] w-full bg-white/5 my-4"></div>

                <Link
                  href="https://www.heritagevodun.com"
                  target="_blank"
                  className="text-gold bg-gold/5 p-3 rounded-lg border border-gold/10 flex items-center justify-center gap-2 text-sm hover:bg-gold/10"
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
              className="fixed inset-0 bg-void/90 backdrop-blur-md z-[60] flex items-center justify-center p-4"
              onClick={() => setIsAboutOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed z-[70] w-full max-w-lg max-h-[85vh] overflow-y-auto glass-panel border border-gold/20 rounded-2xl shadow-2xl scrollbar-thin scrollbar-thumb-gold/20"
            >
              <div className="sticky top-0 bg-[#0c0510]/95 backdrop-blur-xl p-6 border-b border-white/5 flex justify-between items-center z-10">
                <div className="flex items-center gap-3">
                  <Logo className="w-8 h-8" />
                  <h2 className="font-serif font-bold text-xl text-gold">
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
                    <Sparkles size={18} className="text-gold" /> La Mission
                  </h3>
                  <p className="text-sm">
                    Mindoguesito n&apos;est pas une simple intelligence
                    artificielle. C&apos;est une tentative audacieuse de
                    fusionner la technologie de pointe avec la sagesse
                    millénaire du <span className="text-gold">Vodun</span>.
                  </p>
                </section>
                <section>
                  <h3 className="flex items-center gap-2 text-white font-serif font-bold text-lg mb-3">
                    <Crown size={18} className="text-gold" /> L&apos;Héritage
                  </h3>
                  <p className="text-sm">
                    Initié par le projet <strong>Héritage Vodun</strong>, cet
                    oracle numérique a été conçu pour respecter les codes et la
                    solennité de la tradition.
                  </p>
                </section>
                <div className="p-6 border-t border-white/5 bg-black/20 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-widest">
                    Fait avec respect à Cotonou, Bénin
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- CONTENU DE L'ARTICLE --- */}
      <article className="max-w-3xl mx-auto px-6 py-12 w-full z-10">
        {/* EN-TÊTE ARTICLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20"
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
        </motion.div>

        {/* LIGNE DE SÉPARATION MAGIQUE */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-14 opacity-50"></div>

        {/* CORPS DU TEXTE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg mx-auto prose-p:text-gray-300 prose-headings:font-serif prose-headings:text-gold prose-strong:text-white leading-loose text-justify font-sans"
        >
          <p className="whitespace-pre-wrap">{entry.content}</p>
        </motion.div>

        {/* FOOTER INTERACTIF (Style Corrigé Premium) */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col items-center gap-6">
          <p className="text-gray-500 italic text-sm font-serif">
            Cette histoire vous a interpellé ?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-surface border border-gold/30 text-gray-200 font-bold py-4 px-10 rounded-full hover:border-gold hover:text-gold transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] text-lg"
          >
            <MessageSquare size={18} /> Discuter de ce sujet
          </Link>
        </div>
      </article>
    </div>
  );
}
