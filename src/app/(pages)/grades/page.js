"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GradesBarChart } from '@/app/(components)/charts/grades-barchart';

export default function GradesPage() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState("All");
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    async function fetchGrades() {
      try {
        const response = await fetch('/api/grades');
        const data = await response.json();
        if (data.success) {
          setGrades(data.data);
          // Extract unique terms for the filter dropdown
          const uniqueTerms = ["All", ...new Set(data.data.map(g => g.term))];
          setTerms(uniqueTerms);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchGrades();
  }, []);

  const filteredGrades = selectedTerm === "All" ? grades : grades.filter(g => g.term === selectedTerm);
  const gpa = filteredGrades.length > 0 ? (filteredGrades.reduce((acc, grade) => acc + grade.score, 0) / (filteredGrades.length * 25)).toFixed(2) : 'N/A';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Report Card</h1>
        <Select value={selectedTerm} onValueChange={setSelectedTerm}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select a term" />
          </SelectTrigger>
          <SelectContent>
            {terms.map(term => <SelectItem key={term} value={term}>{term}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>GPA</CardTitle>
            <CardDescription>{selectedTerm}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">{loading ? '...' : gpa}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance</CardTitle>
          <CardDescription>Your scores for {selectedTerm}.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px]">
                <GradesBarChart data={filteredGrades} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}