import { Link } from "react-router-dom";
import { Card, Pill, PageHeader } from "../../components/ui";
import { useApp } from "../../context/AppContext";
import { teacherCourses } from "../../data/mockData";
import { Users, FileCheck, BookOpen } from "lucide-react";

export default function TeacherDashboard() {
  const { pendingReviews } = useApp();
  const needsReview = pendingReviews.filter((r) => r.status !== "teacher-reviewed");

  return (
    <div>
      <PageHeader eyebrow="Teacher portal" title="Welcome, Dr. Hartford" description="Your courses, students, and AI-graded work waiting for your review." />

      <div className="metric-strip grid md:grid-cols-3 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--color-slate)] mb-2">
            <BookOpen size={14} /> Active courses
          </div>
          <div className="font-[family-name:var(--font-display)] text-3xl">{teacherCourses.length}</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--color-slate)] mb-2">
            <Users size={14} /> Students enrolled
          </div>
          <div className="font-[family-name:var(--font-display)] text-3xl">86</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--color-slate)] mb-2">
            <FileCheck size={14} /> Awaiting your review
          </div>
          <div className="font-[family-name:var(--font-display)] text-3xl">{needsReview.length}</div>
        </Card>
      </div>

      <Card className="review-queue p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-[family-name:var(--font-display)] text-xl">Recent AI-graded submissions</h2>
          <Link to="/teacher/reviews" className="text-sm text-[var(--color-red)] font-medium">
            Open review queue →
          </Link>
        </div>
        <div className="space-y-3">
          {needsReview.map((s) => (
            <div key={s.id} className="flex items-center justify-between border border-[var(--color-line)] rounded-lg p-4">
              <div>
                <div className="font-medium text-sm">{s.title}</div>
                <div className="text-xs text-[var(--color-slate)]">{s.courseName}</div>
              </div>
              <div className="flex items-center gap-3">
                <Pill tone="amber">AI: {s.aiScore}/100 · {s.aiLevel}</Pill>
              </div>
            </div>
          ))}
          {needsReview.length === 0 && <p className="text-sm text-[var(--color-slate)]">All submissions reviewed — nice work.</p>}
        </div>
      </Card>
    </div>
  );
}
