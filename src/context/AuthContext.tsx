"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      api
        .get("/private/user", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data.user);
    setToken(res.data.token);
    if (typeof window !== "undefined") {
      localStorage.setItem("token", res.data.token);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}