"use client";
import { useState } from "react";
import { CreditCard, Download, Plus, TrendingUp } from "lucide-react";
import { feeTransactions, feeMonthly } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function FeesPage() {
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = feeTransactions.filter(t => filterStatus === "All" || t.status === filterStatus);

  const totalCollected = feeTransactions.filter(t=>t.status==="Paid").reduce((s,t)=>s+t.amount,0);
  const totalPending   = feeTransactions.filter(t=>t.status!=="Paid").reduce((s,t)=>s+t.amount,0);

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Fee Management</h1>
          <p className="text-sm text-surface-500 mt-0.5">Track payments, dues, and financial analytics</p>
        </div>
        <button className="btn-primary text-sm self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-1.5" /> Record Payment
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 p-6 text-white shadow-md">
          <p className="text-teal-100 text-sm mb-1 font-medium">Total Collected</p>
          <p className="text-4xl font-extrabold">${totalCollected.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2 text-sm text-teal-100">
            <TrendingUp className="w-4 h-4" /> 86% of target
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-6 text-white shadow-md">
          <p className="text-amber-100 text-sm mb-1 font-medium">Outstanding Dues</p>
          <p className="text-4xl font-extrabold">${totalPending.toLocaleString()}</p>
          <p className="text-sm text-amber-100 mt-2">{feeTransactions.filter(t=>t.status!=="Paid").length} students pending</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 p-6 text-white shadow-md">
          <p className="text-red-100 text-sm mb-1 font-medium">Overdue Cases</p>
          <p className="text-4xl font-extrabold">{feeTransactions.filter(t=>t.status==="Overdue").length}</p>
          <button className="mt-2 text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors">Send Reminders</button>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="card p-6">
        <h3 className="font-bold text-surface-900 mb-5">Monthly Fee Collection</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={feeMonthly} margin={{top:5,right:10,left:0,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{fill:"#94a3b8",fontSize:12}} axisLine={false} tickLine={false} />
            <YAxis tick={{fill:"#94a3b8",fontSize:12}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}K`} />
            <Tooltip formatter={(v:number)=>`$${v.toLocaleString()}`} contentStyle={{borderRadius:"12px",border:"none"}} />
            <Legend wrapperStyle={{fontSize:"12px"}} />
            <Bar dataKey="collected" fill="#14b8a6" name="Collected" radius={[4,4,0,0]} />
            <Bar dataKey="pending"   fill="#fbbf24" name="Pending"   radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions Table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-surface-100 bg-surface-50/50">
          <h3 className="font-bold text-surface-900">Transactions</h3>
          <div className="flex gap-2">
            {["All","Paid","Pending","Overdue"].map(s=>(
              <button key={s} onClick={()=>setFilterStatus(s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filterStatus===s?"bg-primary-600 text-white":"bg-surface-100 text-surface-600 hover:bg-surface-200"}`}>{s}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-50 border-b border-surface-100">
              <tr>
                {["ID","Student","Class","Amount","Due Date","Paid Date","Method","Status","Action"].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-50">
              {filtered.map(t=>(
                <tr key={t.id} className="hover:bg-surface-50 transition-colors">
                  <td className="px-4 py-3.5 font-mono text-xs text-surface-500">{t.id}</td>
                  <td className="px-4 py-3.5 font-semibold text-surface-900">{t.name}</td>
                  <td className="px-4 py-3.5"><span className="badge badge-default">{t.class}</span></td>
                  <td className="px-4 py-3.5 font-bold text-surface-800">${t.amount.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-surface-600">{t.dueDate}</td>
                  <td className="px-4 py-3.5 text-surface-600">{t.paidDate ?? "—"}</td>
                  <td className="px-4 py-3.5 text-surface-500">{t.method}</td>
                  <td className="px-4 py-3.5">
                    <span className={`badge ${t.status==="Paid"?"badge-success":t.status==="Pending"?"badge-warning":"badge-danger"}`}>{t.status}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    {t.status==="Paid"&&<button className="text-surface-400 hover:text-primary-600 transition-colors"><Download className="w-4 h-4" /></button>}
                    {t.status!=="Paid"&&<button className="text-xs font-semibold text-primary-600 hover:underline">Collect</button>}
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
