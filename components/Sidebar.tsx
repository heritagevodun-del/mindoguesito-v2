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

  // CORRECTION USEEFFECT : useCallback pour stabiliser la fonction
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
      setChats([]);
    }
  }, [status]);

  useEffect(() => {
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
      {!isOpen && (
        <button
          className="md:hidden fixed top-3.5 left-4 z-40 p-2 text-[#d4af37] hover:bg-white/5 rounded-full transition-colors active:scale-95"
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir le menu"
          title="Ouvrir le menu"
        >
          <Menu size={24} />
        </button>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#050505] border-r border-gray-800 transform transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-800">
          <Link
            href="/"
            className="font-serif font-bold text-[#d4af37] tracking-wider uppercase"
          >
            Mindoguesito
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/5"
            aria-label="Fermer le menu"
            title="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={() => {
              setIsOpen(false);
              window.location.href = "/";
            }}
            className="flex items-center gap-2 w-full px-4 py-3 bg-[#1a1a1a] border border-[#d4af37]/20 text-white rounded-xl hover:bg-[#222]"
          >
            <PlusCircle size={18} className="text-[#d4af37]" />
            <span className="text-sm font-medium">Nouvelle consultation</span>
          </button>
        </div>

        <div className="px-3 py-2 space-y-1 border-b border-gray-800/50 pb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
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
                    ? "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 font-medium"
                    : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white border border-transparent"
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

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4 custom-scrollbar">
          {status === "unauthenticated" && (
            <p className="text-xs text-gray-600 px-2 italic mt-2">
              Connectez-vous pour voir vos archives.
            </p>
          )}

          {/* CORRECTION UTILISATION LOADER */}
          {isLoadingChats && (
            <div className="flex justify-center py-4">
              <Loader2 size={20} className="text-[#d4af37] animate-spin" />
            </div>
          )}

          {!isLoadingChats && chats.some((c) => c.pinned) && (
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 px-2 mt-2">
                Épinglés
              </p>
              {chats
                .filter((c) => c.pinned)
                .map((chat) => renderChatItem(chat))}
            </div>
          )}

          {!isLoadingChats && chats.some((c) => !c.pinned) && (
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 px-2 mt-2">
                Récents
              </p>
              {chats
                .filter((c) => !c.pinned)
                .map((chat) => renderChatItem(chat))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-800 bg-[#080808]">
          {session ? (
            <div className="flex items-center justify-between p-2 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={session.user?.image || ""}
                  className="w-8 h-8 rounded-full"
                  alt="Profil"
                />
                <span className="text-xs text-gray-200 truncate font-medium">
                  {session.user?.name}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="text-gray-500 hover:text-red-400 p-1"
                aria-label="Se déconnecter"
                title="Se déconnecter"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="w-full py-2 bg-white text-black rounded-lg text-sm font-bold"
            >
              Connexion
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
            className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] rounded-lg border border-[#d4af37]/40"
          >
            <input
              autoFocus
              className="bg-transparent text-sm text-white outline-none w-full"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={() => setEditingId(null)}
              aria-label="Nouveau titre de la discussion"
              placeholder="Nouveau titre..."
            />
            <button type="submit" aria-label="Valider le titre" title="Valider">
              <Check size={14} className="text-green-500" />
            </button>
          </form>
        ) : (
          <Link
            href={`/c/${chat.id}`}
            className={`flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-all ${isActive ? "bg-[#1a1a1a] text-white border border-gray-800" : "text-gray-400 hover:bg-[#111] hover:text-gray-200"}`}
          >
            <div className="flex items-center gap-3 truncate pr-8">
              <MessageSquare
                size={16}
                className={isActive ? "text-[#d4af37]" : "text-gray-600"}
              />
              <span className="truncate">{chat.title}</span>
            </div>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1 bg-gradient-to-l from-[#111] via-[#111] to-transparent pl-4">
              <button
                onClick={(e) => togglePin(chat, e)}
                className="p-1 hover:text-[#d4af37] transition-colors"
                aria-label="Épingler"
                title="Épingler"
              >
                <Pin
                  size={14}
                  className={chat.pinned ? "fill-[#d4af37] text-[#d4af37]" : ""}
                />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setEditingId(chat.id);
                  setEditTitle(chat.title);
                }}
                className="p-1 hover:text-blue-400"
                aria-label="Renommer"
                title="Renommer"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={(e) => deleteChat(chat.id, e)}
                className="p-1 hover:text-red-500"
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
