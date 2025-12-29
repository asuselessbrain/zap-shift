import type { User, UserCredential } from "firebase/auth";
import { createContext } from "react";

export const AuthContext = createContext<{
    user: User | null; 
    loginWithGoogle: () => Promise<UserCredential>, 
    updateUserProfile: (profileInfo: {
        displayName?: string | undefined;
        photoURL?: string | undefined;
    }) => Promise<void>, logOut: () => Promise<void>, 
    signUpUser: (email: string, password: string) => Promise<UserCredential>, 
    signInUser: (email: string, password: string) => Promise<UserCredential>, 
    loading: boolean
} | null>(null)