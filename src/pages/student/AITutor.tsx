import { useState, useRef, useEffect } from "react";
import { Card, PageHeader, Button } from "../../components/ui";
import { tutorRespond } from "../../lib/aiSimulator";
import type { ChatMessage } from "../../types";
import { Send, GraduationCap } from "lucide-react";

const SUGGESTIONS = [
  "Explain the present perfect tense",
  "What's the difference between a/an and the?",
  "Help me with my grammar homework",
  "Explain second conditional",
];

export default function AITutor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-0",
      from: "ai",
      text: "Hi! I'm your AI tutor. Ask me about grammar, vocabulary, or a topic from your course — I can explain rules, give examples, or build a quick practice exercise.",
      time: "now",
    },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const send = (text?: string) => {
    const value = text ?? input;
    if (!value.trim()) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, from: "user", text: value, time: "now" };
    const reply = tutorRespond(value);
    setMessages((prev) => [...prev, userMsg, { id: `a-${Date.now()}`, from: "ai", text: reply, time: "now" }]);
    setInput("");
  };

  return (
    <div>
      <PageHeader
        eyebrow="Personal support"
        title="AI Tutor"
        description="Your on-demand grammar and homework helper — explains rules, gives examples, and builds practice exercises."
      />

      <Card className="p-6 flex flex-col h-[560px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  m.from === "user"
                    ? "bg-[var(--color-ink)] text-white"
                    : "bg-[var(--color-paper)] border border-[var(--color-line)]"
                }`}
              >
                {m.from === "ai" && (
                  <div className="text-[10px] font-mono uppercase text-[var(--color-red)] mb-1 flex items-center gap-1">
                    <GraduationCap size={11} /> AI Tutor
                  </div>
                )}
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="flex gap-2 flex-wrap py-3 border-t border-[var(--color-line)]">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-xs px-3 py-1.5 rounded-full bg-[var(--color-line)] text-[var(--color-slate)] hover:bg-[var(--color-slate-soft)]/30"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask a grammar question..."
            rows={2}
            className="flex-1 border border-[var(--color-line)] rounded-lg px-3 py-2 text-sm resize-none"
          />
          <Button onClick={() => send()} disabled={!input.trim()}>
            <Send size={15} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
