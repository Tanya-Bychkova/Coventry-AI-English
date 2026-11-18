import { Card, Pill, PageHeader, EmptyState } from "../../components/ui";
import { certificates } from "../../data/mockData";
import { Award } from "lucide-react";

export default function Certificates() {
  return (
    <div>
      <PageHeader
        eyebrow="Achievements"
        title="Certificates"
        description="Explore example certificates for completed courses in this demo."
      />

      {certificates.length === 0 ? (
        <EmptyState title="No certificates yet" body="Complete a course to earn your first certificate." />
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {certificates.map((c) => (
            <Card key={c.id} className="p-0 overflow-hidden">
              <div className="bg-[var(--color-ink)] text-white p-6 relative">
                <div className="absolute top-4 right-4 hex-clip w-9 h-9 bg-[var(--color-gold)] flex items-center justify-center">
                  <Award size={16} />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 mb-2">
                  Coventry University Kazakhstan
                </div>
                <div className="font-[family-name:var(--font-display)] text-xl pr-12">{c.courseName}</div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[var(--color-slate)]">Issued {c.issuedAt}</div>
                  <div className="text-sm font-medium mt-0.5">Level {c.level}</div>
                </div>
                <Pill tone="gold">{c.grade}</Pill>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
