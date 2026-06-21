"use client";
import { useState } from "react";
import { Plus, BookOpen, Calendar, Trophy } from "lucide-react";
import { exams, results } from "@/lib/mockData";

type Tab = "Exams" | "Results";

export default function ExamsPage() {
  const [tab, setTab] = useState<Tab>("Exams");

  const statusBadge = (s: string) => {
    if (s === "Upcoming")  return "badge-info";
    if (s === "Completed") return "badge-success";
    return "badge-default";
  };

  const gradeBadge = (g: string) => {
    if (g.includes("+") || g === "A") return "badge-success";
    if (g.startsWith("B"))            return "badge-info";
    if (g === "D" || g === "F")       return "badge-danger";
    return "badge-warning";
  };

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Examinations & Results</h1>
          <p className="text-sm text-surface-500 mt-0.5">Schedule exams and publish results</p>
        </div>
        <button className="btn-primary text-sm self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-1.5" /> Schedule Exam
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-100 p-1 rounded-xl w-fit">
        {(["Exams","Results"] as Tab[]).map(t => (
          <button key={t} onClick={()=>setTab(t)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab===t?"bg-white text-surface-900 shadow-sm":"text-surface-500 hover:text-surface-700"}`}>{t}</button>
        ))}
      </div>

      {tab === "Exams" && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label:"Total Exams",    val: exams.length,                                color:"bg-blue-100  text-blue-700"   },
              { label:"Upcoming",       val: exams.filter(e=>e.status==="Upcoming").length,color:"bg-amber-100 text-amber-700"  },
              { label:"Completed",      val: exams.filter(e=>e.status==="Completed").length,color:"bg-teal-100  text-teal-700"  },
            ].map(s=>(
              <div key={s.label} className="card p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl font-extrabold`}>{s.val}</div>
                <p className="text-sm font-medium text-surface-600">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams.map(e => (
              <div key={e.id} className="card p-5 hover:shadow-card-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`badge ${statusBadge(e.status)}`}>{e.status}</span>
                      <span className="badge badge-default">{e.class}</span>
                    </div>
                    <h3 className="font-bold text-surface-900">{e.name}</h3>
                    <p className="text-xs text-surface-500 mt-0.5">{e.subject}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-surface-100">
                  {[
                    { label:"Date",       val: e.date        },
                    { label:"Duration",   val: e.duration    },
                    { label:"Max Marks",  val: String(e.totalMarks) },
                  ].map(f=>(
                    <div key={f.label} className="text-center">
                      <p className="text-xs text-surface-400">{f.label}</p>
                      <p className="text-sm font-bold text-surface-800 mt-0.5">{f.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "Results" && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-surface-100 bg-surface-50/50 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-surface-800">Recent Exam Results</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-50 border-b border-surface-100">
                <tr>
                  {["Student","Subject","Exam","Marks","Grade","Status"].map(h=>(
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-50">
                {results.map(r=>(
                  <tr key={r.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-4 py-3.5 font-semibold text-surface-900">{r.name}</td>
                    <td className="px-4 py-3.5 text-surface-600">{r.subject}</td>
                    <td className="px-4 py-3.5 text-surface-500 text-xs">{r.examName}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-surface-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${r.marks>=80?"bg-emerald-500":r.marks>=60?"bg-primary-500":"bg-red-400"}`} style={{width:`${r.marks}%`}} />
                        </div>
                        <span className="font-bold text-surface-800">{r.marks}/{r.total}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5"><span className={`badge ${gradeBadge(r.grade)}`}>{r.grade}</span></td>
                    <td className="px-4 py-3.5"><span className={`badge ${r.status==="Pass"?"badge-success":"badge-danger"}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
