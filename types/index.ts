import { Timestamp } from "firebase/firestore";

export type LanguageCode = "en" | "ro" | "es" | "gl";

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  flag: string;
}

export const LANGUAGES: LanguageConfig[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ro", name: "Romanian", flag: "🇷🇴" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "gl", name: "Galician", flag: "🏴󠁧󠁢󠁧󠁢" },
];

export const DEFAULT_SOURCE_LANG: LanguageCode = "es";
export const DEFAULT_TARGET_LANG: LanguageCode = "en";

export interface Translation {
  id: string;
  userId: string;
  sourceText: string;
  translatedText: string;
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  rawLlmResponse: string;
  createdAt: Timestamp;
  flashcardIds: string[];
}

export interface Flashcard {
  id: string;
  userId: string;
  front: string;
  back: string;
  context?: string;
  langPair: [LanguageCode, LanguageCode];
  tags: string[];
  status: "active" | "archived";
  createdAt: Timestamp;
  archivedAt?: Timestamp;
  totalAttempts: number;
  correctStreak: number;
  lastAttemptAt?: Timestamp;
  /** Number of times user selected "Know" (full confidence) */
  masteryCount: number;
  /** Number of consecutive "Know" responses */
  consecutiveKnowStreak: number;
  /** Whether this card has reached mastery threshold (3 in a row OR 5 total) */
  masteryAchieved: boolean;

  // --- Spaced repetition (millis-based so both Firestore and localStorage store plain values) ---
  /** When this card is next due for review (ms since epoch). Missing = due now. */
  dueAt?: number;
  /** Current SRS interval in days */
  intervalDays?: number;
  /** SM-2 style ease factor applied to interval growth (default 2.2) */
  easeFactor?: number;
}

export interface Attempt {
  id: string;
  userId: string;
  cardId: string;
  correct: boolean;
  timestamp: Timestamp;
  direction: "front-to-back" | "back-to-front";
}

export interface GeneratedFlashcard {
  front: string;
  back: string;
  context?: string;
  tags: string[];
}

export interface TranslationResponse {
  translation: string;
  flashcards: GeneratedFlashcard[];
}

// --- Concepts ---

export type ConceptStatus = "still-learning" | "confident" | "mastered";

export interface ConceptExample {
  spanish: string;
  english: string;
  explanation?: string;
}

export interface Concept {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  content: string[]; // paragraphs
  examples: ConceptExample[];
  tips?: string[];
}

export interface ConceptProgress {
  id: string;
  userId: string;
  conceptId: string;
  status: ConceptStatus;
  updatedAt?: Timestamp;
  /** Score of the most recent quiz, 0-100 */
  lastScore?: number;
  /** Best quiz score ever, 0-100 */
  bestScore?: number;
  /** When this concept is next due for review (ms since epoch). Null/absent = not scheduled. */
  nextReviewAt?: number | null;
  /**
   * Mastery ladder position:
   * 0 = still drilling (daily until a 100% quiz),
   * 1-4 = spacing stages after each consecutive 100% (+1d, +3d, +7d, +30d),
   * completing stage 4 marks the concept mastered.
   */
  reviewStage?: number;
}

// --- Quizzes ---

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizVersion {
  version: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  userId: string;
  conceptId: string;
  /** Static quiz version number; 0 when the attempt used a generated variant */
  version: number;
  /** Set when the attempt used an AI-generated variant */
  generatedId?: string;
  score: number;
  totalQuestions: number;
  answers: { questionIndex: number; selectedIndex: number; correct: boolean }[];
  timestamp: Timestamp;
}

/** An AI-generated quiz variant for a concept, cached per user */
export interface GeneratedQuiz {
  id: string;
  userId: string;
  conceptId: string;
  questions: QuizQuestion[];
  createdAt: Timestamp;
}

// --- Frame drills ---

export interface Frame {
  id: string;
  scenario: string;
  template: string;
  english: string;
  slots: string[][];
  variants: { spanish: string; english: string }[];
  tense?: string;
  note?: string;
}

export interface FrameProgress {
  id: string;
  userId: string;
  frameId: string;
  nailedStreak: number;
  froze: number;
  close: number;
  nailed: number;
  dueAt?: number;
  intervalDays?: number;
  easeFactor?: number;
}

export interface TenseEntry {
  id: string;
  verb: string;
  en: string;
  present: string;
  preterite: string;
  imperfect: string;
  future: string;
}

export interface ConceptSuggestion {
  conceptId: string;
  reason: string;
  triggeredAt: Timestamp;
}

// --- Chunk unpack ("Heard it → use it") ---

export interface UnpackResponse {
  correctedPhrase: string;
  meaning: string;
  whenNativesSayIt: string;
  frame: string;
  slots: string[];
  examples: { spanish: string; english: string }[];
  commonConfusions: string[];
}
