import { useState, useRef, useEffect } from "react";
import { Card, Pill, Button, PageHeader } from "../../components/ui";
import { analyzeSpeakingTurn, speakingPrompterReply, type SpeakingReport } from "../../lib/aiSimulator";
import type { ChatMessage } from "../../types";
import { Mic, Send, Gauge } from "lucide-react";

const OPENER = "Let's practise IELTS Speaking Part 2. Tell me about a place you like to visit in your free time — where is it, and why do you like going there?";

export default function AISpeaking() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "m-0", from: "ai", text: OPENER, time: "now" },
  ]);
  const [input, setInput] = useState("");
  const [report, setReport] = useState<SpeakingReport | null>(null);
  const [turns, setTurns] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, from: "user", text: input, time: "now" };
    const analysis = analyzeSpeakingTurn(input);
    setReport(analysis);
    const reply = speakingPrompterReply(turns);
    setTurns((t) => t + 1);
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: `a-${Date.now()}`, from: "ai", text: reply, time: "now" },
    ]);
    setInput("");
  };

  return (
    <div>
      <PageHeader
        eyebrow="Speaking practice"
        title="AI Speaking Partner"
        description="Type your answer as you would say it aloud. Explore sample examiner prompts and simulated feedback on your written response."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2 flex flex-col h-[560px]">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "bg-[var(--color-ink)] text-white"
                      : "bg-[var(--color-paper)] text-[var(--color-ink)] border border-[var(--color-line)]"
                  }`}
                >
                  {m.from === "ai" && (
                    <div className="text-[10px] font-mono uppercase text-[var(--color-red)] mb-1">AI Examiner</div>
                  )}
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="pt-4 border-t border-[var(--color-line)] flex gap-2 items-end">
            <Mic size={18} className="text-[var(--color-slate)] mb-2.5 shrink-0" />
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Type your spoken answer..."
              rows={2}
              className="flex-1 border border-[var(--color-line)] rounded-lg px-3 py-2 text-sm resize-none"
            />
            <Button onClick={send} disabled={!input.trim()}>
              <Send size={15} />
            </Button>
          </div>
        </Card>

        <Card className="p-6 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Gauge size={17} className="text-[var(--color-red)]" />
            <h3 className="font-[family-name:var(--font-display)] text-lg">Live scoring</h3>
          </div>
          {!report ? (
            <p className="text-sm text-[var(--color-slate)]">Answer the question to see your fluency and pronunciation scores.</p>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-[var(--color-slate)] mb-1">
                  <span>Fluency</span>
                  <span>{report.fluencyScore}/100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--color-line)]">
                  <div className="h-full rounded-full bg-[var(--color-red)]" style={{ width: `${report.fluencyScore}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-[var(--color-slate)] mb-1">
                  <span>Pronunciation</span>
                  <span>{report.pronunciationScore}/100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--color-line)]">
                  <div className="h-full rounded-full bg-[var(--color-gold)]" style={{ width: `${report.pronunciationScore}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Pill tone="green">Overall {report.overall}/100</Pill>
                <Pill tone="neutral">{report.level}</Pill>
              </div>
              <div className="pt-2 border-t border-[var(--color-line)]">
                <div className="text-xs font-mono uppercase text-[var(--color-slate)] mb-2">Tips</div>
                <ul className="space-y-1.5 text-sm">
                  {report.tips.map((t: string, i: number) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[var(--color-red)]">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
