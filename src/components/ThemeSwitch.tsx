import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitch() {
  const [dark, setDark] = useState(document.documentElement.dataset.theme === "dark");
  function toggle() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("cuk_theme", next); } catch { /* Use the current tab. */ }
    setDark(!dark);
  }
  return <button type="button" className="theme-switch" aria-label="Dark theme" aria-pressed={dark} title={dark ? "Switch to light theme" : "Switch to dark theme"} onClick={toggle}>
    {dark ? <Sun size={17}/> : <Moon size={17}/>}<span>{dark ? "Light mode" : "Dark mode"}</span>
  </button>;
}
