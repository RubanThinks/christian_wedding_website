import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./firebase";

const ADMIN_SESSION_KEY = "christian_wedding_admin_session";

export interface AdminUser {
  email: string;
  uid: string;
}

/**
 * Log in admin via Firebase Authentication or local admin mode
 */
export async function loginAdmin(
  email: string,
  pass: string
): Promise<AdminUser> {
  const cleanEmail = email.trim();

  if (isFirebaseConfigured() && auth) {
    const cred = await signInWithEmailAndPassword(auth, cleanEmail, pass);
    return {
      email: cred.user.email || cleanEmail,
      uid: cred.user.uid,
    };
  }

  // Local/Demo authentication for initial testing before Firebase console keys
  if (
    (cleanEmail.toLowerCase().includes("admin") ||
      cleanEmail.toLowerCase().includes("mulavanal")) &&
    pass.length >= 6
  ) {
    const mockUser: AdminUser = {
      email: cleanEmail,
      uid: "admin-local-1",
    };
    if (typeof window !== "undefined") {
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(mockUser));
    }
    return mockUser;
  }

  throw new Error("Invalid admin credentials. Please check your email and password.");
}

/**
 * Log out admin
 */
export async function logoutAdmin(): Promise<void> {
  if (isFirebaseConfigured() && auth) {
    await signOut(auth);
  }
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }
}

/**
 * Listen to auth state changes
 */
export function onAdminAuthStateChanged(
  callback: (user: AdminUser | null) => void
): () => void {
  if (isFirebaseConfigured() && auth) {
    return onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        callback({
          email: firebaseUser.email || "admin",
          uid: firebaseUser.uid,
        });
      } else {
        callback(null);
      }
    });
  }

  // Check local session
  if (typeof window !== "undefined") {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (raw) {
      try {
        const u = JSON.parse(raw);
        callback(u);
      } catch {
        callback(null);
      }
    } else {
      callback(null);
    }
  }

  return () => {};
}
