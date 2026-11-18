import { BookOpen, BriefcaseBusiness, MessagesSquare, NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, Pill, ProgressBar, PageHeader } from "../../components/ui";
import { courses } from "../../data/mockData";
import type { Course } from "../../types";

const subjectIcons = {"General English": BookOpen, "IELTS Prep": MessagesSquare, "Business English": BriefcaseBusiness, "Academic Writing": NotebookPen};

const categories: (Course["category"] | "All")[] = ["All", "General English", "IELTS Prep", "Business English", "Academic Writing"];

export default function Courses() {
  const [filter, setFilter] = useState<Course["category"] | "All">("All");
  const filtered = filter === "All" ? courses : courses.filter((c) => c.category === filter);

  return (
    <div>
      <PageHeader
        eyebrow="Learning"
        title="Your courses"
        description="Choose a course to see your next module and practise at your level."
      />

      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === c ? "bg-[var(--color-ink)] text-white" : "bg-[var(--color-line)] text-[var(--color-slate)] hover:bg-[var(--color-line)]/70"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((c) => {
          const Subject = subjectIcons[c.category];
          return (
          <Link key={c.id} to={`/student/courses/${c.id}`}>
            <Card className="course-tile p-6 h-full hover:border-[var(--color-red)]/40 transition-colors">
              <div className="subject-cover"><Subject size={37} strokeWidth={1.8}/></div>
              <div className="flex items-center justify-between mb-3">
                <Pill tone="neutral">{c.category}</Pill>
                <Pill tone="gold">{c.levelRange}</Pill>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl mb-2">{c.title}</h3>
              <p className="text-sm text-[var(--color-slate)] mb-4 leading-relaxed">{c.description}</p>
              <div className="flex items-center justify-between text-xs text-[var(--color-slate)] mb-2">
                <span>{c.totalModules} modules · {c.teacher}</span>
                <span>{c.progressPct}%</span>
              </div>
              <ProgressBar pct={c.progressPct} />
              <div className="text-xs font-mono text-[var(--color-slate)] mt-3">Deadline: {c.deadline}</div>
            </Card>
          </Link>
        )})}
      </div>
    </div>
  );
}
