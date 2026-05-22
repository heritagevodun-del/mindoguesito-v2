"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Book,
  Sparkles,
  ExternalLink,
  ArrowLeft,
  User,
  Crown,
} from "lucide-react";
import Logo from "@/components/Logo";

export default function JournalNavigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      {/* --- HEADER DESKTOP & MOBILE --- */}
      <header className="flex-none px-6 py-5 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-[#d4af37] p-2 hover:bg-white/5 rounded-full transition-colors active:scale-95"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} />
          </button>

          <Link
            href="/journal"
            className="flex items-center gap-2 text-gray-400 hover:text-[#d4af37] transition-colors group"
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
            className="text-[#d4af37] hover:text-white transition-colors py-1.5 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
          >
            <Book size={14} /> Journal
          </Link>
          <Link
            href="/fonctionnalites"
            className="text-gray-400 hover:text-[#d4af37] transition-colors py-1.5 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
          >
            <Sparkles size={14} /> Pouvoirs
          </Link>

          <button
            onClick={() => setIsAboutOpen(true)}
            className="text-gray-400 hover:text-[#d4af37] transition-colors py-1.5 px-3 rounded-md hover:bg-white/5 flex items-center gap-2"
            aria-label="À Propos"
          >
            <User size={14} /> À Propos
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

          <Link
            href="/"
            className="text-gray-300 hover:text-white border border-white/20 hover:border-[#d4af37] transition-all py-1.5 px-4 rounded-full flex items-center gap-2 group hover:bg-white/5"
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
              className="fixed top-0 left-0 h-full w-[280px] bg-[#0c0510] border-r border-[#d4af37]/20 z-50 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Logo className="w-6 h-6" />
                  <span className="font-serif font-bold text-[#d4af37] text-sm tracking-wide">
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
                  className="text-[#d4af37] bg-[#d4af37]/10 p-3 rounded-lg flex items-center gap-3 text-sm border border-[#d4af37]/10"
                >
                  <ArrowLeft size={16} /> Retour au Grimoire
                </Link>

                <div className="h-[1px] w-full bg-white/5 my-2"></div>

                <Link
                  href="/"
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-300 hover:text-[#d4af37] hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3 text-sm"
                >
                  <Sparkles size={16} /> Discuter avec l&apos;IA
                </Link>

                <Link
                  href="/fonctionnalites"
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-300 hover:text-[#d4af37] hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3 text-sm"
                >
                  <Sparkles size={16} className="text-[#d4af37]" /> Pouvoirs
                </Link>

                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsAboutOpen(true);
                  }}
                  className="w-full text-left text-gray-300 hover:text-[#d4af37] hover:bg-white/5 p-3 rounded-lg transition-colors flex items-center gap-3 text-sm"
                  aria-label="À Propos"
                >
                  <User size={16} /> À Propos
                </button>

                <div className="h-[1px] w-full bg-white/5 my-4"></div>

                <Link
                  href="https://www.heritagevodun.com"
                  target="_blank"
                  className="text-[#d4af37] bg-[#d4af37]/5 p-3 rounded-lg border border-[#d4af37]/10 flex items-center justify-center gap-2 text-sm hover:bg-[#d4af37]/10"
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
    </>
  );
}
