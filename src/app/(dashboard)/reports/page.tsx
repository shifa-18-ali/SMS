"use client";
import { Download, BarChart3, Users, Wallet, CalendarCheck } from "lucide-react";
import {
  examPerformance, attendanceTrend, feeMonthly, adminKPIs
} from "@/lib/mockData";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, Legend,
} from "recharts";

// REPORT_CARDS moved inside component

export default function ReportsPage() {
  const { user } = useAuth();
  const kpis = adminKPIs[user?.schoolId as keyof typeof adminKPIs] || adminKPIs["S-001"];
  const tenantExamPerformance = user?.role === "super-admin" ? examPerformance : examPerformance.filter(e => e.schoolId === user?.schoolId);
  const tenantAttendanceTrend = user?.role === "super-admin" ? attendanceTrend : attendanceTrend.filter(a => a.schoolId === user?.schoolId);
  const tenantFeeMonthly = user?.role === "super-admin" ? feeMonthly : feeMonthly.filter(f => f.schoolId === user?.schoolId);

  const REPORT_CARDS = [
    { label: "Total Students",   val: kpis.totalStudents.toLocaleString(), icon: Users,         color: "bg-teal-100 text-teal-600"     },
    { label: "Total Teachers",   val: String(kpis.totalTeachers),          icon: Users,         color: "bg-violet-100 text-violet-600" },
    { label: "Avg Attendance",   val: `${kpis.attendanceRate}%`,           icon: CalendarCheck, color: "bg-amber-100 text-amber-600"   },
    { label: "Fee Collection",   val: `$${(kpis.feeCollected/1000).toFixed(0)}K`, icon: Wallet, color: "bg-emerald-100 text-emerald-600" },
  ];
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Reports & Analytics</h1>
          <p className="text-sm text-surface-500 mt-0.5">Comprehensive insights across all modules</p>
        </div>
        <button className="btn-ghost text-sm self-start sm:self-auto border-surface-300">
          <Download className="w-4 h-4 mr-1.5" /> Export Report
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {REPORT_CARDS.map((c) => (
          <div key={c.label} className="card p-5">
            <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center mb-3`}>
              <c.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-extrabold text-surface-900">{c.val}</p>
            <p className="text-xs text-surface-500 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Exam performance */}
        <div className="card p-6">
          <h3 className="font-bold text-surface-900 mb-1">Exam Performance by Subject</h3>
          <p className="text-xs text-surface-500 mb-5">Average vs highest scores</p>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={tenantExamPerformance} margin={{ top:5,right:5,left:-20,bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="subject" tick={{fill:"#94a3b8",fontSize:12}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill:"#94a3b8",fontSize:12}} axisLine={false} tickLine={false} domain={[0,100]} />
              <Tooltip contentStyle={{borderRadius:"12px",border:"none",fontSize:"12px"}} />
              <Legend wrapperStyle={{fontSize:"12px"}} />
              <Bar dataKey="avg"     fill="#14b8a6" radius={[6,6,0,0]} name="Avg Score" />
              <Bar dataKey="highest" fill="#d946ef" radius={[6,6,0,0]} name="Highest"   />
              <Bar dataKey="lowest"  fill="#fbbf24" radius={[6,6,0,0]} name="Lowest"    />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance trend line */}
        <div className="card p-6">
          <h3 className="font-bold text-surface-900 mb-1">Weekly Attendance Trend</h3>
          <p className="text-xs text-surface-500 mb-5">Present vs Absent this week</p>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={tenantAttendanceTrend} margin={{top:5,right:5,left:-20,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{fill:"#94a3b8",fontSize:12}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill:"#94a3b8",fontSize:12}} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{borderRadius:"12px",border:"none",fontSize:"12px"}} />
              <Legend wrapperStyle={{fontSize:"12px"}} />
              <Line type="monotone" dataKey="present" stroke="#14b8a6" strokeWidth={3} dot={{fill:"#14b8a6",r:5}} name="Present %" />
              <Line type="monotone" dataKey="absent"  stroke="#f43f5e" strokeWidth={3} dot={{fill:"#f43f5e",r:5}} name="Absent %"  strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="card p-6">
        <h3 className="font-bold text-surface-900 mb-1">Monthly Fee Collection vs Pending</h3>
        <p className="text-xs text-surface-500 mb-5">Financial trend over the academic year</p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={tenantFeeMonthly} margin={{top:5,right:10,left:10,bottom:0}}>
            <defs>
              <linearGradient id="gradCollected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#14b8a6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="gradPending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#fbbf24" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{fill:"#94a3b8",fontSize:12}} axisLine={false} tickLine={false} />
            <YAxis tick={{fill:"#94a3b8",fontSize:12}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}K`} />
            <Tooltip formatter={(v:number)=>`$${v.toLocaleString()}`} contentStyle={{borderRadius:"12px",border:"none",fontSize:"12px"}} />
            <Legend wrapperStyle={{fontSize:"12px"}} />
            <Area type="monotone" dataKey="collected" stroke="#14b8a6" strokeWidth={2.5} fill="url(#gradCollected)" name="Collected" />
            <Area type="monotone" dataKey="pending"   stroke="#fbbf24" strokeWidth={2.5} fill="url(#gradPending)"   name="Pending"   />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Quick report links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title:"Student Report",    desc:"Enrollment & performance summary" },
          { title:"Attendance Report", desc:"Class-wise monthly analysis"       },
          { title:"Fee Report",        desc:"Collection & outstanding ledger"   },
          { title:"Exam Report",       desc:"Subject-wise result breakdown"     },
        ].map(r=>(
          <div key={r.title} className="card p-4 hover:shadow-card-md transition-shadow cursor-pointer group">
            <div className="w-9 h-9 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-3 group-hover:bg-primary-600 group-hover:text-white transition-colors">
              <BarChart3 className="w-4 h-4" />
            </div>
            <p className="text-sm font-bold text-surface-900">{r.title}</p>
            <p className="text-xs text-surface-500 mt-0.5">{r.desc}</p>
            <p className="text-xs text-primary-600 font-semibold mt-3 group-hover:underline">Generate →</p>
          </div>
        ))}
      </div>
    </div>
  );
}
