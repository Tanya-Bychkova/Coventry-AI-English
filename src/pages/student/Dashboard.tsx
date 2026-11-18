import { DailyPractice } from "../../components/DailyPractice";
import { Link } from "react-router-dom";
import { Card, Pill, ProgressBar, PageHeader } from "../../components/ui";
import { LevelLadder } from "../../components/LevelHex";
import { useApp } from "../../context/AppContext";
import { courses, scheduleEvents } from "../../data/mockData";
import { Flame, Clock, BookMarked, Mic } from "lucide-react";

export default function Dashboard() {
  const { user, vocab } = useApp();
  const upcoming = scheduleEvents.slice(0, 4);
  const dueSoon = courses.filter((c) => c.progressPct < 100).slice(0, 2);

  return (
    <div>
      <PageHeader
        eyebrow="Student portal"
        title={`Welcome back, ${user?.fullName.split(" ")[0]}`}
        description="Here's where you left off — pick up a course, practise speaking, or review your saved words."
      />

      <DailyPractice />
      <div className="metric-strip grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-[var(--color-slate)] text-xs font-mono uppercase tracking-wide mb-2">
            <Flame size={14} /> Study streak
          </div>
          <div className="font-[family-name:var(--font-display)] text-3xl">12 days</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-[var(--color-slate)] text-xs font-mono uppercase tracking-wide mb-2">
            <Clock size={14} /> Hours this week
          </div>
          <div className="font-[family-name:var(--font-display)] text-3xl">6.5h</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-[var(--color-slate)] text-xs font-mono uppercase tracking-wide mb-2">
            <BookMarked size={14} /> Words saved
          </div>
          <div className="font-[family-name:var(--font-display)] text-3xl">{vocab.length}</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-[var(--color-slate)] text-xs font-mono uppercase tracking-wide mb-2">
            <Mic size={14} /> Speaking sessions
          </div>
          <div className="font-[family-name:var(--font-display)] text-3xl">4</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-[family-name:var(--font-display)] text-xl">Continue learning</h2>
            <Link to="/student/courses" className="text-sm text-[var(--color-red)] font-medium">
              All courses →
            </Link>
          </div>
          <div className="space-y-4">
            {dueSoon.map((c) => (
              <Link
                key={c.id}
                to={`/student/courses/${c.id}`}
                className="block border border-[var(--color-line)] rounded-lg p-4 hover:border-[var(--color-red)]/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="font-medium">{c.title}</div>
                    <div className="text-xs text-[var(--color-slate)] mt-0.5">{c.teacher} · {c.levelRange}</div>
                  </div>
                  <Pill tone="red">{c.progressPct}%</Pill>
                </div>
                <ProgressBar pct={c.progressPct} />
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-[family-name:var(--font-display)] text-xl">Your CEFR level</h2>
          </div>
          <div className="mb-4">
            <LevelLadder current={user?.role === "student" ? (user.level ?? "B1") : "B1"} />
          </div>
          <p className="text-sm text-[var(--color-slate)] leading-relaxed">
            Based on your last progress test, you're currently at <strong className="text-[var(--color-ink)]">B1 (Intermediate)</strong>.
            Try the practice test to see a sample score report.
          </p>
        </Card>
      </div>

      <Card className="p-6 mt-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-[family-name:var(--font-display)] text-xl">Upcoming this week</h2>
          <Link to="/student/schedule" className="text-sm text-[var(--color-red)] font-medium">
            Full schedule →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {upcoming.map((e) => (
            <div key={e.id} className="border border-[var(--color-line)] rounded-lg p-4">
              <div className="text-xs font-mono text-[var(--color-slate)] mb-1">
                {e.date} · {e.time}
              </div>
              <div className="text-sm font-medium leading-snug">{e.title}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
