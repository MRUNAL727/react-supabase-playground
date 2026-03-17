import {createContext, useContext, useEffect, useState} from "react";
import type { ReactNode } from "react";
import supabase from "../supabase-client.ts";
import type { Session } from "@supabase/supabase-js";

interface AuthContextType {
    session: Session | null;
    signInUser: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);


    useEffect(() => {
        const getInitialSession = async() => {
            try{
                const { data, error } = await supabase.auth.getSession();

               if(error){
                   setSession(null)
                   alert(error.message)
                   throw error
               }
                setSession(data?.session)

            }catch (error: any){
                console.error(error.message);
            }
        }

        getInitialSession();

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log('Session changed: ', session)
        })
    }, []);

    const signInUser = async (email: string, password: string) => {
        try{
           const { data, error } = await supabase.auth.signInWithPassword({email, password})

            if(error){
                console.log(error)
                return { success: false, error: error.message }
            }
             console.log(data)
            return { success: true, data }
        }catch (error: any) {
            return { success: false, error: error.message }
        }
    }

    return(
        <AuthContext.Provider value={{ session, signInUser }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}