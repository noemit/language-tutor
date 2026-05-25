import { isFirebaseConfigured, db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  FieldValue,
  DocumentReference,
} from "firebase/firestore";
import {
  Flashcard,
  Attempt,
  Translation,
  ConceptProgress,
} from "@/types";
import {
  localCreateTranslation,
  localGetTranslations,
  localCreateFlashcard,
  localGetFlashcards,
  localUpdateFlashcard,
  localArchiveFlashcard,
  localRestoreFlashcard,
  localRecordAttempt,
  localGetAttempts,
  localSetConceptProgress,
  localGetConceptProgress,
  localSaveQuizAttempt,
  localGetQuizAttempts,
  localSaveSuggestion,
  localGetSuggestions,
  localDismissSuggestion,
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
  } catch (err: any) {
    console.warn("Flashcards query failed, using fallback:", err.message);
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

  return updateDoc(userDoc(userId, "flashcards", cardId), data as any);
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
  status: ConceptProgress["status"]
): Promise<void> {
  if (!isFirebaseConfigured) return localSetConceptProgress(conceptId, status);

  const ref = userDoc(userId, "conceptProgress", conceptId);
  await updateDoc(ref, {
    status,
    updatedAt: serverTimestamp(),
  } as any).catch(async (err) => {
    if (err.code === "not-found") {
      await addDoc(userCollection(userId, "conceptProgress"), {
        conceptId,
        status,
        updatedAt: serverTimestamp(),
      });
    } else {
      throw err;
    }
  });
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
  } catch (err: any) {
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
  if (!isFirebaseConfigured) return localGetQuizAttempts(conceptId) as any;

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

export async function getSuggestions(
  userId: string
): Promise<{ id: string; conceptId: string; reason: string; triggeredAt: any; dismissed: boolean }[]> {
  if (!isFirebaseConfigured) return localGetSuggestions();

  const q = query(
    userCollection(userId, "suggestions"),
    where("dismissed", "==", false),
    orderBy("triggeredAt", "desc")
  );
  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as any));
  } catch {
    const snapshot = await getDocs(userCollection(userId, "suggestions"));
    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() } as any))
      .filter((s: any) => !s.dismissed)
      .sort(
        (a: any, b: any) =>
          (b.triggeredAt?.toMillis?.() || 0) - (a.triggeredAt?.toMillis?.() || 0)
      );
  }
}

export async function dismissSuggestion(userId: string, suggestionId: string) {
  if (!isFirebaseConfigured) return localDismissSuggestion(suggestionId);

  return updateDoc(userDoc(userId, "suggestions", suggestionId), {
    dismissed: true,
  });
}
