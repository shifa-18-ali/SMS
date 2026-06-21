"use client";
import { Network, Building2, Users, Wallet, TrendingUp, ShieldCheck, ArrowRight, Activity, Plus } from "lucide-react";
import { schools, platformKPIs } from "@/lib/mockData";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mrrData = [
  { month: "Jan", revenue: 18000 },
  { month: "Feb", revenue: 19500 },
  { month: "Mar", revenue: 21000 },
  { month: "Apr", revenue: 23500 },
  { month: "May", revenue: 24800 },
  { month: "Jun", revenue: 25200 },
];

function StatCard({ title, value, sub, icon: Icon, color }: { title: string; value: string; sub: string; icon: any; color: string }) {
  return (
    <div className="card p-5 hover:shadow-card-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold">
          <TrendingUp className="w-3 h-3" /> +12%
        </div>
      </div>
      <p className="text-sm font-medium text-surface-500 mb-1">{title}</p>
      <p className="text-3xl font-extrabold text-surface-900">{value}</p>
      <p className="text-xs text-surface-400 mt-2">{sub}</p>
    </div>
  );
}

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6 pb-8">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Platform Owner</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">EduNexus Network Operations</h1>
            <p className="text-slate-300 mt-2 text-sm max-w-xl leading-relaxed">
              Monitor multi-tenant infrastructure, track global MRR, and manage school deployments across the SaaS platform.
            </p>
          </div>
          <button className="btn-primary bg-emerald-500 hover:bg-emerald-600 border-none shadow-emerald-500/30 flex items-center gap-2 whitespace-nowrap">
            <Plus className="w-4 h-4" /> Onboard New School
          </button>
        </div>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Schools" value={String(platformKPIs.totalSchools)} sub="Active tenants" icon={Network} color="bg-blue-100 text-blue-600" />
        <StatCard title="Global Students" value={platformKPIs.activeStudents.toLocaleString()} sub="Across all tenants" icon={Users} color="bg-teal-100 text-teal-600" />
        <StatCard title="Monthly Recurring Rev" value={`$${platformKPIs.monthlyMRR.toLocaleString()}`} sub="MRR (Global)" icon={Wallet} color="bg-emerald-100 text-emerald-600" />
        <StatCard title="System Health" value="99.9%" sub="Uptime this month" icon={Activity} color="bg-violet-100 text-violet-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MRR Chart */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-surface-900">Revenue Growth (MRR)</h3>
              <p className="text-xs text-surface-500 mt-0.5">Global subscription revenue across all schools</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mrrData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:"#64748b", fontSize:12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill:"#64748b", fontSize:12}} tickFormatter={(val) => `$${val/1000}k`} />
              <Tooltip 
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                formatter={(val: number) => [`$${val.toLocaleString()}`, "MRR"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorMrr)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Platform Activity */}
        <div className="card p-6">
          <h3 className="font-bold text-surface-900 mb-6">Network Activity</h3>
          <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-200 before:to-transparent space-y-6">
            {[
              { title: "Pioneer Academy Onboarded", time: "2 hours ago", type: "tenant", color: "bg-emerald-500" },
              { title: "Database Backup Completed", time: "5 hours ago", type: "system", color: "bg-blue-500" },
              { title: "Invoice Paid - Greenwood", time: "1 day ago", type: "billing", color: "bg-violet-500" },
              { title: "Server Load Warning", time: "2 days ago", type: "alert", color: "bg-amber-500" },
            ].map((event, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${event.color} z-10`}>
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-surface-100 bg-surface-50 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-surface-800 text-sm">{event.title}</span>
                  </div>
                  <div className="text-xs text-surface-500">{event.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tenant Table */}
      <div className="card">
        <div className="p-6 border-b border-surface-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-surface-900 text-lg">Active Tenants</h3>
            <p className="text-sm text-surface-500">Manage connected schools and their subscription plans.</p>
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Search tenants..." className="input-field max-w-xs text-sm h-10" />
            <button className="btn-ghost h-10 px-4 text-sm"><Building2 className="w-4 h-4 mr-2"/>Filter</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface-50/50 text-surface-500">
              <tr>
                <th className="p-4 font-semibold">School ID & Name</th>
                <th className="p-4 font-semibold">Plan</th>
                <th className="p-4 font-semibold">Users</th>
                <th className="p-4 font-semibold">MRR</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 text-surface-700">
              {schools.map(school => (
                <tr key={school.id} className="hover:bg-surface-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-600 shadow-sm">
                        {school.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-surface-900">{school.name}</p>
                        <p className="text-xs text-surface-500 font-medium">Tenant ID: {school.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`badge ${school.plan === "Enterprise" ? "badge-default" : school.plan === "Pro" ? "badge-info" : "badge-warning"}`}>
                      {school.plan}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-semibold">{school.students.toLocaleString()} Students</span>
                      <span className="text-xs text-surface-400">{school.teachers} Teachers</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-surface-900">${school.revenue.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="badge badge-success">Active</span>
                  </td>
                  <td className="p-4">
                    <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1 transition-colors">
                      Manage <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
