import { useState } from "react";
import { Card, Pill, Button, PageHeader, EmptyState } from "../../components/ui";
import { LevelHex } from "../../components/LevelHex";
import { useApp } from "../../context/AppContext";
import { courses } from "../../data/mockData";
import { analyzeWriting } from "../../lib/aiSimulator";
import type { HomeworkSubmission } from "../../types";
import { Loader2, Sparkles } from "lucide-react";

const HW_TYPES: HomeworkSubmission["type"][] = ["essay", "letter", "report", "grammar", "reading", "vocabulary"];

export default function Homework() {
  const { submissions, addSubmission } = useApp();
  const [courseId, setCourseId] = useState(courses[0].id);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<HomeworkSubmission["type"]>("essay");
  const [text, setText] = useState("");
  const [grading, setGrading] = useState(false);

  const submit = () => {
    if (!title.trim() || text.trim().length < 10) return;
    setGrading(true);
    setTimeout(() => {
      const report = analyzeWriting(text);
      const course = courses.find((c) => c.id === courseId)!;
      const submission: HomeworkSubmission = {
        id: `hw-${Date.now()}`,
        courseId,
        courseName: course.title,
        title,
        type,
        submittedAt: new Date().toISOString().slice(0, 10),
        text,
        status: "ai-graded",
        aiScore: report.score,
        aiLevel: report.level,
        aiFeedback: report.feedback,
      };
      addSubmission(submission);
      setGrading(false);
      setTitle("");
      setText("");
    }, 1400);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Assignments"
        title="Homework"
        description="Upload written work directly — it's sent to the AI for instant grammar, vocabulary and CEFR-level feedback, then reviewed by your teacher."
      />

      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="p-6 lg:col-span-2 h-fit">
          <h2 className="font-[family-name:var(--font-display)] text-lg mb-4">New submission</h2>

          <label className="block text-xs font-mono uppercase text-[var(--color-slate)] mb-1.5">Course</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full mb-4 border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm bg-[var(--color-paper-raised)]"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>

          <label className="block text-xs font-mono uppercase text-[var(--color-slate)] mb-1.5">Assignment type</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {HW_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                  type === t ? "bg-[var(--color-ink)] text-white" : "bg-[var(--color-line)] text-[var(--color-slate)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <label className="block text-xs font-mono uppercase text-[var(--color-slate)] mb-1.5">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Comparing two cities"
            className="w-full mb-4 border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm"
          />

          <label className="block text-xs font-mono uppercase text-[var(--color-slate)] mb-1.5">Your text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={9}
            placeholder="Paste or write your essay, letter or report here..."
            className="w-full mb-4 border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm resize-none"
          />

          <Button onClick={submit} disabled={grading || !title.trim() || text.trim().length < 10} className="w-full">
            {grading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> AI is grading your work...
              </>
            ) : (
              <>
                <Sparkles size={16} /> Submit for AI grading
              </>
            )}
          </Button>
        </Card>

        <div className="lg:col-span-3 space-y-5">
          <h2 className="font-[family-name:var(--font-display)] text-lg">Your submissions</h2>
          {submissions.length === 0 && (
            <EmptyState title="No submissions yet" body="Submit your first assignment to see AI feedback here." />
          )}
          {submissions.map((s) => (
            <Card key={s.id} className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="text-xs text-[var(--color-slate)] font-mono mb-1">{s.courseName}</div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg">{s.title}</h3>
                </div>
                <Pill tone={s.status === "teacher-reviewed" ? "green" : "amber"}>
                  {s.status === "teacher-reviewed" ? "Reviewed by teacher" : "AI graded"}
                </Pill>
              </div>

              <div className="flex items-center gap-4 mb-4">
                {s.aiLevel && <LevelHex level={s.aiLevel} size={36} />}
                {s.aiScore !== undefined && (
                  <div className="font-mono text-sm text-[var(--color-slate)]">
                    AI score: <strong className="text-[var(--color-ink)]">{s.aiScore}/100</strong>
                  </div>
                )}
                {s.teacherScore !== undefined && (
                  <div className="font-mono text-sm text-[var(--color-slate)]">
                    Teacher score: <strong className="text-[var(--color-ink)]">{s.teacherScore}/100</strong>
                  </div>
                )}
              </div>

              {s.aiFeedback && (
                <div className="bg-[var(--color-paper)] rounded-lg p-4 mb-3">
                  <div className="text-xs font-mono uppercase text-[var(--color-slate)] mb-2">AI feedback</div>
                  <ul className="space-y-1.5 text-sm">
                    {s.aiFeedback.map((f, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[var(--color-red)]">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {s.teacherComment && (
                <div className="border-l-2 border-[var(--color-red)] pl-3 text-sm text-[var(--color-slate)]">
                  <span className="font-medium text-[var(--color-ink)]">Teacher note: </span>
                  {s.teacherComment}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
