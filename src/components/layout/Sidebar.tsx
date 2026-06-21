"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard, Users, UserSquare2, BookOpen, CalendarCheck,
  ClipboardList, GraduationCap, Wallet, Bell, FileBarChart,
  Settings, LogOut, ChevronLeft, Building2, BookMarked, User,
} from "lucide-react";
import clsx from "clsx";

type MenuItem = { name: string; icon: React.ElementType; href: string };

const adminMenu: MenuItem[] = [
  { name: "Dashboard",    icon: LayoutDashboard, href: "/dashboard/admin"       },
  { name: "Students",     icon: Users,            href: "/students"    },
  { name: "Teachers",     icon: UserSquare2,      href: "/teachers"    },
  { name: "Academics",    icon: Building2,        href: "/academics"   },
  { name: "Attendance",   icon: CalendarCheck,    href: "/attendance"  },
  { name: "Assignments",  icon: ClipboardList,    href: "/assignments" },
  { name: "Exams",        icon: GraduationCap,    href: "/exams"       },
  { name: "Fees",         icon: Wallet,           href: "/fees"        },
  { name: "Notices",      icon: Bell,             href: "/notices"     },
  { name: "Reports",      icon: FileBarChart,     href: "/reports"     },
  { name: "Settings",     icon: Settings,         href: "/settings"    },
];

const teacherMenu: MenuItem[] = [
  { name: "Dashboard",    icon: LayoutDashboard, href: "/dashboard/teacher"     },
  { name: "Attendance",   icon: CalendarCheck,   href: "/attendance"  },
  { name: "Assignments",  icon: ClipboardList,   href: "/assignments" },
  { name: "Exams",        icon: GraduationCap,   href: "/exams"       },
  { name: "Notices",      icon: Bell,            href: "/notices"     },
  { name: "My Profile",   icon: User,            href: "/settings"    },
];

const studentMenu: MenuItem[] = [
  { name: "Dashboard",    icon: LayoutDashboard, href: "/dashboard/student"     },
  { name: "Attendance",   icon: CalendarCheck,   href: "/attendance"  },
  { name: "Assignments",  icon: ClipboardList,   href: "/assignments" },
  { name: "Exams",        icon: GraduationCap,   href: "/exams"       },
  { name: "Notices",      icon: Bell,            href: "/notices"     },
  { name: "My Profile",   icon: User,            href: "/settings"    },
];

const parentMenu: MenuItem[] = [
  { name: "Dashboard",    icon: LayoutDashboard, href: "/dashboard/parent"      },
  { name: "Attendance",   icon: CalendarCheck,   href: "/attendance"  },
  { name: "Results",      icon: BookMarked,       href: "/exams"       },
  { name: "Fees",         icon: Wallet,          href: "/fees"        },
  { name: "Notices",      icon: Bell,            href: "/notices"     },
];

const menuMap = { admin: adminMenu, teacher: teacherMenu, student: studentMenu, parent: parentMenu };

const roleColors: Record<string, string> = {
  admin:   "from-teal-500 to-teal-600",
  teacher: "from-violet-500 to-violet-600",
  student: "from-amber-500 to-amber-600",
  parent:  "from-rose-500 to-rose-600",
};

export function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;
  const menu = menuMap[user.role] ?? adminMenu;
  const gradient = roleColors[user.role];

  return (
    <aside className="w-64 bg-surface-900 border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto z-40">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform`}>
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">EduNexus</span>
        </Link>
      </div>

      {/* Role badge */}
      <div className="px-5 py-3 border-b border-white/10">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-bold uppercase tracking-wider`}>
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
          {user.role} Portal
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
        {menu.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? `bg-gradient-to-r ${gradient} text-white shadow-glow`
                  : "text-surface-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-4.5 h-4.5 flex-shrink-0" style={{width:"18px",height:"18px"}} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User card + logout */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-3">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
            {user.avatar}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-surface-500 truncate">{user.subtitle}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-surface-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
