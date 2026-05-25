"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import {
  Volume2,
  StopCircle,
  X,
  Sparkles,
  Send,
  MessageSquare,
  User,
  Crown,
} from "lucide-react";

import Logo from "@/components/Logo";
import { processTextForTTS } from "@/utils/phonetics";

const SUGGESTIONS = [
  "✨ Qui es-tu ?",
  "🥥 Les secrets du Fâ",
  "⚔️ L'histoire des Amazones",
  "🛡️ Le rôle du Zangbeto",
];

function ChatContent({ existingChatId }: { existingChatId?: string }) {
  const searchParams = useSearchParams();
  const [chatId] = useState(() => existingChatId || uuidv4());

  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append,
    reload,
  } = useChat({
    api: "/api/chat",
    id: chatId,
    body: { id: chatId },
    onFinish: () => {
      window.dispatchEvent(new Event("refresh-chats"));
    },
    onError: (err) => console.error("[Erreur Oracle] :", err),
  });

  const scrollContainerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // NOUVEAU : Ancrage absolu et gestion de l'état de défilement
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(
    null,
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Chargement de l&apos;archive si existante
  useEffect(() => {
    if (existingChatId) {
      fetch(`/api/chats/${existingChatId}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMessages(data);
          }
        })
        .catch((err) =>
          console.error("Erreur de restauration mémorielle:", err),
        );
    }
  }, [existingChatId, setMessages]);

  const hasInitialized = useRef(false);

  // Initialisation par contexte (depuis l&apos;URL)
  useEffect(() => {
    if (!hasInitialized.current && messages.length === 0 && !existingChatId) {
      const context = searchParams.get("context");
      if (context) {
        hasInitialized.current = true;
        let prompt = "";
        switch (context) {
          case "fa":
            prompt =
              "Peux-tu m&apos;expliquer les origines géomanciques du Fâ ?";
            break;
          case "zangbeto":
            prompt = "Qui est le Zangbeto et quel est son rôle de gardien ?";
            break;
          case "ouidah":
            prompt =
              "Raconte-moi l&apos;histoire sacrée de la ville de Ouidah.";
            break;
        }
        if (prompt) append({ role: "user", content: prompt });
      }
    }
  }, [searchParams, messages, append, existingChatId]);

  // Chargement des voix TTS
  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
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
    const textToRead = processTextForTTS(text);
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

  // NOUVEAU : Détecteur de défilement de l'utilisateur
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    // Si l'utilisateur est à moins de 100px du bas, on le considère "accroché"
    setIsAtBottom(scrollHeight - scrollTop - clientHeight < 100);
  };

  // NOUVEAU : Smart Auto-scroll robuste (sans le "smooth" destructeur)
  useEffect(() => {
    if (isAtBottom && messagesEndRef.current) {
      // L'utilisation de "auto" au lieu de "smooth" empêche le conflit avec le streaming
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages, isAtBottom]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isSpeaking) window.speechSynthesis.cancel();
      if (input?.trim()) formRef.current?.requestSubmit();
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-[#020202] text-gray-100 font-sans selection:bg-[#d4af37]/30 selection:text-white">
      {/* INFRASTRUCTURE D&apos;ARRIÈRE-PLAN */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vh] h-[60vh] bg-[#1a0f2e]/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-[#d4af37]/5 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      {/* HEADER SOUVERAIN */}
      <header className="flex-none h-16 px-4 pl-[4.5rem] md:pl-6 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl flex items-center justify-between z-20">
        <div
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <Logo className="w-full h-full drop-shadow-sm" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-serif font-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#fceeb5] tracking-wide">
              MINDOGUESITO
            </h1>
          </div>
        </div>
        <nav className="flex items-center gap-1 text-xs font-medium">
          <button
            onClick={() => setIsAboutOpen(true)}
            className="text-gray-400 hover:text-[#d4af37] py-1.5 px-3 rounded hover:bg-white/5 flex items-center gap-2 transition-colors"
            aria-label="Ouvrir À Propos"
          >
            <User size={14} />{" "}
            <span className="hidden sm:inline">L&apos;Esprit</span>
          </button>
        </nav>
      </header>

      {/* MODALE "À PROPOS" */}
      <AnimatePresence>
        {isAboutOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
              onClick={() => setIsAboutOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed z-[70] w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#0a0a0a] border border-[#d4af37]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] custom-scrollbar"
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
                  className="p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-400 rounded-full transition-colors"
                  aria-label="Fermer la modale"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-8 text-gray-300 font-sans leading-relaxed">
                <section>
                  <h3 className="flex items-center gap-2 text-white font-serif font-bold text-lg mb-3">
                    <Sparkles size={18} className="text-[#d4af37]" />
                    La Mission
                  </h3>
                  <p className="text-sm">
                    <strong>Mindoguesito</strong> n&apos;est pas une simple
                    intelligence artificielle. C&apos;est une tentative
                    audacieuse de fusionner la technologie de pointe avec la
                    sagesse millénaire du{" "}
                    <span className="text-[#d4af37]">Vodun</span>.
                  </p>
                </section>
                <section>
                  <h3 className="flex items-center gap-2 text-white font-serif font-bold text-lg mb-3">
                    <Crown size={18} className="text-[#d4af37]" />
                    L&apos;Héritage
                  </h3>
                  <p className="text-sm">
                    Initié par le projet <strong>Héritage Vodun</strong>, cet
                    oracle numérique a été conçu pour respecter les codes et la
                    solennité de notre tradition souveraine.
                  </p>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ZONE DE DISCUSSION */}
      <main
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto overflow-x-hidden p-4 w-full max-w-4xl mx-auto z-10 custom-scrollbar"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[65vh] text-center px-4">
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-[#d4af37]/10 blur-3xl rounded-full opacity-60 animate-pulse-slow"></div>
              <Logo className="w-24 h-24 drop-shadow-2xl relative z-10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#fceeb5]">
                Kwabo
              </span>
              , Initié.
            </h2>
            <p className="text-sm md:text-base text-gray-400 max-w-md leading-relaxed mb-10">
              Je suis la mémoire vivante du Bénin. Interroge-moi sur le Vodun,
              notre culture, notre histoire et nos traditions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => append({ role: "user", content: sug })}
                  className="px-4 py-3.5 bg-[#0a0a0a] border border-white/5 hover:border-[#d4af37]/40 hover:bg-[#111111] rounded-xl text-sm text-gray-300 hover:text-[#d4af37] transition-all duration-300 text-left flex items-center gap-3 shadow-[0_4px_10px_rgba(0,0,0,0.5)] group"
                >
                  <MessageSquare
                    size={16}
                    className="text-gray-600 group-hover:text-[#d4af37] transition-colors"
                  />{" "}
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-8 pb-8 mt-4">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[92%] md:max-w-[85%] px-5 py-4 text-[0.95rem] leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "bg-[#161616] border border-white/5 text-white font-medium rounded-2xl rounded-tr-sm"
                    : "bg-transparent text-gray-200 prose-ai border-l-2 border-[#d4af37]/30 pl-6 rounded-r-2xl"
                }`}
              >
                {m.role !== "user" && (
                  <div className="flex items-center gap-2 mb-3">
                    <Logo className="w-5 h-5" />
                    <span className="text-xs font-serif font-bold text-[#d4af37] tracking-widest uppercase">
                      Mindoguesito
                    </span>
                  </div>
                )}

                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d4af37] underline decoration-dotted decoration-white/30 underline-offset-4 hover:decoration-[#d4af37] hover:text-white transition-all"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {m.content}
                </ReactMarkdown>

                {m.role !== "user" && !isLoading && (
                  <div className="mt-4 pt-3 flex items-center gap-2 border-t border-white/5 opacity-50 hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => speakMessage(m.content, m.id)}
                      className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-gray-400 hover:text-[#d4af37] transition-colors"
                    >
                      {currentSpeakingId === m.id ? (
                        <>
                          <StopCircle
                            size={14}
                            className="animate-pulse text-[#d4af37]"
                          />{" "}
                          Arrêter
                        </>
                      ) : (
                        <>
                          <Volume2 size={14} /> Écouter l&apos;Oracle
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
              <div className="bg-transparent border-l-2 border-[#d4af37]/30 pl-6 py-3 flex items-center gap-3">
                <Logo className="w-5 h-5 animate-pulse opacity-70" />
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-xl bg-red-900/10 border border-red-900/30 text-red-300 text-xs text-center mx-auto max-w-sm mt-6 shadow-lg backdrop-blur-md"
            >
              <p>La connexion avec l&apos;Oracle a été interrompue.</p>
              <button
                onClick={() => reload()}
                className="mt-3 px-4 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-800/50 rounded-lg text-red-200 transition-colors uppercase tracking-wider font-bold text-[10px]"
              >
                Tenter une reconnexion
              </button>
            </motion.div>
          )}

          {/* NOUVEAU : Ancre invisible pour le Smart Auto-scroll */}
          <div ref={messagesEndRef} className="h-px w-full" />
        </div>
      </main>

      {/* FOOTER & INPUT SOUVERAIN */}
      <footer className="flex-none p-4 pb-6 w-full max-w-3xl mx-auto z-20">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative flex items-end gap-2 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-1.5 transition-all focus-within:border-[#d4af37]/40 focus-within:ring-1 focus-within:ring-[#d4af37]/20"
        >
          <div className="relative flex-grow flex items-center">
            <TextareaAutosize
              className="w-full bg-transparent text-white text-[0.95rem] block py-3.5 pl-4 pr-14 resize-none focus:outline-none custom-scrollbar placeholder:text-gray-600"
              minRows={1}
              maxRows={6}
              placeholder="Quelle sagesse cherchez-vous ?"
              value={input || ""}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input?.trim()}
              className="absolute right-2 p-2.5 bg-[#d4af37] hover:bg-[#fceeb5] disabled:bg-[#1a1a1a] disabled:text-gray-600 text-black rounded-xl transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] disabled:shadow-none active:scale-95"
              aria-label="Interroger l'Oracle"
            >
              <Send
                size={18}
                className={`transition-opacity ${isLoading ? "opacity-0" : "opacity-100"}`}
              />
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500/70 text-[10px] mt-4 font-medium tracking-wide">
          L&apos;IA peut omettre des nuances. La vérité absolue réside toujours
          chez les initiés et les gardiens du culte.
        </p>
      </footer>
    </div>
  );
}

export default function ChatClient({
  existingChatId,
}: {
  existingChatId?: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center text-[#d4af37] bg-[#020202]">
          <Logo className="w-8 h-8 animate-pulse mr-3" />
          <span className="font-serif tracking-widest text-sm uppercase">
            Réveil de l&apos;Oracle...
          </span>
        </div>
      }
    >
      <ChatContent existingChatId={existingChatId} />
    </Suspense>
  );
}
