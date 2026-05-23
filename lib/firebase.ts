import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9pNtxOKNCwYiT-MQBlIxfNZeypYdNkzI",
  authDomain: "lernip.firebaseapp.com",
  projectId: "lernip",
  storageBucket: "lernip.firebasestorage.app",
  messagingSenderId: "45110786465",
  appId: "1:45110786465:web:b9dbd3b70123d81ac6b3e0",
  measurementId: "G-ZTS5V90FEM",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
