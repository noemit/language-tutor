import { isFirebaseConfigured, db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  FieldValue,
  DocumentReference,
  FirestoreError,
} from "firebase/firestore";
import {
  Flashcard,
  Attempt,
  Translation,
  ConceptProgress,
  GeneratedQuiz,
  QuizQuestion,
} from "@/types";
import {
  localCreateTranslation,
  localGetTranslations,
  localDeleteTranslation,
  localDeleteAllTranslations,
  localCreateFlashcard,
  localGetFlashcards,
  localUpdateFlashcard,
  localArchiveFlashcard,
  localRestoreFlashcard,
  localDeleteFlashcard,
  localRecordAttempt,
  localGetAttempts,
  localSetConceptProgress,
  localGetConceptProgress,
  localSaveQuizAttempt,
  localGetQuizAttempts,
  localSaveSuggestion,
  localGetSuggestions,
  localDismissSuggestion,
  localSaveGeneratedQuiz,
  localGetGeneratedQuizzes,
  MAX_GENERATED_QUIZZES_PER_CONCEPT,
} from "./local-db";

// ---------------------------------------------------------------------------
// Firebase helpers (only called when isFirebaseConfigured === true)
// ---------------------------------------------------------------------------

function userCollection(userId: string, name: string) {
  return collection(db!, "users", userId, name);
}

function userDoc(userId: string, name: string, docId: string) {
  return doc(db!, "users", userId, name, docId);
}

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

export async function createTranslation(
  userId: string,
  data: Omit<Translation, "id" | "createdAt" | "userId">
): Promise<DocumentReference | { id: string }> {
  if (!isFirebaseConfigured) return localCreateTranslation(data);

  return addDoc(userCollection(userId, "translations"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function getTranslations(userId: string): Promise<Translation[]> {
  if (!isFirebaseConfigured) return localGetTranslations();

  const q = query(
    userCollection(userId, "translations"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Translation));
}

/** Delete a translation plus every flashcard it generated. */
export async function deleteTranslation(
  userId: string,
  translationId: string
): Promise<void> {
  if (!isFirebaseConfigured) return localDeleteTranslation(translationId);

  const ref = userDoc(userId, "translations", translationId);
  const snap = await getDoc(ref);
  const flashcardIds: string[] = snap.data()?.flashcardIds || [];
  await Promise.all([
    ...flashcardIds.map((id) =>
      deleteDoc(userDoc(userId, "flashcards", id)).catch(() => {})
    ),
    deleteDoc(ref),
  ]);
}

/** Delete every translation plus all flashcards they generated. */
export async function deleteAllTranslations(userId: string): Promise<void> {
  if (!isFirebaseConfigured) return localDeleteAllTranslations();

  const snapshot = await getDocs(userCollection(userId, "translations"));
  const ops: Promise<unknown>[] = [];
  for (const d of snapshot.docs) {
    const flashcardIds: string[] = d.data().flashcardIds || [];
    for (const id of flashcardIds) {
      ops.push(deleteDoc(userDoc(userId, "flashcards", id)).catch(() => {}));
    }
    ops.push(deleteDoc(d.ref));
  }
  await Promise.all(ops);
}

// ---------------------------------------------------------------------------
// Flashcards
// ---------------------------------------------------------------------------

export async function createFlashcard(
  userId: string,
  data: Omit<Flashcard, "id" | "createdAt" | "userId">
): Promise<DocumentReference | { id: string }> {
  if (!isFirebaseConfigured) return localCreateFlashcard(data);

  return addDoc(userCollection(userId, "flashcards"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function getFlashcards(
  userId: string,
  status?: "active" | "archived"
): Promise<Flashcard[]> {
  if (!isFirebaseConfigured) return localGetFlashcards(status);

  try {
    let q = query(
      userCollection(userId, "flashcards"),
      orderBy("createdAt", "desc")
    );
    if (status) {
      q = query(q, where("status", "==", status));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Flashcard));
  } catch (err: unknown) {
    const fbErr = err as FirestoreError;
    console.warn("Flashcards query failed, using fallback:", fbErr.message);
    const q = query(userCollection(userId, "flashcards"));
    const snapshot = await getDocs(q);
    let cards = snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() } as Flashcard)
    );
    if (status) {
      cards = cards.filter((c) => c.status === status);
    }
    return cards.sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() || 0;
      const bTime = b.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });
  }
}

export async function updateFlashcard(
  userId: string,
  cardId: string,
  data: Partial<Flashcard> & { lastAttemptAt?: FieldValue }
) {
  if (!isFirebaseConfigured) return localUpdateFlashcard(cardId, data);

  return updateDoc(userDoc(userId, "flashcards", cardId), data as Record<string, unknown>);
}

export async function archiveFlashcard(userId: string, cardId: string) {
  if (!isFirebaseConfigured) return localArchiveFlashcard(cardId);

  return updateDoc(userDoc(userId, "flashcards", cardId), {
    status: "archived",
    archivedAt: serverTimestamp(),
  });
}

export async function restoreFlashcard(userId: string, cardId: string) {
  if (!isFirebaseConfigured) return localRestoreFlashcard(cardId);

  return updateDoc(userDoc(userId, "flashcards", cardId), {
    status: "active",
    archivedAt: null,
  });
}

export async function deleteFlashcard(userId: string, cardId: string) {
  if (!isFirebaseConfigured) return localDeleteFlashcard(cardId);

  return deleteDoc(userDoc(userId, "flashcards", cardId));
}

// ---------------------------------------------------------------------------
// Attempts
// ---------------------------------------------------------------------------

export async function recordAttempt(
  userId: string,
  data: Omit<Attempt, "id" | "timestamp" | "userId">
): Promise<DocumentReference | { id: string }> {
  if (!isFirebaseConfigured) return localRecordAttempt(data);

  return addDoc(userCollection(userId, "attempts"), {
    ...data,
    timestamp: serverTimestamp(),
  });
}

export async function getAttempts(
  userId: string,
  cardId?: string
): Promise<Attempt[]> {
  if (!isFirebaseConfigured) return localGetAttempts(cardId);

  let q = query(
    userCollection(userId, "attempts"),
    orderBy("timestamp", "desc")
  );
  if (cardId) {
    q = query(q, where("cardId", "==", cardId));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Attempt));
}

// ---------------------------------------------------------------------------
// Concept Progress
// ---------------------------------------------------------------------------

export async function setConceptProgress(
  userId: string,
  conceptId: string,
  status: ConceptProgress["status"],
  extra?: Partial<Omit<ConceptProgress, "id" | "userId" | "conceptId" | "status" | "updatedAt">>
): Promise<void> {
  if (!isFirebaseConfigured) return localSetConceptProgress(conceptId, status, extra);

  // setDoc + merge: creates the doc on first write and never duplicates
  const ref = userDoc(userId, "conceptProgress", conceptId);
  await setDoc(
    ref,
    {
      conceptId,
      status,
      ...extra,
      updatedAt: serverTimestamp(),
    } as Record<string, unknown>,
    { merge: true }
  );
}

export async function getConceptProgress(
  userId: string
): Promise<ConceptProgress[]> {
  if (!isFirebaseConfigured) return localGetConceptProgress();

  try {
    const q = query(
      userCollection(userId, "conceptProgress"),
      orderBy("updatedAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() } as ConceptProgress)
    );
  } catch {
    const snapshot = await getDocs(userCollection(userId, "conceptProgress"));
    return snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() } as ConceptProgress)
    );
  }
}

// ---------------------------------------------------------------------------
// Quiz Attempts
// ---------------------------------------------------------------------------

export async function saveQuizAttempt(
  userId: string,
  data: Omit<import("@/types").QuizAttempt, "id" | "timestamp" | "userId">
): Promise<DocumentReference | { id: string }> {
  if (!isFirebaseConfigured) return localSaveQuizAttempt(data);

  return addDoc(userCollection(userId, "quizAttempts"), {
    ...data,
    timestamp: serverTimestamp(),
  });
}

export async function getQuizAttempts(
  userId: string,
  conceptId?: string
): Promise<import("@/types").QuizAttempt[]> {
  if (!isFirebaseConfigured) return localGetQuizAttempts(conceptId);

  let q = query(
    userCollection(userId, "quizAttempts"),
    orderBy("timestamp", "desc")
  );
  if (conceptId) {
    q = query(q, where("conceptId", "==", conceptId));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (d) => ({ id: d.id, ...d.data() } as import("@/types").QuizAttempt)
  );
}

// ---------------------------------------------------------------------------
// Suggestions
// ---------------------------------------------------------------------------

export async function saveSuggestion(
  userId: string,
  conceptId: string,
  reason: string
): Promise<DocumentReference | { id: string }> {
  if (!isFirebaseConfigured) return localSaveSuggestion(conceptId, reason);

  return addDoc(userCollection(userId, "suggestions"), {
    conceptId,
    reason,
    triggeredAt: serverTimestamp(),
    dismissed: false,
  });
}

interface SuggestionDoc {
  id: string;
  conceptId: string;
  reason: string;
  triggeredAt: unknown;
  dismissed: boolean;
}

export async function getSuggestions(
  userId: string
): Promise<SuggestionDoc[]> {
  if (!isFirebaseConfigured) return localGetSuggestions();

  const q = query(
    userCollection(userId, "suggestions"),
    where("dismissed", "==", false),
    orderBy("triggeredAt", "desc")
  );
  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as SuggestionDoc);
  } catch {
    const snapshot = await getDocs(userCollection(userId, "suggestions"));
    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }) as SuggestionDoc)
      .filter((s) => !s.dismissed)
      .sort(
        (a, b) =>
          ((b.triggeredAt as { toMillis?: () => number })?.toMillis?.() || 0) -
          ((a.triggeredAt as { toMillis?: () => number })?.toMillis?.() || 0)
      );
  }
}

export async function dismissSuggestion(userId: string, suggestionId: string) {
  if (!isFirebaseConfigured) return localDismissSuggestion(suggestionId);

  return updateDoc(userDoc(userId, "suggestions", suggestionId), {
    dismissed: true,
  });
}

// ---------------------------------------------------------------------------
// Generated Quizzes (AI quiz variants)
// ---------------------------------------------------------------------------

export async function saveGeneratedQuiz(
  userId: string,
  conceptId: string,
  questions: QuizQuestion[]
): Promise<DocumentReference | { id: string }> {
  if (!isFirebaseConfigured) return localSaveGeneratedQuiz(conceptId, questions);

  const ref = await addDoc(userCollection(userId, "generatedQuizzes"), {
    conceptId,
    questions,
    createdAt: serverTimestamp(),
  });

  // Prune: keep only the newest MAX_GENERATED_QUIZZES_PER_CONCEPT per concept
  try {
    const q = query(
      userCollection(userId, "generatedQuizzes"),
      where("conceptId", "==", conceptId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const stale = snapshot.docs.slice(MAX_GENERATED_QUIZZES_PER_CONCEPT);
    await Promise.all(stale.map((d) => deleteDoc(d.ref)));
  } catch (err) {
    console.warn("Failed to prune generated quizzes:", err);
  }

  return ref;
}

export async function getGeneratedQuizzes(
  userId: string,
  conceptId: string
): Promise<GeneratedQuiz[]> {
  if (!isFirebaseConfigured) return localGetGeneratedQuizzes(conceptId);

  try {
    const q = query(
      userCollection(userId, "generatedQuizzes"),
      where("conceptId", "==", conceptId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as GeneratedQuiz));
  } catch {
    // Missing composite index on first deploys — fall back to unsorted query
    const q = query(
      userCollection(userId, "generatedQuizzes"),
      where("conceptId", "==", conceptId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() } as GeneratedQuiz))
      .sort(
        (a, b) =>
          (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0)
      );
  }
}
