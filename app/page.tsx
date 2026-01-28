"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  StopCircle,
  Menu,
  X,
  Book,
  Sparkles,
  ExternalLink,
  Send,
  MessageSquare,
  User,
  Crown,
} from "lucide-react";

import Logo from "@/components/Logo";

// --- CONSTANTES ---
const SUGGESTIONS = [
  "✨ Qui es-tu ?",
  "🥥 Les secrets du Fâ",
  "⚔️ L'histoire des Amazones",
  "🛡️ Le rôle du Zangbeto",
];

export default function ChatPage() {
  // 1. LOGIQUE CHAT
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
    onError: (err) => console.error("Erreur Chat:", err),
  });

  const scrollContainerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // 2. ÉTATS UI
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(
    null,
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // 3. LOGIQUE VOCALE
  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speakMessage = (text: string, id: string) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
      if (currentSpeakingId === id) return;
    }

    let textToRead = text
      .replace(
        /[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F000}-\u{1F0FF}\u{1F018}-\u{1F270}\u{2934}\u{2935}\u{203C}\u{2049}\u{00A9}\u{00AE}\u{2122}\u{2139}\u{2194}-\u{2199}\u{2328}\u{3030}\u{303D}]/gu,
        "",
      )
      .replace(/[*_~`#]/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\s+/g, " ")
      .trim();

    textToRead = textToRead.replace(/Mindoguesito/gi, "Minne-do-gué-si-to");
    textToRead = textToRead.replace(/Vodun/gi, "Vaudoun");
    textToRead = textToRead.replace(/Fâ/gi, "Fa");
    textToRead = textToRead.replace(/DOBANOU-NOUTO/gi, "Do-ba-nou Nou-to");

    const utterance = new SpeechSynthesisUtterance(textToRead);
    const frVoices = voices.filter((v) => v.lang.startsWith("fr"));
    const preferredVoice = frVoices.find(
      (v) =>
        v.name.includes("Google") ||
        v.name.includes("Thomas") ||
        v.name.includes("Male"),
    );

    utterance.voice = preferredVoice || frVoices[0];
    utterance.lang = "fr-FR";
    utterance.rate = 0.95;
    utterance.pitch = 0.95;

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

  // 4. AUTO-SCROLL
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const lastMessage = messages[messages.length - 1];

    if (lastMessage) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isSpeaking) window.speechSynthesis.cancel();
      // ✅ SÉCURITÉ ICI : input?
      if (input?.trim()) formRef.current?.requestSubmit();
    }
  };

  return (
    <div className="relative flex flex-col h-[100dvh] w-full bg-void text-gray-100 font-sans overflow-hidden selection:bg-gold/30 selection:text-white">
      {/* 1. FOND DYNAMIQUE */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-spirit/10 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vh] h-[40vh] bg-gold/5 blur-[80px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      {/* 2. HEADER */}
      <header className="flex-none h-16 px-4 border-b border-white/5 bg-void/60 backdrop-blur-xl flex items-center justify-between z-20 shadow-md">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-gold p-2 hover:bg-white/5 rounded-full transition-colors active:scale-95"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} />
          </button>

          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <Logo className="w-full h-full drop-shadow-sm" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif font-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#fceeb5] tracking-wide">
                MINDOGUESITO
              </h1>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 text-xs font-medium">
          <Link
            href="/journal"
            className="text-gray-400 hover:text-gold py-1.5 px-3 rounded hover:bg-white/5 flex items-center gap-2 transition-colors"
          >
            <Book size={14} /> Journal
          </Link>
          <Link
            href="/fonctionnalites"
            className="text-gray-400 hover:text-gold py-1.5 px-3 rounded hover:bg-white/5 flex items-center gap-2 transition-colors"
          >
            <Sparkles size={14} /> Pouvoirs
          </Link>
          <button
            onClick={() => setIsAboutOpen(true)}
            className="text-gray-400 hover:text-gold py-1.5 px-3 rounded hover:bg-white/5 flex items-center gap-2 transition-colors"
            aria-label="Ouvrir À Propos"
          >
            <User size={14} /> À Propos
          </button>
          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
          <Link
            href="https://www.heritagevodun.com"
            target="_blank"
            className="text-gold border border-gold/30 hover:bg-gold hover:text-void transition-all py-1.5 px-3 rounded-full flex items-center gap-2"
          >
            Héritage Vodun <ExternalLink size={12} />
          </Link>
        </nav>
      </header>

      {/* 3. SIDEBAR MOBILE */}
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
                  className="text-gray-300 hover:text-gold hover:bg-white/5 p-3 rounded-lg flex items-center gap-3 text-sm"
                >
                  <Book size={16} className="text-gold" /> Journal
                </Link>
                <Link
                  href="/fonctionnalites"
                  className="text-gray-300 hover:text-gold hover:bg-white/5 p-3 rounded-lg flex items-center gap-3 text-sm"
                >
                  <Sparkles size={16} className="text-gold" /> Pouvoirs
                </Link>
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsAboutOpen(true);
                  }}
                  className="w-full text-left text-gray-300 hover:text-gold hover:bg-white/5 p-3 rounded-lg flex items-center gap-3 text-sm"
                  aria-label="Ouvrir À Propos"
                >
                  <User size={16} className="text-gold" /> À Propos
                </button>
                <div className="h-[1px] w-full bg-white/5 my-4"></div>
                <Link
                  href="https://www.heritagevodun.com"
                  className="text-gold bg-gold/5 p-3 rounded-lg border border-gold/10 flex items-center justify-center gap-2 text-sm hover:bg-gold/10"
                >
                  Héritage Vodun <ExternalLink size={14} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. MODALE À PROPOS */}
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
              transition={{ type: "spring", duration: 0.5 }}
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
                  aria-label="Fermer"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-8 text-gray-300 font-sans leading-relaxed">
                <section>
                  <h3 className="flex items-center gap-2 text-white font-serif font-bold text-lg mb-3">
                    <Sparkles size={18} className="text-gold" />
                    La Mission
                  </h3>
                  <p className="text-sm">
                    <strong>Mindoguesito</strong> n&apos;est pas une simple
                    intelligence artificielle. C&apos;est une tentative
                    audacieuse de fusionner la technologie de pointe avec la
                    sagesse millénaire du{" "}
                    <span className="text-gold">Vodun</span>. Notre but est de
                    préserver, transmettre et rendre accessible l&apos;histoire
                    de Ouidah, les principes du Fâ et la richesse de notre
                    patrimoine immatériel.
                  </p>
                </section>
                <section>
                  <h3 className="flex items-center gap-2 text-white font-serif font-bold text-lg mb-3">
                    <Crown size={18} className="text-gold" />
                    L&apos;Héritage
                  </h3>
                  <p className="text-sm">
                    Initié par le projet <strong>Héritage Vodun</strong>, cet
                    oracle numérique a été conçu pour respecter les codes et la
                    solennité de la tradition. Il ne remplace pas les prêtres du
                    Fâ, mais agit comme un gardien numérique de la mémoire, un
                    pont entre le passé glorieux du Bénin et le futur numérique.
                  </p>
                </section>
                <div className="p-4 bg-gold/5 border border-gold/10 rounded-xl">
                  <h4 className="text-gold font-bold text-sm mb-1">
                    Note Importante
                  </h4>
                  <p className="text-xs text-gray-400">
                    Bien que performant, Mindoguesito peut commettre des
                    erreurs. Consultez toujours les gardiens de la tradition
                    pour les questions spirituelles profondes.
                  </p>
                </div>
              </div>
              <div className="p-6 border-t border-white/5 bg-black/20 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-widest">
                  Fait avec respect à Cotonou, Bénin
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 5. ZONE DE CHAT */}
      <main
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-4 w-full max-w-3xl mx-auto z-10 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="relative mb-6 group">
              <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full opacity-50 animate-pulse-slow"></div>
              <Logo className="w-24 h-24 drop-shadow-2xl relative z-10" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#fceeb5]">
                Kwabo
              </span>
              , Initié.
            </h2>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-8">
              Je suis la mémoire vivante du Bénin. Interroge-moi sur le Vodun,
              notre culture, notre histoire et nos traditions ancestrales. Je
              suis ici pour te guider.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => append({ role: "user", content: sug })}
                  className="px-4 py-3 bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-white/10 rounded-xl text-xs text-gray-300 hover:text-gold transition-all duration-200 text-left flex items-center gap-2 group"
                >
                  <MessageSquare
                    size={14}
                    className="text-gray-500 group-hover:text-gold"
                  />
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6 pb-4">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex w-full ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] md:max-w-[85%] rounded-2xl px-5 py-4 shadow-lg text-sm md:text-[0.95rem] leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-gold to-[#b8860b] text-black font-medium rounded-tr-sm"
                    : "bg-[#141414]/80 border border-white/5 text-gray-100 rounded-tl-sm backdrop-blur-md prose-ai"
                }`}
              >
                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tech underline decoration-dotted hover:text-white transition-colors"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {m.content}
                </ReactMarkdown>

                {m.role !== "user" && !isLoading && (
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => speakMessage(m.content, m.id)}
                      className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-400 hover:text-gold transition-colors"
                      aria-label={
                        currentSpeakingId === m.id
                          ? "Arrêter la lecture"
                          : "Lire le message"
                      }
                    >
                      {currentSpeakingId === m.id ? (
                        <>
                          {" "}
                          <StopCircle
                            size={12}
                            className="animate-pulse text-gold"
                          />{" "}
                          Arrêter{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          <Volume2 size={12} /> Écouter{" "}
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex justify-start w-full">
              <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 border border-white/5">
                <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-900/20 border border-red-800/50 text-red-200 text-xs text-center mx-auto max-w-sm">
              <p>Connexion interrompue.</p>
              <button
                onClick={() => reload()}
                className="mt-1 text-gold underline hover:text-white"
              >
                Réessayer
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 6. INPUT AREA */}
      <footer className="flex-none p-4 bg-void/90 backdrop-blur-xl border-t border-white/10 z-20">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto relative flex items-end gap-2"
        >
          <div className="relative flex-grow">
            <TextareaAutosize
              className="w-full bg-[#1a1a1a] border border-white/10 text-white text-sm rounded-xl focus:ring-1 focus:ring-gold/50 focus:border-gold/50 block py-3 pl-4 pr-12 resize-none shadow-inner"
              minRows={1}
              maxRows={4}
              placeholder="Posez une question au Fâ..."
              // ✅ SÉCURITÉ ICI : input || ""
              value={input || ""}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              type="submit"
              // ✅ SÉCURITÉ ICI : input?.trim()
              disabled={isLoading || !input?.trim()}
              className="absolute right-2 bottom-2 p-1.5 bg-gold hover:bg-[#fceeb5] disabled:bg-gray-700 disabled:text-gray-500 text-black rounded-lg transition-all shadow-md active:scale-95"
              aria-label="Envoyer"
            >
              <Send
                size={16}
                className={isLoading ? "opacity-0" : "opacity-100"}
              />
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-[10px] mt-2 font-medium">
          Mindoguesito v2.0 • Intelligence Béninoise
        </p>
      </footer>
    </div>
  );
}
