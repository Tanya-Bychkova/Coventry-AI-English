import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  ListChecks,
  Mic,
  PenLine,
  Layers,
  CalendarDays,
  LineChart,
  GraduationCap,
  Bell,
  Award,
  LogOut,
  Users,
  ClipboardCheck,
  BarChart3,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import type { ReactNode } from "react";

const studentNav = [
  { to: "/student", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/student/courses", label: "Courses", icon: BookOpen },
  { to: "/student/homework", label: "Homework", icon: FileText },
  { to: "/student/testing", label: "Testing", icon: ListChecks },
  { to: "/student/speaking", label: "AI Speaking", icon: Mic },
  { to: "/student/writing", label: "AI Writing Coach", icon: PenLine },
  { to: "/student/words", label: "My Words", icon: Layers },
  { to: "/student/schedule", label: "Schedule", icon: CalendarDays },
  { to: "/student/progress", label: "Progress", icon: LineChart },
  { to: "/student/tutor", label: "AI Tutor", icon: GraduationCap },
  { to: "/student/notifications", label: "Notifications", icon: Bell },
  { to: "/student/certificates", label: "Certificates", icon: Award },
];

const teacherNav = [
  { to: "/teacher", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/teacher/courses", label: "My Courses", icon: BookOpen },
  { to: "/teacher/reviews", label: "Review Submissions", icon: ClipboardCheck },
  { to: "/teacher/students", label: "Students", icon: Users },
];

const adminNav = [{ to: "/admin", label: "Analytics", icon: BarChart3, end: true }];

export function Layout({ children }: { children: ReactNode }) {
  const { role, user, setRole, notifications } = useApp();
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read).length;

  const nav = role === "teacher" ? teacherNav : role === "admin" ? adminNav : studentNav;

  const handleLogout = () => {
    setRole(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-[var(--color-paper)]">
      <aside className="w-64 shrink-0 bg-[var(--color-ink)] text-white flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="hex-clip w-8 h-8 bg-[var(--color-red)] flex items-center justify-center font-[family-name:var(--font-display)] font-semibold text-sm">
              CU
            </div>
            <div>
              <div className="font-[family-name:var(--font-display)] text-sm leading-tight">Coventry English AI</div>
              <div className="text-[10px] uppercase tracking-wider text-white/50 font-mono">CUK Platform</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-[var(--color-red)] text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={17} strokeWidth={1.8} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut size={17} strokeWidth={1.8} />
            Switch role
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 shrink-0 border-b border-[var(--color-line)] bg-[var(--color-paper-raised)] flex items-center justify-between px-8">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-slate)]">
            {role === "student" && "Student portal"}
            {role === "teacher" && "Teacher portal"}
            {role === "admin" && "Administration"}
          </div>
          <div className="flex items-center gap-4">
            {role === "student" && (
              <NavLink to="/student/notifications" className="relative text-[var(--color-ink)]">
                <Bell size={19} strokeWidth={1.8} />
                {unread > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-red)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </NavLink>
            )}
            <div className="flex items-center gap-2.5 pl-4 border-l border-[var(--color-line)]">
              <div className="w-8 h-8 rounded-full bg-[var(--color-red-soft)] text-[var(--color-red-deep)] flex items-center justify-center text-xs font-semibold">
                {user?.avatarInitials}
              </div>
              <div className="text-sm font-medium">{user?.fullName}</div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto px-8 py-8 max-w-[1400px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
