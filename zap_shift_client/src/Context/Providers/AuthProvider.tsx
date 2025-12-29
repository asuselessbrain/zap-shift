import { AuthContext } from "@/Context/Providers/AuthContext";
import { useEffect, useState, type ReactNode } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
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

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(currentUser=>{
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, [])

    const authInfo = {
        loginWithGoogle,
        user,
        loading,
        logOut
    }

    return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;