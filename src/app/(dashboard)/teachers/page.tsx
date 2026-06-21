"use client";
import { useState } from "react";
import { Search, Plus, MoreHorizontal, Mail, Phone } from "lucide-react";
import { teachers } from "@/lib/mockData";

export default function TeachersPage() {
  const [search, setSearch] = useState("");
  const filtered = teachers.filter(t => {
    const q = search.toLowerCase();
    return !q || t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Teacher Management</h1>
          <p className="text-sm text-surface-500 mt-0.5">{teachers.length} teaching staff members</p>
        </div>
        <button className="btn-primary text-sm self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-1.5" /> Add Teacher
        </button>
      </div>

      {/* Cards view */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input value={search} onChange={e=>setSearch(e.target.value)} type="text" placeholder="Search by name or subject…" className="input-field pl-9 text-sm py-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => {
          const deptColor: Record<string, string> = {
            Science:"from-teal-500 to-teal-600",Technology:"from-violet-500 to-violet-600",
            Arts:"from-rose-500 to-rose-600",Humanities:"from-amber-500 to-amber-600"
          };
          return (
            <div key={t.id} className="card p-6 hover:shadow-card-lg transition-shadow group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${deptColor[t.department]||"from-surface-400 to-surface-600"} flex items-center justify-center text-white text-lg font-bold shadow-md`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-surface-900">{t.name}</p>
                    <p className="text-xs text-surface-500">{t.qualification}</p>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-surface-100 text-surface-400">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className={`badge bg-gradient-to-r ${deptColor[t.department]||""} text-white`}>{t.department}</span>
                  <span className="badge badge-default">{t.subject}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {t.classes.map(c=><span key={c} className="badge badge-info">{c}</span>)}
                </div>
              </div>

              <div className="border-t border-surface-100 pt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-surface-500">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" /> {t.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-surface-500">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" /> {t.contact} &nbsp;·&nbsp; {t.experience}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className={`badge ${t.status === "Active" ? "badge-success" : "badge-warning"}`}>{t.status}</span>
                <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">View Profile →</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
