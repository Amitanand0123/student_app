import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function RecentGradesCard({ grades }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Grades</CardTitle>
        <CardDescription>Your latest assessment scores.</CardDescription>
      </CardHeader>
      <CardContent>
        {grades.length > 0 ? (
          <ul className="space-y-4">
            {grades.map((grade, index) => (
              <li key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{grade.subject}</p>
                  <p className="text-sm text-muted-foreground">{grade.term}</p>
                </div>
                <div className={`text-xl font-bold ${grade.score >= 80 ? 'text-green-500' : grade.score >= 60 ? 'text-yellow-500' : 'text-destructive'}`}>
                  {grade.score}%
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground py-4">No recent grades available.</p>
        )}
        <Button asChild className="mt-6 w-full">
          <Link href="/grades">View All Grades</Link>
        </Button>
      </CardContent>
    </Card>
  );
}