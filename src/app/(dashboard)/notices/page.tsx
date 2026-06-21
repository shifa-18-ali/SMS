"use client";
import { useState } from "react";
import { Bell, Plus, Users, Calendar, ChevronRight } from "lucide-react";
import { notices } from "@/lib/mockData";

export default function NoticesPage() {
  const [selected, setSelected] = useState(notices[0]);

  const typeColor: Record<string, string> = {
    Event:   "badge-info",
    Finance: "badge-warning",
    Academic:"badge-default",
    Holiday: "badge-success",
  };

  const priorityColor: Record<string, string> = {
    High:   "bg-red-100   text-red-600   border-red-200",
    Medium: "bg-amber-100 text-amber-600 border-amber-200",
    Low:    "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Notice Board</h1>
          <p className="text-sm text-surface-500 mt-0.5">Broadcast announcements to students, teachers, and parents</p>
        </div>
        <button className="btn-primary text-sm self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-1.5" /> Create Notice
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* List panel */}
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-surface-100 bg-surface-50/50 flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary-500" />
            <span className="font-semibold text-surface-800">All Notices ({notices.length})</span>
          </div>
          <div className="divide-y divide-surface-50">
            {notices.map(n=>(
              <button key={n.id} onClick={()=>setSelected(n)} className={`w-full text-left p-4 hover:bg-surface-50 transition-colors ${selected.id===n.id?"bg-primary-50 border-l-2 border-l-primary-500":""}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`badge ${typeColor[n.type]}`}>{n.type}</span>
                  <span className={`badge border ${priorityColor[n.priority]}`}>{n.priority}</span>
                </div>
                <p className="text-sm font-semibold text-surface-900 leading-snug line-clamp-2">{n.title}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-surface-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/>{n.date}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3"/>{n.audience}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`badge ${typeColor[selected.type]}`}>{selected.type}</span>
                  <span className={`badge border ${priorityColor[selected.priority]}`}>{selected.priority} Priority</span>
                </div>
                <h2 className="text-xl font-bold text-surface-900">{selected.title}</h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-surface-50 rounded-xl border border-surface-100">
            {[
              { label:"Date",      val: selected.date     },
              { label:"Audience",  val: selected.audience },
              { label:"Published by",val: selected.author },
            ].map(f=>(
              <div key={f.label}>
                <p className="text-xs text-surface-400 mb-0.5">{f.label}</p>
                <p className="text-sm font-semibold text-surface-800">{f.val}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-sm text-surface-700">
            <p className="text-base leading-relaxed">{selected.body}</p>
          </div>

          <div className="flex gap-3 mt-8 pt-5 border-t border-surface-100">
            <button className="btn-primary text-sm">Mark as Read</button>
            <button className="btn-ghost text-sm">Edit Notice</button>
            <button className="btn-ghost text-sm text-red-600 border-red-200 hover:bg-red-50">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
