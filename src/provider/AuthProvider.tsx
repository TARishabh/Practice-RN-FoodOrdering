import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Profile } from "../types";

type Authdata = {
    session: Session | null;
    profile: Profile | null;
    loading:boolean;
    isAdmin:boolean;
}

const AuthContext = createContext<Authdata>({
    session:null,
    profile:null,
    loading:true,
    isAdmin:false,
});

export default function AuthProvider({children}:PropsWithChildren){
    const [session, setSession] = useState<Session|null>(null)
    const [profile, setProfile] = useState<Profile|null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(()=>{
        const fetchsession = async () =>{
            const {data:{session}} = await supabase.auth.getSession();
            setSession(session)

            if (session){
                const {data} = await supabase.from('profiles')
                .select('*')
                .eq('id',session.user.id)
                .single()
                setProfile(data);
            }
            setLoading(false)
        }

        fetchsession();

        supabase.auth.onAuthStateChange((_event, session)=>{
            setSession(session)
        })

    },[])

    return (
        <AuthContext.Provider value={{session,profile,loading,isAdmin:profile?.group === 'ADMIN'}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);