"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-[#fdfbf7] text-gray-800 font-sans">
      {/* --- HEADER (MODIFIÉ : ESPACE DE SÉCURITÉ EN HAUT) --- */}
      {/* CHANGEMENT : 
          - pt-8 (Padding Top) : On pousse le contenu vers le bas pour éviter la barre d'adresse/encoche.
          - pb-4 (Padding Bottom) : On garde un espace propre sous le texte.
      */}
      <header className="flex-none px-4 pt-8 pb-4 bg-white border-b border-yellow-600/20 shadow-sm flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center text-white font-bold text-base shadow-md">
            M
          </div>
          <div>
            <h1 className="font-bold text-base text-gray-900 leading-tight">
              Mindoguesito
            </h1>
            <p className="text-[10px] text-yellow-700 font-medium tracking-wide uppercase">
              Gardien des Savoirs
            </p>
          </div>
        </div>

        <nav className="flex gap-3 text-xs font-medium">
          <Link
            href="/journal"
            className="text-gray-600 hover:text-yellow-700 transition-colors py-1 px-2 rounded-md hover:bg-yellow-50"
          >
            Journal
          </Link>
          <Link
            href="/a-propos"
            className="text-gray-600 hover:text-yellow-700 transition-colors py-1 px-2 rounded-md hover:bg-yellow-50"
          >
            À Propos
          </Link>
        </nav>
      </header>

      {/* --- ZONE DE CHAT --- */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth w-full max-w-4xl mx-auto">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-60 px-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-3xl shadow-inner">
              🐍
            </div>
            <p className="text-base font-serif italic text-gray-600 max-w-xs">
              &quot;Kwabo. Je suis l&apos;esprit de la mémoire. Pose-moi une
              question sur l&apos;histoire ou les rites.&quot;
            </p>
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
              className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm leading-relaxed text-sm md:text-base ${
                m.role === "user"
                  ? "bg-gray-800 text-white rounded-br-none"
                  : "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
              <span className="animate-pulse text-xl text-yellow-600">...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs text-center mx-auto max-w-sm">
            Le lien avec les esprits est instable. Réessayez.
          </div>
        )}

        <div ref={messagesEndRef} className="h-2" />
      </main>

      {/* --- INPUT AREA (POSITION HAUTE ERGONOMIQUE) --- */}
      <div className="flex-none px-4 pt-4 pb-24 bg-white border-t border-gray-100 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] z-20">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto relative flex items-center gap-2"
        >
          <input
            className="flex-grow bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-2xl focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full py-3.5 pl-4 pr-12 shadow-sm outline-none transition-all placeholder-gray-400"
            value={input}
            onChange={handleInputChange}
            placeholder="Interrogez les ancêtres..."
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-yellow-700 hover:bg-yellow-800 disabled:bg-gray-300 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm"
          >
            <span className="text-sm mb-0.5">➤</span>
          </button>
        </form>
      </div>
    </div>
  );
}
