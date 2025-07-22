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
        const response = await fetch(`/api/student/grades`); 
        const data = await response.json();
        
        setGrades(data); 
        const uniqueTerms = ["All", ...new Set(data.map(g => g.term))];
        setTerms(uniqueTerms);

      } catch (error) {
        console.error("Failed to fetch grades:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGrades();
  }, []);

  const filteredGrades = selectedTerm === "All" ? grades : grades.filter(g => g.term === selectedTerm);
  const gpa = filteredGrades.length > 0 ? (filteredGrades.reduce((acc, grade) => acc + grade.score, 0) / (filteredGrades.length * 25)).toFixed(2) : 'N/A';

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900">
      <div className="space-y-8 p-6 animate-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent animate-in fade-in-0 slide-in-from-left-4 duration-1000">
              📊 Report Card
            </h1>
            <p className="text-slate-600 dark:text-slate-300 animate-in fade-in-0 slide-in-from-left-4 duration-1000 delay-200">
              Track your academic progress and achievements
            </p>
          </div>
          <div className="animate-in fade-in-0 slide-in-from-right-4 duration-1000 delay-300">
            <Select value={selectedTerm} onValueChange={setSelectedTerm}>
              <SelectTrigger className="w-full sm:w-[200px] bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-violet-200 dark:border-violet-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <SelectValue placeholder="Select a term" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-violet-200 dark:border-violet-700">
                {terms.map(term => 
                  <SelectItem key={term} value={term} className="hover:bg-violet-50 dark:hover:bg-violet-900/30">
                    {term}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* GPA Card */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 text-white border-0 shadow-2xl hover:shadow-violet-500/25 transform hover:scale-105 transition-all duration-500 animate-in fade-in-0 zoom-in-95 duration-1000 delay-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                🎯 GPA
              </CardTitle>
              <CardDescription className="text-violet-100">
                {selectedTerm} Performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold mb-2 animate-pulse">
                {loading ? (
                  <div className="h-12 w-20 bg-white/20 rounded-lg animate-pulse"></div>
                ) : (
                  <span className="bg-gradient-to-r from-white to-violet-100 bg-clip-text text-transparent">
                    {gpa}
                  </span>
                )}
              </div>
              <div className="text-sm text-violet-100 font-medium">
                Out of 4.0 Scale
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-violet-200 dark:border-violet-700 shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 delay-700">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              📈 Subject Performance
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              Your detailed scores for {selectedTerm === "All" ? "all terms" : selectedTerm}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="h-[350px] w-full bg-gradient-to-r from-violet-100 via-purple-100 to-fuchsia-100 dark:from-slate-700 dark:via-purple-800/20 dark:to-slate-700 rounded-xl animate-pulse"></div>
            ) : (
              <div className="h-[350px] bg-gradient-to-br from-white/50 to-violet-50/50 dark:from-slate-800/50 dark:to-purple-900/20 rounded-xl p-4 backdrop-blur-sm">
                <GradesBarChart data={filteredGrades} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3 animate-in fade-in-0 slide-in-from-bottom-6 duration-1000 delay-1000">
          <Card className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold">{filteredGrades.length}</div>
              <div className="text-sm text-emerald-100">Total Subjects</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-400 to-orange-500 text-white border-0 shadow-xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold">
                {filteredGrades.filter(g => g.score >= 20).length}
              </div>
              <div className="text-sm text-amber-100">Above Average</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-rose-400 to-pink-500 text-white border-0 shadow-xl hover:shadow-rose-500/25 transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold">
                {filteredGrades.length > 0 ? Math.max(...filteredGrades.map(g => g.score)) : 'N/A'}
              </div>
              <div className="text-sm text-rose-100">Highest Score</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}