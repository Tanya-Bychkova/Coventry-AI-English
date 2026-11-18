import { Card, Pill, Button, PageHeader } from "../../components/ui";
import { useApp } from "../../context/AppContext";
import { FileText, Clock3, BookOpen, ListChecks, MessageSquare, CalendarClock } from "lucide-react";
import type { NotificationItem } from "../../types";

const ICONS: Record<NotificationItem["kind"], typeof FileText> = {
  assignment: FileText,
  deadline: Clock3,
  lesson: BookOpen,
  test: ListChecks,
  comment: MessageSquare,
  schedule: CalendarClock,
};

export default function Notifications() {
  const { notifications, markAllRead } = useApp();

  return (
    <div>
      <PageHeader eyebrow="Stay updated" title="Notifications" description="New assignments, deadlines, lessons, test results, teacher comments and schedule changes." />

      <div className="flex justify-end mb-4">
        <Button variant="ghost" onClick={markAllRead}>Mark all as read</Button>
      </div>

      <div className="space-y-2">
        {notifications.map((n) => {
          const Icon = ICONS[n.kind];
          return (
            <Card key={n.id} className={`p-4 flex items-start gap-3 ${!n.read ? "border-[var(--color-red)]/30 bg-[var(--color-red-soft)]/20" : ""}`}>
              <div className="w-9 h-9 rounded-full bg-[var(--color-paper)] flex items-center justify-center shrink-0">
                <Icon size={16} className="text-[var(--color-slate)]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{n.title}</div>
                  {!n.read && <Pill tone="red">New</Pill>}
                </div>
                <div className="text-sm text-[var(--color-slate)] mt-0.5">{n.body}</div>
                <div className="text-xs font-mono text-[var(--color-slate-soft)] mt-1">{n.time}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
