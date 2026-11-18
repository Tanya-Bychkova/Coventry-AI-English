import type { CEFRLevel } from "../types";

const LEVEL_ORDER: CEFRLevel[] = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"];

const LEVEL_COLORS: Record<CEFRLevel, { bg: string; fg: string }> = {
  "Pre-A1": { bg: "#ebf3ff", fg: "#36516c" },
  A1: { bg: "#e4f6ff", fg: "#12456b" },
  A2: { bg: "#c1e5ff", fg: "#12456b" },
  B1: { bg: "#a9d5ff", fg: "#163c76" },
  B2: { bg: "#87bcff", fg: "#092e6d" },
  C1: { bg: "#496cc6", fg: "#ffffff" },
  C2: { bg: "#143773", fg: "#ffffff" },
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
                background: active ? (isCurrent ? "#1859c3" : "#b6d9ff") : "#ebf3ff",
                color: active ? (isCurrent ? "#fff" : "#143773") : "#4e6486",
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
