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
  version: number;
  score: number;
  totalQuestions: number;
  answers: { questionIndex: number; selectedIndex: number; correct: boolean }[];
  timestamp: Timestamp;
}

export interface ConceptSuggestion {
  conceptId: string;
  reason: string;
  triggeredAt: Timestamp;
}
