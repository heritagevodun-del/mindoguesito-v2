import Link from "next/link";
import { entries } from "./data/entries";

export const metadata = {
  title: "Le Journal | Mindoguesito",
  description: "Chroniques et savoirs sur l'histoire du Vodun et de Ouidah.",
};

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-gray-800 font-sans">
      {/* Header Simple */}
      <header className="p-6 border-b border-yellow-600/20 bg-white flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-yellow-700 text-white flex items-center justify-center font-bold">
            M
          </div>
          <span className="font-bold text-gray-900">Le Journal</span>
        </div>
        <Link
          href="/"
          className="text-sm font-medium text-yellow-800 hover:underline"
        >
          ← Retour au Chat
        </Link>
      </header>

      {/* Contenu Principal */}
      <main className="max-w-4xl mx-auto p-6 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
          Chroniques des Ancêtres
        </h1>

        {/* CORRECTION ICI : Utilisation de &quot; et &apos; pour éviter les erreurs rouges */}
        <p className="text-gray-600 mb-10 italic">
          &quot;Celui qui ne sait pas d&apos;où il vient ne peut savoir où il
          va.&quot;
        </p>

        {/* Grille des Articles */}
        <div className="grid gap-8 md:grid-cols-2">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full"
            >
              {/* Tags */}
              <div className="flex gap-2 mb-3">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wider font-bold text-yellow-700 bg-yellow-50 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-2 text-gray-900">
                {entry.title}
              </h2>
              <div className="text-xs text-gray-400 mb-4">{entry.date}</div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                {entry.content}
              </p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
