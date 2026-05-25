// localStorage backend — mirrors the Firestore API in lib/db.ts
// Used when Firebase is not configured (NEXT_PUBLIC_FIREBASE_API_KEY is unset)

import {
  Flashcard,
  Translation,
  Attempt,
  ConceptProgress,
  ConceptStatus,
  QuizAttempt,
} from "@/types";

interface LocalSuggestion {
  id: string;
  conceptId: string;
  reason: string;
  triggeredAt: string;
  dismissed: boolean;
}

interface LocalData {
  userId: string;
  flashcards: Flashcard[];
  translations: Translation[];
  attempts: Attempt[];
  conceptProgress: ConceptProgress[];
  quizAttempts: QuizAttempt[];
  suggestions: LocalSuggestion[];
}

const STORAGE_KEY = "langtutor_data";

function getUserId(): string {
  let userId = localStorage.getItem("langtutor_userId");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("langtutor_userId", userId);
  }
  return userId;
}

export function getLocalUserId(): string {
  return getUserId();
}

function load(): LocalData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore corrupt data */ }
  return {
    userId: getUserId(),
    flashcards: [],
    translations: [],
    attempts: [],
    conceptProgress: [],
    quizAttempts: [],
    suggestions: [],
  };
}

function save(data: LocalData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function generateId(): string {
  return crypto.randomUUID();
}

function now(): string {
  return new Date().toISOString();
}

function makeRef(id: string) {
  return { id };
}

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

export async function localCreateTranslation(
  data: Omit<Translation, "id" | "createdAt" | "userId">
): Promise<{ id: string }> {
  const db = load();
  const doc: Translation = {
    ...data,
    id: generateId(),
    userId: db.userId,
    createdAt: now() as unknown as Translation["createdAt"],
  };
  db.translations.unshift(doc);
  save(db);
  return makeRef(doc.id);
}

export async function localGetTranslations(): Promise<Translation[]> {
  return load().translations;
}

// ---------------------------------------------------------------------------
// Flashcards
// ---------------------------------------------------------------------------

export async function localCreateFlashcard(
  data: Omit<Flashcard, "id" | "createdAt" | "userId">
): Promise<{ id: string }> {
  const db = load();
  const doc: Flashcard = {
    ...data,
    id: generateId(),
    userId: db.userId,
    createdAt: now() as unknown as Flashcard["createdAt"],
  };
  db.flashcards.unshift(doc);
  save(db);
  return makeRef(doc.id);
}

export async function localGetFlashcards(
  status?: "active" | "archived"
): Promise<Flashcard[]> {
  let cards = load().flashcards;
  if (status) {
    cards = cards.filter((c) => c.status === status);
  }
  return [...cards].sort((a, b) => {
    const aTime = typeof a.createdAt === "string" ? Date.parse(a.createdAt) : 0;
    const bTime = typeof b.createdAt === "string" ? Date.parse(b.createdAt) : 0;
    return bTime - aTime;
  });
}

export async function localUpdateFlashcard(
  cardId: string,
  data: Partial<Flashcard>
) {
  const db = load();
  const idx = db.flashcards.findIndex((c) => c.id === cardId);
  if (idx !== -1) {
    db.flashcards[idx] = { ...db.flashcards[idx], ...data };
    save(db);
  }
}

export async function localArchiveFlashcard(cardId: string) {
  const db = load();
  const idx = db.flashcards.findIndex((c) => c.id === cardId);
  if (idx !== -1) {
    db.flashcards[idx].status = "archived";
    (db.flashcards[idx] as any).archivedAt = now();
    save(db);
  }
}

export async function localRestoreFlashcard(cardId: string) {
  const db = load();
  const idx = db.flashcards.findIndex((c) => c.id === cardId);
  if (idx !== -1) {
    db.flashcards[idx].status = "active";
    (db.flashcards[idx] as any).archivedAt = null;
    save(db);
  }
}

// ---------------------------------------------------------------------------
// Attempts
// ---------------------------------------------------------------------------

export async function localRecordAttempt(
  data: Omit<Attempt, "id" | "timestamp" | "userId">
): Promise<{ id: string }> {
  const db = load();
  const doc: Attempt = {
    ...data,
    id: generateId(),
    userId: db.userId,
    timestamp: now() as unknown as Attempt["timestamp"],
  };
  db.attempts.unshift(doc);
  save(db);
  return makeRef(doc.id);
}

export async function localGetAttempts(cardId?: string): Promise<Attempt[]> {
  let attempts = load().attempts;
  if (cardId) {
    attempts = attempts.filter((a) => a.cardId === cardId);
  }
  return [...attempts].sort((a, b) => {
    const aTime = typeof a.timestamp === "string" ? Date.parse(a.timestamp) : 0;
    const bTime = typeof b.timestamp === "string" ? Date.parse(b.timestamp) : 0;
    return bTime - aTime;
  });
}

// ---------------------------------------------------------------------------
// Concept Progress
// ---------------------------------------------------------------------------

export async function localSetConceptProgress(
  conceptId: string,
  status: ConceptStatus
) {
  const db = load();
  const idx = db.conceptProgress.findIndex((c) => c.conceptId === conceptId);
  if (idx !== -1) {
    db.conceptProgress[idx].status = status;
    (db.conceptProgress[idx] as any).updatedAt = now();
  } else {
    db.conceptProgress.push({
      id: generateId(),
      userId: db.userId,
      conceptId,
      status,
      updatedAt: now() as unknown as ConceptProgress["updatedAt"],
    });
  }
  save(db);
}

export async function localGetConceptProgress(): Promise<ConceptProgress[]> {
  return load().conceptProgress;
}

// ---------------------------------------------------------------------------
// Quiz Attempts
// ---------------------------------------------------------------------------

export async function localSaveQuizAttempt(
  data: Omit<QuizAttempt, "id" | "timestamp" | "userId">
): Promise<{ id: string }> {
  const db = load();
  const doc: QuizAttempt = {
    ...data,
    id: generateId(),
    userId: db.userId,
    timestamp: now() as unknown as QuizAttempt["timestamp"],
  };
  db.quizAttempts.unshift(doc);
  save(db);
  return makeRef(doc.id);
}

export async function localGetQuizAttempts(
  conceptId?: string
): Promise<QuizAttempt[]> {
  let attempts = load().quizAttempts;
  if (conceptId) {
    attempts = attempts.filter((a) => a.conceptId === conceptId);
  }
  return [...attempts].sort((a, b) => {
    const aTime = typeof a.timestamp === "string" ? Date.parse(a.timestamp) : 0;
    const bTime = typeof b.timestamp === "string" ? Date.parse(b.timestamp) : 0;
    return bTime - aTime;
  });
}

// ---------------------------------------------------------------------------
// Suggestions
// ---------------------------------------------------------------------------

export async function localSaveSuggestion(
  conceptId: string,
  reason: string
): Promise<{ id: string }> {
  const db = load();
  // Avoid duplicates
  const existing = db.suggestions.find(
    (s) => s.conceptId === conceptId && !s.dismissed
  );
  if (existing) return makeRef(existing.id);

  const doc: LocalSuggestion = {
    id: generateId(),
    conceptId,
    reason,
    triggeredAt: now(),
    dismissed: false,
  };
  db.suggestions.unshift(doc);
  save(db);
  return makeRef(doc.id);
}

export async function localGetSuggestions(): Promise<LocalSuggestion[]> {
  return load()
    .suggestions.filter((s) => !s.dismissed)
    .sort((a, b) => Date.parse(b.triggeredAt) - Date.parse(a.triggeredAt));
}

export async function localDismissSuggestion(suggestionId: string) {
  const db = load();
  const idx = db.suggestions.findIndex((s) => s.id === suggestionId);
  if (idx !== -1) {
    db.suggestions[idx].dismissed = true;
    save(db);
  }
}
