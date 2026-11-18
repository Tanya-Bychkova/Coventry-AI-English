import type { CEFRLevel } from "../types";

// This module SIMULATES an AI language-assessment engine on the client.
// In production this would call a real model (e.g. via a secure backend
// proxying the Anthropic API) — see README.md for the integration point.

const COMMON_MISSPELLINGS: Record<string, string> = {
  diferent: "different",
  bussiness: "business",
  recieve: "receive",
  wich: "which",
  becuase: "because",
  alot: "a lot",
  goverment: "government",
  enviroment: "environment",
  occured: "occurred",
  definately: "definitely",
  seperate: "separate",
  neccessary: "necessary",
  acheive: "achieve",
  begining: "beginning",
  untill: "until",
};

const GRAMMAR_PATTERNS: { regex: RegExp; message: string }[] = [
  { regex: /\bis more (older|younger|bigger|smaller|nicer|better|worse|faster|slower)\b/gi, message: "Avoid double comparatives — use \"older\" instead of \"more older\"." },
  { regex: /\bhave alot\b/gi, message: "\"have alot\" → \"has a lot\" — check subject-verb agreement." },
  { regex: /\bmuch (people|students|friends|books|cars)\b/gi, message: "Use \"many\" with countable plural nouns, not \"much\"." },
  { regex: /\bi are\b/gi, message: "\"I are\" → \"I am\"." },
  { regex: /\bhe don't\b/gi, message: "\"he don't\" → \"he doesn't\"." },
  { regex: /\bshe don't\b/gi, message: "\"she don't\" → \"she doesn't\"." },
  { regex: /\bcould of\b/gi, message: "\"could of\" → \"could have\"." },
  { regex: /\bshould of\b/gi, message: "\"should of\" → \"should have\"." },
];

export interface AIWritingReport {
  score: number;
  level: CEFRLevel;
  feedback: string[];
  wordCount: number;
  vocabularyRichness: number;
}

function estimateLevel(score: number): CEFRLevel {
  if (score >= 90) return "C1";
  if (score >= 78) return "B2";
  if (score >= 62) return "B1";
  if (score >= 46) return "A2";
  if (score >= 28) return "A1";
  return "Pre-A1";
}

export function analyzeWriting(text: string): AIWritingReport {
  const feedback: string[] = [];
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  let issues = 0;

  // spelling
  const lowerWords = words.map((w) => w.toLowerCase().replace(/[.,!?;:'"]/g, ""));
  const seenMisspellings = new Set<string>();
  lowerWords.forEach((w) => {
    if (COMMON_MISSPELLINGS[w] && !seenMisspellings.has(w)) {
      seenMisspellings.add(w);
      feedback.push(`Spelling: "${w}" → "${COMMON_MISSPELLINGS[w]}".`);
      issues += 1;
    }
  });

  // grammar patterns
  GRAMMAR_PATTERNS.forEach(({ regex, message }) => {
    if (regex.test(text)) {
      feedback.push(`Grammar: ${message}`);
      issues += 1;
    }
  });

  // vocabulary richness = unique words / total words
  const uniqueWords = new Set(lowerWords);
  const vocabularyRichness = wordCount > 0 ? Math.round((uniqueWords.size / wordCount) * 100) : 0;

  // sentence variety
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const avgSentenceLength = sentences.length > 0 ? wordCount / sentences.length : 0;

  if (avgSentenceLength > 0 && avgSentenceLength < 6) {
    feedback.push("Style: try combining short sentences with linking words (however, although, in addition) for a more natural academic tone.");
  }
  if (wordCount < 60) {
    feedback.push("Length: this response is quite short — aim for more developed paragraphs with supporting examples.");
  }
  if (vocabularyRichness > 65 && wordCount > 40) {
    feedback.push("Vocabulary: good range of vocabulary used across the response.");
  }
  if (issues === 0) {
    feedback.push("No major grammar or spelling issues detected — clear and accurate writing.");
  }

  // scoring model (simulated): base on length, richness, and error density
  const lengthScore = Math.min(30, (wordCount / 150) * 30);
  const richnessScore = Math.min(30, (vocabularyRichness / 80) * 30);
  const accuracyScore = Math.max(0, 40 - issues * 6);
  const score = Math.round(Math.min(100, lengthScore + richnessScore + accuracyScore));

  return {
    score,
    level: estimateLevel(score),
    feedback,
    wordCount,
    vocabularyRichness,
  };
}

export interface SpeakingReport {
  fluencyScore: number;
  pronunciationScore: number;
  overall: number;
  level: CEFRLevel;
  tips: string[];
}

export function analyzeSpeakingTurn(text: string): SpeakingReport {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const fillerWords = (text.match(/\b(um|uh|like|erm)\b/gi) || []).length;
  const fluencyScore = Math.max(40, Math.min(100, 70 + words.length / 3 - fillerWords * 8));
  const pronunciationScore = Math.max(50, Math.min(100, 78 + (words.length % 5) * 2));
  const overall = Math.round((fluencyScore + pronunciationScore) / 2);

  const tips: string[] = [];
  if (fillerWords > 0) tips.push("Try to reduce filler words like \"um\" and \"like\" — pause silently instead.");
  if (words.length < 15) tips.push("Extend your answer with a reason and an example to sound more fluent.");
  if (words.length >= 15) tips.push("Good length of response — natural pacing throughout.");
  tips.push("Use linking phrases such as \"on the other hand\" or \"as a result\" to connect ideas.");

  return {
    fluencyScore: Math.round(fluencyScore),
    pronunciationScore: Math.round(pronunciationScore),
    overall,
    level: estimateLevel(overall),
    tips,
  };
}

const TUTOR_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["present perfect", "present perfect tense"],
    response:
      "The present perfect (have/has + past participle) connects the past to the present. Use it for life experiences (\"I have visited London\"), recent actions with present relevance (\"She has just finished\"), or unfinished time periods (\"We have studied English this year\"). It's different from the past simple, which needs a finished time (\"I visited London in 2019\").",
  },
  {
    keywords: ["conditional", "if clause", "second conditional", "third conditional"],
    response:
      "Conditionals describe cause and effect. First conditional (real future): If + present simple, will + base verb. Second conditional (unreal present): If + past simple, would + base verb. Third conditional (unreal past): If + past perfect, would have + past participle. Tell me which one you'd like more practice with!",
  },
  {
    keywords: ["article", "a an the"],
    response:
      "Use \"a/an\" for something non-specific or mentioned for the first time, and \"the\" when both speaker and listener know exactly which thing is meant. Compare: \"I saw a dog\" (any dog) vs \"The dog was barking\" (a specific dog we already mentioned).",
  },
  {
    keywords: ["phrasal verb"],
    response:
      "Phrasal verbs combine a verb with a particle (up, on, off, out) and often change meaning completely — e.g. \"give up\" (stop trying) vs \"give\" (hand over). Try learning them in example sentences rather than as isolated word lists — it helps them stick.",
  },
];

export function tutorRespond(message: string): string {
  const lower = message.toLowerCase();
  for (const entry of TUTOR_RESPONSES) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry.response;
    }
  }
  if (lower.includes("thank")) return "You're welcome! Let me know if you'd like an extra practice exercise on this topic.";
  if (lower.trim().endsWith("?") || lower.startsWith("what") || lower.startsWith("how") || lower.startsWith("why")) {
    return "Good question. Could you tell me which part is unclear — the grammar rule, an example sentence, or how to use it in your own writing? I can generate a short practice exercise once I know what you need.";
  }
  return "Got it — I've noted that. Would you like me to explain the grammar behind this, give you three example sentences, or create a short quiz to practise it?";
}

export function speakingPrompterReply(turnIndex: number): string {
  const prompts = [
    "That's a good start. Can you tell me a bit more about why you think that?",
    "Interesting — can you give me a specific example from your own experience?",
    "I see. What do you think could change in the future regarding this?",
    "Thank you. Let's move to the next question: how does this compare to your home country?",
  ];
  return prompts[Math.min(turnIndex, prompts.length - 1)];
}
