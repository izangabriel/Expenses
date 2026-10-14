import { createContext, useContext } from "react";
import { supabase } from '../supabaseClient';
import { useState } from "react";
import { useEffect } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setCurrentUser(session?.user ?? null);
            setLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setCurrentUser(session?.user ?? null);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    const signUp = async (email, password) => {
        const { error } = await supabase.auth.signUp({ email, password });
        console.log(error);
        return !error;
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })

        if (!error) {
            return true;
        } else {
            return false;
        }
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
    };

    const isAuthenticated = currentUser !== null;

    return (
        <AuthContext.Provider value={{ currentUser, isAuthenticated, loading, signUp, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);