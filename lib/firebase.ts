import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

let app: ReturnType<typeof initializeApp> | null = null;
let firebaseAuth: ReturnType<typeof getAuth> | null = null;
let firestoreDb: ReturnType<typeof getFirestore> | null = null;
let firebaseGoogleProvider: GoogleAuthProvider | null = null;
export let isFirebaseConfigured = false;

if (firebaseApiKey) {
  const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    firebaseAuth = getAuth(app);
    firestoreDb = getFirestore(app);
    firebaseGoogleProvider = new GoogleAuthProvider();
    isFirebaseConfigured = true;
  } catch (e) {
    console.warn("Firebase initialization failed — falling back to local storage:", e);
  }
}

export const auth = firebaseAuth;
export const db = firestoreDb;
export const googleProvider = firebaseGoogleProvider;
