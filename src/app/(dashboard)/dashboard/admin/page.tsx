"use client";
import {
  Users, UserSquare2, CalendarCheck, Wallet, TrendingUp, TrendingDown,
  BookOpen, Bell, ArrowRight, AlertCircle, CheckCircle2, Clock
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  adminKPIs, attendanceTrend, feeMonthly, examPerformance
} from "@/lib/mockData";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const PIE_COLORS = ["#14b8a6", "#e2e8f0"];

function KpiCard({ title, value, sub, icon: Icon, trend, trendVal, color }: {
  title: string; value: string; sub: string; icon: React.ElementType;
  trend: "up" | "down"; trendVal: string; color: string;
}) {
  return (
    <div className="card p-5 flex flex-col gap-4 hover:shadow-card-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-surface-500 font-medium">{title}</p>
          <p className="text-3xl font-extrabold text-surface-900 mt-1">{value}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-sm">
        {trend === "up"
          ? <TrendingUp className="w-4 h-4 text-emerald-500" />
          : <TrendingDown className="w-4 h-4 text-red-500" />}
        <span className={trend === "up" ? "text-emerald-600 font-semibold" : "text-red-500 font-semibold"}>
          {trendVal}
        </span>
        <span className="text-surface-400">{sub}</span>
      </div>
    </div>
  );
}

function ActivityIcon({ type }: { type: string }) {
  const cls = "w-4 h-4";
  const map: Record<string, React.ReactNode> = {
    student:    <Users className={cls} />,
    fee:        <Wallet className={cls} />,
    exam:       <BookOpen className={cls} />,
    attendance: <CalendarCheck className={cls} />,
    notice:     <Bell className={cls} />,
    teacher:    <UserSquare2 className={cls} />,
  };
  const colorMap: Record<string, string> = {
    student: "bg-teal-100 text-teal-600",
    fee:     "bg-emerald-100 text-emerald-600",
    exam:    "bg-violet-100 text-violet-600",
    attendance:"bg-amber-100 text-amber-600",
    notice:  "bg-blue-100 text-blue-600",
    teacher: "bg-rose-100 text-rose-600",
  };
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${colorMap[type] ?? "bg-surface-100 text-surface-500"}`}>
      {map[type] ?? <Bell className={cls} />}
    </div>
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const kpis = adminKPIs[user?.schoolId as keyof typeof adminKPIs] || adminKPIs["S-001"];
  const tenantFeeMonthly = feeMonthly.filter(f => f.schoolId === user?.schoolId);
  const tenantExamPerformance = examPerformance.filter(e => e.schoolId === user?.schoolId);

  const feePieData = [
    { name: "Collected", value: kpis.feeCollected },
    { name: "Pending",   value: kpis.feePending   },
  ];

  return (
    <div className="space-y-6 pb-8">

      {/* Welcome banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-teal-400 p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-glow">
        <div>
          <p className="text-primary-100 text-sm font-medium mb-1">Good evening, Administrator 👋</p>
          <h2 className="text-2xl font-extrabold">&apos Heres what shappening at EduNexus today &apos</h2>
          <p className="text-primary-100 text-sm mt-1">Thursday, June 19, 2026</p>
        </div>
        <div className="flex gap-3">
          <Link href="/students" className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition-colors">
            Manage Students <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/reports" className="flex items-center gap-2 px-4 py-2 bg-white text-primary-700 rounded-xl text-sm font-semibold hover:bg-primary-50 transition-colors">
            View Reports
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <KpiCard title="Total Students"   value={kpis.totalStudents.toLocaleString()} sub="vs last term"  icon={Users}        trend="up"   trendVal="+12%"   color="bg-teal-100 text-teal-600"   />
        <KpiCard title="Total Teachers"   value={String(kpis.totalTeachers)}           sub="vs last month" icon={UserSquare2}   trend="up"   trendVal="+3"     color="bg-violet-100 text-violet-600"/>
        <KpiCard title="Attendance Rate"  value={`${kpis.attendanceRate}%`}            sub="vs yesterday"  icon={CalendarCheck} trend="up"   trendVal="+1.2%"  color="bg-amber-100 text-amber-600" />
        <KpiCard title="Fee Collection"   value="94%"                sub="of target"     icon={Wallet}        trend="down" trendVal="-2%"    color="bg-rose-100 text-rose-600"   />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Attendance Area Chart */}
        <div className="card lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-surface-900">Weekly Attendance Trend</h3>
              <p className="text-xs text-surface-500 mt-0.5">Daily attendance percentage this week</p>
            </div>
            <span className="badge badge-success">Live</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={tenantFeeMonthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#14b8a6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fill:"#94a3b8", fontSize:12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#94a3b8", fontSize:12 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[80,100]} />
              <Tooltip contentStyle={{ borderRadius:"12px", border:"none", boxShadow:"0 10px 15px -3px rgba(0,0,0,0.1)", fontSize:"12px" }} />
              <Area type="monotone" dataKey="present" stroke="#14b8a6" strokeWidth={3} fill="url(#gradPresent)" name="Present %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Fee Pie */}
        <div className="card p-6">
          <div className="mb-6">
            <h3 className="font-bold text-surface-900">Fee Collection</h3>
            <p className="text-xs text-surface-500 mt-0.5">Current academic year</p>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={feePieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                {feePieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around mt-4">
            {feePieData.map((d, i) => (
              <div key={d.name} className="text-center">
                <div className="flex items-center gap-1.5 justify-center mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-xs text-surface-500">{d.name}</span>
                </div>
                <p className="font-bold text-sm text-surface-800">${(d.value / 1000).toFixed(0)}K</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-surface-50 rounded-xl p-3">
            <div className="flex justify-between text-xs text-surface-500 mb-1.5">
              <span>Collection Progress</span>
              <span className="font-semibold text-primary-600">94%</span>
            </div>
            <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all" style={{ width:`94%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Exam Performance Bar Chart */}
        <div className="card lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-surface-900">Exam Performance by Subject</h3>
              <p className="text-xs text-surface-500 mt-0.5">Average marks across all grades</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tenantExamPerformance} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="subject" tick={{ fill:"#94a3b8", fontSize:12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#94a3b8", fontSize:12 }} axisLine={false} tickLine={false} domain={[0,100]} />
              <Tooltip contentStyle={{ borderRadius:"12px", border:"none", boxShadow:"0 10px 15px -3px rgba(0,0,0,0.1)", fontSize:"12px" }} />
              <Bar dataKey="avg"     fill="#14b8a6" radius={[6,6,0,0]} name="Avg Score" />
              <Bar dataKey="highest" fill="#d946ef" radius={[6,6,0,0]} name="Highest" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="card p-6 flex flex-col gap-4">
          <h3 className="font-bold text-surface-900">Quick Stats</h3>
          {[
            { label:"Active Classes",      value: 42, icon: BookOpen,     color:"text-primary-500"  },
            { label:"Pending Fee Cases",   value: 15,   icon: AlertCircle,  color:"text-red-500"      },
            { label:"Students Passed",     value: `450/480`, icon: CheckCircle2, color:"text-emerald-500" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4 p-3 bg-surface-50 rounded-xl border border-surface-100">
              <s.icon className={`w-5 h-5 ${s.color} flex-shrink-0`} />
              <div className="flex-1">
                <p className="text-xs text-surface-500">{s.label}</p>
                <p className="font-bold text-surface-900">{s.value}</p>
              </div>
            </div>
          ))}

          {/* Quick Actions */}
          <h3 className="font-bold text-surface-900 mt-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Add Student",   href: "/dashboard/students"    },
              { label: "Collect Fee",   href: "/dashboard/fees"        },
              { label: "Mark Attend.",  href: "/dashboard/attendance"  },
              { label: "Send Notice",   href: "/dashboard/notices"     },
            ].map((a) => (
              <Link key={a.label} href={a.href} className="p-2.5 text-center text-xs font-semibold rounded-xl border border-surface-200 text-surface-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all">
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-surface-900">Recent Activity</h3>
            <button className="text-primary-600 text-sm font-semibold hover:text-primary-700">View all</button>
          </div>
          <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-200 before:to-transparent space-y-6">
            {[
              { id: "1", type: "student", title: "New Student Enrolled", desc: "Alex Johnson joined Grade 10", time: "2 hours ago" },
              { id: "2", type: "fee", title: "Fee Collection", desc: "$1,200 collected for Grade 8", time: "4 hours ago" },
              { id: "3", type: "exam", title: "Exam Scheduled", desc: "Mid-Term for Physics added", time: "1 day ago" },
              { id: "4", type: "notice", title: "New Notice Posted", desc: "Summer break announcement", time: "2 days ago" },
            ].map((a) => (
            <div key={a.id} className="flex items-start gap-3">
              <ActivityIcon type={a.type} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-surface-800 font-medium">{a.title}</p>
                <p className="text-xs text-surface-500">{a.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-surface-400 flex-shrink-0">
                <Clock className="w-3 h-3" />
                {a.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
