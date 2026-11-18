import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowRight, BookOpen, RotateCw, GraduationCap, Presentation, ChartNoAxesCombined } from "lucide-react";
import { useApp } from "../context/AppContext";
import type { Role } from "../types";

const roles = [
  { role: "student", label: "Student", detail: "Practise English and track your progress.", icon: GraduationCap },
  { role: "teacher", label: "Teacher", detail: "Review assignments and give feedback.", icon: Presentation },
  { role: "admin", label: "Administrator", detail: "Explore learning across faculties.", icon: ChartNoAxesCombined },
] as const;

const words = [
  { word: "Curiosity", type: "noun", meaning: "A strong desire to learn or know something." },
  { word: "Fluent", type: "adjective", meaning: "Able to speak a language easily and clearly." },
  { word: "Explore", type: "verb", meaning: "To look closely at a place or idea and discover more." },
];

export default function Login() {
  const { setRole } = useApp();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = words[index];
  function enter(role: Role) {
    setRole(role);
    navigate("/" + role);
  }
  return <main className="landing">
    <header className="mast"><div className="brand"><span className="brand-icon"><BookOpen /></span> Coventry English AI</div><span className="edition">Portfolio demo</span></header>
    <section className="cover">
      <div className="intro"><p className="kicker">Coventry · English language lab</p>
        <h1>Find your<br/><em>English voice.</em></h1>
        <p className="lede">Build confidence for your next seminar, essay or conversation with bite-sized English practice.</p>
        <button className="start" onClick={() => enter("student")}>Enter student demo <ArrowRight size={19}/></button>
      </div>
      <div className="deck"><div className="card-stack">
        <button className="word-card" onClick={() => setFlipped(!flipped)} aria-label={flipped ? "Show word" : "Reveal definition"}>
          <span className="card-meta"><BookOpen size={19}/> Vocabulary practice</span>
          <span key={card.word + flipped} className={flipped ? "definition" : "display-word"}>{flipped ? card.meaning : card.word}</span>
          <span className="card-bottom">{flipped ? "Definition" : card.type}<RotateCw size={19}/></span>
        </button></div>
        <div className="deck-controls"><span>Flashcard {index+1} / {words.length}</span><button onClick={() => {setIndex((index+1)%words.length); setFlipped(false);}}>Next word <ArrowRight size={16}/></button></div>
      </div>
    </section>
    <section className="portals"><h2>Choose your workspace</h2><div className="portal-grid">{roles.map(({role,label,detail,icon:Icon}) =>
      <button key={role} className={'portal '+role} onClick={() => enter(role)}><span className="portal-icon"><Icon size={23}/></span><span><strong>{label}</strong><small>{detail}</small></span><ArrowUpRight size={19}/></button>
    )}</div></section><footer className="foot">Independent student portfolio project · Sample accounts and simulated AI feedback</footer>
  </main>;
}
