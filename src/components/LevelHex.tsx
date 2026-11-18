import type { CEFRLevel } from "../types";

const LEVEL_ORDER: CEFRLevel[] = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"];

const LEVEL_COLORS: Record<CEFRLevel, { bg: string; fg: string }> = {
  "Pre-A1": { bg: "#e4e1d6", fg: "#5c6470" },
  A1: { bg: "#dcefe4", fg: "#1f8f5f" },
  A2: { bg: "#c9e6d6", fg: "#1f8f5f" },
  B1: { bg: "#f5e6cc", fg: "#b8720b" },
  B2: { bg: "#f1e4c8", fg: "#b5893a" },
  C1: { bg: "#f6d9de", fg: "#c8102e" },
  C2: { bg: "#93081f", fg: "#ffffff" },
};

export function LevelHex({
  level,
  size = 44,
  showLabel = true,
}: {
  level: CEFRLevel;
  size?: number;
  showLabel?: boolean;
}) {
  const colors = LEVEL_COLORS[level];
  return (
    <div className="inline-flex items-center gap-2">
      <div
        className="hex-clip flex items-center justify-center font-mono font-semibold"
        style={{ width: size, height: size, background: colors.bg, color: colors.fg, fontSize: size * 0.28 }}
        title={`CEFR level: ${level}`}
      >
        {level.replace("Pre-", "")}
      </div>
      {showLabel && <span className="text-sm text-[var(--color-slate)] font-medium">CEFR {level}</span>}
    </div>
  );
}

export function LevelLadder({ current }: { current: CEFRLevel }) {
  const currentIdx = LEVEL_ORDER.indexOf(current);
  return (
    <div className="flex items-center gap-1.5">
      {LEVEL_ORDER.map((lvl, idx) => {
        const active = idx <= currentIdx;
        const isCurrent = idx === currentIdx;
        return (
          <div key={lvl} className="flex flex-col items-center gap-1">
            <div
              className="hex-clip flex items-center justify-center font-mono text-[10px] font-semibold transition-all"
              style={{
                width: isCurrent ? 30 : 22,
                height: isCurrent ? 30 : 22,
                background: active ? (isCurrent ? "#c8102e" : "#f1e4c8") : "#e4e1d6",
                color: active ? (isCurrent ? "#fff" : "#93081f") : "#8a90a0",
              }}
            >
              {lvl.replace("Pre-", "")}
            </div>
          </div>
        );
      })}
    </div>
  );
}
