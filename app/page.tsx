"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import { Volume2, StopCircle } from "lucide-react";

// --- CONSTANTES ---
const SUGGESTIONS = [
  "✨ Qui es-tu ?",
  "🐍 L'histoire du Python",
  "🔮 C'est quoi le Fâ ?",
  "🛡️ Les Zangbeto",
];

export default function ChatPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append,
    reload,
  } = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error("Erreur Chat:", err);
    },
  });

  const scrollContainerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // --- GESTION DE LA VOIX (TTS) ---
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(
    null
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // 1. Charger les voix disponibles au démarrage
  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
    };

    loadVoices();

    // Chrome charge les voix de manière asynchrone
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // 2. Fonction pour lire le message (AVEC FILTRE ANTI-BRUIT)
  const speakMessage = (text: string, id: string) => {
    // Si ça parle déjà, on coupe
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
      // Si on clique sur le même bouton, on s'arrête là (Toggle)
      if (currentSpeakingId === id) return;
    }

    // --- NETTOYAGE DU TEXTE ---
    const cleanText = text
      // Enlever les émojis (Plages Unicode courantes)
      .replace(
        /[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F000}-\u{1F0FF}\u{1F018}-\u{1F270}\u{2934}\u{2935}\u{203C}\u{2049}\u{00A9}\u{00AE}\u{2122}\u{2139}\u{2194}-\u{2199}\u{2328}\u{3030}\u{303D}]/gu,
        ""
      )
      // Enlever le Markdown basique (*, #, _, `)
      .replace(/[*_~`#]/g, "")
      // Enlever les liens [Texte](URL) -> on garde juste "Texte"
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // Nettoyer les espaces multiples crées par les suppressions
      .replace(/\s+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // --- SÉLECTION DE VOIX ---
    const frVoices = voices.filter((v) => v.lang.startsWith("fr"));

    // Priorité : Google Français > Thomas (Mac) > Paul (Win) > Voix Homme générique
    const preferredVoice = frVoices.find(
      (v) =>
        v.name.includes("Google") ||
        v.name.includes("Thomas") ||
        v.name.includes("Paul") ||
        v.name.includes("Male")
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    } else if (frVoices.length > 0) {
      utterance.voice = frVoices[0];
    }

    utterance.lang = "fr-FR";

    // --- RÉGLAGES "VIEUX SAGE" ---
    utterance.rate = 0.85; // Lent
    utterance.pitch = 0.8; // Grave

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentSpeakingId(id);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // --- SCROLL ANTI-VIBRATION ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;

    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      150;

    if (lastMessage.role === "user") {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    } else if (isAtBottom) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "auto",
      });
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Arrêter la voix si on envoie un nouveau message
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setCurrentSpeakingId(null);
      }
      if (input.trim()) {
        formRef.current?.requestSubmit();
      }
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-[#0a0a0a] text-gray-100 font-sans selection:bg-[#d4af37] selection:text-black">
      {/* --- HEADER --- */}
      <header className="flex-none px-4 py-4 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d4af37]/20 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b4513] flex items-center justify-center text-black font-bold text-base shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            M
          </div>
          <div className="hidden sm:block">
            <h1 className="font-serif font-bold text-base text-[#d4af37] leading-tight tracking-wide">
              MINDOGUESITO
            </h1>
            <p className="text-[9px] text-gray-400 font-medium tracking-widest uppercase">
              Gardien des Savoirs
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-1 sm:gap-4 text-xs font-medium">
          <Link
            href="/journal"
            className="text-gray-400 hover:text-[#d4af37] transition-colors py-2 px-2 sm:px-3 rounded-md hover:bg-white/5"
          >
            Journal
          </Link>
          <Link
            href="/a-propos"
            className="text-gray-400 hover:text-[#d4af37] transition-colors py-2 px-2 sm:px-3 rounded-md hover:bg-white/5"
          >
            À Propos
          </Link>
          <div className="h-4 w-[1px] bg-gray-700 mx-1 hidden sm:block"></div>
          <Link
            href="https://www.heritagevodun.com"
            className="text-[#d4af37] hover:text-white border border-[#d4af37]/30 hover:bg-[#d4af37]/10 transition-all py-1.5 px-3 rounded-full"
          >
            Site Principal
          </Link>
        </nav>
      </header>

      {/* --- ZONE DE CHAT --- */}
      <main
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-[#d4af37]/20 w-full max-w-4xl mx-auto"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-[#d4af37]/30 rounded-full flex items-center justify-center mb-6 text-4xl shadow-2xl animate-pulse-slow">
              ✨
            </div>
            <p className="text-lg md:text-xl font-serif text-gray-300 max-w-md leading-relaxed mb-8">
              &quot;Kwabo. Je suis l&apos;esprit de la mémoire.{" "}
              <br className="hidden sm:block" />
              Interroge-moi sur les rites, l&apos;histoire ou les
              divinités.&quot;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
              {SUGGESTIONS.map((sug, i) => (
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
                  : "bg-[#1a1a1a] border border-[#333] text-gray-200 rounded-tl-none relative group"
              }`}
            >
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

              {/* --- BOUTON VOCAL --- */}
              {m.role !== "user" && !isLoading && (
                <div className="mt-3 pt-3 border-t border-gray-800 flex items-center gap-3">
                  <button
                    onClick={() => speakMessage(m.content, m.id)}
                    className={`flex items-center gap-2 text-xs font-medium px-2 py-1 rounded transition-colors ${
                      currentSpeakingId === m.id
                        ? "text-[#d4af37] bg-[#d4af37]/10"
                        : "text-gray-500 hover:text-[#d4af37]"
                    }`}
                    title="Écouter la réponse"
                  >
                    {currentSpeakingId === m.id ? (
                      <>
                        <StopCircle size={14} className="animate-pulse" />
                        Arrêter
                      </>
                    ) : (
                      <>
                        <Volume2 size={14} />
                        Écouter
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start w-full animate-pulse">
            <div className="bg-[#1a1a1a] border border-[#333] px-5 py-4 rounded-2xl rounded-tl-none flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-red-900/20 border border-red-800 text-red-400 text-xs text-center mx-auto max-w-sm">
            Le lien avec les esprits est instable. Vérifiez votre connexion.
            <button
              onClick={() => reload()}
              className="ml-2 underline hover:text-red-300"
            >
              Réessayer
            </button>
          </div>
        )}
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
            aria-label="Envoyer"
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
