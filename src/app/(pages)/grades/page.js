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
        // Using relative path for the proxy
        const response = await fetch(`/api/student/grades`); 
        const data = await response.json();
        
        // --- CORRECTION START ---
        // The API returns an array directly. Process it without checking for 'success'.
        setGrades(data); 
        // Extract unique terms from the data array for the filter dropdown
        const uniqueTerms = ["All", ...new Set(data.map(g => g.term))];
        setTerms(uniqueTerms);
        // --- CORRECTION END ---

      } catch (error) {
        console.error("Failed to fetch grades:", error);
        // Optionally, set an error state here to show a message to the user
      } finally {
        setLoading(false);
      }
    }
    fetchGrades();
  }, []);

  const filteredGrades = selectedTerm === "All" ? grades : grades.filter(g => g.term === selectedTerm);
  const gpa = filteredGrades.length > 0 ? (filteredGrades.reduce((acc, grade) => acc + grade.score, 0) / (filteredGrades.length * 25)).toFixed(2) : 'N/A';

  return (
    <div className="space-y-6 animate-fade-in-up">
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