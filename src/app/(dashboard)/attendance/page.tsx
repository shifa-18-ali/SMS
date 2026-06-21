"use client";
import { useState } from "react";
import { CheckCircle2, XCircle, Clock, Calendar, Save } from "lucide-react";
import { attendanceRecords, attendanceTrend } from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Status = "Present" | "Absent" | "Late";

export default function AttendancePage() {
  const { user } = useAuth();
  const tenantRecords = user?.role === "super-admin" ? attendanceRecords : attendanceRecords.filter(r => r.schoolId === user?.schoolId);
  const tenantTrend = user?.role === "super-admin" ? attendanceTrend : attendanceTrend.filter(t => t.schoolId === user?.schoolId);

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [selectedClass, setSelectedClass] = useState("10A");
  const [records, setRecords] = useState<Record<string, Status>>(() => {
    const init: Record<string, Status> = {};
    tenantRecords.forEach(r => { init[r.studentId] = r.status as Status; });
    return init;
  });
  const [saved, setSaved] = useState(false);

  const toggle = (id: string, status: Status) => {
    setRecords(p => ({ ...p, [id]: status }));
    setSaved(false);
  };

  const present = Object.values(records).filter(s=>s==="Present").length;
  const absent  = Object.values(records).filter(s=>s==="Absent").length;
  const late    = Object.values(records).filter(s=>s==="Late").length;

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Attendance Management</h1>
          <p className="text-sm text-surface-500 mt-0.5">Mark and track daily student attendance</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-surface-200 rounded-xl px-3 py-2 shadow-sm">
          <Calendar className="w-4 h-4 text-surface-400" />
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="bg-transparent border-none outline-none text-sm font-medium text-surface-800" />
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:"Present", val:present, cls:"bg-emerald-50 border-emerald-100 text-emerald-700" },
          { label:"Absent",  val:absent,  cls:"bg-red-50    border-red-100    text-red-700"    },
          { label:"Late",    val:late,    cls:"bg-amber-50  border-amber-100  text-amber-700"  },
        ].map(s=>(
          <div key={s.label} className={`card p-4 flex items-center gap-3 border ${s.cls}`}>
            <p className="text-3xl font-extrabold">{s.val}</p>
            <p className="text-sm font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Class selector */}
        <div className="card p-5">
          <h3 className="text-sm font-bold text-surface-700 mb-3 uppercase tracking-wider">Select Class</h3>
          <div className="space-y-1">
            {["8A","8B","9A","9B","10A","10B","11A","11B","12A","12B"].map(cls=>(
              <button key={cls} onClick={()=>setSelectedClass(cls)} className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${cls===selectedClass?"bg-primary-600 text-white shadow-glow":"text-surface-600 hover:bg-surface-50"}`}>
                Class {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Attendance list */}
        <div className="lg:col-span-2 card overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-surface-100 bg-surface-50/50">
            <div>
              <h3 className="font-bold text-surface-900">Class {selectedClass}</h3>
              <p className="text-xs text-surface-400">{tenantRecords.length} students</p>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>{ const n:Record<string,Status>={}; tenantRecords.forEach(r=>{n[r.studentId]="Present";}); setRecords(n); setSaved(false); }} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors">
                All Present
              </button>
              <button onClick={()=>setSaved(true)} className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5">
                <Save className="w-3.5 h-3.5" /> {saved?"Saved!":"Save"}
              </button>
            </div>
          </div>
          <div className="divide-y divide-surface-50">
            {tenantRecords.map((r) => (
              <div key={r.studentId} className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
                    {r.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-900">{r.name}</p>
                    <p className="text-xs text-surface-400">{r.studentId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(["Present","Late","Absent"] as Status[]).map(status=>{
                    const isActive = records[r.studentId]===status;
                    const colors: Record<Status,string> = {
                      Present: isActive?"bg-emerald-500 text-white border-emerald-500":"text-surface-400 border-surface-200 hover:border-emerald-300 hover:text-emerald-500",
                      Late:    isActive?"bg-amber-400  text-white border-amber-400":"text-surface-400 border-surface-200 hover:border-amber-300  hover:text-amber-500",
                      Absent:  isActive?"bg-red-500    text-white border-red-500":"text-surface-400 border-surface-200 hover:border-red-300    hover:text-red-500",
                    };
                    return (
                      <button key={status} onClick={()=>toggle(r.studentId, status)} className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${colors[status]}`}>
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly chart */}
        <div className="card p-5">
          <h3 className="font-bold text-surface-900 mb-4">Weekly Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tenantTrend} layout="vertical" margin={{top:0,right:10,left:-10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" tick={{fill:"#94a3b8",fontSize:11}} axisLine={false} tickLine={false} domain={[0,100]} tickFormatter={v=>`${v}%`} />
              <YAxis type="category" dataKey="day" tick={{fill:"#94a3b8",fontSize:11}} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{borderRadius:"10px",border:"none",fontSize:"12px"}} />
              <Bar dataKey="present" fill="#14b8a6" radius={[0,4,4,0]} name="Present %" />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-surface-500">This week average</span>
              <span className="font-bold text-primary-600">93.2%</span>
            </div>
            <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full" style={{width:"93.2%"}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
