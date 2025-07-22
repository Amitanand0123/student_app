import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const ProgressCircle = ({ percentage }) => {
  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg height="100%" width="100%" viewBox="0 0 120 120" className="-rotate-90">
        <circle
          className="text-muted"
          strokeWidth={stroke}
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx={radius + 10}
          cy={radius + 10}
        />
        <circle
          className="text-primary"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx={radius + 10}
          cy={radius + 10}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-foreground mt-20 ml-2">{percentage}%</span>
      </div>
    </div>
  );
};


export function AttendanceCard({ percentage }) {
  return (
    <Card className="flex flex-col justify-between p-6 hover:bg-muted/50 transition-colors">
      <CardHeader className="p-0">
        <CardTitle>Attendance</CardTitle>
        <CardDescription>This academic year</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between p-0 mt-4">
        <div className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>On track</span>
        </div>
        <ProgressCircle percentage={percentage} />
      </CardContent>
    </Card>
  );
}