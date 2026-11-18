import { useState } from "react";
import { Card, Pill, Button, PageHeader } from "../../components/ui";
import { teacherCourses } from "../../data/mockData";
import { Plus, Upload, ClipboardList } from "lucide-react";

export default function TeacherCourses() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div>
      <PageHeader eyebrow="Course management" title="My courses" description="Create courses, upload materials, and assign homework to your groups." />

      <div className="flex justify-end mb-5">
        <Button onClick={() => setShowCreate((s) => !s)}>
          <Plus size={16} /> New course
        </Button>
      </div>

      {showCreate && (
        <Card className="p-6 mb-6">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input placeholder="Course title" className="border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm" />
            <input placeholder="Level range (e.g. B1 → B2)" className="border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm" />
          </div>
          <textarea placeholder="Course description" rows={3} className="w-full border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm mb-4 resize-none" />
          <Button onClick={() => setShowCreate(false)}>Create course</Button>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {teacherCourses.map((c) => (
          <Card key={c.id} className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Pill tone="gold">{c.levelRange}</Pill>
              <Pill tone="neutral">{c.category}</Pill>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-xl mb-2">{c.title}</h3>
            <p className="text-sm text-[var(--color-slate)] mb-4">{c.description}</p>
            <div className="flex gap-2">
              <Button variant="ghost">
                <Upload size={14} /> Upload material
              </Button>
              <Button variant="ghost">
                <ClipboardList size={14} /> Assign homework
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
