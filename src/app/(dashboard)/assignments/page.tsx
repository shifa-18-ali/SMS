"use client";
import { useState } from "react";
import { Plus, Search, Users, Calendar, MoreHorizontal } from "lucide-react";
import { assignments } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";

export default function AssignmentsPage() {
  const { user } = useAuth();
  const tenantAssignments = user?.role === "super-admin" ? assignments : assignments.filter(a => a.schoolId === user?.schoolId);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = tenantAssignments.filter(a => {
    const q = search.toLowerCase();
    const matchQ = !q || a.title.toLowerCase().includes(q) || a.subject.toLowerCase().includes(q);
    const matchS = filterStatus === "All" || a.status === filterStatus;
    return matchQ && matchS;
  });

  const statusBadge = (s: string) => {
    if (s === "Active")    return "badge-info";
    if (s === "Completed") return "badge-success";
    return "badge-danger";
  };

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Assignments</h1>
          <p className="text-sm text-surface-500 mt-0.5">Manage and track all class assignments</p>
        </div>
        <button className="btn-primary text-sm self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-1.5" /> Create Assignment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:"Total",     val: tenantAssignments.length,                                  color:"text-surface-700 bg-surface-100" },
          { label:"Active",    val: tenantAssignments.filter(a=>a.status==="Active").length,   color:"text-blue-700   bg-blue-100"   },
          { label:"Overdue",   val: tenantAssignments.filter(a=>a.status==="Overdue").length,  color:"text-red-700    bg-red-100"    },
        ].map(s=>(
          <div key={s.label} className="card p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl font-extrabold`}>{s.val}</div>
            <p className="text-sm font-medium text-surface-600">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search assignments…" className="input-field pl-9 text-sm py-2" />
        </div>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="input-field text-sm py-2 w-40">
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((a) => {
          const pct = Math.round((a.submissions / a.total) * 100);
          return (
            <div key={a.id} className="card p-5 hover:shadow-card-md transition-shadow group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`badge ${statusBadge(a.status)}`}>{a.status}</span>
                    <span className="badge badge-default">{a.subject}</span>
                    <span className="badge badge-default">{a.class}</span>
                  </div>
                  <h3 className="font-bold text-surface-900 leading-snug">{a.title}</h3>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 flex-shrink-0">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-surface-400 mb-4">
                <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {a.assignedBy}</div>
                <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Due: {a.dueDate}</div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-surface-500">Submissions</span>
                  <span className="font-bold text-surface-700">{a.submissions}/{a.total} ({pct}%)</span>
                </div>
                <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${pct===100?"bg-emerald-500":pct>=60?"bg-primary-500":"bg-amber-400"}`} style={{width:`${pct}%`}} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
