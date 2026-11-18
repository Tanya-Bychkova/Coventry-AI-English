import { useState } from "react";
import { Card, Pill, Button, PageHeader, EmptyState } from "../../components/ui";
import { LevelHex } from "../../components/LevelHex";
import { useApp } from "../../context/AppContext";

export default function ReviewSubmissions() {
  const { pendingReviews, gradeSubmission } = useApp();
  const [drafts, setDrafts] = useState<Record<string, { comment: string; score: number }>>({});

  const setDraft = (id: string, field: "comment" | "score", value: string | number) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: { comment: prev[id]?.comment ?? "", score: prev[id]?.score ?? pendingReviews.find(s => s.id === id)?.aiScore ?? 0, [field]: value },
    }));
  };

  return (
    <div>
      <PageHeader
        eyebrow="Quality control"
        title="Review AI-graded submissions"
        description="The AI has already checked grammar, vocabulary and CEFR level. Add your comments and adjust the score before it's returned to the student."
      />

      <div className="space-y-5">
        {pendingReviews.length === 0 && <EmptyState title="Nothing to review" body="All submissions have been checked." />}
        {pendingReviews.map((s) => {
          const draft = drafts[s.id] ?? { comment: s.teacherComment ?? "", score: s.teacherScore ?? s.aiScore ?? 0 };
          const done = s.status === "teacher-reviewed";
          return (
            <Card key={s.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-[var(--color-slate)] font-mono mb-1">{s.courseName}</div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg">{s.title}</h3>
                </div>
                <Pill tone={done ? "green" : "amber"}>{done ? "Reviewed" : "Pending"}</Pill>
              </div>

              <div className="bg-[var(--color-paper)] rounded-lg p-4 mb-4 text-sm leading-relaxed text-[var(--color-ink)]/90">
                {s.text}
              </div>

              <div className="flex items-center gap-4 mb-4">
                {s.aiLevel && <LevelHex level={s.aiLevel} size={36} />}
                <div className="font-mono text-sm text-[var(--color-slate)]">AI score: <strong className="text-[var(--color-ink)]">{s.aiScore}/100</strong></div>
              </div>

              {s.aiFeedback && (
                <ul className="space-y-1 text-sm mb-5">
                  {s.aiFeedback.map((f, i) => (
                    <li key={i} className="flex gap-2 text-[var(--color-slate)]">
                      <span className="text-[var(--color-red)]">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <div className="grid sm:grid-cols-[1fr_120px] gap-3 items-start">
                <textarea
                  disabled={done}
                  value={draft.comment}
                  onChange={(e) => setDraft(s.id, "comment", e.target.value)}
                  placeholder="Add a comment for the student..."
                  rows={2}
                  className="border border-[var(--color-line)] rounded-lg px-3 py-2 text-sm resize-none disabled:opacity-60"
                />
                <input
                  disabled={done}
                  type="number" min={0} max={100}
                  value={draft.score}
                  onChange={(e) => setDraft(s.id, "score", Number(e.target.value))}
                  className="border border-[var(--color-line)] rounded-lg px-3 py-2 text-sm disabled:opacity-60"
                  placeholder="Score"
                />
              </div>
              {!done && (
                <div className="mt-3 flex justify-end">
                  <Button disabled={!Number.isInteger(draft.score) || draft.score < 0 || draft.score > 100} onClick={() => gradeSubmission(s.id, draft.comment, draft.score)}>Confirm & return to student</Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
