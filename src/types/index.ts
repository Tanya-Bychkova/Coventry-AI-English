export type CEFRLevel = "Pre-A1" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type Role = "student" | "teacher" | "admin";

export interface User {
  id: string;
  fullName: string;
  role: Role;
  faculty?: string;
  group?: string;
  level?: CEFRLevel;
  avatarInitials: string;
}

export interface ModuleItem {
  id: string;
  title: string;
  kind: "video" | "reading" | "grammar" | "vocabulary" | "exercise" | "listening" | "speaking" | "writing" | "test";
  durationMin: number;
  done: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  items: ModuleItem[];
  unlocked: boolean;
}

export interface Course {
  id: string;
  title: string;
  levelRange: string;
  teacher: string;
  description: string;
  totalModules: number;
  progressPct: number;
  deadline: string;
  modules: CourseModule[];
  category: "General English" | "IELTS Prep" | "Business English" | "Academic Writing";
}

export interface HomeworkSubmission {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  type: "essay" | "letter" | "report" | "grammar" | "reading" | "vocabulary";
  submittedAt: string;
  text: string;
  status: "pending" | "ai-graded" | "teacher-reviewed";
  aiScore?: number;
  aiLevel?: CEFRLevel;
  aiFeedback?: string[];
  teacherComment?: string;
  teacherScore?: number;
}

export interface TestResult {
  id: string;
  levelTested: CEFRLevel;
  date: string;
  scores: { skill: string; score: number }[];
  overall: number;
  resultLevel: CEFRLevel;
}

export interface VocabWord {
  id: string;
  word: string;
  translation: string;
  example: string;
  synonyms: string[];
  addedAt: string;
  box: number; // spaced repetition box 1-5
  nextReview: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  type: "class" | "deadline" | "test" | "speaking" | "consultation" | "exam";
  date: string;
  time: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  kind: "assignment" | "deadline" | "lesson" | "test" | "comment" | "schedule";
}

export interface Certificate {
  id: string;
  courseName: string;
  level: CEFRLevel;
  issuedAt: string;
  grade: string;
}

export interface ChatMessage {
  id: string;
  from: "user" | "ai";
  text: string;
  time: string;
}
