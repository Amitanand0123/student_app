"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Home, BookOpen, BarChart3, Calendar, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/homework", icon: BookOpen, label: "Homework" },
    { href: "/grades", icon: BarChart3, label: "Grades" },
    { href: "/timetable", icon: Calendar, label: "Timetable" },
]

export function Sidebar() {
    const pathname = usePathname();
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <TooltipProvider>
                <nav className="flex flex-col items-center gap-4 px-2 py-4">
                    <Link href="/dashboard" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
                        <GraduationCap className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Student App</span>
                    </Link>
                    {navItems.map(item => (
                        <Tooltip key={item.href}>
                            <TooltipTrigger asChild>
                                <Link href={item.href} className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8", pathname.startsWith(item.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground")}>
                                    <item.icon className="h-5 w-5" />
                                    <span className="sr-only">{item.label}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">{item.label}</TooltipContent>
                        </Tooltip>
                    ))}
                </nav>
            </TooltipProvider>
        </aside>
    )
}