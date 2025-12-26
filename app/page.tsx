"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import Link from "next/link"; // <--- Import indispensable pour la navigation

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
    <div className="flex flex-col h-screen bg-[#fdfbf7] text-gray-800 font-sans">
      {/* --- HEADER AVEC NAVIGATION --- */}
      <header className="flex-none p-4 bg-white border-b border-yellow-600/20 shadow-sm flex items-center justify-between z-10">
        {/* Logo & Titre */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center text-white font-bold text-lg shadow-md">
            M
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900 leading-tight">
              Mindoguesito
            </h1>
            <p className="text-xs text-yellow-700 font-medium tracking-wide uppercase">
              Gardien des Savoirs
            </p>
          </div>
        </div>

        {/* --- NOUVEAU MENU DE NAVIGATION --- */}
        <nav className="flex gap-4 text-sm font-medium">
          <Link
            href="/journal"
            className="text-gray-600 hover:text-yellow-700 transition-colors"
          >
            Journal
          </Link>
          <Link
            href="/a-propos"
            className="text-gray-600 hover:text-yellow-700 transition-colors"
          >
            À Propos
          </Link>
        </nav>
      </header>

      {/* ZONE DE CHAT */}
      <main className="flex-grow overflow-y-auto p-4 space-y-6 scroll-smooth">
        {/* Message d'accueil */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-60 mt-10">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-4xl">
              🐍
            </div>
            <p className="text-lg font-serif italic text-gray-600 max-w-md">
              &quot;Kwabo. Je suis l&apos;esprit de la mémoire. Pose-moi une
              question sur l&apos;histoire ou les rites.&quot;
            </p>
          </div>
        )}

        {/* Messages */}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex w-full ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-3 shadow-sm leading-relaxed ${
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
              <span className="animate-pulse text-2xl text-yellow-600">
                ...
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
            Le lien avec les esprits est instable. Réessayez.
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* INPUT */}
      <div className="flex-none p-4 bg-white border-t border-gray-100">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto relative flex items-center gap-2"
        >
          <input
            className="flex-grow bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-yellow-500 focus:border-yellow-500 block w-full p-4 pl-5 shadow-sm outline-none transition-all"
            value={input}
            onChange={handleInputChange}
            placeholder="Interrogez les ancêtres..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 bg-yellow-700 hover:bg-yellow-800 text-white p-2.5 rounded-full transition-colors disabled:opacity-50"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}
