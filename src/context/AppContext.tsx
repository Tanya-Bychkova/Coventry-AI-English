import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { HomeworkSubmission, NotificationItem, Role, VocabWord } from "../types";
import {
  currentAdmin,
  currentStudent,
  currentTeacher,
  initialSubmissions,
  notifications as initialNotifications,
  vocabWords as initialVocab,
  pendingReviews as initialPendingReviews,
} from "../data/mockData";

interface AppState {
  role: Role | null;
  setRole: (r: Role | null) => void;
  user: typeof currentStudent | typeof currentTeacher | typeof currentAdmin | null;
  submissions: HomeworkSubmission[];
  addSubmission: (s: HomeworkSubmission) => void;
  vocab: VocabWord[];
  addVocabWord: (w: VocabWord) => void;
  reviewWord: (id: string, known: boolean) => void;
  notifications: NotificationItem[];
  markAllRead: () => void;
  addNotification: (n: NotificationItem) => void;
  pendingReviews: HomeworkSubmission[];
  gradeSubmission: (id: string, comment: string, score: number) => void;
}

const AppContext = createContext<AppState | null>(null);

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function storeJSON(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Keep the current session usable when storage is unavailable. */ }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role | null>(() => loadJSON("cuk_role", null));
  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>(() =>
    loadJSON("cuk_submissions", initialSubmissions)
  );
  const [vocab, setVocab] = useState<VocabWord[]>(() => loadJSON("cuk_vocab", initialVocab));
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    loadJSON("cuk_notifications", initialNotifications)
  );
  const [pendingReviews, setPendingReviews] = useState<HomeworkSubmission[]>(() =>
    loadJSON("cuk_pending_reviews", initialPendingReviews)
  );

  useEffect(() => storeJSON("cuk_role", role), [role]);
  useEffect(() => storeJSON("cuk_submissions", submissions), [submissions]);
  useEffect(() => storeJSON("cuk_vocab", vocab), [vocab]);
  useEffect(() => storeJSON("cuk_notifications", notifications), [notifications]);
  useEffect(() => storeJSON("cuk_pending_reviews", pendingReviews), [pendingReviews]);

  const setRole = (r: Role | null) => setRoleState(r);

  const user = useMemo(() => {
    if (role === "student") return currentStudent;
    if (role === "teacher") return currentTeacher;
    if (role === "admin") return currentAdmin;
    return null;
  }, [role]);

  const addSubmission = (s: HomeworkSubmission) => {
    setSubmissions(prev => [s, ...prev]);
    setPendingReviews(prev => [s, ...prev]);
  };

  const addVocabWord = (w: VocabWord) => setVocab((prev) => [w, ...prev]);

  const reviewWord = (id: string, known: boolean) =>
    setVocab((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        const box = known ? Math.min(5, w.box + 1) : 1;
        const daysAhead = [1, 2, 4, 7, 14][box - 1] ?? 1;
        const next = new Date();
        next.setDate(next.getDate() + daysAhead);
        return { ...w, box, nextReview: next.toISOString().slice(0, 10) };
      })
    );

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const addNotification = (n: NotificationItem) => setNotifications((prev) => [n, ...prev]);

  const gradeSubmission = (id: string, comment: string, score: number) => {
    const update = (prev: HomeworkSubmission[]): HomeworkSubmission[] =>
      prev.map((s) => (s.id === id ? { ...s, teacherComment: comment, teacherScore: score, status: "teacher-reviewed" } : s));
    setPendingReviews(update);
    setSubmissions(update);
    if (submissions.some(s => s.id === id)) addNotification({id: "review-" + id, kind: "comment", title: "Homework reviewed", body: comment || "Your teacher returned your score.", time: "Just now", read: false});
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        user,
        submissions,
        addSubmission,
        vocab,
        addVocabWord,
        reviewWord,
        notifications,
        markAllRead,
        addNotification,
        pendingReviews,
        gradeSubmission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
