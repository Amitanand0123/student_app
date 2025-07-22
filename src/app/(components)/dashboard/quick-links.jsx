import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Calendar, BookOpen, FileText, Library } from 'lucide-react';
import Link from 'next/link';

const links = [
    { name: "View Timetable", icon: Calendar, href: "/timetable" },
    { name: "Exam Schedule", icon: FileText, href: "#" },
    { name: "School Calendar", icon: Calendar, href: "#" },
    { name: "Library Portal", icon: Library, href: "#" },
]

export function QuickLinks() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
        <CardDescription>
          Access important resources and pages quickly.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {links.map((link) => (
            <Link key={link.name} href={link.href} className="group -mx-3 -my-1 flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <div className="flex items-center">
                    <link.icon className="h-4 w-4 mr-3" />
                    <span>{link.name}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
        ))}
        <Button className="mt-4 w-full">
          <Link href="/contact">Contact Teachers</Link>
        </Button>
      </CardContent>
    </Card>
  );
}