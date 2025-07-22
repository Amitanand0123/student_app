"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Home, BookOpen, BarChart3, Calendar, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard", color: "from-blue-500 to-indigo-600", bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/40" },
    { href: "/homework", icon: BookOpen, label: "Homework", color: "from-emerald-500 to-teal-600", bgColor: "bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/40" },
    { href: "/grades", icon: BarChart3, label: "Grades", color: "from-purple-500 to-violet-600", bgColor: "bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/40" },
    { href: "/timetable", icon: Calendar, label: "Timetable", color: "from-amber-500 to-orange-600", bgColor: "bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/40" },
]

export function Sidebar() {
    const pathname = usePathname();
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sm:flex shadow-2xl">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-purple-50/30 to-pink-50/50 dark:from-slate-900/50 dark:via-purple-900/20 dark:to-slate-900/50"></div>
            
            <TooltipProvider>
                <nav className="relative flex flex-col items-center gap-4 px-3 py-6">
                    {/* Logo */}
                    <Link 
                        href="/dashboard" 
                        className="group relative flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-lg font-semibold text-white shadow-2xl hover:shadow-indigo-500/25 transform hover:scale-110 hover:rotate-3 transition-all duration-500 animate-pulse"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                        <GraduationCap className="relative h-6 w-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                        <span className="sr-only">Student App</span>
                        
                        {/* Floating particles effect */}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping delay-300"></div>
                    </Link>

                    {/* Navigation Items */}
                    <div className="flex flex-col gap-3 w-full">
                        {navItems.map((item, index) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Tooltip key={item.href}>
                                    <TooltipTrigger asChild>
                                        <Link 
                                            href={item.href} 
                                            className={cn(
                                                "group relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-1",
                                                isActive 
                                                    ? `bg-gradient-to-br ${item.color} text-white shadow-2xl hover:shadow-lg animate-in zoom-in-50 duration-500` 
                                                    : `${item.bgColor} text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-lg hover:shadow-xl border border-white/20 dark:border-slate-700/50`
                                            )}
                                            style={{ animationDelay: `${100 + (index * 100)}ms` }}
                                        >
                                            {/* Active indicator */}
                                            {isActive && (
                                                <>
                                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                                                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
                                                </>
                                            )}
                                            
                                            <item.icon className={cn(
                                                "h-5 w-5 transition-all duration-500",
                                                isActive 
                                                    ? "scale-110 drop-shadow-md" 
                                                    : "group-hover:scale-125 group-hover:rotate-12"
                                            )} />
                                            
                                            <span className="sr-only">{item.label}</span>
                                            
                                            {/* Hover glow effect */}
                                            <div className={cn(
                                                "absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100",
                                                `bg-gradient-to-br ${item.color} blur-xl -z-10 scale-150`
                                            )}></div>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent 
                                        side="right" 
                                        className="ml-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white border-slate-700 shadow-2xl animate-in slide-in-from-left-2 duration-300"
                                    >
                                        <div className="flex items-center gap-2">
                                            <item.icon className="h-4 w-4" />
                                            {item.label}
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            );
                        })}
                    </div>

                    {/* Bottom decorative element */}
                    <div className="mt-auto mb-4 flex flex-col gap-2">
                        <div className="w-8 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
                        <div className="flex justify-center gap-1">
                            <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                            <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                        </div>
                    </div>
                </nav>
            </TooltipProvider>
        </aside>
    )
}