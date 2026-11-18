# Coventry English AI — Prototype

A working TypeScript + React prototype of the AI-powered English learning platform
described in the technical specification for Coventry University Kazakhstan.

This implements every module from the spec as a functional, navigable app with
realistic mock data and **simulated AI** (rule-based grading, no external API calls),
so you can click through the whole experience with no setup beyond `npm install`.

## What's implemented

- **Student portal**: personal dashboard, courses (Coursera-style modules that
  unlock progressively), homework submission with instant simulated AI grading
  (spelling/grammar checks, CEFR level estimate, feedback), CEFR progress testing
  across Grammar / Vocabulary / Reading / Listening / Writing / Speaking, an AI
  Speaking partner (chat-style practice with fluency & pronunciation scoring), an
  AI Writing Coach, a vocabulary bank ("My Words") with spaced-repetition
  flashcards, a schedule, a progress dashboard with charts, an AI Tutor chat,
  notifications, and certificates.
- **Teacher portal**: dashboard, course management (create/upload materials/assign
  homework), a review queue for AI-graded submissions (add comments, override
  scores), and a student roster.
- **Admin portal**: platform-wide analytics — average level by faculty, attendance
  trend, level distribution, usage reports.

Data persists locally in the browser (`localStorage`) so submissions, saved
vocabulary and notifications survive a refresh. There's no real backend or
database — see "Turning this into a real product" below.

## Design

- Colors: ink/charcoal navy, an academic red accent, warm parchment background,
  slate for secondary text, gold for certificates/achievements, green for success.
- Type: Fraunces (display serif) for headings, IBM Plex Sans for body text,
  IBM Plex Mono for scores, levels and data.
- Signature element: a hexagonal CEFR level badge (Pre-A1 -> C2) used consistently
  across the app -- profile, homework, tests, certificates -- since level is the
  organizing idea of the whole product.

## Running it

```bash
npm install
npm run dev       # http://localhost:5173
```

To build a production bundle:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  types/               shared TypeScript types
  data/mockData.ts     seed data (courses, tests, schedule, vocab, notifications...)
  lib/aiSimulator.ts   rule-based "AI" grading, CEFR scoring, chat responses
  context/AppContext.tsx   role switching + persisted state (localStorage)
  components/          shared UI (Layout/sidebar, LevelHex badge, Card/Button/Pill...)
  pages/student/        12 student-facing pages
  pages/teacher/        4 teacher-facing pages
  pages/admin/          analytics dashboard
```

## Turning this into a real product

This prototype simulates the AI features with deterministic client-side logic
(`src/lib/aiSimulator.ts`) so the whole thing runs anywhere with no API keys.
To make the AI genuinely intelligent, that file is the integration point -- swap
its functions for calls to a real language model (e.g. via a backend that proxies
the Anthropic API) for writing/speech analysis, and add a real backend
(database + auth) behind `AppContext.tsx` in place of `localStorage`.
