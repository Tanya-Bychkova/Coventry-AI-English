import { Card, Pill, PageHeader } from "../../components/ui";
import { LevelHex } from "../../components/LevelHex";
import type { CEFRLevel } from "../../types";

const students: { name: string; group: string; level: CEFRLevel; progress: number; lastActive: string }[] = [
  { name: "Aidana Serikova", group: "CS-24-2", level: "B1", progress: 62, lastActive: "Today" },
  { name: "Nurlan Bekov", group: "CS-24-2", level: "A2", progress: 44, lastActive: "Yesterday" },
  { name: "Dana Amirova", group: "BUS-23-1", level: "B2", progress: 81, lastActive: "2 days ago" },
  { name: "Yerlan Toktar", group: "CS-24-2", level: "B1", progress: 55, lastActive: "3 days ago" },
  { name: "Alina Kim", group: "BUS-23-1", level: "A2", progress: 30, lastActive: "5 days ago" },
];

export default function Students() {
  return (
    <div>
      <PageHeader eyebrow="Cohort overview" title="Students" description="Track progress and CEFR level across your groups." />

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-mono uppercase text-[var(--color-slate)] border-b border-[var(--color-line)]">
              <th className="px-5 py-3 font-medium">Student</th>
              <th className="px-5 py-3 font-medium">Group</th>
              <th className="px-5 py-3 font-medium">Level</th>
              <th className="px-5 py-3 font-medium">Progress</th>
              <th className="px-5 py-3 font-medium">Last active</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.name} className="border-b border-[var(--color-line)] last:border-0">
                <td className="px-5 py-3.5 font-medium">{s.name}</td>
                <td className="px-5 py-3.5 text-[var(--color-slate)]">{s.group}</td>
                <td className="px-5 py-3.5"><LevelHex level={s.level} size={28} showLabel={false} /></td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 rounded-full bg-[var(--color-line)]">
                      <div className="h-full rounded-full bg-[var(--color-red)]" style={{ width: `${s.progress}%` }} />
                    </div>
                    <span className="text-xs text-[var(--color-slate)]">{s.progress}%</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <Pill tone={s.lastActive === "Today" ? "green" : "neutral"}>{s.lastActive}</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
