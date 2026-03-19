import { NextRequest, NextResponse } from "next/server";
import { getSystemPromptForMode, type ProChatMode } from "@/lib/icqGrokConfig";

type ChatMsg = { role: string; content: string };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = (body.messages || []) as ChatMsg[];
    const mode = (body.mode || "intermediate") as ProChatMode;

    const system = getSystemPromptForMode(
      mode === "simple" || mode === "intermediate" || mode === "advanced" ? mode : "intermediate"
    );

    const key = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
    const model = process.env.GROK_MODEL || "grok-2-latest";

    if (!key) {
      const last = messages.filter((m) => m.role === "user").pop()?.content || "";
      return NextResponse.json({
        reply: `[Apex Pro — démo sans clé API]\nMode: **${mode}**. Ta question : « ${last.slice(0, 200)}${last.length > 200 ? "…" : ""} »\n\nPour activer **Grok** en live, ajoute \`XAI_API_KEY\` (ou \`GROK_API_KEY\`) sur Vercel / ton serveur. Le prompt système Pro est déjà appliqué par mode (Simple / Intermediate / Advanced).`,
      });
    }

    const apiMessages = [
      { role: "system", content: system },
      ...messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content })),
    ];

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        messages: apiMessages,
        temperature: mode === "simple" ? 0.5 : mode === "advanced" ? 0.35 : 0.55,
        max_tokens: mode === "simple" ? 256 : 1024,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { reply: `API xAI error ${res.status}. ${errText.slice(0, 200)}` },
        { status: 200 }
      );
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content?.trim() || "Empty response.";
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Server error" },
      { status: 500 }
    );
  }
}
