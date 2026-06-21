"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { schools } from "@/lib/mockData";

export type Role = "super-admin" | "admin" | "teacher" | "student" | "parent";

export interface User {
  id: string;
  name: string;
  role: Role;
  schoolId: string | null; // null for super-admin
  avatar: string;
  subtitle: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: Role, schoolId?: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("sms_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (role: Role, schoolId: string | null = "S-001") => {
    let mockUser: User;
    
    // For super admin, schoolId is null since they govern the platform
    if (role === "super-admin") {
      mockUser = { id: "SA001", name: "System Admin", role: "super-admin", schoolId: null, avatar: "SA", subtitle: "Platform Owner" };
    } else {
      const school = schools.find(s => s.id === schoolId) || schools[0];
      if (role === "admin")   mockUser = { id: "A001", name: "Sarah Jenkins", role: "admin",   schoolId, avatar: "SJ", subtitle: `Principal - ${school.name}` };
      else if (role === "teacher") mockUser = { id: "T001", name: "Michael Chang", role: "teacher", schoolId, avatar: "MC", subtitle: `Teacher - ${school.name}` };
      else if (role === "student") mockUser = { id: "S001", name: "Alex Johnson",  role: "student", schoolId, avatar: "AJ", subtitle: `Student - ${school.name}` };
      else mockUser = { id: "P001", name: "Robert Johnson",role: "parent",  schoolId, avatar: "RJ", subtitle: `Parent - ${school.name}` };
    }

    setUser(mockUser);
    localStorage.setItem("sms_user", JSON.stringify(mockUser));
    
    if (role === "super-admin") {
      router.replace("/dashboard/super-admin");
    } else {
      router.replace(`/dashboard/${role}`);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sms_user");
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
