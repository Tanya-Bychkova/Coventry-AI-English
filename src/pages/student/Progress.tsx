import { Card, PageHeader } from "../../components/ui";
import { LevelLadder } from "../../components/LevelHex";
import { testResults } from "../../data/mockData";
import { useApp } from "../../context/AppContext";
import {
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const hoursHistory = [
  { week: "W1", hours: 3.5 },
  { week: "W2", hours: 4.2 },
  { week: "W3", hours: 5.0 },
  { week: "W4", hours: 4.6 },
  { week: "W5", hours: 6.1 },
  { week: "W6", hours: 6.5 },
];

export default function Progress() {
  const { vocab, submissions, user } = useApp();
  const latestTest = testResults[testResults.length - 1];
  const avgHwScore =
    submissions.length > 0
      ? Math.round(submissions.reduce((sum, s) => sum + (s.aiScore ?? 0), 0) / submissions.length)
      : 0;

  return (
    <div>
      <PageHeader eyebrow="Overview" title="Your progress" description="Track your hours, vocabulary growth, skill balance and CEFR trajectory." />

      <div className="metric-strip grid md:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <div className="text-xs font-mono uppercase text-[var(--color-slate)] mb-1">Hours studied</div>
          <div className="font-[family-name:var(--font-display)] text-2xl">29.9h</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-mono uppercase text-[var(--color-slate)] mb-1">Words learned</div>
          <div className="font-[family-name:var(--font-display)] text-2xl">{vocab.length}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-mono uppercase text-[var(--color-slate)] mb-1">Avg homework score</div>
          <div className="font-[family-name:var(--font-display)] text-2xl">{avgHwScore || "—"}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-mono uppercase text-[var(--color-slate)] mb-1">Current level</div>
          <div className="font-[family-name:var(--font-display)] text-2xl">{user?.role === "student" ? user.level : "B1"}</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="font-[family-name:var(--font-display)] text-lg mb-4">Study hours per week</h3>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <LineChart data={hoursHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line)" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: "var(--color-slate)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--color-slate)" }} />
                <Tooltip />
                <Line type="monotone" dataKey="hours" stroke="var(--color-red)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-[family-name:var(--font-display)] text-lg mb-4">Skill balance (latest test)</h3>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <RadarChart data={latestTest.scores}>
                <PolarGrid stroke="var(--color-line)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "var(--color-slate)" }} />
                <Radar dataKey="score" stroke="var(--color-red)" fill="var(--color-red)" fillOpacity={0.25} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-[family-name:var(--font-display)] text-lg mb-5">CEFR trajectory</h3>
        <LevelLadder current={user?.role === "student" ? user.level ?? "B1" : "B1"} />
        <p className="text-sm text-[var(--color-slate)] mt-4">
          You moved from A2 to B1 after your test on {latestTest.date}. Two more module tests will confirm readiness for B2.
        </p>
      </Card>
    </div>
  );
}
