import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp,
  FieldValue,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { Flashcard, Attempt, Translation } from "@/types";

function userCollection(userId: string, name: string) {
  return collection(db, "users", userId, name);
}

function userDoc(userId: string, name: string, docId: string) {
  return doc(db, "users", userId, name, docId);
}

// Translations
export async function createTranslation(
  userId: string,
  data: Omit<Translation, "id" | "createdAt" | "userId">
): Promise<DocumentReference> {
  return addDoc(userCollection(userId, "translations"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function getTranslations(userId: string): Promise<Translation[]> {
  const q = query(
    userCollection(userId, "translations"),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (d) => ({ id: d.id, ...d.data() } as Translation)
  );
}

// Flashcards
export async function createFlashcard(
  userId: string,
  data: Omit<Flashcard, "id" | "createdAt" | "userId">
): Promise<DocumentReference> {
  return addDoc(userCollection(userId, "flashcards"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function getFlashcards(
  userId: string,
  status?: "active" | "archived"
): Promise<Flashcard[]> {
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
    // Fallback: if composite index is missing, fetch all and filter client-side
    console.warn("Flashcards query failed, using fallback:", err.message);
    const q = query(userCollection(userId, "flashcards"));
    const snapshot = await getDocs(q);
    let cards = snapshot.docs.map(
      (d) => ({ id: d.id, ...d.data() } as Flashcard)
    );
    if (status) {
      cards = cards.filter((c) => c.status === status);
    }
    // Sort client-side by createdAt desc
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
  return updateDoc(userDoc(userId, "flashcards", cardId), data as any);
}

export async function archiveFlashcard(userId: string, cardId: string) {
  return updateDoc(userDoc(userId, "flashcards", cardId), {
    status: "archived",
    archivedAt: serverTimestamp(),
  });
}

export async function restoreFlashcard(userId: string, cardId: string) {
  return updateDoc(userDoc(userId, "flashcards", cardId), {
    status: "active",
    archivedAt: null,
  });
}

// Attempts
export async function recordAttempt(
  userId: string,
  data: Omit<Attempt, "id" | "timestamp" | "userId">
): Promise<DocumentReference> {
  return addDoc(userCollection(userId, "attempts"), {
    ...data,
    timestamp: serverTimestamp(),
  });
}

export async function getAttempts(userId: string, cardId?: string): Promise<Attempt[]> {
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
