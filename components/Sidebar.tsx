"use client";

import Link from "next/link";
import {
  PlusCircle,
  MessageSquare,
  Menu,
  LogOut,
  LogIn,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

type Chat = {
  id: string;
  title: string;
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoadingChats, setIsLoadingChats] = useState(false);

  // Le "cerveau" de la Sidebar
  useEffect(() => {
    let isMounted = true;

    // On isole la fonction de chargement pour pouvoir l'appeler à volonté
    const loadChats = async () => {
      if (status === "authenticated") {
        if (isMounted) setIsLoadingChats(true);
        try {
          const res = await fetch("/api/chats");
          const data = await res.json();
          if (isMounted && Array.isArray(data)) {
            setChats(data);
          }
        } catch (err) {
          console.error("Erreur de lecture du Fâ :", err);
        } finally {
          if (isMounted) setIsLoadingChats(false);
        }
      } else if (status === "unauthenticated") {
        if (isMounted) setChats([]);
      }
    };

    // 1. Chargement initial quand le statut change
    loadChats();

    // 2. L'ÉCOUTEUR D'ÉVÉNEMENT (Le récepteur de signal)
    const handleRefresh = () => {
      if (isMounted) loadChats();
    };
    window.addEventListener("refresh-chats", handleRefresh);

    return () => {
      isMounted = false;
      window.removeEventListener("refresh-chats", handleRefresh); // Nettoyage
    };
  }, [status]);

  // Fonction pour forcer le nettoyage de l'écran principal
  const handleNewChat = () => {
    setIsOpen(false);
    window.location.href = "/"; // Force le rechargement complet de la page
  };

  return (
    <>
      {/* Bouton Menu pour Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#121212] text-white rounded-md border border-gray-800 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ouvrir le menu"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar (Barre latérale) */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#050505] border-r border-gray-800 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-center border-b border-gray-800">
          <h1 className="text-[#d4af37] font-serif text-xl font-bold tracking-wider uppercase">
            Mindoguesito
          </h1>
        </div>

        {/* Bouton Nouvelle Consultation (Corrigé !) */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 w-full px-4 py-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#d4af37]/30 text-white rounded-lg transition-colors duration-200 shadow-sm"
          >
            <PlusCircle size={20} className="text-[#d4af37]" />
            <span className="font-medium text-sm">Nouvelle consultation</span>
          </button>
        </div>

        {/* Historique des Chats */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 custom-scrollbar">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2 mt-2">
            Historique du Fâ
          </p>

          {status === "unauthenticated" && (
            <p className="text-xs text-gray-600 px-2 italic">
              Connectez-vous pour voir vos archives.
            </p>
          )}

          {isLoadingChats && (
            <div className="flex items-center justify-center py-4">
              <Loader2 size={20} className="text-[#d4af37] animate-spin" />
            </div>
          )}

          {status === "authenticated" &&
            !isLoadingChats &&
            chats.length === 0 && (
              <p className="text-xs text-gray-600 px-2 italic">
                Le registre est vierge.
              </p>
            )}

          {!isLoadingChats &&
            chats.map((chat) => (
              <Link
                key={chat.id}
                href={`/c/${chat.id}`}
                className="flex items-center gap-3 px-3 py-3 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white rounded-lg transition-colors truncate"
                onClick={() => setIsOpen(false)}
              >
                <MessageSquare size={16} className="text-gray-500 shrink-0" />
                <span className="truncate">{chat.title}</span>
              </Link>
            ))}
        </div>

        {/* Footer Sidebar (Système d'Authentification) */}
        <div className="p-4 border-t border-gray-800">
          {status === "loading" ? (
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse"></div>
              <div className="h-4 bg-gray-800 rounded w-24 animate-pulse"></div>
            </div>
          ) : session ? (
            <div className="flex items-center justify-between w-full px-2 py-2 bg-white/5 rounded-lg border border-white/5">
              <div className="flex items-center gap-3 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={session.user?.image || "/logo.png"}
                  alt="Profil"
                  className="w-8 h-8 rounded-full border border-gray-700"
                  referrerPolicy="no-referrer"
                />
                <span className="text-sm text-gray-200 truncate font-medium">
                  {session.user?.name}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="p-1.5 text-gray-500 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10"
                title="Se déconnecter"
                aria-label="Se déconnecter"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
            >
              <LogIn size={18} />
              Se connecter
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
