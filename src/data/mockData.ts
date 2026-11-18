import type {
  Course,
  ScheduleEvent,
  NotificationItem,
  VocabWord,
  Certificate,
  TestResult,
  HomeworkSubmission,
} from "../types";

export const currentStudent = {
  id: "s-001",
  fullName: "Aidana Serikova",
  role: "student" as const,
  faculty: "Faculty of Business & Computing",
  group: "CS-24-2",
  level: "B1" as const,
  avatarInitials: "AS",
};

export const currentTeacher = {
  id: "t-001",
  fullName: "Dr. Emily Hartford",
  role: "teacher" as const,
  avatarInitials: "EH",
};

export const currentAdmin = {
  id: "a-001",
  fullName: "Marat Zhaksybekov",
  role: "admin" as const,
  avatarInitials: "MZ",
};

export const courses: Course[] = [
  {
    id: "c-1",
    title: "General English — Intermediate Bridge",
    levelRange: "A2 → B1",
    teacher: "Dr. Emily Hartford",
    description:
      "A bridging course consolidating grammar, vocabulary and the four skills before Cambridge B1 Preliminary.",
    totalModules: 8,
    progressPct: 62,
    deadline: "2026-07-20",
    category: "General English",
    modules: [
      {
        id: "m-1",
        title: "Module 1 — Present & Past Review",
        unlocked: true,
        items: [
          { id: "i-1", title: "Grammar in context: tense review", kind: "grammar", durationMin: 20, done: true },
          { id: "i-2", title: "Video: everyday conversations", kind: "video", durationMin: 12, done: true },
          { id: "i-3", title: "Vocabulary: daily routines", kind: "vocabulary", durationMin: 15, done: true },
          { id: "i-4", title: "Listening: at the airport", kind: "listening", durationMin: 10, done: true },
        ],
      },
      {
        id: "m-2",
        title: "Module 2 — Future Forms & Predictions",
        unlocked: true,
        items: [
          { id: "i-5", title: "Grammar: will / going to / present continuous", kind: "grammar", durationMin: 20, done: true },
          { id: "i-6", title: "Reading: cities of the future", kind: "reading", durationMin: 15, done: true },
          { id: "i-7", title: "Speaking task: your predictions", kind: "speaking", durationMin: 10, done: false },
          { id: "i-8", title: "Module test", kind: "test", durationMin: 25, done: false },
        ],
      },
      {
        id: "m-3",
        title: "Module 3 — Comparatives & Description",
        unlocked: true,
        items: [
          { id: "i-9", title: "Grammar: comparatives & superlatives", kind: "grammar", durationMin: 18, done: false },
          { id: "i-10", title: "Writing task: comparing two cities", kind: "writing", durationMin: 20, done: false },
          { id: "i-11", title: "Vocabulary: adjectives of opinion", kind: "vocabulary", durationMin: 12, done: false },
        ],
      },
      { id: "m-4", title: "Module 4 — Modals of Obligation", unlocked: false, items: [] },
    ],
  },
  {
    id: "c-2",
    title: "IELTS Preparation — Band 6.5 Target",
    levelRange: "B1 → B2",
    teacher: "Dr. Emily Hartford",
    description: "Full-skills preparation for the IELTS Academic exam with weekly mock tests.",
    totalModules: 10,
    progressPct: 34,
    deadline: "2026-08-05",
    category: "IELTS Prep",
    modules: [
      {
        id: "m-5",
        title: "Module 1 — IELTS Writing Task 1",
        unlocked: true,
        items: [
          { id: "i-12", title: "Understanding graphs & charts", kind: "reading", durationMin: 15, done: true },
          { id: "i-13", title: "Writing task: describe a chart", kind: "writing", durationMin: 25, done: true },
        ],
      },
      {
        id: "m-6",
        title: "Module 2 — IELTS Speaking Part 2",
        unlocked: true,
        items: [
          { id: "i-14", title: "Cue card strategy", kind: "video", durationMin: 10, done: false },
          { id: "i-15", title: "Speaking practice with AI examiner", kind: "speaking", durationMin: 15, done: false },
        ],
      },
    ],
  },
  {
    id: "c-3",
    title: "Academic Writing for University Study",
    levelRange: "B2",
    teacher: "Prof. Daniel Cross",
    description: "Essay structure, argumentation and academic register for coursework at CUK.",
    totalModules: 6,
    progressPct: 10,
    deadline: "2026-09-01",
    category: "Academic Writing",
    modules: [
      {
        id: "m-7",
        title: "Module 1 — Thesis & Structure",
        unlocked: true,
        items: [
          { id: "i-16", title: "What makes a strong thesis statement", kind: "reading", durationMin: 12, done: true },
          { id: "i-17", title: "Practice essay: outline only", kind: "writing", durationMin: 20, done: false },
        ],
      },
    ],
  },
];

export const initialSubmissions: HomeworkSubmission[] = [
  {
    id: "hw-1",
    courseId: "c-1",
    courseName: "General English — Intermediate Bridge",
    title: "Comparing two cities",
    type: "essay",
    submittedAt: "2026-06-28",
    text: "Almaty and Astana are both very interesting cities in Kazakhstan, but they are diferent in many ways. Almaty is more older and have beautiful mountains near the city. Astana is more modern and have alot of new buildings. I think Almaty is more nicer because the nature is amazing, but Astana growing very fast and become important for bussiness.",
    status: "ai-graded",
    aiScore: 68,
    aiLevel: "B1",
    aiFeedback: [
      "Spelling: \"diferent\" → \"different\", \"bussiness\" → \"business\".",
      "Grammar: \"is more older\" → \"is older\"; avoid double comparatives with -er adjectives.",
      "Grammar: \"have alot of\" → \"has a lot of\"; subject-verb agreement with singular nouns.",
      "Style: good use of comparative structures overall — keep linking ideas with \"however\" and \"in contrast\".",
    ],
  },
];

export const testResults: TestResult[] = [
  {
    id: "t-1",
    levelTested: "B1",
    date: "2026-05-14",
    overall: 71,
    resultLevel: "B1",
    scores: [
      { skill: "Grammar", score: 74 },
      { skill: "Vocabulary", score: 69 },
      { skill: "Reading", score: 78 },
      { skill: "Listening", score: 66 },
      { skill: "Writing", score: 63 },
      { skill: "Speaking", score: 72 },
    ],
  },
];

export const vocabWords: VocabWord[] = [
  { id: "v-1", word: "sustainable", translation: "тұрақты / устойчивый", example: "The university promotes sustainable development on campus.", synonyms: ["durable", "viable", "renewable"], addedAt: "2026-06-20", box: 3, nextReview: "2026-07-05" },
  { id: "v-2", word: "to overcome", translation: "жеңу / преодолевать", example: "She overcame her fear of public speaking.", synonyms: ["to conquer", "to surmount"], addedAt: "2026-06-22", box: 2, nextReview: "2026-07-04" },
  { id: "v-3", word: "insight", translation: "түсінік / понимание", example: "The lecture gave us new insight into climate policy.", synonyms: ["understanding", "perception"], addedAt: "2026-06-25", box: 1, nextReview: "2026-07-04" },
  { id: "v-4", word: "to outline", translation: "белгілеу / очертить", example: "Please outline your main argument in the introduction.", synonyms: ["to sketch", "to summarize"], addedAt: "2026-06-27", box: 4, nextReview: "2026-07-10" },
];

export const scheduleEvents: ScheduleEvent[] = [
  { id: "e-1", title: "General English — Live seminar", type: "class", date: "2026-07-04", time: "10:00" },
  { id: "e-2", title: "Homework due: Comparative essay", type: "deadline", date: "2026-07-06", time: "23:59" },
  { id: "e-3", title: "AI Speaking session — IELTS Part 2", type: "speaking", date: "2026-07-07", time: "14:00" },
  { id: "e-4", title: "CEFR progress test", type: "test", date: "2026-07-10", time: "09:00" },
  { id: "e-5", title: "Consultation with Dr. Hartford", type: "consultation", date: "2026-07-11", time: "16:30" },
  { id: "e-6", title: "IELTS mock exam", type: "exam", date: "2026-07-18", time: "09:00" },
];

export const notifications: NotificationItem[] = [
  { id: "n-1", title: "New homework assigned", body: "\"Comparing two cities\" essay is due July 6.", time: "2 hours ago", read: false, kind: "assignment" },
  { id: "n-2", title: "AI grading complete", body: "Your essay was graded — B1, 68/100.", time: "1 day ago", read: false, kind: "assignment" },
  { id: "n-3", title: "Deadline approaching", body: "Module 2 test closes in 3 days.", time: "1 day ago", read: true, kind: "deadline" },
  { id: "n-4", title: "Teacher comment", body: "Dr. Hartford left a comment on your writing task.", time: "2 days ago", read: true, kind: "comment" },
  { id: "n-5", title: "New lesson available", body: "Module 3 — Comparatives & Description is now unlocked.", time: "3 days ago", read: true, kind: "lesson" },
];

export const certificates: Certificate[] = [
  { id: "cert-1", courseName: "General English — Elementary", level: "A2", issuedAt: "2026-03-15", grade: "Merit" },
];

export const teacherCourses = courses;

export const pendingReviews: HomeworkSubmission[] = [
  {
    id: "hw-r1",
    courseId: "c-1",
    courseName: "General English — Intermediate Bridge",
    title: "Comparing two cities",
    type: "essay",
    submittedAt: "2026-07-01",
    text: "Almaty and Astana are both very interesting cities...",
    status: "ai-graded",
    aiScore: 68,
    aiLevel: "B1",
    aiFeedback: ["Spelling and comparative errors noted.", "Good structure overall."],
  },
  {
    id: "hw-r2",
    courseId: "c-2",
    courseName: "IELTS Preparation — Band 6.5 Target",
    title: "Chart description task",
    type: "report",
    submittedAt: "2026-07-02",
    text: "The chart shows the number of students who chose different subjects between 2015 and 2025...",
    status: "ai-graded",
    aiScore: 74,
    aiLevel: "B2",
    aiFeedback: ["Good use of trend vocabulary.", "Consider more variety of linking devices."],
  },
];
