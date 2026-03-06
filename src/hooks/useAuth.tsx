import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  profile: { full_name: string; oab_number: string; email: string } | null;
  signUp: (email: string, password: string, fullName: string, oabNumber: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState<AuthContextType["profile"]>(null);

  useEffect(() => {
    // 1. Listener de mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // ✅ Promise.all sem setTimeout — sem race condition
        await Promise.all([
          fetchProfile(session.user.id),
          checkAdmin(session.user.id),
        ]);
      } else {
        setProfile(null);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    // 2. Sessão inicial (carregamento da página)
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await Promise.all([
          fetchProfile(session.user.id),
          checkAdmin(session.user.id),
        ]);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, oab_number, email")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    if (data) setProfile(data);
    return data;
  }

  async function checkAdmin(userId: string) {
    const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    setIsAdmin(!!data);
  }

  async function signUp(email: string, password: string, fullName: string, oabNumber: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, oab_number: oabNumber },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    if (error) throw error;
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  }

  async function updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  }

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isAdmin,
      profile,
      signUp,
      signIn,
      signOut,
      resetPassword,
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}