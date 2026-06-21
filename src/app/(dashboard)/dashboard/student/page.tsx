"use client";
import { CalendarCheck, BookOpen, ClipboardList, Award } from "lucide-react";
import { studentAttendanceSummary, studentResults, studentAssignments } from "@/lib/mockData";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import Link from "next/link";

export default function StudentDashboard() {
  const { present, absent, late, total, percentage } = studentAttendanceSummary;

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400 p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div>
          <p className="text-amber-100 text-sm mb-1">Welcome back 👋</p>
          <h2 className="text-2xl font-extrabold">Hello, Alex Johnson</h2>
          <p className="text-amber-100 text-sm mt-1">Grade 10 – Section A · Roll No: 10A01</p>
        </div>
        <div className="flex gap-3">
          <Link href="/assignments" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition-colors">My Assignments</Link>
          <Link href="/exams" className="px-4 py-2 bg-white text-amber-700 rounded-xl text-sm font-semibold hover:bg-amber-50 transition-colors">My Results</Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:"Attendance",      val:`${percentage}%`, icon: CalendarCheck, color:"bg-teal-100   text-teal-600"   },
          { label:"Days Present",    val:String(present),  icon: CalendarCheck, color:"bg-emerald-100 text-emerald-600"},
          { label:"Assignments Due", val:"1",              icon: ClipboardList, color:"bg-amber-100  text-amber-600"  },
          { label:"Best Subject",    val:"English",        icon: Award,         color:"bg-violet-100 text-violet-600" },
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
        {/* Result Radar */}
        <div className="card p-6">
          <h3 className="font-bold text-surface-900 mb-5">Subject Performance</h3>
          <ResponsiveContainer width="100%" height={230}>
            <RadarChart data={studentResults}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill:"#64748b", fontSize:12 }} />
              <Radar name="Marks" dataKey="marks" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} strokeWidth={2} />
              <Tooltip contentStyle={{ borderRadius:"10px", border:"none", fontSize:"12px" }} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {studentResults.map((r) => (
              <div key={r.subject} className="text-center p-2 bg-surface-50 rounded-xl">
                <p className="text-lg font-extrabold text-surface-900">{r.marks}</p>
                <p className="text-xs text-surface-500">{r.subject}</p>
                <span className={`badge mt-1 ${r.grade.includes("+") || r.grade === "A" ? "badge-success" : r.grade === "B+" || r.grade === "B" ? "badge-info" : "badge-warning"}`}>{r.grade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments + Attendance */}
        <div className="flex flex-col gap-5">
          <div className="card p-6">
            <h3 className="font-bold text-surface-900 mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-amber-500" /> My Assignments
            </h3>
            <div className="space-y-3">
              {studentAssignments.map((a) => (
                <div key={a.id} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl border border-surface-100">
                  <div>
                    <p className="text-sm font-medium text-surface-800">{a.title}</p>
                    <p className="text-xs text-surface-400 mt-0.5">{a.subject} · Due: {a.dueDate}</p>
                  </div>
                  <span className={`badge ${a.status === "Submitted" ? "badge-success" : "badge-warning"}`}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-surface-900 mb-4">Attendance Summary</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label:"Present", val:present, color:"text-emerald-600 bg-emerald-50" },
                { label:"Absent",  val:absent,  color:"text-red-600    bg-red-50"      },
                { label:"Late",    val:late,    color:"text-amber-600  bg-amber-50"    },
              ].map((s) => (
                <div key={s.label} className={`rounded-xl p-3 text-center ${s.color}`}>
                  <p className="text-2xl font-extrabold">{s.val}</p>
                  <p className="text-xs font-medium mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-surface-500 mb-1.5">
              <span>Overall Attendance</span>
              <span className="font-bold text-primary-600">{percentage}%</span>
            </div>
            <div className="h-2.5 bg-surface-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" style={{ width:`${percentage}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
