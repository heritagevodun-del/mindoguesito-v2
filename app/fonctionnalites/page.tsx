"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  MessageSquare,
  Library,
  Eye,
  Sparkles,
  ArrowLeft,
  Cpu,
  Scroll,
  ExternalLink,
} from "lucide-react";

// ✅ IMPORT DU LOGO
import Logo from "@/components/Logo";

// ✅ TYPAGE EXPLICITE
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function FeaturesPage() {
  return (
    // ⚠️ 'overflow-x-hidden' pour la stabilité
    <div className="relative min-h-screen bg-void text-gray-100 font-sans selection:bg-gold/30 selection:text-white flex flex-col overflow-x-hidden">
      {/* 1. FOND DYNAMIQUE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-spirit/10 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vh] h-[40vh] bg-gold/5 blur-[80px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      {/* --- HEADER --- */}
      <header className="px-6 py-5 border-b border-white/5 flex items-center justify-between sticky top-0 bg-void/80 backdrop-blur-xl z-50 shadow-sm">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium font-sans">
            Retour au Temple
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="font-serif font-bold text-gold hidden sm:block tracking-wide">
            MINDOGUESITO
          </span>
        </div>
      </header>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6 md:p-12 z-10">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-4">
            <Cpu size={14} />
            <span>Intelligence Culturelle</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-black text-white leading-tight">
            Plus qu&apos;un Algorithme,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#fceeb5]">
              Un Gardien Numérique
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-sans">
            Mindoguesito fusionne la puissance de GPT-4 avec la sagesse
            ancestrale pour vous guider avec précision et respect dans
            l&apos;univers du Vodun.
          </p>
        </motion.div>

        {/* GRID DES FONCTIONNALITÉS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
        >
          {/* CARTE 1 */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-8 rounded-2xl group hover:border-gold/30 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100"></div>

            <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-black transition-all duration-300">
              <MessageSquare size={26} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-3">
              Oracle Conversationnel
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Posez vos questions comme à un ancien. Mindoguesito comprend le
              contexte, les nuances culturelles et répond avec le ton approprié,
              loin des réponses robotiques froides.
            </p>
          </motion.div>

          {/* CARTE 2 */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-8 rounded-2xl group hover:border-gold/30 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-tech/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100"></div>

            <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-tech mb-6 group-hover:scale-110 group-hover:bg-tech group-hover:text-black transition-all duration-300">
              <Library size={26} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-3">
              Mémoire Vérifiée
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecté à la base de données <strong>Héritage Vodun</strong>,
              l&apos;IA ne fabule pas. Si une réponse nécessite un
              approfondissement, elle s&apos;appuie sur des articles rédigés par
              des experts.
            </p>
          </motion.div>

          {/* CARTE 3 */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-8 rounded-2xl group hover:border-gold/30 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-terra/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100"></div>

            <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-terra mb-6 group-hover:scale-110 group-hover:bg-terra group-hover:text-white transition-all duration-300">
              <Eye size={26} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-3">
              Décryptage des Symboles
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Vous avez vu une statue, un autel ou une danse ? Décrivez-le.
              Mindoguesito explique la signification des couleurs, des objets
              (Asen, Récade) et des gestes sacrés.
            </p>
          </motion.div>

          {/* CARTE 4 */}
          <motion.div
            variants={itemVariants}
            className="glass-panel p-8 rounded-2xl group hover:border-gold/30 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-spirit/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100"></div>

            <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-spirit mb-6 group-hover:scale-110 group-hover:bg-spirit group-hover:text-white transition-all duration-300">
              <Scroll size={26} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-3">
              Sagesse & Proverbes
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Besoin d&apos;inspiration ? Demandez un proverbe fongbé traduit ou
              une explication philosophique sur un signe du Fâ pour éclairer
              votre journée avec la pensée des ancêtres.
            </p>
          </motion.div>
        </motion.div>

        {/* CTA FINAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center relative"
        >
          {/* Lueur arrière */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-terra/10 to-gold/10 blur-3xl -z-10"></div>

          <div className="glass-panel border border-gold/20 rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <Sparkles
              className="mx-auto text-gold mb-6 animate-pulse"
              size={40}
            />

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Le Guide est prêt à vous écouter
            </h2>
            <p className="text-gray-400 mb-10 max-w-lg mx-auto text-lg">
              Commencez votre voyage initiatique dès maintenant. Posez votre
              première question à l&apos;esprit numérique.
            </p>

            {/* --- BOUTON CORRIGÉ --- */}
            {/* Défaut: Fond noir / Texte Or | Hover: Fond Or / Texte Noir */}
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-surface border border-gold/50 text-gold font-bold py-4 px-10 rounded-full hover:bg-gold hover:text-black transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.2)] text-lg"
            >
              <MessageSquare size={20} />
              Entrer dans le Temple
            </Link>

            <div className="mt-8 flex justify-center">
              <Link
                href="https://www.heritagevodun.com"
                target="_blank"
                className="text-xs text-gold/60 hover:text-gold flex items-center gap-1 uppercase tracking-widest transition-colors"
              >
                Propulsé par Héritage Vodun <ExternalLink size={10} />
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center border-t border-white/5 mt-auto bg-void/90 backdrop-blur-md">
        <p className="text-xs text-gray-600 font-medium tracking-wide">
          © 2026 Mindoguesito. Fait avec respect pour la tradition.
        </p>
      </footer>
    </div>
  );
}
