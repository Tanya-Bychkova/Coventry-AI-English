import { useState } from "react";
import { Card, Button, PageHeader } from "../../components/ui";
import { LevelHex } from "../../components/LevelHex";
import { analyzeWriting } from "../../lib/aiSimulator";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { CEFRLevel } from "../../types";
import { CheckCircle2 } from "lucide-react";

const LEVELS: CEFRLevel[] = ["Pre-A1", "A1", "A2 Key", "B1 Preliminary (PET)", "B2 First (FCE)", "C1 Advanced (CAE)"] as unknown as CEFRLevel[];

const GRAMMAR_Q = [
  { q: "By this time next year, I ___ university.", options: ["will finish", "will have finished", "finish"], answer: "will have finished" },
  { q: "If I ___ more time, I would learn French.", options: ["have", "had", "will have"], answer: "had" },
  { q: "She ___ here since 2019.", options: ["works", "has worked", "worked"], answer: "has worked" },
];

const VOCAB_Q = [
  { q: "Choose the word closest in meaning to 'reluctant':", options: ["eager", "unwilling", "curious"], answer: "unwilling" },
  { q: "'To postpone' means:", options: ["to cancel", "to delay", "to finish early"], answer: "to delay" },
];

const READING_TEXT =
  "Remote work has changed how companies think about office space. Many organisations now offer hybrid schedules, allowing employees to split their time between home and the office. Supporters argue this improves wellbeing and productivity; critics worry it weakens team culture.";
const READING_Q = [
  { q: "According to the text, hybrid schedules let employees:", options: ["work only from home", "split time between home and office", "never visit the office"], answer: "split time between home and office" },
];

const LISTENING_Q = [
  { q: "(Audio transcript, simulated) \"The train to Almaty departs from platform 4 at a quarter past nine.\" — What time does the train leave?", options: ["9:00", "9:15", "9:40"], answer: "9:15" },
];

type Stage = "select" | "grammar" | "vocabulary" | "reading" | "listening" | "writing" | "speaking" | "result";

export default function Testing() {
  const [stage, setStage] = useState<Stage>("select");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [writingText, setWritingText] = useState("");
  const [speakingText, setSpeakingText] = useState("");
  const [scores, setScores] = useState<{ skill: string; score: number }[]>([]);

  const order: Stage[] = ["grammar", "vocabulary", "reading", "listening", "writing", "speaking", "result"];

  const scoreMCQ = (questions: { answer: string }[], prefix: string) => {
    const correct = questions.filter((q, i) => answers[`${prefix}-${i}`] === q.answer).length;
    return Math.round((correct / questions.length) * 100);
  };

  const goNext = () => {
    const idx = order.indexOf(stage);
    if (stage === "listening") {
      const g = scoreMCQ(GRAMMAR_Q, "grammar");
      const v = scoreMCQ(VOCAB_Q, "vocab");
      const r = scoreMCQ(READING_Q, "reading");
      const l = scoreMCQ(LISTENING_Q, "listening");
      setScores([
        { skill: "Grammar", score: g },
        { skill: "Vocabulary", score: v },
        { skill: "Reading", score: r },
        { skill: "Listening", score: l },
      ]);
    }
    if (stage === "writing") {
      const report = analyzeWriting(writingText || "short answer");
      setScores((prev) => [...prev, { skill: "Writing", score: report.score }]);
    }
    if (stage === "speaking") {
      const report = analyzeWriting(speakingText || "short spoken answer transcribed");
      setScores((prev) => [...prev, { skill: "Speaking", score: Math.min(100, report.score + 5) }]);
    }
    setStage(order[idx + 1]);
  };

  const overall = scores.length ? Math.round(scores.reduce((a, b) => a + b.score, 0) / scores.length) : 0;
  const resultLevel: CEFRLevel = overall >= 90 ? "C1" : overall >= 78 ? "B2" : overall >= 62 ? "B1" : overall >= 46 ? "A2" : overall >= 28 ? "A1" : "Pre-A1";

  if (stage === "select") {
    return (
      <div>
        <PageHeader
          eyebrow="Cambridge English standards"
          title="Progress test"
          description="Six skills — Grammar, Vocabulary, Reading, Listening, Writing, Speaking — scored against CEFR levels from Pre-A1 to C2."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {LEVELS.map((lvl) => (
            <Card key={lvl} className="p-5">
              <div className="font-[family-name:var(--font-display)] text-lg mb-1">{lvl}</div>
              <div className="text-xs text-[var(--color-slate)]">Full skills test</div>
            </Card>
          ))}
        </div>
        <Button onClick={() => setStage("grammar")}>Start B1 Preliminary test →</Button>
      </div>
    );
  }

  if (stage === "result") {
    return (
      <div>
        <PageHeader eyebrow="Test complete" title="Your result" />
        <Card className="p-8 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <LevelHex level={resultLevel} size={70} showLabel={false} />
            <div>
              <div className="text-xs font-mono uppercase text-[var(--color-slate)] mb-1">Overall level</div>
              <div className="font-[family-name:var(--font-display)] text-3xl">{resultLevel}</div>
              <div className="text-sm text-[var(--color-slate)]">Overall score: {overall}/100</div>
            </div>
          </div>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={scores} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line)" />
                <XAxis dataKey="skill" tick={{ fontSize: 12, fill: "var(--color-slate)" }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "var(--color-slate)" }} />
                <Tooltip />
                <Bar dataKey="score" fill="var(--color-red)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Button onClick={() => { setStage("select"); setAnswers({}); setScores([]); setWritingText(""); setSpeakingText(""); }}>
          Take another test
        </Button>
      </div>
    );
  }

  const renderMCQ = (questions: { q: string; options: string[]; answer: string }[], prefix: string, title: string) => (
    <div>
      <PageHeader eyebrow="B1 Preliminary" title={title} />
      <div className="space-y-5 mb-6">
        {stage === "reading" && (
          <Card className="p-5 mb-2">
            <p className="text-sm leading-relaxed text-[var(--color-slate)]">{READING_TEXT}</p>
          </Card>
        )}
        {questions.map((item, i) => (
          <Card key={i} className="p-5">
            <p className="font-medium mb-3">{item.q}</p>
            <div className="grid gap-2">
              {item.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setAnswers((a) => ({ ...a, [`${prefix}-${i}`]: opt }))}
                  className={`text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                    answers[`${prefix}-${i}`] === opt
                      ? "border-[var(--color-red)] bg-[var(--color-red-soft)]"
                      : "border-[var(--color-line)] hover:border-[var(--color-slate-soft)]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <Button onClick={goNext}>Continue →</Button>
    </div>
  );

  if (stage === "grammar") return renderMCQ(GRAMMAR_Q, "grammar", "Grammar");
  if (stage === "vocabulary") return renderMCQ(VOCAB_Q, "vocab", "Vocabulary");
  if (stage === "reading") return renderMCQ(READING_Q, "reading", "Reading");
  if (stage === "listening") return renderMCQ(LISTENING_Q, "listening", "Listening");

  if (stage === "writing") {
    return (
      <div>
        <PageHeader eyebrow="B1 Preliminary" title="Writing" description="Write a short email (60–90 words) to a friend describing your plans for the weekend." />
        <Card className="p-5 mb-6">
          <textarea
            value={writingText}
            onChange={(e) => setWritingText(e.target.value)}
            rows={8}
            placeholder="Dear..."
            className="w-full border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm resize-none"
          />
        </Card>
        <Button onClick={goNext}>Continue →</Button>
      </div>
    );
  }

  if (stage === "speaking") {
    return (
      <div>
        <PageHeader
          eyebrow="B1 Preliminary"
          title="Speaking"
          description='Simulated speaking task — type what you would say in response to: "Describe your favourite way to spend a weekend."'
        />
        <Card className="p-5 mb-6">
          <textarea
            value={speakingText}
            onChange={(e) => setSpeakingText(e.target.value)}
            rows={6}
            placeholder="I usually like to..."
            className="w-full border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm resize-none"
          />
        </Card>
        <Button onClick={goNext}>
          <CheckCircle2 size={16} /> Finish test
        </Button>
      </div>
    );
  }

  return null;
}
