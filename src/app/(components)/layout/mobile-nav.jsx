"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, BookOpen, BarChart3, Calendar, Menu, GraduationCap, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { 
        href: "/dashboard", 
        icon: Home, 
        label: "Dashboard", 
        color: "from-blue-500 to-indigo-600", 
        bgColor: "from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/40",
        emoji: "🏠"
    },
    { 
        href: "/homework", 
        icon: BookOpen, 
        label: "Homework", 
        color: "from-emerald-500 to-teal-600", 
        bgColor: "from-emerald-50 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/40",
        emoji: "📚"
    },
    { 
        href: "/grades", 
        icon: BarChart3, 
        label: "Grades", 
        color: "from-purple-500 to-violet-600", 
        bgColor: "from-purple-50 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/40",
        emoji: "📊"
    },
    { 
        href: "/timetable", 
        icon: Calendar, 
        label: "Timetable", 
        color: "from-amber-500 to-orange-600", 
        bgColor: "from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/40",
        emoji: "📅"
    },
]

export function MobileNav() {
    const pathname = usePathname();
    
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button 
                    size="icon" 
                    variant="outline" 
                    className="sm:hidden relative overflow-hidden border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <Menu className="h-5 w-5 relative z-10 text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" />
                    <span className="sr-only">Toggle Menu</span>
                    
                    {/* Hover pulse effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-10 animate-pulse"></div>
                </Button>
            </SheetTrigger>
            
            <SheetContent 
                side="left" 
                className="sm:max-w-xs border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-0 overflow-hidden"
            >
                {/* Background gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50 dark:from-slate-900/50 dark:via-purple-900/20 dark:to-slate-900/50"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-300/20 to-rose-300/20 rounded-full blur-2xl"></div>
                
                <nav className="relative grid gap-6 p-6 text-lg font-medium h-full">
                    {/* Header */}
                    <div className="flex items-center gap-4 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
                        <div className="group relative flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-lg font-semibold text-white shadow-2xl animate-in zoom-in-95 duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                            <GraduationCap className="h-6 w-6 relative z-10" />
                            
                            {/* Floating particles */}
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping delay-300"></div>
                        </div>
                        
                        <div className="animate-in slide-in-from-left-4 duration-700 delay-200">
                            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Student Portal
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Navigate your learning
                            </p>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="space-y-3">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link 
                                    key={item.href} 
                                    href={item.href} 
                                    className={cn(
                                        "group relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-0.5 animate-in slide-in-from-left-6",
                                        isActive 
                                            ? `bg-gradient-to-r ${item.color} text-white shadow-2xl` 
                                            : `bg-gradient-to-r ${item.bgColor} text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white shadow-lg hover:shadow-xl border border-white/50 dark:border-slate-700/50`
                                    )}
                                    style={{ animationDelay: `${300 + (index * 100)}ms` }}
                                >
                                    {/* Active indicator */}
                                    {isActive && (
                                        <>
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full animate-pulse"></div>
                                        </>
                                    )}
                                    
                                    {/* Icon container */}
                                    <div className={cn(
                                        "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300",
                                        isActive 
                                            ? "bg-white/20" 
                                            : "bg-white/50 dark:bg-slate-700/50 group-hover:bg-white/70 dark:group-hover:bg-slate-600/70"
                                    )}>
                                        <item.icon className={cn(
                                            "h-5 w-5 transition-all duration-300",
                                            isActive 
                                                ? "text-white drop-shadow-md" 
                                                : "group-hover:scale-110"
                                        )} />
                                    </div>
                                    
                                    {/* Label with emoji */}
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold">{item.label}</span>
                                        <span className="text-xl opacity-80 group-hover:animate-bounce">
                                            {item.emoji}
                                        </span>
                                    </div>
                                    
                                    {/* Arrow indicator */}
                                    <div className={cn(
                                        "ml-auto transition-all duration-300",
                                        isActive 
                                            ? "text-white translate-x-0" 
                                            : "text-slate-400 dark:text-slate-500 group-hover:translate-x-1 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                                    )}>
                                        →
                                    </div>
                                    
                                    {/* Hover glow effect */}
                                    <div className={cn(
                                        "absolute inset-0 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 blur-xl -z-10 scale-110",
                                        `bg-gradient-to-r ${item.color}`
                                    )}></div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Bottom section */}
                    <div className="mt-auto space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-700">
                        <div className="flex items-center justify-center gap-2">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></div>
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
                        </div>
                        
                        <div className="text-center">
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                ✨ Learning made beautiful
                            </p>
                        </div>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    )
}