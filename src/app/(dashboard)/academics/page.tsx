"use client";
import { Building2, BookOpen, Plus, Users, MoreHorizontal } from "lucide-react";
import { classes, subjects } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

type Tab = "Classes" | "Subjects";

export default function AcademicsPage() {
  const { user } = useAuth();
  const tenantClasses = user?.role === "super-admin" ? classes : classes.filter(c => c.schoolId === user?.schoolId);
  const tenantSubjects = user?.role === "super-admin" ? subjects : subjects.filter(s => s.schoolId === user?.schoolId);

  const [tab, setTab] = useState<Tab>("Classes");

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Academic Management</h1>
          <p className="text-sm text-surface-500 mt-0.5">Manage classes, sections, and subjects</p>
        </div>
        <button className="btn-primary text-sm self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-1.5" /> {tab === "Classes" ? "Add Class" : "Add Subject"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-100 p-1 rounded-xl w-fit">
        {(["Classes","Subjects"] as Tab[]).map(t => (
          <button key={t} onClick={()=>setTab(t)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab===t?"bg-white text-surface-900 shadow-sm":"text-surface-500 hover:text-surface-700"}`}>{t}</button>
        ))}
      </div>

      {tab === "Classes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tenantClasses.map(c => {
            const colors = ["from-teal-500 to-teal-600","from-violet-500 to-violet-600","from-amber-500 to-amber-600","from-rose-500 to-rose-600","from-blue-500 to-blue-600"];
            const idx = parseInt(c.id.replace("CLS","")) - 1;
            return (
              <div key={c.id} className="card p-5 hover:shadow-card-md transition-shadow group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors[idx%colors.length]} flex items-center justify-center text-white shadow-md`}>
                    <Building2 className="w-6 h-6" />
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-surface-100 text-surface-400">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-bold text-lg text-surface-900 mb-1">{c.grade}</h3>
                <p className="text-xs text-surface-500 mb-3">Class Teacher: {c.classTeacher}</p>

                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-surface-400" />
                  <span className="text-sm text-surface-600">{c.students} students</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {c.sections.map(s=><span key={s} className="badge badge-default">Section {s}</span>)}
                </div>

                <div className="border-t border-surface-100 pt-3">
                  <p className="text-xs text-surface-400 mb-2">Subjects</p>
                  <div className="flex flex-wrap gap-1">
                    {c.subjects.map(s=><span key={s} className="text-xs bg-surface-50 border border-surface-200 rounded-md px-2 py-0.5 text-surface-600">{s}</span>)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "Subjects" && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-50 border-b border-surface-100">
                <tr>
                  {["Subject","Code","Department","Assigned Teacher","Grades","Weekly Periods"].map(h=>(
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-50">
                {tenantSubjects.map(s=>{
                  const deptBadge: Record<string,string> = {Science:"badge-info",Technology:"badge-default",Arts:"badge-warning",Humanities:"badge-success"};
                  return (
                    <tr key={s.id} className="hover:bg-surface-50 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-surface-900">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-surface-500">{s.code}</td>
                      <td className="px-4 py-3.5"><span className={`badge ${deptBadge[s.department]||"badge-default"}`}>{s.department}</span></td>
                      <td className="px-4 py-3.5 text-surface-600">{s.teacher}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {s.grades.map(g=><span key={g} className="badge badge-default">Gr.{g}</span>)}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center font-bold text-surface-800">{s.periods}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
