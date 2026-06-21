"use client";
import { Card, CardContent } from "./Card";
import { LucideIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  colorClass?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, colorClass = "text-primary" }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow group cursor-pointer overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-white/0 dark:from-white/5 rounded-bl-full pointer-events-none -mr-8 -mt-8"></div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{value}</h3>
          </div>
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform", colorClass)}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center text-sm">
            <span className={cn("font-medium", trendUp ? "text-emerald-500" : "text-red-500")}>
              {trendUp ? "↑" : "↓"} {trend}
            </span>
            <span className="text-slate-400 ml-2">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
