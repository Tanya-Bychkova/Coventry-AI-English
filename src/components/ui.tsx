import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`lab-panel bg-[var(--color-paper-raised)] border border-[var(--color-line)] rounded-xl ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function ProgressBar({ pct, tone = "red" }: { pct: number; tone?: "red" | "green" | "gold" }) {
  const color = tone === "green" ? "var(--color-green)" : tone === "gold" ? "var(--color-gold)" : "var(--color-red)";
  return (
    <div className="lab-progress w-full h-2 rounded-full bg-[var(--color-line)] overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.max(0, Math.min(100, pct))}%`, background: color }}
      />
    </div>
  );
}

export function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "red" | "green" | "gold" | "amber";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-[var(--color-line)] text-[var(--color-slate)]",
    red: "bg-[var(--color-red-soft)] text-[var(--color-red-deep)]",
    green: "bg-[var(--color-green-soft)] text-[var(--color-green)]",
    gold: "bg-[var(--color-gold-soft)] text-[var(--color-gold)]",
    amber: "bg-[var(--color-amber-soft)] text-[var(--color-amber)]",
  };
  return (
    <span className={`lab-pill inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <header className="page-banner">
      <div className="banner-copy">
        {eyebrow && <p className="section-label">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="banner-description">{description}</p>}
      </div>
      <div className="banner-art" aria-hidden="true">
        <div className="flight-ring"/><div className="paper-bird"><i/><i/><i/><i/><i/></div>
        <div className="desk-art"><i/><i/><i/></div><div className="tower-art"><i/><i/><i/><i/></div>
      </div>
    </header>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <Card className="p-10 text-center">
      <p className="font-[family-name:var(--font-display)] text-lg mb-1">{title}</p>
      <p className="text-[var(--color-slate)] text-sm">{body}</p>
    </Card>
  );
}

export function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const base = "lab-button inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    primary: "bg-[var(--color-red)] text-white hover:bg-[var(--color-red-deep)]",
    secondary: "bg-[var(--color-ink)] text-white hover:bg-[var(--color-ink-soft)]",
    ghost: "bg-transparent text-[var(--color-ink)] border border-[var(--color-line)] hover:bg-[var(--color-paper)]",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
