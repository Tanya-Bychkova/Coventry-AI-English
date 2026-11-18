import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import type { Role } from "../types";
import { GraduationCap, Presentation, ShieldCheck } from "lucide-react";

const options: { role: Role; title: string; desc: string; icon: typeof GraduationCap; path: string }[] = [
  {
    role: "student",
    title: "Student",
    desc: "Courses, homework, AI Speaking & Writing, testing, vocabulary, progress.",
    icon: GraduationCap,
    path: "/student",
  },
  {
    role: "teacher",
    title: "Teacher",
    desc: "Manage courses, review AI-graded homework, adjust scores and comments.",
    icon: Presentation,
    path: "/teacher",
  },
  {
    role: "admin",
    title: "Administrator",
    desc: "Platform-wide analytics: performance, attendance, faculty progress.",
    icon: ShieldCheck,
    path: "/admin",
  },
];

export default function Login() {
  const { setRole } = useApp();
  const navigate = useNavigate();

  const choose = (role: Role, path: string) => {
    setRole(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-4xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="hex-clip w-11 h-11 bg-[var(--color-red)] flex items-center justify-center font-[family-name:var(--font-display)] font-semibold">
              CU
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
              Coventry University Kazakhstan
            </div>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl leading-[1.05] mb-5 max-w-2xl">
            One platform to learn, test, and speak English with AI.
          </h1>
          <p className="text-white/60 max-w-xl mb-12 text-lg leading-relaxed">
            Courses, homework grading, Cambridge-style testing, an AI speaking partner and writing coach —
            built for CUK students, teachers and administrators.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {options.map(({ role, title, desc, icon: Icon, path }) => (
              <button
                key={role}
                onClick={() => choose(role, path)}
                className="text-left bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[var(--color-red)]/50 transition-all group"
              >
                <Icon size={26} strokeWidth={1.6} className="text-[var(--color-red)] mb-4" />
                <div className="font-[family-name:var(--font-display)] text-xl mb-2 group-hover:text-white">
                  {title}
                </div>
                <div className="text-sm text-white/50 leading-relaxed">{desc}</div>
                <div className="mt-4 text-xs font-mono uppercase tracking-wider text-[var(--color-red)]">
                  Continue →
                </div>
              </button>
            ))}
          </div>

          <p className="text-white/30 text-xs mt-10 font-mono">
            Prototype build — demo accounts, no real login required.
          </p>
        </div>
      </div>
    </div>
  );
}
