"use client";
import { Search, Bell, Sun } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const pageTitles: Record<string, string> = {
  "/dashboard/admin":       "Admin Dashboard",
  "/dashboard/teacher":     "Teacher Dashboard",
  "/dashboard/student":     "Student Dashboard",
  "/dashboard/parent":      "Parent Dashboard",
  "/dashboard/students":    "Student Management",
  "/dashboard/teachers":    "Teacher Management",
  "/dashboard/academics":   "Academic Management",
  "/dashboard/attendance":  "Attendance",
  "/dashboard/assignments": "Assignments",
  "/dashboard/exams":       "Examinations & Results",
  "/dashboard/fees":        "Fee Management",
  "/dashboard/notices":     "Notice Board",
  "/dashboard/reports":     "Reports & Analytics",
  "/dashboard/settings":    "Settings",
};

export function Header({ pathname }: { pathname: string }) {
  const { user } = useAuth();
  const title = pageTitles[pathname] ?? "EduNexus";

  return (
    <header className="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
      <div>
        <h1 className="text-lg font-bold text-surface-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Quick search…"
            className="pl-9 pr-4 py-2 bg-surface-50 border border-surface-200 rounded-xl text-sm w-56 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-surface-50 hover:bg-surface-100 border border-surface-200 flex items-center justify-center text-surface-600 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </button>

        {/* User avatar */}
        {user && (
          <div className="flex items-center gap-2.5 pl-3 border-l border-surface-200">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold ${
              user.role === "admin"   ? "bg-gradient-to-br from-teal-500 to-teal-600" :
              user.role === "teacher" ? "bg-gradient-to-br from-violet-500 to-violet-600" :
              user.role === "student" ? "bg-gradient-to-br from-amber-500 to-amber-600" :
              "bg-gradient-to-br from-rose-500 to-rose-600"
            }`}>
              {user.avatar}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-surface-900 leading-none">{user.name}</p>
              <p className="text-xs text-surface-400 mt-0.5 capitalize">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
