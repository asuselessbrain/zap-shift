import { AuthContext } from "@/Context/Providers/AuthContext";
import { useEffect, useState, type ReactNode } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/Firebase.init";
import { type User } from "firebase/auth";

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const loginWithGoogle = async () => {
        setLoading(true);
        return await signInWithPopup(auth, googleProvider)
    }

    const logOut = async () => {
        setLoading(true);
        return await signOut(auth);
    }

    const signUpUser = async (email: string, password: string) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = async (profileInfo: { displayName?: string; photoURL?: string }) => {
        return await updateProfile(auth.currentUser as User, profileInfo);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

    const authInfo = {
        signUpUser,
        updateUserProfile,
        loginWithGoogle,
        user,
        loading,
        logOut
    }

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;