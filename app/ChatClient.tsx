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
    onError: (err) => console.error("Erreur Chat:", err),
  });

  const scrollContainerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(
    null,
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (existingChatId) {
      fetch(`/api/chats/${existingChatId}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMessages(data);
          }
        })
        .catch((err) => console.error("Erreur chargement archive:", err));
    }
  }, [existingChatId, setMessages]);

  const hasInitialized = useRef(false);

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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage || error) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages, error]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isSpeaking) window.speechSynthesis.cancel();
      if (input?.trim()) formRef.current?.requestSubmit();
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-transparent text-gray-100 font-sans selection:bg-[#d4af37]/30 selection:text-white">
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-[#2a1b3d]/20 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vh] h-[40vh] bg-[#d4af37]/5 blur-[80px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      </div>

      {/* --- CORRECTION HEADER ICI : padding gauche pl-[4.5rem] pour laisser la place au bouton --- */}
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
            <span className="hidden sm:inline">À Propos</span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isAboutOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4"
              onClick={() => setIsAboutOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed z-[70] w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#0a0a0a] border border-[#d4af37]/20 rounded-2xl shadow-2xl custom-scrollbar"
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
                    solennité de la tradition.
                  </p>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-4 w-full max-w-4xl mx-auto z-10 custom-scrollbar"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="relative mb-6 group">
              <div className="absolute inset-0 bg-[#d4af37]/20 blur-2xl rounded-full opacity-50 animate-pulse-slow"></div>
              <Logo className="w-24 h-24 drop-shadow-2xl relative z-10" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#fceeb5]">
                Kwabo
              </span>
              , Initié.
            </h2>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed mb-8">
              Je suis la mémoire vivante du Bénin. Interroge-moi sur le Vodun,
              notre culture, notre histoire et nos traditions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => append({ role: "user", content: sug })}
                  className="px-4 py-3 bg-[#121212] border border-white/5 hover:border-[#d4af37]/30 hover:bg-[#1a1a1a] rounded-xl text-sm text-gray-300 hover:text-[#d4af37] transition-all duration-200 text-left flex items-center gap-3 shadow-sm group"
                >
                  <MessageSquare
                    size={16}
                    className="text-gray-500 group-hover:text-[#d4af37]"
                  />{" "}
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6 pb-6 mt-4">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[90%] md:max-w-[80%] rounded-2xl px-5 py-4 shadow-md text-sm md:text-[0.95rem] leading-relaxed ${m.role === "user" ? "bg-[#2a2a2a] text-white font-medium rounded-tr-sm" : "bg-transparent text-gray-100 prose-ai"}`}
              >
                {m.role !== "user" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Logo className="w-5 h-5" />
                    <span className="text-xs font-serif font-bold text-[#d4af37]">
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
                        className="text-[#d4af37] underline decoration-dotted hover:text-white transition-colors"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {m.content}
                </ReactMarkdown>
                {m.role !== "user" && !isLoading && (
                  <div className="mt-3 pt-2 flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => speakMessage(m.content, m.id)}
                      className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-400 hover:text-[#d4af37] transition-colors"
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
                          <Volume2 size={14} /> Écouter
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
              <div className="bg-transparent px-5 py-3 flex items-center gap-2">
                <Logo className="w-5 h-5 animate-pulse" />
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 rounded-xl bg-red-900/20 border border-red-800/50 text-red-200 text-xs text-center mx-auto max-w-sm mt-4"
            >
              <p>La connexion avec l&apos;Oracle a été interrompue.</p>
              <button
                onClick={() => reload()}
                className="mt-2 px-3 py-1.5 bg-red-900/40 hover:bg-red-800/60 rounded-lg text-red-100 transition-colors"
              >
                Réessayer
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="flex-none p-4 w-full max-w-4xl mx-auto z-20">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative flex items-end gap-2 bg-[#121212] border border-white/10 rounded-2xl shadow-lg p-1 transition-all focus-within:border-[#d4af37]/50 focus-within:ring-1 focus-within:ring-[#d4af37]/50"
        >
          <div className="relative flex-grow flex items-center">
            <TextareaAutosize
              className="w-full bg-transparent text-white text-sm block py-3 pl-4 pr-12 resize-none focus:outline-none custom-scrollbar"
              minRows={1}
              maxRows={5}
              placeholder="Interrogez l'Oracle..."
              value={input || ""}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input?.trim()}
              className="absolute right-2 p-2 bg-[#d4af37] hover:bg-[#fceeb5] disabled:bg-[#2a2a2a] disabled:text-gray-500 text-black rounded-xl transition-all shadow-sm active:scale-95"
              aria-label="Envoyer"
            >
              <Send
                size={18}
                className={isLoading ? "opacity-0" : "opacity-100"}
              />
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-[10px] mt-3 font-medium">
          L&apos;IA peut faire des erreurs. Consultez les gardiens de la
          tradition pour les certitudes.
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
        <div className="flex h-full w-full items-center justify-center text-[#d4af37]">
          <Logo className="w-8 h-8 animate-pulse mr-3" />
          Chargement de l&apos;Oracle...
        </div>
      }
    >
      <ChatContent existingChatId={existingChatId} />
    </Suspense>
  );
}
