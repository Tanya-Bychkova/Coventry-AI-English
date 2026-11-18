import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import { useState, type ReactNode } from "react";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read).length;

  const nav = role === "teacher" ? teacherNav : role === "admin" ? adminNav : studentNav;

  const { pathname } = useLocation();
  const current = [...nav].reverse().find(item => pathname === item.to || pathname.startsWith(item.to + "/"));
  const groups = role === "student" ? [
    { label: "Learn", items: nav.slice(0, 4) },
    { label: "Practice studio", items: [nav[4], nav[5], nav[6], nav[9]] },
    { label: "My activity", items: [nav[7], nav[8], nav[10], nav[11]] },
  ] : [{ label: role === "teacher" ? "Teaching desk" : "Institution", items: nav }];

  const handleLogout = () => {
    setRole(null);
    navigate("/");
  };

  return (
    <div className="lab-shell" data-role={role} data-screen={pathname.split("/")[2] || "overview"}>
      <button className="mobile-menu" aria-controls="workspace-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close navigation" : "☰  Workspace menu"}</button>
      <aside className={"lab-rail" + (menuOpen ? " expanded" : "")} id="workspace-nav">
        <div className="lab-brand"><span className="lab-mark"><BookOpen size={24}/></span><span>Coventry<span>English AI</span></span></div>
        <nav aria-label="Workspace">{groups.map(group => <div className="rail-group" key={group.label}>
          <p>{group.label}</p>{group.items.map(({to, label, icon: Icon, end}) =>
            <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)}><Icon size={19}/><span>{label}</span></NavLink>)}
        </div>)}</nav>
        <button className="switch-role" onClick={handleLogout}><LogOut size={17}/>Switch role</button>
      </aside>
      <div className="lab-body">
        <header className="lab-top"><div className="crumb"><strong>{role === "admin" ? "Administration" : role === "teacher" ? "Teacher workspace" : "Student workspace"}</strong><span>/</span>{current?.label}</div>
          <div className="user-tools">{role === "student" && <NavLink to="/student/notifications" aria-label={`Notifications, ${unread} unread`}><Bell size={19}/>{unread > 0 && <sup>{unread}</sup>}</NavLink>}
            <span className="avatar">{user?.avatarInitials}</span><span className="user-name">{user?.fullName}</span></div>
        </header>
        <main className="lab-main">{children}</main>
      </div>
    </div>
  );
}
