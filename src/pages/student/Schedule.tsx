import { Card, Pill, PageHeader } from "../../components/ui";
import { scheduleEvents } from "../../data/mockData";
import type { ScheduleEvent } from "../../types";
import { BookOpen, Clock3, ListChecks, Mic, Users, GraduationCap } from "lucide-react";

const ICONS: Record<ScheduleEvent["type"], typeof BookOpen> = {
  class: BookOpen,
  deadline: Clock3,
  test: ListChecks,
  speaking: Mic,
  consultation: Users,
  exam: GraduationCap,
};

const TONES: Record<ScheduleEvent["type"], "neutral" | "red" | "green" | "gold" | "amber"> = {
  class: "neutral",
  deadline: "amber",
  test: "red",
  speaking: "gold",
  consultation: "green",
  exam: "red",
};

export default function Schedule() {
  const grouped = scheduleEvents.reduce<Record<string, ScheduleEvent[]>>((acc, e) => {
    (acc[e.date] ||= []).push(e);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        eyebrow="Planning"
        title="Schedule"
        description="Classes, homework deadlines, tests, speaking sessions, consultations and exams — all in one timeline."
      />

      <div className="agenda space-y-6">
        {Object.entries(grouped).map(([date, events]) => (
          <div key={date}>
            <div className="font-mono text-xs uppercase tracking-wide text-[var(--color-slate)] mb-2">{date}</div>
            <div className="space-y-2">
              {events.map((e) => {
                const Icon = ICONS[e.type];
                return (
                  <Card key={e.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon size={17} className="text-[var(--color-slate)]" />
                      <div>
                        <div className="font-medium text-sm">{e.title}</div>
                        <div className="text-xs text-[var(--color-slate)] font-mono">{e.time}</div>
                      </div>
                    </div>
                    <Pill tone={TONES[e.type]}>{e.type}</Pill>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
