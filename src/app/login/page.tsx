"use client";
import { useState } from "react";
import Link from "next/link";
import { BookOpen, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth, UserRole } from "@/context/AuthContext";

const ROLES: { role: UserRole; label: string; desc: string; color: string; email: string }[] = [
  { role: "admin",   label: "Administrator", desc: "Full institutional control",      color: "from-teal-500 to-teal-600",     email: "admin@edunexus.edu"   },
  { role: "teacher", label: "Teacher",       desc: "Classes, marks & assignments",    color: "from-violet-500 to-violet-600", email: "sarah.j@edunexus.edu" },
  { role: "student", label: "Student",       desc: "Grades, attendance & schedule",   color: "from-amber-500 to-amber-600",   email: "alex.j@edunexus.edu"  },
  { role: "parent",  label: "Parent",        desc: "Child progress & fee status",     color: "from-rose-500 to-rose-600",     email: "robert.j@gmail.com"   },
];

export default function LoginPage() {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [loading, setLoading] = useState(false);

  const currentRole = ROLES.find((r) => r.role === selectedRole)!;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login(selectedRole);
  };

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute top-1/3 left-1/4  w-72 h-72 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent-500/10  rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10">

        {/* Left panel */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-surface-900 to-surface-800 border-r border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-glow">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">EduNexus</span>
          </Link>

          <div>
            <h1 className="text-3xl font-extrabold text-white leading-tight mb-4">
              Your campus, <br />
              <span className="gradient-text">digitally transformed.</span>
            </h1>
            <p className="text-surface-400 text-sm leading-relaxed mb-8">
              Access your personalized dashboard with real-time data on academics, attendance, fees, and communication.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Role-based access for all stakeholders",
                "Real-time analytics and reports",
                "Automated fee & attendance tracking",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-surface-300">
                  <ShieldCheck className="w-4 h-4 text-primary-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="text-surface-600 text-xs">© 2026 EduNexus. All rights reserved.</p>
        </div>

        {/* Right panel – form */}
        <div className="flex flex-col justify-center p-8 bg-surface-900">
          <h2 className="text-2xl font-bold text-white mb-1">Sign in to your portal</h2>
          <p className="text-surface-400 text-sm mb-8">Select your role to access the right dashboard.</p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {ROLES.map((r) => (
              <button
                key={r.role}
                onClick={() => setSelectedRole(r.role)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                  selectedRole === r.role
                    ? "border-primary-500 bg-primary-500/10 shadow-glow"
                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold text-white bg-gradient-to-r ${r.color} mb-1`}>
                  {r.label}
                </div>
                <p className="text-surface-400 text-xs">{r.desc}</p>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-surface-300 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                <input
                  type="email"
                  value={currentRole.email}
                  readOnly
                  className="input-field pl-10 bg-surface-800 border-surface-700 text-surface-300 focus:ring-primary-500 cursor-default"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-surface-300">Password</label>
                <a href="#" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                <input
                  type="password"
                  defaultValue="demo1234"
                  className="input-field pl-10 bg-surface-800 border-surface-700 text-surface-300 focus:ring-primary-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-glow mt-2 ${
                loading ? "bg-primary-700 opacity-70 cursor-not-allowed" : "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : (
                <>Sign in as {currentRole.label} <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-surface-500 text-xs mt-6">
            Demo mode — all data is simulated for presentation purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
