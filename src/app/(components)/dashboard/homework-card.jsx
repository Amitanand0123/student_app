import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, BookCheck } from 'lucide-react';

export function HomeworkCard({ pending, overdue }) {
  return (
    <Card className="p-6 hover:bg-muted/50 transition-colors">
      <CardHeader className="p-0">
        <CardTitle>Homework</CardTitle>
        <CardDescription>Assignments status</CardDescription>
      </CardHeader>
      <CardContent className="p-0 mt-4 space-y-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <BookCheck className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-foreground font-medium">Pending</span>
            </div>
            <span className="font-bold text-2xl">{pending}</span>
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
                <span className="text-foreground font-medium">Overdue</span>
            </div>
            <span className="font-bold text-2xl text-destructive">{overdue}</span>
        </div>
      </CardContent>
    </Card>
  );
}