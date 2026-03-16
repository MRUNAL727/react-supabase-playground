import {createContext, useContext, useEffect, useState} from "react";
import supabase from "../supabase-client.ts";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const getInitialSession = async() => {
            try{
                const { data, error } = await supabase.auth.getSession();

               if(error){
                   setSession(null)
                   alert(error.message)
                   throw error
               }
               console.log(data?.session)
                setSession(data?.session)

            }catch (error){
                console.error(error.message);
            }
        }

        getInitialSession();

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log('Session changed: ', session)
        })
    }, []);



    return(
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () =>{
    return useContext(AuthContext);
}