"use client";
import { useState } from "react";
import { Search, Plus, Filter, ChevronDown, MoreHorizontal, Mail, Phone } from "lucide-react";
import { students } from "@/lib/mockData";

function Avatar({ initials, grade }: { initials: string; grade: string }) {
  const colors: Record<string, string> = { "8":"from-rose-400 to-rose-600","9":"from-amber-400 to-amber-600","10":"from-teal-400 to-teal-600","11":"from-violet-400 to-violet-600","12":"from-blue-400 to-blue-600" };
  return (
    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${colors[grade]||"from-surface-400 to-surface-600"} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [filterGrade, setFilterGrade] = useState("All");
  const [filterFee, setFilterFee] = useState("All");

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    const matchGrade = filterGrade === "All" || s.grade === filterGrade;
    const matchFee = filterFee === "All" || s.fees === filterFee;
    return matchSearch && matchGrade && matchFee;
  });

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Student Management</h1>
          <p className="text-sm text-surface-500 mt-0.5">{students.length} total students enrolled</p>
        </div>
        <button className="btn-primary text-sm self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-1.5" /> Add Student
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:"Total",   val: students.length,                                 color:"bg-surface-100 text-surface-700" },
          { label:"Active",  val: students.filter(s=>s.fees!=="Overdue").length,   color:"bg-teal-100    text-teal-700"    },
          { label:"Pending", val: students.filter(s=>s.fees==="Pending").length,   color:"bg-amber-100   text-amber-700"   },
          { label:"Overdue", val: students.filter(s=>s.fees==="Overdue").length,   color:"bg-red-100     text-red-700"     },
        ].map((c) => (
          <div key={c.label} className={`card p-4 flex items-center gap-3`}>
            <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center text-lg font-extrabold`}>{c.val}</div>
            <div><p className="text-xs text-surface-500">{c.label}</p></div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="card overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-3 p-4 border-b border-surface-100 bg-surface-50/50">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input value={search} onChange={e=>setSearch(e.target.value)} type="text" placeholder="Search by name or ID…" className="input-field pl-9 text-sm py-2" />
          </div>
          <select value={filterGrade} onChange={e=>setFilterGrade(e.target.value)} className="input-field text-sm py-2 w-36">
            <option value="All">All Grades</option>
            {["8","9","10","11","12"].map(g=><option key={g} value={g}>Grade {g}</option>)}
          </select>
          <select value={filterFee} onChange={e=>setFilterFee(e.target.value)} className="input-field text-sm py-2 w-36">
            <option value="All">All Fee Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-50 border-b border-surface-100">
              <tr>
                {["Student","ID","Class","Parent","Contact","Attendance","Fee Status","Action"].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-50">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-surface-50/80 transition-colors group">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar initials={s.avatar} grade={s.grade} />
                      <div>
                        <p className="font-semibold text-surface-900">{s.name}</p>
                        <p className="text-xs text-surface-400">{s.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-surface-500">{s.id}</td>
                  <td className="px-4 py-3.5"><span className="badge badge-default">Gr.{s.grade} – {s.section}</span></td>
                  <td className="px-4 py-3.5 text-surface-700">{s.parent}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1 text-xs text-surface-500"><Phone className="w-3 h-3"/> {s.contact}</span>
                      <span className="flex items-center gap-1 text-xs text-surface-500"><Mail className="w-3 h-3"/> {s.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-surface-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${s.attendance>=95?"bg-emerald-500":s.attendance>=85?"bg-amber-400":"bg-red-400"}`} style={{width:`${s.attendance}%`}} />
                      </div>
                      <span className="text-xs font-semibold text-surface-700">{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`badge ${s.fees==="Paid"?"badge-success":s.fees==="Pending"?"badge-warning":"badge-danger"}`}>{s.fees}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-surface-100 text-surface-500">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-surface-400">
              <p className="text-lg font-medium">No students found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-surface-100 bg-surface-50/50">
          <p className="text-sm text-surface-500">Showing <strong>{filtered.length}</strong> of <strong>{students.length}</strong> students</p>
          <div className="flex gap-1">
            {[1,2,3].map(p=>(
              <button key={p} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p===1?"bg-primary-600 text-white":"bg-white border border-surface-200 text-surface-600 hover:bg-surface-50"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
