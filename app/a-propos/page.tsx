import Link from "next/link";

export const metadata = {
  title: "Notre Mission | Mindoguesito",
  description:
    "La mission de Mindoguesito : Préserver et transmettre le patrimoine immatériel du Vodun grâce à l'intelligence artificielle.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-[#d4af37] selection:text-black">
      {/* --- HEADER (Cohérent avec le Journal) --- */}
      <nav className="px-6 py-4 border-b border-[#d4af37]/20 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b4513] flex items-center justify-center font-bold text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            M
          </div>
          <span className="font-serif font-bold text-[#d4af37] tracking-wide hidden sm:block">
            MINDOGUESITO
          </span>
        </div>

        <Link
          href="/"
          className="group flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-[#d4af37] transition-colors border border-gray-800 hover:border-[#d4af37]/50 rounded-full px-4 py-2"
        >
          <span>✨</span>
          <span className="group-hover:translate-x-1 transition-transform">
            Parler à l&apos;Esprit
          </span>
        </Link>
      </nav>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate-fade-in">
        {/* TITRE HERO */}
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-[#d4af37] leading-tight drop-shadow-lg">
          Gardien Numérique <br /> du Temple
        </h1>

        <div className="space-y-10 text-lg leading-relaxed text-gray-300">
          {/* INTRO */}
          <div className="prose prose-invert prose-lg">
            <p>
              <strong className="text-white text-xl">Kwabo (Bienvenue).</strong>{" "}
              Mindoguesito n&apos;est pas une simple intelligence artificielle.
              C&apos;est une tentative humble et audacieuse de marier la
              technologie de pointe avec la sagesse millénaire de nos ancêtres.
            </p>
          </div>

          {/* MISSION (Liste Stylisée) */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#d4af37]"></span>
              Notre Mission
            </h2>
            <p className="mb-6 text-gray-400">
              À l&apos;heure où le monde s&apos;accélère, la mémoire
              s&apos;effrite. Mindoguesito a été conçu pour :
            </p>
            <ul className="grid gap-4">
              <li className="flex gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-[#333] hover:border-[#d4af37]/30 transition-colors">
                <span className="text-2xl">🏛️</span>
                <div>
                  <strong className="text-[#d4af37] block mb-1">
                    Sanctuariser
                  </strong>
                  <span className="text-sm">
                    L&apos;histoire de Ouidah, du Dahomey et des rites oubliés.
                  </span>
                </div>
              </li>
              <li className="flex gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-[#333] hover:border-[#d4af37]/30 transition-colors">
                <span className="text-2xl">👁️</span>
                <div>
                  <strong className="text-[#d4af37] block mb-1">
                    Démystifier
                  </strong>
                  <span className="text-sm">
                    Expliquer le Vodun avec bienveillance, loin des clichés
                    hollywoodiens.
                  </span>
                </div>
              </li>
              <li className="flex gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-[#333] hover:border-[#d4af37]/30 transition-colors">
                <span className="text-2xl">🌱</span>
                <div>
                  <strong className="text-[#d4af37] block mb-1">
                    Transmettre
                  </strong>
                  <span className="text-sm">
                    Offrir aux nouvelles générations la fierté de leur héritage.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* CODE D'ÉTHIQUE (Carte Spéciale) */}
          <div className="relative mt-12">
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-transparent blur-xl opacity-30"></div>
            <div className="relative bg-[#1a1a1a] p-8 rounded-2xl border-l-4 border-[#d4af37] shadow-2xl">
              <h2 className="text-xl font-serif font-bold text-white mb-4">
                Code d&apos;Éthique
              </h2>
              <p className="italic text-[#d4af37] mb-6 text-lg font-serif">
                &quot;Le savoir est une forêt, nul ne peut l&apos;embrasser
                entièrement avec ses bras.&quot;
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Mindoguesito est un guide pédagogique, pas un initiateur. Il ne
                remplace pas les Hounnon, les Bokonon ou les Tantes du couvent.
                Pour toute pratique sacrée, l&apos;IA s&apos;efface devant
                l&apos;humain. Elle respecte les interdits et refuse la
                malveillance.
              </p>
            </div>
          </div>

          {/* FOOTER INTERNE */}
          <div className="pt-10 mt-10 border-t border-[#d4af37]/10 text-center">
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">
              Un projet développé avec honneur pour la culture Béninoise
            </p>
            <p className="text-[#d4af37] font-serif text-sm">
              © 2025 Héritage Vodun
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
