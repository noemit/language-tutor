"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";
import { getLocalUserId } from "@/lib/local-db";

export interface LocalUser {
  uid: string;
  email: null;
  displayName: null;
  photoURL: null;
  isAnonymous: false;
}

interface AuthContextValue {
  user: User | LocalUser | null;
  loading: boolean;
  isLocal: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | LocalUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      // Local-only mode — no sign-in required, everything saved to localStorage
      const localUser: LocalUser = {
        uid: getLocalUserId(),
        email: null,
        displayName: null,
        photoURL: null,
        isAnonymous: false,
      };
      setUser(localUser);
      setLoading(false);
      return;
    }

    // Firebase mode
    const unsubscribe = onAuthStateChanged(auth!, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) return;
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    if (!isFirebaseConfigured || !auth) return;
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isLocal: !isFirebaseConfigured, signInWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
