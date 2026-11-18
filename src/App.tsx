import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Layout } from "./components/Layout";
import Login from "./pages/Login";

import Dashboard from "./pages/student/Dashboard";
import Courses from "./pages/student/Courses";
import CourseDetail from "./pages/student/CourseDetail";
import Homework from "./pages/student/Homework";
import Testing from "./pages/student/Testing";
import AISpeaking from "./pages/student/AISpeaking";
import AIWriting from "./pages/student/AIWriting";
import MyWords from "./pages/student/MyWords";
import Schedule from "./pages/student/Schedule";
import ProgressPage from "./pages/student/Progress";
import AITutor from "./pages/student/AITutor";
import Notifications from "./pages/student/Notifications";
import Certificates from "./pages/student/Certificates";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import ReviewSubmissions from "./pages/teacher/ReviewSubmissions";
import Students from "./pages/teacher/Students";

import AdminAnalytics from "./pages/admin/AdminAnalytics";

function Protected({ role, children }: { role: "student" | "teacher" | "admin"; children: ReactNode }) {
  const { role: currentRole } = useApp();
  if (currentRole !== role) return <Navigate to="/" replace />;
  return <Layout>{children}</Layout>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/student" element={<Protected role="student"><Dashboard /></Protected>} />
      <Route path="/student/courses" element={<Protected role="student"><Courses /></Protected>} />
      <Route path="/student/courses/:id" element={<Protected role="student"><CourseDetail /></Protected>} />
      <Route path="/student/homework" element={<Protected role="student"><Homework /></Protected>} />
      <Route path="/student/testing" element={<Protected role="student"><Testing /></Protected>} />
      <Route path="/student/speaking" element={<Protected role="student"><AISpeaking /></Protected>} />
      <Route path="/student/writing" element={<Protected role="student"><AIWriting /></Protected>} />
      <Route path="/student/words" element={<Protected role="student"><MyWords /></Protected>} />
      <Route path="/student/schedule" element={<Protected role="student"><Schedule /></Protected>} />
      <Route path="/student/progress" element={<Protected role="student"><ProgressPage /></Protected>} />
      <Route path="/student/tutor" element={<Protected role="student"><AITutor /></Protected>} />
      <Route path="/student/notifications" element={<Protected role="student"><Notifications /></Protected>} />
      <Route path="/student/certificates" element={<Protected role="student"><Certificates /></Protected>} />

      <Route path="/teacher" element={<Protected role="teacher"><TeacherDashboard /></Protected>} />
      <Route path="/teacher/courses" element={<Protected role="teacher"><TeacherCourses /></Protected>} />
      <Route path="/teacher/reviews" element={<Protected role="teacher"><ReviewSubmissions /></Protected>} />
      <Route path="/teacher/students" element={<Protected role="teacher"><Students /></Protected>} />

      <Route path="/admin" element={<Protected role="admin"><AdminAnalytics /></Protected>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
}