"use client";
import { Clock, BookOpen, CheckCircle2, Users, ClipboardList } from "lucide-react";
import { teacherSchedule, pendingAssignmentsToGrade, attendanceTrend } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

export default function TeacherDashboard() {
  return (
    <div className="space-y-6 pb-8">
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-600 via-violet-500 to-purple-400 p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div>
          <p className="text-violet-100 text-sm mb-1">Good evening 👋</p>
          <h2 className="text-2xl font-extrabold">Welcome back, Mrs. Sarah Jenkins</h2>
          <p className="text-violet-100 text-sm mt-1">Mathematics Department · Thursday, June 19</p>
        </div>
        <div className="flex gap-3">
          <Link href="/attendance" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition-colors">Mark Attendance</Link>
          <Link href="/assignments" className="px-4 py-2 bg-white text-violet-700 rounded-xl text-sm font-semibold hover:bg-violet-50 transition-colors">New Assignment</Link>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:"My Classes",       val:"5",  color:"bg-violet-100 text-violet-600", icon: BookOpen      },
          { label:"Students",         val:"153",color:"bg-teal-100   text-teal-600",   icon: Users          },
          { label:"Assignments Open", val:"3",  color:"bg-amber-100  text-amber-600",  icon: ClipboardList  },
          { label:"Avg. Class Score", val:"76%",color:"bg-rose-100   text-rose-600",   icon: CheckCircle2   },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-surface-900">{s.val}</p>
            <p className="text-xs text-surface-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Today's Schedule */}
        <div className="card p-6">
          <h3 className="font-bold text-surface-900 mb-5 flex items-center gap-2">
            <Clock className="w-5 h-5 text-violet-500" />
            Todays Schedule
          </h3>
          <div className="space-y-3">
            {teacherSchedule.map((s, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border ${s.subject === "Free Period" ? "border-dashed border-surface-200 opacity-60" : "border-surface-100 bg-surface-50"}`}>
                <div className="text-center min-w-[48px]">
                  <p className="text-xs font-bold text-violet-500">{s.period}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-surface-800">{s.subject}</p>
                  <p className="text-xs text-surface-400">{s.time}</p>
                </div>
                {s.class !== "-" && (
                  <div className="flex gap-2 text-xs">
                    <span className="badge badge-default">{s.class}</span>
                    <span className="text-surface-400">{s.room}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pending to Grade + Class Attendance */}
        <div className="flex flex-col gap-5">
          <div className="card p-6">
            <h3 className="font-bold text-surface-900 mb-4">Assignments to Grade</h3>
            <div className="space-y-3">
              {pendingAssignmentsToGrade.map((a) => (
                <div key={a.id} className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                  <p className="text-sm font-semibold text-surface-800">{a.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="badge badge-warning">{a.class}</span>
                      <span className="text-xs text-surface-500">Due: {a.due}</span>
                    </div>
                    <span className="text-xs font-bold text-surface-700">{a.submitted}/{a.total} submitted</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-amber-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width:`${(a.submitted/a.total)*100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-surface-900 mb-4">Class Attendance This Week</h3>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={attendanceTrend} margin={{ top:5, right:5, left:-25, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" tick={{ fill:"#94a3b8", fontSize:11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill:"#94a3b8", fontSize:11 }} axisLine={false} tickLine={false} domain={[80,100]} />
                <Tooltip contentStyle={{ borderRadius:"10px", border:"none", fontSize:"12px" }} />
                <Bar dataKey="present" fill="#8b5cf6" radius={[4,4,0,0]} name="Present %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
