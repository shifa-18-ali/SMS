"use client";
import { useState } from "react";
import { useAuth, Role } from "@/context/AuthContext";
import { BookOpen, User, Users, GraduationCap, ShieldCheck, Building2 } from "lucide-react";
import { schools } from "@/lib/mockData";

export default function LoginPage() {
  const { login } = useAuth();
  const [role, setRole] = useState<Role>("admin");
  const [schoolId, setSchoolId] = useState<string>(schools[0].id);
  const [loading, setLoading] = useState(false);

  const roles: { id: Role; label: string; icon: React.ElementType }[] = [
    { id: "super-admin", label: "Super Admin", icon: ShieldCheck },
    { id: "admin",       label: "School Admin",icon: User },
    { id: "teacher",     label: "Teacher",     icon: BookOpen },
    { id: "student",     label: "Student",     icon: GraduationCap },
    { id: "parent",      label: "Parent",      icon: Users },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      login(role, role === "super-admin" ? null : schoolId);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-surface-900 flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="md:w-1/2 p-10 flex flex-col justify-between bg-gradient-to-br from-primary-900 to-surface-900 relative overflow-hidden hidden md:flex">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,184,166,1),transparent_70%)]" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-glow">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">EduNexus SaaS</span>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
            The Multi-Tenant <br /> <span className="gradient-text">School Platform</span>
          </h1>
          <p className="text-primary-100/80 text-lg leading-relaxed">
            Manage unlimited schools from a single enterprise platform. Experience complete data isolation, role-based access control, and powerful analytics.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-primary-200/60 font-medium">
          <span>Enterprise Grade</span> • <span>Multi-Tenant</span> • <span>SSO Ready</span>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 bg-surface-50 relative">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-surface-900 mb-2">Welcome Back</h2>
            <p className="text-surface-500">Sign in to your portal to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Role Selection */}
            <div>
              <label className="text-sm font-semibold text-surface-700 block mb-3">Select your role</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                      role === r.id
                        ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm scale-[1.02]"
                        : "border-surface-200 bg-white text-surface-500 hover:border-surface-300 hover:bg-surface-100"
                    }`}
                  >
                    <r.icon className="w-5 h-5" />
                    <span className="text-xs font-bold">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tenant Selection (Hidden for Super Admin) */}
            {role !== "super-admin" && (
              <div className="animate-fade-in">
                <label className="text-sm font-semibold text-surface-700 block mb-2">Select School (Tenant)</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                  <select 
                    value={schoolId} 
                    onChange={(e) => setSchoolId(e.target.value)}
                    className="input-field pl-10 h-12 text-sm appearance-none font-medium"
                  >
                    {schools.map(school => (
                      <option key={school.id} value={school.id}>{school.name}</option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-surface-400 mt-1.5 ml-1">Simulates tenant-based subdomain (e.g. edunexus.school.com)</p>
              </div>
            )}

            {/* Credentials */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-surface-700 block mb-2">Email Address</label>
                <input type="email" required defaultValue="demo@edunexus.com" className="input-field h-12" />
              </div>
              <div>
                <label className="text-sm font-semibold text-surface-700 block mb-2">Password</label>
                <input type="password" required defaultValue="password123" className="input-field h-12" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-700 hover:to-teal-600 text-white font-bold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-surface-500">
              Need help accessing your account? <a href="#" className="text-primary-600 font-semibold hover:underline">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
