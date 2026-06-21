"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Save, Bell, Shield, Palette, User, School } from "lucide-react";

type Tab = "Profile" | "School" | "Notifications" | "Security" | "Appearance";

const NOTIFICATIONS = [
  { label:"Fee Payment Alerts",     desc:"Get notified when a fee is paid or overdue",     def:true  },
  { label:"Attendance Reminders",   desc:"Daily reminder to mark attendance",               def:true  },
  { label:"Exam Notifications",     desc:"Alerts for upcoming exams and results",           def:true  },
  { label:"Notice Board Updates",   desc:"Email when new notices are published",            def:false },
  { label:"Assignment Submissions", desc:"Notify when students submit assignments",         def:false },
  { label:"Weekly Report Digest",   desc:"Weekly summary of school performance via email", def:true  },
];

function Toggle({ defaultChecked }: { defaultChecked: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button onClick={() => setOn(!on)} className={`w-12 h-6 rounded-full transition-all flex-shrink-0 relative ${on ? "bg-primary-500" : "bg-surface-300"}`}>
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${on ? "left-6" : "left-0.5"}`} />
    </button>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [tab, setTab]   = useState<Tab>("Profile");
  const [saved, setSaved] = useState(false);

  const tabs: { id: Tab; icon: React.ElementType }[] = [
    { id: "Profile",       icon: User   },
    { id: "School",        icon: School },
    { id: "Notifications", icon: Bell   },
    { id: "Security",      icon: Shield },
    { id: "Appearance",    icon: Palette},
  ];

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-5 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Settings</h1>
        <p className="text-sm text-surface-500 mt-0.5">Manage your account and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Tab sidebar */}
        <div className="card p-3 h-fit">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === t.id ? "bg-primary-600 text-white shadow-glow" : "text-surface-600 hover:bg-surface-50"}`}>
              <t.icon className="w-4 h-4" />
              {t.id}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="lg:col-span-3 card p-6">

          {/* ── Profile ── */}
          {tab === "Profile" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-surface-900">My Profile</h2>
              <div className="flex items-center gap-5">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold shadow-md ${
                  user?.role === "admin"   ? "bg-gradient-to-br from-teal-500 to-teal-600"   :
                  user?.role === "teacher" ? "bg-gradient-to-br from-violet-500 to-violet-600":
                  user?.role === "student" ? "bg-gradient-to-br from-amber-500 to-amber-600"  :
                  "bg-gradient-to-br from-rose-500 to-rose-600"}`}>
                  {user?.avatar}
                </div>
                <div>
                  <p className="font-bold text-surface-900 text-lg">{user?.name}</p>
                  <p className="text-surface-500 text-sm">{user?.subtitle}</p>
                  <button className="mt-2 text-xs text-primary-600 font-medium border border-primary-200 px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors">Change Photo</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label:"Full Name",     val: user?.name  ?? "", ro: false },
                  { label:"Email Address", val: user?.email ?? "", ro: false },
                  { label:"Role",          val: user?.role  ?? "", ro: true  },
                  { label:"Phone Number",  val: "555-000-1234",    ro: false },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-sm font-medium text-surface-700 block mb-1.5">{f.label}</label>
                    <input defaultValue={f.val} readOnly={f.ro} className="input-field" />
                  </div>
                ))}
              </div>
              <button onClick={handleSave} className={`btn-primary ${saved ? "bg-emerald-600" : ""}`}>
                <Save className="w-4 h-4 mr-1.5" />{saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          )}

          {/* ── School ── */}
          {tab === "School" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-surface-900">School Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label:"School Name",  val:"EduNexus International School" },
                  { label:"Established",  val:"1998"                           },
                  { label:"Principal",    val:"Dr. James Carter"               },
                  { label:"Phone",        val:"+1 800 555 0100"                },
                  { label:"Email",        val:"info@edunexus.edu"              },
                  { label:"Website",      val:"www.edunexus.edu"               },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-sm font-medium text-surface-700 block mb-1.5">{f.label}</label>
                    <input defaultValue={f.val} className="input-field" />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-surface-700 block mb-1.5">Address</label>
                  <input defaultValue="123 Education Blvd, Knowledge City, CA 90001" className="input-field" />
                </div>
              </div>
              <button onClick={handleSave} className={`btn-primary ${saved ? "bg-emerald-600" : ""}`}>
                <Save className="w-4 h-4 mr-1.5" />{saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          )}

          {/* ── Notifications ── */}
          {tab === "Notifications" && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-surface-900">Notification Preferences</h2>
              {NOTIFICATIONS.map(n => (
                <div key={n.label} className="flex items-center justify-between p-4 bg-surface-50 rounded-xl border border-surface-100">
                  <div>
                    <p className="text-sm font-semibold text-surface-900">{n.label}</p>
                    <p className="text-xs text-surface-400 mt-0.5">{n.desc}</p>
                  </div>
                  <Toggle defaultChecked={n.def} />
                </div>
              ))}
            </div>
          )}

          {/* ── Security ── */}
          {tab === "Security" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-surface-900">Security Settings</h2>
              {["Current Password","New Password","Confirm New Password"].map(label => (
                <div key={label}>
                  <label className="text-sm font-medium text-surface-700 block mb-1.5">{label}</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
              ))}
              <button onClick={handleSave} className={`btn-primary ${saved ? "bg-emerald-600" : ""}`}>
                <Save className="w-4 h-4 mr-1.5" />{saved ? "Updated!" : "Update Password"}
              </button>

              <div className="pt-5 border-t border-surface-100">
                <h3 className="text-base font-bold text-surface-900 mb-3">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">2FA is enabled</p>
                    <p className="text-xs text-emerald-600 mt-0.5">Secured with authenticator app</p>
                  </div>
                  <button className="text-xs font-semibold text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">Manage</button>
                </div>
              </div>
            </div>
          )}

          {/* ── Appearance ── */}
          {tab === "Appearance" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-surface-900">Appearance</h2>
              <div>
                <p className="text-sm font-medium text-surface-700 mb-3">Theme</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name:"Light",  active: true  },
                    { name:"Dark",   active: false },
                    { name:"System", active: false },
                  ].map(t => (
                    <div key={t.name} className={`rounded-xl p-4 cursor-pointer text-center border-2 transition-all ${t.active ? "border-primary-500 bg-primary-50 shadow-md" : "border-surface-200 bg-white"}`}>
                      <div className={`h-10 rounded-lg mb-2 ${t.name==="Dark"?"bg-surface-800":t.name==="System"?"bg-gradient-to-br from-surface-100 to-surface-700":"bg-surface-100"}`} />
                      <p className="text-xs font-semibold text-surface-700">{t.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-surface-700 mb-3">Accent Color</p>
                <div className="flex gap-3 flex-wrap">
                  {["#14b8a6","#6366f1","#d946ef","#f59e0b","#ef4444","#3b82f6","#10b981","#f97316"].map(c => (
                    <button key={c} title={c} className="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-125 transition-transform" style={{ background:c }} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-surface-700 mb-3">Sidebar Style</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name:"Expanded", active: true  },
                    { name:"Compact",  active: false },
                  ].map(s => (
                    <div key={s.name} className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${s.active ? "border-primary-500 bg-primary-50" : "border-surface-200"}`}>
                      <p className="text-sm font-medium text-surface-700">{s.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleSave} className={`btn-primary ${saved ? "bg-emerald-600" : ""}`}>
                <Save className="w-4 h-4 mr-1.5" />{saved ? "Saved!" : "Apply Changes"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
