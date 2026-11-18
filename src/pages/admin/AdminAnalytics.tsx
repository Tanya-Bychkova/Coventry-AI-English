import { Card, Pill, PageHeader } from "../../components/ui";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Users, TrendingUp, BookOpenCheck, Activity } from "lucide-react";

const facultyProgress = [
  { faculty: "Business & Computing", avgLevel: 68 },
  { faculty: "Engineering", avgLevel: 58 },
  { faculty: "Law", avgLevel: 74 },
  { faculty: "Media & Design", avgLevel: 62 },
];

const attendanceTrend = [
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 91 },
  { month: "Apr", attendance: 85 },
  { month: "May", attendance: 90 },
  { month: "Jun", attendance: 93 },
];

const levelDistribution = [
  { name: "A1", value: 12 },
  { name: "A2", value: 28 },
  { name: "B1", value: 34 },
  { name: "B2", value: 18 },
  { name: "C1", value: 8 },
];

const PIE_COLORS = ["#acdfff", "#669ef0", "#3471d7", "#254aa4", "#172f63"];

export default function AdminAnalytics() {
  return (
    <div>
      <PageHeader eyebrow="Administration" title="Platform analytics" description="Performance, attendance, faculty progress and usage across Coventry University Kazakhstan." />

      <div className="metric-strip grid md:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--color-slate)] mb-2">
            <Users size={14} /> Active students
          </div>
          <div className="font-[family-name:var(--font-display)] text-3xl">1,248</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--color-slate)] mb-2">
            <TrendingUp size={14} /> Avg English level
          </div>
          <div className="font-[family-name:var(--font-display)] text-3xl">B1</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--color-slate)] mb-2">
            <BookOpenCheck size={14} /> Courses completed
          </div>
          <div className="font-[family-name:var(--font-display)] text-3xl">3,402</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--color-slate)] mb-2">
            <Activity size={14} /> Weekly active use
          </div>
          <div className="font-[family-name:var(--font-display)] text-3xl">76%</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="font-[family-name:var(--font-display)] text-lg mb-4">Average level by faculty</h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={facultyProgress} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: "var(--color-slate)" }} />
                <YAxis type="category" dataKey="faculty" width={150} tick={{ fontSize: 11, fill: "var(--color-slate)" }} />
                <Tooltip />
                <Bar dataKey="avgLevel" fill="var(--color-red)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-[family-name:var(--font-display)] text-lg mb-4">Attendance trend</h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-line)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--color-slate)" }} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 12, fill: "var(--color-slate)" }} />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="var(--color-green)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-[family-name:var(--font-display)] text-lg mb-4">Student level distribution</h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={levelDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={84} label>
                  {levelDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-[family-name:var(--font-display)] text-lg mb-4">Usage reports</h3>
          <div className="space-y-3">
            {[
              { label: "Monthly platform usage report", date: "Jun 2026" },
              { label: "Faculty progress summary", date: "Jun 2026" },
              { label: "AI grading accuracy audit", date: "May 2026" },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between border border-[var(--color-line)] rounded-lg p-4">
                <div className="text-sm font-medium">{r.label}</div>
                <Pill tone="neutral">{r.date}</Pill>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
