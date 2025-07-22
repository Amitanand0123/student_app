"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { GradesBarChart } from '@/components/charts/grades-barchart';

export default function GradesPage() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGrades() {
      try {
        const response = await fetch('/api/grades');
        const data = await response.json();
        if (data.success) {
          setGrades(data.data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchGrades();
  }, []);

  const gpa = (grades.reduce((acc, grade) => acc + grade.score, 0) / (grades.length * 25)).toFixed(2);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Report Card</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Overall GPA</CardTitle>
            <CardDescription>All terms</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{loading ? '...' : gpa}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance</CardTitle>
          <CardDescription>Your scores across all subjects this term.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px]">
                <GradesBarChart data={grades} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}