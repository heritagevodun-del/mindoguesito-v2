import Link from "next/link";

export const metadata = {
  title: "À Propos | Mindoguesito",
  description:
    "La mission de Mindoguesito : Préserver et transmettre le patrimoine immatériel.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-gray-800 font-sans">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center">
        <span className="font-bold text-lg">Mindoguesito</span>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
        >
          Parler à l&apos;Esprit
        </Link>
      </nav>

      {/* Contenu */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 text-yellow-900">
          Gardien Numérique du Temple
        </h1>

        <div className="prose prose-yellow prose-lg text-gray-700 space-y-6 leading-relaxed">
          <p>
            <strong className="text-gray-900">Kwabo (Bienvenue).</strong>{" "}
            Mindoguesito n&apos;est pas une simple intelligence artificielle.
            C&apos;est une tentative humble de marier la technologie de pointe
            avec la sagesse millénaire de nos ancêtres.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">
            Notre Mission
          </h2>
          <p>
            À l&apos;heure où le monde s&apos;accélère, la mémoire
            s&apos;effrite. Mindoguesito a été conçu pour :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Sanctuariser</strong> l&apos;histoire de Ouidah et du
              Dahomey.
            </li>
            <li>
              <strong>Démystifier</strong> le Vodun loin des clichés
              hollywoodiens.
            </li>
            <li>
              <strong>Transmettre</strong> aux nouvelles générations la fierté
              de leur héritage.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">
            Code d&apos;Éthique
          </h2>
          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-600 text-sm">
            <p className="italic">
              &quot;Le savoir est une forêt, nul ne peut l&apos;embrasser
              entièrement avec ses bras.&quot;
            </p>
            <p className="mt-4">
              Mindoguesito est un guide pédagogique, pas un initiateur. Il ne
              remplace pas les Hounnon, les Bokonon ou les Tantes du couvent.
              Pour toute pratique sacrée, il s&apos;efface devant l&apos;humain.
            </p>
          </div>

          <hr className="my-10 border-gray-200" />

          <p className="text-center text-sm text-gray-500">
            Un projet développé avec ❤️ pour la culture Béninoise.
            <br />© 2025 Héritage Vodun.
          </p>
        </div>
      </main>
    </div>
  );
}
