import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, ConfirmationResult } from "firebase/auth";
import { auth as firebaseAuth } from "@/lib/firebase";


type Auth = {
    user: User | null;
    phoneNumber: string | null;
    confirmation: ConfirmationResult | null;
    loading: boolean;
    loginSuccessfully?: boolean;
};

type AuthContextType = {
    auth: Auth;
    setConfirmation: (c: ConfirmationResult | null, phone?: string) => void;
    setLoginSuccessfully: (value: boolean) => void;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<Auth>({
        user: null,
        phoneNumber: null,
        confirmation: null,
        loading: true,
        loginSuccessfully: undefined,
    });

    // POST-AUTH BOOTSTRAP (THIS IS THE MAGIC)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            setAuth((prev) => ({
                ...prev,
                user,
                loading: false,
            }));
        });

        return unsubscribe;
    }, []);

    function setConfirmation(
        confirmation: ConfirmationResult | null,
        phone?: string
    ) {
        console.log(phone, "inside auth context");
        setAuth((prev) => ({
            ...prev,
            confirmation,
            phoneNumber: phone ?? prev.phoneNumber,
        }));
    }

    function setLoginSuccessfully(value: boolean) {
        setAuth((prev) => ({
            ...prev,
            loginSuccessfully: value,
        }));
    }

    async function logout() {
        await firebaseAuth.signOut();
        setAuth({
            user: null,
            phoneNumber: null,
            confirmation: null,
            loading: false,
        });
    }


    return (
        <AuthContext.Provider value={{ auth, setConfirmation, logout, setLoginSuccessfully }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuthContext must be used within AuthProvider");
    }
    return ctx;
}
