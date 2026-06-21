"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle2, BarChart3, Users, Shield, BookOpen, Bell, Wallet, GraduationCap, ChevronDown } from "lucide-react";

const features = [
  { icon: Users,          title: "Student & Teacher Management",  desc: "Centralized profiles, enrollment, and staff records with powerful search and filters." },
  { icon: BarChart3,      title: "Real-Time Analytics",           desc: "KPI dashboards with live attendance trends, fee collection, and exam performance charts." },
  { icon: CheckCircle2,   title: "Attendance Tracking",           desc: "Mark, monitor, and report daily attendance with class-wise and individual insights." },
  { icon: GraduationCap,  title: "Examinations & Results",        desc: "Schedule exams, publish results, track grades, and generate report cards instantly." },
  { icon: Wallet,         title: "Fee Management",                desc: "Automated fee collection, payment tracking, receipts, and overdue reminders." },
  { icon: Bell,           title: "Notice & Communication",        desc: "Broadcast announcements to specific roles – parents, teachers, or all students." },
];

const roles = [
  { role: "Admin",   color: "from-teal-500 to-teal-600",    desc: "Full control over the entire institution.", link: "/login" },
  { role: "Teacher", color: "from-violet-500 to-violet-600", desc: "Attendance, assignments, marks & schedule.", link: "/login" },
  { role: "Student", color: "from-amber-500 to-amber-600",   desc: "View results, assignments, and timetable.", link: "/login" },
  { role: "Parent",  color: "from-rose-500 to-rose-600",     desc: "Monitor child progress and fee status.",    link: "/login" },
];

const stats = [
  { label: "Students Enrolled",  value: "1,428+" },
  { label: "Active Teachers",    value: "92"     },
  { label: "Modules Covered",    value: "12"     },
  { label: "Uptime Guarantee",   value: "99.9%"  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-950 text-white overflow-x-hidden">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-glow">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">EduNexus</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-surface-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#roles"    className="hover:text-white transition-colors">Portals</a>
            <a href="#stats"    className="hover:text-white transition-colors">About</a>
          </div>
          <Link href="/login" className="btn-primary text-sm py-2 px-5">
            Sign In <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{animationDelay:"2s"}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-300 text-sm font-medium animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
          Trusted by 50+ Schools Worldwide
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6 animate-slide-up max-w-5xl">
          The <span className="gradient-text">Complete Platform</span> for Modern Schools
        </h1>

        <p className="text-lg md:text-xl text-surface-400 max-w-2xl mb-10 leading-relaxed animate-slide-up" style={{animationDelay:"0.1s"}}>
          One platform for administrators, teachers, students, and parents — managing academics, attendance, fees, exams, and communication seamlessly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay:"0.2s"}}>
          <Link href="/login" className="btn-primary text-base px-8 py-3.5 shadow-glow-lg group">
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#features" className="btn-ghost text-base px-8 py-3.5 border-white/20 text-surface-300 hover:text-white hover:bg-white/10 hover:border-white/30">
            Explore Features
          </a>
        </div>

        {/* Mock Dashboard Preview */}
        <div className="mt-16 w-full max-w-5xl animate-slide-up" style={{animationDelay:"0.3s"}}>
          <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-5 py-3 bg-white/5 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="flex-1 mx-4 bg-white/10 rounded-md px-3 py-1 text-xs text-surface-400">edunexus.edu/dashboard</div>
            </div>
            {/* Fake dashboard */}
            <div className="p-6 bg-gradient-to-br from-surface-900 to-surface-800">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label:"Students", val:"1,428", color:"from-teal-500/20 to-teal-600/10" },
                  { label:"Teachers", val:"92",    color:"from-violet-500/20 to-violet-600/10" },
                  { label:"Attendance",val:"94.2%",color:"from-amber-500/20 to-amber-600/10" },
                  { label:"Fee Collected",val:"86%",color:"from-rose-500/20 to-rose-600/10" },
                ].map((k) => (
                  <div key={k.label} className={`bg-gradient-to-br ${k.color} rounded-xl p-4 border border-white/10`}>
                    <p className="text-xs text-surface-400 mb-1">{k.label}</p>
                    <p className="text-2xl font-bold text-white">{k.val}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white/5 rounded-xl p-4 border border-white/10 h-28 flex items-end gap-2">
                  {[96,93,97,91,94,88].map((h,i) => (
                    <div key={i} className="flex-1 bg-primary-500/60 rounded-t-sm" style={{height:`${h*0.4}%`}} />
                  ))}
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 h-28 flex flex-col gap-2 justify-center">
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-primary-500 rounded-full" style={{width:"86%"}} /></div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-accent-500 rounded-full" style={{width:"72%"}} /></div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-amber-500 rounded-full" style={{width:"94%"}} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#stats" className="mt-12 flex flex-col items-center gap-2 text-surface-500 hover:text-primary-400 transition-colors animate-bounce">
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </section>

      {/* ── Stats Banner ── */}
      <section id="stats" className="py-16 border-y border-white/10 bg-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-extrabold gradient-text mb-2">{s.value}</p>
              <p className="text-surface-400 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">Full Feature Suite</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Everything a school needs</h2>
            <p className="text-surface-400 text-lg max-w-2xl mx-auto">From enrollment to graduation, manage every operation from one intuitive dashboard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary-500/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-5 group-hover:bg-primary-500/30 transition-colors">
                  <f.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-surface-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Role Portals ── */}
      <section id="roles" className="py-24 px-6 bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent-400 text-sm font-semibold uppercase tracking-widest">Role-Based Access</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">A unique experience for every user</h2>
            <p className="text-surface-400 text-lg max-w-2xl mx-auto">Each portal is purpose-built with the exact tools and data that role needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((r) => (
              <Link key={r.role} href={r.link} className="group relative overflow-hidden p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className={`absolute inset-0 bg-gradient-to-br ${r.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className="relative">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4 bg-gradient-to-r ${r.color} text-white shadow-md`}>
                    {r.role}
                  </div>
                  <p className="text-surface-300 text-sm leading-relaxed mb-4">{r.desc}</p>
                  <div className="flex items-center gap-1 text-primary-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Access Portal <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 via-transparent to-accent-900/50 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to transform your school?
          </h2>
          <p className="text-surface-400 text-lg mb-10">
            Join thousands of schools already using EduNexus to streamline their operations and improve outcomes.
          </p>
          <Link href="/login" className="btn-primary text-lg px-10 py-4 shadow-glow-lg">
            Start Your Demo <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-surface-500 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary-400" />
            <span className="font-semibold text-white">EduNexus</span>
            <span>© 2026 All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
