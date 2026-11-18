import { Link, useParams } from "react-router-dom";
import { Card, Pill, ProgressBar, Button } from "../../components/ui";
import { courses } from "../../data/mockData";
import {
  PlayCircle,
  BookOpen,
  SpellCheck2,
  Layers,
  Headphones,
  Mic,
  PenLine,
  ListChecks,
  Lock,
  CheckCircle2,
  Circle,
} from "lucide-react";
import type { ModuleItem } from "../../types";

const ICONS: Record<ModuleItem["kind"], typeof PlayCircle> = {
  video: PlayCircle,
  reading: BookOpen,
  grammar: SpellCheck2,
  vocabulary: Layers,
  exercise: ListChecks,
  listening: Headphones,
  speaking: Mic,
  writing: PenLine,
  test: ListChecks,
};

export default function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return <div className="text-[var(--color-slate)]">Course not found.</div>;
  }

  return (
    <div>
      <Link to="/student/courses" className="text-sm text-[var(--color-red)] font-medium">
        ← All courses
      </Link>

      <div className="course-intro mt-4 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Pill tone="neutral">{course.category}</Pill>
          <Pill tone="gold">{course.levelRange}</Pill>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl mb-3">{course.title}</h1>
        <p className="text-[var(--color-slate)] max-w-2xl mb-4">{course.description}</p>
        <div className="flex items-center gap-6 text-sm text-[var(--color-slate)]">
          <span>Taught by {course.teacher}</span>
          <span>Deadline: {course.deadline}</span>
        </div>
        <div className="max-w-md mt-4">
          <div className="flex justify-between text-xs text-[var(--color-slate)] mb-1.5">
            <span>Course progress</span>
            <span>{course.progressPct}%</span>
          </div>
          <ProgressBar pct={course.progressPct} />
        </div>
      </div>

      <div className="module-path space-y-4">
        {course.modules.map((m, idx) => (
          <Card key={m.id} className={`p-6 ${!m.unlocked ? "opacity-60" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="module-stop">{String(idx + 1).padStart(2, "0")}</span>
                <h3 className="font-[family-name:var(--font-display)] text-lg">{m.title}</h3>
              </div>
              {!m.unlocked && (
                <Pill tone="neutral">
                  <span className="flex items-center gap-1">
                    <Lock size={11} /> Locked
                  </span>
                </Pill>
              )}
            </div>

            {m.unlocked && m.items.length > 0 && (
              <div className="divide-y divide-[var(--color-line)]">
                {m.items.map((item) => {
                  const Icon = ICONS[item.kind];
                  const isWriting = item.kind === "writing";
                  const isSpeaking = item.kind === "speaking";
                  const isTest = item.kind === "test";
                  const linkTo = isWriting ? "/student/writing" : isSpeaking ? "/student/speaking" : isTest ? "/student/testing" : undefined;
                  const content = (
                    <div className="flex items-center justify-between py-3.5 group">
                      <div className="flex items-center gap-3">
                        {item.done ? (
                          <CheckCircle2 size={18} className="text-[var(--color-green)]" />
                        ) : (
                          <Circle size={18} className="text-[var(--color-slate-soft)]" />
                        )}
                        <Icon size={16} className="text-[var(--color-slate)]" />
                        <span className={`text-sm ${item.done ? "text-[var(--color-slate)]" : "text-[var(--color-ink)] font-medium"}`}>
                          {item.title}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[var(--color-slate)]">{item.durationMin} min</span>
                    </div>
                  );
                  return linkTo ? (
                    <Link key={item.id} to={linkTo} className="block hover:bg-[var(--color-paper)] -mx-2 px-2 rounded">
                      {content}
                    </Link>
                  ) : (
                    <div key={item.id}>{content}</div>
                  );
                })}
              </div>
            )}
            {m.unlocked && m.items.length === 0 && (
              <p className="text-sm text-[var(--color-slate)]">No items yet — check back soon.</p>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Link to="/student/homework">
          <Button variant="secondary">Submit homework for this course</Button>
        </Link>
      </div>
    </div>
  );
}
