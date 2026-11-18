import { useState } from "react";
import { Card, Pill, Button, PageHeader } from "../../components/ui";
import { LevelHex } from "../../components/LevelHex";
import { analyzeWriting, type AIWritingReport } from "../../lib/aiSimulator";
import { Sparkles, Loader2 } from "lucide-react";

const GENRES = ["Essay", "Letter", "Article", "Report", "Review"];

export default function AIWriting() {
  const [genre, setGenre] = useState(GENRES[0]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AIWritingReport | null>(null);

  const analyze = () => {
    if (text.trim().length < 5) return;
    setLoading(true);
    setTimeout(() => {
      setReport(analyzeWriting(text));
      setLoading(false);
    }, 1100);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Writing development"
        title="AI Writing Coach"
        description="Draft an essay, letter, article, report or review. The AI analyses grammar, vocabulary range and CEFR level, and gives targeted suggestions."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex gap-2 mb-4 flex-wrap">
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  genre === g ? "bg-[var(--color-ink)] text-white" : "bg-[var(--color-line)] text-[var(--color-slate)]"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={16}
            placeholder={`Write your ${genre.toLowerCase()} here...`}
            className="w-full border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm resize-none mb-4"
          />
          <Button onClick={analyze} disabled={loading || text.trim().length < 5} className="w-full">
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Analysing your writing...
              </>
            ) : (
              <>
                <Sparkles size={16} /> Get AI feedback
              </>
            )}
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="font-[family-name:var(--font-display)] text-lg mb-4">Feedback</h3>
          {!report ? (
            <p className="text-sm text-[var(--color-slate)]">Your analysis will appear here once you submit a draft.</p>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <LevelHex level={report.level} size={48} />
                <div>
                  <div className="text-xs font-mono text-[var(--color-slate)]">Overall score</div>
                  <div className="font-[family-name:var(--font-display)] text-2xl">{report.score}/100</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[var(--color-paper)] rounded-lg p-3">
                  <div className="text-xs text-[var(--color-slate)]">Word count</div>
                  <div className="font-mono font-medium">{report.wordCount}</div>
                </div>
                <div className="bg-[var(--color-paper)] rounded-lg p-3">
                  <div className="text-xs text-[var(--color-slate)]">Vocabulary range</div>
                  <div className="font-mono font-medium">{report.vocabularyRichness}%</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono uppercase text-[var(--color-slate)] mb-2">Suggestions</div>
                <ul className="space-y-2 text-sm">
                  {report.feedback.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <Pill tone="red">{i + 1}</Pill>
                      <span className="pt-0.5">{f}</span>
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
