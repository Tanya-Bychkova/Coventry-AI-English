import { useState } from "react";
import { Card, Pill, Button, PageHeader, EmptyState } from "../../components/ui";
import { useApp } from "../../context/AppContext";
import { Plus, RotateCw, Check, X } from "lucide-react";

export default function MyWords() {
  const { vocab, addVocabWord, reviewWord } = useApp();
  const [mode, setMode] = useState<"list" | "flashcards">("list");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ word: "", translation: "", example: "", synonyms: "" });
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const dueToday = vocab.filter((w) => w.nextReview <= today);

  const submit = () => {
    if (!form.word.trim() || !form.translation.trim()) return;
    addVocabWord({
      id: `v-${Date.now()}`,
      word: form.word,
      translation: form.translation,
      example: form.example || "—",
      synonyms: form.synonyms.split(",").map((s) => s.trim()).filter(Boolean),
      addedAt: today,
      box: 1,
      nextReview: today,
    });
    setForm({ word: "", translation: "", example: "", synonyms: "" });
    setShowForm(false);
  };

  const card = dueToday[cardIdx];

  const handleReview = (known: boolean) => {
    if (!card) return;
    reviewWord(card.id, known);
    setFlipped(false);
    setCardIdx((i) => (i + 1 < dueToday.length ? i + 1 : 0));
  };

  return (
    <div>
      <PageHeader
        eyebrow="Vocabulary"
        title="My Words"
        description="Every word you save builds your personal bank — with translation, examples, synonyms and spaced-repetition flashcards."
      />

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setMode("list")}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium ${mode === "list" ? "bg-[var(--color-ink)] text-white" : "bg-[var(--color-line)] text-[var(--color-slate)]"}`}
          >
            Word list ({vocab.length})
          </button>
          <button
            onClick={() => setMode("flashcards")}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium ${mode === "flashcards" ? "bg-[var(--color-ink)] text-white" : "bg-[var(--color-line)] text-[var(--color-slate)]"}`}
          >
            Review flashcards ({dueToday.length} due)
          </button>
        </div>
        {mode === "list" && (
          <Button onClick={() => setShowForm((s) => !s)} variant="secondary">
            <Plus size={16} /> Add word
          </Button>
        )}
      </div>

      {mode === "list" && (
        <>
          {showForm && (
            <Card className="p-6 mb-6">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input
                  placeholder="Word or phrase"
                  value={form.word}
                  onChange={(e) => setForm({ ...form, word: e.target.value })}
                  className="border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm"
                />
                <input
                  placeholder="Translation"
                  value={form.translation}
                  onChange={(e) => setForm({ ...form, translation: e.target.value })}
                  className="border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm"
                />
                <input
                  placeholder="Example sentence"
                  value={form.example}
                  onChange={(e) => setForm({ ...form, example: e.target.value })}
                  className="sm:col-span-2 border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm"
                />
                <input
                  placeholder="Synonyms (comma separated)"
                  value={form.synonyms}
                  onChange={(e) => setForm({ ...form, synonyms: e.target.value })}
                  className="sm:col-span-2 border border-[var(--color-line)] rounded-lg px-3 py-2.5 text-sm"
                />
              </div>
              <Button onClick={submit}>Save word</Button>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {vocab.map((w) => (
              <Card key={w.id} className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-[family-name:var(--font-display)] text-lg">{w.word}</h3>
                  <Pill tone="gold">Box {w.box}/5</Pill>
                </div>
                <p className="text-sm text-[var(--color-slate)] mb-2">{w.translation}</p>
                <p className="text-sm italic text-[var(--color-ink)]/80 mb-2">"{w.example}"</p>
                {w.synonyms.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {w.synonyms.map((s) => (
                      <Pill key={s} tone="neutral">{s}</Pill>
                    ))}
                  </div>
                )}
                <div className="text-xs font-mono text-[var(--color-slate)] mt-3">Next review: {w.nextReview}</div>
              </Card>
            ))}
          </div>
        </>
      )}

      {mode === "flashcards" && (
        <div className="max-w-lg mx-auto">
          {!card ? (
            <EmptyState title="All caught up" body="No words are due for review right now — come back later." />
          ) : (
            <Card
              className="p-10 text-center cursor-pointer min-h-[260px] flex flex-col items-center justify-center"
              onClick={() => setFlipped((f) => !f)}
            >
              <div className="text-xs font-mono uppercase text-[var(--color-slate)] mb-4 flex items-center gap-1.5">
                <RotateCw size={12} /> Tap to flip
              </div>
              {!flipped ? (
                <h2 className="font-[family-name:var(--font-display)] text-3xl">{card.word}</h2>
              ) : (
                <div>
                  <p className="text-lg text-[var(--color-slate)] mb-3">{card.translation}</p>
                  <p className="text-sm italic">"{card.example}"</p>
                </div>
              )}
            </Card>
          )}
          {card && (
            <div className="flex gap-3 mt-5 justify-center">
              <Button variant="ghost" onClick={() => handleReview(false)}>
                <X size={16} /> Still learning
              </Button>
              <Button onClick={() => handleReview(true)}>
                <Check size={16} /> I knew it
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
