"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "admin" | "teacher" | "student" | "parent";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  subtitle: string;
}

const MOCK_USERS: Record<UserRole, AuthUser> = {
  admin: {
    id: "USR-001",
    name: "Dr. James Carter",
    email: "admin@edunexus.edu",
    role: "admin",
    avatar: "JC",
    subtitle: "School Administrator",
  },
  teacher: {
    id: "USR-002",
    name: "Mrs. Sarah Jenkins",
    email: "sarah.j@edunexus.edu",
    role: "teacher",
    avatar: "SJ",
    subtitle: "Mathematics Dept.",
  },
  student: {
    id: "USR-003",
    name: "Alex Johnson",
    email: "alex.j@edunexus.edu",
    role: "student",
    avatar: "AJ",
    subtitle: "Grade 10 – Section A",
  },
  parent: {
    id: "USR-004",
    name: "Robert Johnson",
    email: "robert.j@gmail.com",
    role: "parent",
    avatar: "RJ",
    subtitle: "Parent of Alex Johnson",
  },
};

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("sms_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
  }, []);

  const login = (role: UserRole) => {
    const u = MOCK_USERS[role];
    setUser(u);
    localStorage.setItem("sms_user", JSON.stringify(u));
    router.push(`/dashboard/${role}`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sms_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
