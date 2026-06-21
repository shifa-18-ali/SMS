"use client";
import { User, CalendarCheck, Wallet, BookOpen } from "lucide-react";
import { parentChildInfo } from "@/lib/mockData";
import Link from "next/link";

export default function ParentDashboard() {
  const { name, grade, section, rollNo, classTeacher, attendance, fees, recentMarks } = parentChildInfo;

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome banner */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-pink-400 p-6 text-white shadow-md">
        <p className="text-rose-100 text-sm mb-1">Parent Portal 👨‍👧</p>
        <h2 className="text-2xl font-extrabold">Welcome, Robert Johnson</h2>
        <p className="text-rose-100 text-sm mt-1">Monitoring progress for your child</p>
      </div>

      {/* Child info card */}
      <div className="card p-6 flex flex-col md:flex-row gap-6 items-start">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-3xl font-extrabold flex-shrink-0 shadow-md">
          AJ
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label:"Full Name",       val: name           },
            { label:"Grade",           val: `${grade} – ${section}` },
            { label:"Roll Number",     val: rollNo         },
            { label:"Class Teacher",   val: classTeacher   },
          ].map((f) => (
            <div key={f.label}>
              <p className="text-xs text-surface-400 mb-0.5">{f.label}</p>
              <p className="text-sm font-semibold text-surface-900">{f.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Attendance */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-surface-500">Attendance</p>
              <p className="text-2xl font-extrabold text-surface-900">{attendance.percentage}%</p>
            </div>
          </div>
          <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full" style={{ width:`${attendance.percentage}%` }} />
          </div>
          <div className="flex justify-between text-xs text-surface-400 mt-2">
            <span>Present: {attendance.present} days</span>
            <span>Absent: {attendance.absent} days</span>
          </div>
        </div>

        {/* Fee Status */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${fees.status === "Paid" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-surface-500">Fee Status</p>
              <p className="text-2xl font-extrabold text-surface-900">${fees.amount.toLocaleString()}</p>
            </div>
          </div>
          <div className={`p-3 rounded-xl ${fees.status === "Paid" ? "bg-emerald-50 border border-emerald-100" : "bg-red-50 border border-red-100"}`}>
            <p className="text-xs font-semibold text-surface-700">Status: <span className={fees.status === "Paid" ? "text-emerald-600" : "text-red-600"}>{fees.status}</span></p>
            <p className="text-xs text-surface-500 mt-0.5">{fees.status === "Paid" ? `Paid on: ${fees.paidDate}` : `Due: ${fees.dueDate}`}</p>
          </div>
          <Link href="/fees" className="mt-3 text-xs text-primary-600 hover:underline font-medium flex items-center gap-1">View detailed statement</Link>
        </div>

        {/* Recent Marks */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-surface-500">Recent Results</p>
              <p className="text-sm font-semibold text-surface-900">Latest Exams</p>
            </div>
          </div>
          <div className="space-y-2">
            {recentMarks.map((m) => (
              <div key={m.subject} className="flex items-center justify-between">
                <p className="text-sm text-surface-700">{m.subject}</p>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-surface-200 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width:`${(m.marks/m.total)*100}%` }} />
                  </div>
                  <p className="text-xs font-bold text-surface-800 w-12 text-right">{m.marks}/{m.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notices */}
      <div className="card p-6">
        <h3 className="font-bold text-surface-900 mb-4">Important Notices for Parents</h3>
        <div className="space-y-3">
          {[
            { title:"Parent-Teacher Meeting – June 28", date:"Jun 10", type:"Event" },
            { title:"Q3 Fee Submission Deadline – June 30", date:"Jun 15", type:"Finance" },
          ].map((n) => (
            <div key={n.title} className="flex items-start gap-3 p-3 bg-surface-50 rounded-xl border border-surface-100">
              <span className={`badge mt-0.5 ${n.type === "Finance" ? "badge-warning" : "badge-info"}`}>{n.type}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-surface-800">{n.title}</p>
              </div>
              <p className="text-xs text-surface-400 flex-shrink-0">{n.date}</p>
            </div>
          ))}
        </div>
        <Link href="/notices" className="mt-3 text-sm text-primary-600 hover:underline font-medium">View all notices →</Link>
      </div>
    </div>
  );
}
