"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, BookOpen, BarChart3, Calendar, Menu, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/homework", icon: BookOpen, label: "Homework" },
    { href: "/grades", icon: BarChart3, label: "Grades" },
    { href: "/timetable", icon: Calendar, label: "Timetable" },
]

export function MobileNav() {
    const pathname = usePathname();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link href="#" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                        <GraduationCap className="h-5 w-5 transition-all group-hover:scale-110" />
                        <span className="sr-only">Student App</span>
                    </Link>
                    {navItems.map(item => (
                        <Link key={item.href} href={item.href} className={cn("flex items-center gap-4 px-2.5", pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
}