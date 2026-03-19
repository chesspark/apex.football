"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ICQFlowerLogo } from "./ICQFlowerLogo";
import { getSystemPromptForMode, MODE_LABELS, type ProChatMode } from "@/lib/icqGrokConfig";
import { instituteStatsSummary } from "@/lib/instituteStats";
import { X, Send, ChevronDown, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export default function PortalProChat() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ProChatMode>("intermediate");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Apex Pro Chat — modes Simple / Intermediate / Advanced (style ICQ). Pose ta question football. Configure XAI_API_KEY sur le serveur pour Grok live.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          mode,
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.reply || data.error || "Pas de réponse.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Erreur réseau. Réessaie plus tard." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, mode]);

  const systemPreview = getSystemPromptForMode(mode);
  const advancedHint = mode === "advanced" ? instituteStatsSummary() : "";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 rounded-full bg-[#2E7D32] text-white pl-3 pr-4 py-3 shadow-2xl border-2 border-[#FFEB3B] hover:scale-105 transition-transform"
        aria-label="Open Apex Pro Chat"
      >
        <ICQFlowerLogo size={26} />
        <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">Pro Chat</span>
        <Sparkles className="w-4 h-4 text-[#FFEB3B]" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Apex Pro Chat"
        >
          <div className="w-full sm:max-w-md h-[min(560px,85vh)] sm:h-[520px] bg-[#102015] border border-[#FFEB3B]/40 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
            {/* Barre type ICQ / messagerie */}
            <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] border-b border-[#FFEB3B]/30">
              <div className="flex items-center gap-2 min-w-0">
                <ICQFlowerLogo size={24} />
                <div className="min-w-0">
                  <p className="text-xs font-black truncate">Apex Pro · Grok mode</p>
                  <p className="text-[10px] text-[#C8E6C9] truncate">{MODE_LABELS[mode].icqHint}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode ICQ-like */}
            <div className="px-3 py-2 flex flex-wrap gap-1 border-b border-white/10 bg-black/20">
              {(["simple", "intermediate", "advanced"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                    mode === m ? "bg-[#FFEB3B] text-black" : "bg-white/10 text-[#C8E6C9] hover:bg-white/15"
                  }`}
                >
                  {MODE_LABELS[m].label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowPrompt((s) => !s)}
              className="flex items-center justify-between px-3 py-1.5 text-[10px] text-[#FFEB3B]/90 hover:bg-white/5"
            >
              <span className="uppercase tracking-wider">System prompt (Pro)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showPrompt ? "rotate-180" : ""}`} />
            </button>
            {showPrompt && (
              <div className="px-3 pb-2 max-h-28 overflow-y-auto text-[9px] leading-snug text-[#A5D6A7] font-mono border-b border-white/10">
                {systemPreview.slice(0, 1200)}
                {mode === "advanced" && (
                  <p className="mt-2 text-[#FFEB3B]">{advancedHint}</p>
                )}
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg px-2.5 py-1.5 text-sm ${
                    msg.role === "user"
                      ? "bg-[#FFEB3B]/20 ml-6 text-right"
                      : "bg-white/10 mr-6 text-left"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {loading && <p className="text-xs text-[#FFEB3B] animate-pulse">…</p>}
              <div ref={endRef} />
            </div>

            <div className="p-2 border-t border-white/10 flex gap-2 bg-black/30">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
                placeholder="Message…"
                className="flex-1 rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#FFEB3B]"
              />
              <button
                type="button"
                onClick={send}
                disabled={loading}
                className="rounded-lg bg-[#FFEB3B] text-black p-2 hover:brightness-110 disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
