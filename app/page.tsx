"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";

export default function ChatPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append,
  } = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error("Erreur Chat:", err);
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Scroll automatique vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Gestion intelligente de la touche Entrée (PC vs Mobile)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        formRef.current?.requestSubmit();
      }
    }
  };

  // Suggestions de démarrage (Pour engager la conversation)
  const suggestions = [
    "✨ Qui es-tu ?",
    "🐍 L'histoire du Python",
    "🔮 C'est quoi le Fâ ?",
    "🛡️ Les Zangbeto",
  ];

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-[#0a0a0a] text-gray-100 font-sans selection:bg-[#d4af37] selection:text-black">
      {/* --- HEADER --- */}
      <header className="flex-none px-4 pt-4 pb-4 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#d4af37]/20 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b4513] flex items-center justify-center text-black font-bold text-lg shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            M
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg text-[#d4af37] leading-tight tracking-wide">
              MINDOGUESITO
            </h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
              Gardien des Savoirs
            </p>
          </div>
        </div>

        {/* Navigation discrète */}
        <nav className="flex gap-2 text-xs font-medium">
          <Link
            href="https://www.heritagevodun.com" // Lien vers le site principal si besoin
            className="text-gray-500 hover:text-[#d4af37] transition-colors py-2 px-3 rounded-md hover:bg-[#1a1a1a]"
          >
            Retour au Site
          </Link>
        </nav>
      </header>

      {/* --- ZONE DE CHAT --- */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-[#d4af37]/20 w-full max-w-4xl mx-auto">
        {/* ÉCRAN D'ACCUEIL (Si vide) */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-[#d4af37]/30 rounded-full flex items-center justify-center mb-6 text-4xl shadow-2xl animate-pulse-slow">
              ✨
            </div>
            {/* CORRECTION 1 & 2 : Utilisation de &quot; et &apos; pour échapper les caractères */}
            <p className="text-lg md:text-xl font-serif text-gray-300 max-w-md leading-relaxed mb-8">
              &quot;Kwabo. Je suis l&apos;esprit de la mémoire. <br />
              Interroge-moi sur les rites, l&apos;histoire ou les
              divinités.&quot;
            </p>

            {/* Suggestions Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => append({ role: "user", content: sug })}
                  className="px-4 py-3 bg-[#1a1a1a] border border-[#333] hover:border-[#d4af37] rounded-lg text-sm text-gray-300 hover:text-[#d4af37] transition-all duration-300 text-left flex items-center gap-2 group"
                >
                  <span className="text-xs opacity-50 group-hover:opacity-100">
                    ➤
                  </span>{" "}
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* LISTE DES MESSAGES */}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex w-full ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-5 py-4 shadow-lg text-[0.95rem] md:text-base leading-relaxed ${
                m.role === "user"
                  ? "bg-[#d4af37] text-black rounded-tr-none font-medium"
                  : "bg-[#1a1a1a] border border-[#333] text-gray-200 rounded-tl-none"
              }`}
            >
              {/* RENDU MARKDOWN OPTIMISÉ */}
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="mb-2 last:mb-0">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <span
                      className={`font-bold ${
                        m.role === "user" ? "text-black" : "text-[#d4af37]"
                      }`}
                    >
                      {children}
                    </span>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-4 mb-2 space-y-1 opacity-90">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-4 mb-2 space-y-1 opacity-90">
                      {children}
                    </ol>
                  ),
                  h1: ({ children }) => (
                    <h3 className="font-serif font-bold text-lg mb-2 mt-2 border-b border-gray-700 pb-1">
                      {children}
                    </h3>
                  ),
                  h2: ({ children }) => (
                    <h4 className="font-bold text-base mb-2 mt-2 uppercase tracking-wide opacity-80">
                      {children}
                    </h4>
                  ),
                  code: ({ children }) => (
                    <code
                      className={`px-1 py-0.5 rounded text-xs font-mono ${
                        m.role === "user"
                          ? "bg-black/10"
                          : "bg-black/30 text-yellow-500"
                      }`}
                    >
                      {children}
                    </code>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-dotted hover:text-[#d4af37] transition-colors"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {m.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {/* LOADER (Quand l'IA réfléchit) */}
        {isLoading && (
          <div className="flex justify-start w-full animate-pulse">
            <div className="bg-[#1a1a1a] border border-[#333] px-5 py-4 rounded-2xl rounded-tl-none flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}

        {/* MESSAGES D'ERREUR */}
        {error && (
          <div className="p-3 rounded-lg bg-red-900/20 border border-red-800 text-red-400 text-xs text-center mx-auto max-w-sm">
            Le lien avec les esprits est instable. Vérifiez votre connexion.
          </div>
        )}

        <div ref={messagesEndRef} className="h-4" />
      </main>

      {/* --- INPUT AREA --- */}
      <footer className="flex-none p-4 bg-[#0a0a0a] border-t border-[#d4af37]/20">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto relative flex items-end gap-2"
        >
          <TextareaAutosize
            className="flex-grow bg-[#1a1a1a] border border-[#333] text-white text-base rounded-2xl focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] block w-full py-3.5 pl-5 pr-12 shadow-inner outline-none transition-all placeholder-gray-600 resize-none overflow-hidden"
            minRows={1}
            maxRows={5}
            placeholder="Interrogez les ancêtres..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            autoFocus
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 bottom-2 bg-[#d4af37] hover:bg-[#b89628] disabled:bg-[#333] disabled:text-gray-500 text-black w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]"
            /* CORRECTION 3 : Ajout d'un aria-label pour l'accessibilité */
            aria-label="Envoyer le message"
            title="Envoyer le message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
        <p className="text-center text-[#444] text-[10px] mt-3">
          Mindoguesito est une IA. Vérifiez les informations historiques.
        </p>
      </footer>
    </div>
  );
}
