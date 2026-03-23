import {createContext, useContext, useEffect, useState} from "react";
import type { ReactNode } from "react";
import supabase from "../supabase-client.ts";
import type { Session } from "@supabase/supabase-js";

interface AuthContextType {
    session: Session | null;
    signInUser: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>;
    signUpUser: (name:string, email: string, password: string, accountType:string) => Promise<{ success: boolean; data?: any; error?: string }>;
    signOutUser: () => Promise<{ success: boolean; error?: string }>;
    users: any[];
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchUsers = async () => {
        const { data, error } = await supabase.from('user_profiles').select('*');
        try{
            if(error){
                throw error
            }

            setUsers(data)
        }catch (error: any){
            console.error(error.message);
        }
    }

    useEffect(() => {
        const getInitialSession = async() => {
            try{
                const { data, error } = await supabase.auth.getSession();

               if(error){
                   setLoading(false)
                   setSession(null)
                   alert(error.message)
                   throw error
               }
                setLoading(false)
                setSession(data?.session)

            }catch (error: any){
                setLoading(false)
                console.error(error.message);
            }
        }

        getInitialSession();

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, []);

    useEffect(() => {
        if(!session){
            return
        }
        fetchUsers();
    }, [session]);

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

    const signUpUser = async (name:string, email: string, password: string, accountType:string) => {
        try{
            const { data, error } = await supabase.auth.signUp({
                email: email.toLowerCase(),
                password,
                options:{
                    data:{
                        name,
                        account_type: accountType,
                    }
                }
            })

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

    const signOutUser = async () => {
        try{
            const { error} = await supabase.auth.signOut();
            if(error){
                console.log(error)
                return {success: false, error: error.message}
            }

            return { success: true }
        }catch (error: any) {
            console.error(error.message);
            return { success: false, error: error.message }
        }
    }

    return(
        <AuthContext.Provider value={{ session, signInUser, signOutUser, signUpUser, users, loading }}>
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