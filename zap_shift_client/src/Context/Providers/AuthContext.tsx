import type { User, UserCredential } from "firebase/auth";
import { createContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthContext = createContext<{ user: User | null; loginWithGoogle: () => Promise<UserCredential>, logOut: () => Promise<void>, loading: boolean } | null>(null)