import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

const prompts = [
  { lead: "I have lived in Astana ___ 2022.", options: ["for", "since", "during"], answer: "since", why: "Use “since” with the starting point of a period." },
  { lead: "Could you ___ me your notes?", options: ["borrow", "lend", "owe"], answer: "lend", why: "A person lends something to someone who borrows it." },
  { lead: "If I had more time, I ___ French.", options: ["learned", "will learn", "would learn"], answer: "would learn", why: "Use “would” for the imagined result after “if” and the past simple." }
];
export function DailyPractice() {
  const day = Math.floor(Date.now() / 86400000);
  const exercise = prompts[day % prompts.length];
  const key = "cuk_daily_" + day;
  const [choice, setChoice] = useState(() => {
    try { return localStorage.getItem(key) || ""; } catch { return ""; }
  });
  const complete = choice === exercise.answer;
  function pick(value: string) {
    setChoice(value);
    if (value === exercise.answer) {
      try { localStorage.setItem(key, value); } catch { /* Private browsing can disable storage. */ }
    }
  }
  return <section className="daily-practice"><div className="daily-label"><Sparkles size={16}/> Daily warm-up</div>
    <h2>{exercise.lead}</h2><div className="daily-options">{exercise.options.map(value =>
      <button key={value} disabled={complete} aria-pressed={choice === value} onClick={() => pick(value)}>{value}{complete && value === choice && <Check size={16}/>}</button>
    )}</div><p aria-live="polite">{complete ? "Completed! " + exercise.why : choice ? "Try another answer. " + exercise.why : "Choose the word or phrase that completes the sentence."}</p></section>;
}
