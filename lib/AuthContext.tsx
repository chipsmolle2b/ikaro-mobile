import React, { createContext, useContext, useEffect, useState } from "react";
import { clearToken, getToken, saveToken } from "@/lib/auth";

interface AuthState {
  token: string | null;
  loading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  token: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getToken().then((t) => {
      setToken(t);
      setLoading(false);
    });
  }, []);

  async function signIn(t: string) {
    await saveToken(t);
    setToken(t);
  }

  async function signOut() {
    await clearToken();
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
