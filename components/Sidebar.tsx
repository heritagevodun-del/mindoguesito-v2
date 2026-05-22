"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PlusCircle,
  MessageSquare,
  Menu,
  LogOut,
  Loader2,
  BookOpen,
  Layers,
  X,
  Trash2,
  Edit2,
  Pin,
  Check,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

type Chat = {
  id: string;
  title: string;
  pinned?: boolean;
};

const MAIN_MENU = [
  { name: "Le Journal", href: "/journal", icon: BookOpen },
  { name: "Fonctionnalités", href: "/fonctionnalites", icon: Layers },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const loadChats = useCallback(async () => {
    if (status === "authenticated") {
      setIsLoadingChats(true);
      try {
        const res = await fetch("/api/chats");
        const data = await res.json();
        if (Array.isArray(data)) setChats(data);
      } catch (err) {
        console.error("Erreur historique:", err);
      } finally {
        setIsLoadingChats(false);
      }
    } else if (status === "unauthenticated") {
      // Contournement du cascading render si l'utilisateur est déconnecté
      setChats([]);
    }
  }, [status]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadChats();
    window.addEventListener("refresh-chats", loadChats);
    return () => window.removeEventListener("refresh-chats", loadChats);
  }, [loadChats]);

  const deleteChat = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Effacer cette consultation du registre ?")) return;

    await fetch(`/api/chats/${id}`, { method: "DELETE" });
    setChats(chats.filter((c) => c.id !== id));
  };

  const renameChat = async (id: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    await fetch(`/api/chats/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title: editTitle }),
    });

    setChats(chats.map((c) => (c.id === id ? { ...c, title: editTitle } : c)));
    setEditingId(null);
  };

  const togglePin = async (chat: Chat, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newPinned = !chat.pinned;

    await fetch(`/api/chats/${chat.id}`, {
      method: "PATCH",
      body: JSON.stringify({ pinned: newPinned }),
    });

    setChats(
      chats.map((c) => (c.id === chat.id ? { ...c, pinned: newPinned } : c)),
    );
  };

  return (
    <>
      {/* BOUTON MOBILE (OUVERTURE) */}
      {!isOpen && (
        <button
          className="md:hidden fixed top-3.5 left-4 z-40 p-2 text-[#d4af37] bg-[#0a0a0a]/80 backdrop-blur-md hover:bg-[#1a1a1a] rounded-lg border border-white/5 transition-colors active:scale-95 shadow-lg"
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir le menu"
          title="Ouvrir le menu"
        >
          <Menu size={20} />
        </button>
      )}

      {/* OVERLAY SOMBRE POUR MOBILE */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* CONTENEUR PRINCIPAL DE LA SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#050505] border-r border-white/5 shadow-[5px_0_30px_rgba(0,0,0,0.5)] transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:shadow-none`}
      >
        {/* HEADER SIDEBAR (LOGO) */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5 bg-[#020202]">
          <Link
            href="/"
            className="font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#fceeb5] tracking-widest uppercase text-sm"
          >
            MINDOGUESITO
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Fermer le menu"
            title="Fermer le menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* NOUVELLE CONSULTATION */}
        <div className="p-4">
          <button
            onClick={() => {
              setIsOpen(false);
              window.location.href = "/";
            }}
            className="flex items-center gap-3 w-full px-4 py-3 bg-[#0a0a0a] border border-[#d4af37]/20 text-white rounded-xl hover:bg-[#111111] hover:border-[#d4af37]/40 transition-all shadow-sm group"
          >
            <PlusCircle
              size={18}
              className="text-[#d4af37] group-hover:scale-110 transition-transform"
            />
            <span className="text-sm font-medium tracking-wide">
              Nouvelle consultation
            </span>
          </button>
        </div>

        {/* MENU LE SANCTUAIRE */}
        <div className="px-3 py-2 space-y-1 border-b border-white/5 pb-4">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 px-2">
            Le Sanctuaire
          </p>
          {MAIN_MENU.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 font-medium shadow-inner"
                    : "text-gray-400 hover:bg-[#0a0a0a] hover:text-white border border-transparent"
                }`}
              >
                <item.icon
                  size={18}
                  className={isActive ? "text-[#d4af37]" : "text-gray-500"}
                />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* HISTORIQUE DES CONSULTATIONS */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4 custom-scrollbar">
          {status === "unauthenticated" && (
            <div className="mt-4 px-3 py-4 bg-[#0a0a0a] border border-white/5 rounded-xl text-center">
              <p className="text-xs text-gray-500 italic">
                Connectez-vous pour conserver l&apos;historique de vos échanges
                avec l&apos;Oracle.
              </p>
            </div>
          )}

          {isLoadingChats && (
            <div className="flex justify-center py-6">
              <Loader2
                size={24}
                className="text-[#d4af37] animate-spin opacity-70"
              />
            </div>
          )}

          {!isLoadingChats && chats.some((c) => c.pinned) && (
            <div>
              <p className="text-[10px] font-bold text-[#d4af37]/70 uppercase tracking-[0.2em] mb-2 px-2 mt-2">
                Épinglés
              </p>
              {chats
                .filter((c) => c.pinned)
                .map((chat) => renderChatItem(chat))}
            </div>
          )}

          {!isLoadingChats && chats.some((c) => !c.pinned) && (
            <div className="mt-4">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 px-2">
                Récents
              </p>
              {chats
                .filter((c) => !c.pinned)
                .map((chat) => renderChatItem(chat))}
            </div>
          )}
        </div>

        {/* FOOTER USER / AUTH */}
        <div className="p-4 border-t border-white/5 bg-[#020202]">
          {session ? (
            <div className="flex items-center justify-between p-2.5 bg-[#0a0a0a] rounded-xl border border-white/5 shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={session.user?.image || ""}
                  className="w-8 h-8 rounded-full border border-white/10"
                  alt="Profil"
                />
                <span className="text-xs text-gray-300 truncate font-medium">
                  {session.user?.name}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="text-gray-500 hover:text-red-400 p-1.5 hover:bg-red-500/10 rounded-lg transition-colors"
                aria-label="Se déconnecter"
                title="Se déconnecter"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="w-full py-2.5 bg-gradient-to-r from-[#d4af37] to-[#fceeb5] hover:opacity-90 text-black rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all"
            >
              Initier la connexion
            </button>
          )}
        </div>
      </div>
    </>
  );

  function renderChatItem(chat: Chat) {
    const isActive = pathname === `/c/${chat.id}`;

    return (
      <div key={chat.id} className="group relative mb-1">
        {editingId === chat.id ? (
          <form
            onSubmit={(e) => renameChat(chat.id, e)}
            className="flex items-center gap-2 px-3 py-2 bg-[#111111] rounded-lg border border-[#d4af37]/40 shadow-inner"
          >
            <input
              autoFocus
              className="bg-transparent text-sm text-white outline-none w-full placeholder:text-gray-600"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={() => setEditingId(null)}
              aria-label="Nouveau titre de la discussion"
              placeholder="Nouveau titre..."
            />
            <button
              type="submit"
              aria-label="Valider le titre"
              title="Valider"
              className="p-1 hover:bg-white/5 rounded"
            >
              <Check size={14} className="text-[#d4af37]" />
            </button>
          </form>
        ) : (
          <Link
            href={`/c/${chat.id}`}
            className={`flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-all ${
              isActive
                ? "bg-[#111111] text-white border border-white/5 shadow-sm"
                : "text-gray-400 hover:bg-[#0a0a0a] hover:text-gray-200 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-3 truncate pr-8">
              <MessageSquare
                size={16}
                className={isActive ? "text-[#d4af37]" : "text-gray-600"}
              />
              <span className="truncate">{chat.title}</span>
            </div>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-0.5 bg-gradient-to-l from-[#050505] via-[#050505] to-transparent pl-4">
              <button
                onClick={(e) => togglePin(chat, e)}
                className="p-1.5 hover:bg-white/5 rounded-md hover:text-[#d4af37] transition-colors"
                aria-label="Épingler"
                title="Épingler"
              >
                <Pin
                  size={14}
                  className={
                    chat.pinned
                      ? "fill-[#d4af37] text-[#d4af37]"
                      : "text-gray-500"
                  }
                />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setEditingId(chat.id);
                  setEditTitle(chat.title);
                }}
                className="p-1.5 hover:bg-white/5 rounded-md text-gray-500 hover:text-[#00F3FF] transition-colors"
                aria-label="Renommer"
                title="Renommer"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={(e) => deleteChat(chat.id, e)}
                className="p-1.5 hover:bg-red-500/10 rounded-md text-gray-500 hover:text-red-400 transition-colors"
                aria-label="Supprimer"
                title="Supprimer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </Link>
        )}
      </div>
    );
  }
}
