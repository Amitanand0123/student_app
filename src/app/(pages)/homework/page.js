"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function HomeworkPage() {
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHomework() {
      try {
        const response = await fetch(`/api/student/homework`);
        const data = await response.json();
        
        setHomework(data);

      } finally {
        setLoading(false);
      }
    }
    fetchHomework();
  }, []);

  const handleCheckChange = async (id, completed) => {
    setHomework(homework.map(hw => hw._id === id ? { ...hw, completed } : hw));

    const response = await fetch(`/api/student/homework/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });

    if (response.ok) {
      toast.success(`Assignment marked as ${completed ? 'complete' : 'incomplete'}.`);
    } else {
      toast.error('Failed to update assignment.');
      setHomework(homework.map(hw => hw._id === id ? { ...hw, completed: !completed } : hw));
    }
  };

  const completedCount = homework.filter(hw => hw.completed).length;
  const pendingCount = homework.length - completedCount;
  const progressPercentage = homework.length > 0 ? (completedCount / homework.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-indigo-900/20 dark:to-slate-900">
      <div className="space-y-8 p-6 animate-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="space-y-4 animate-in fade-in-0 slide-in-from-left-4 duration-1000">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            📚 Homework Hub
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Stay organized and track your assignments with ease
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid gap-6 md:grid-cols-3 animate-in fade-in-0 slide-in-from-top-4 duration-1000 delay-300">
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{completedCount}</div>
                  <div className="text-sm text-emerald-100">Completed</div>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 shadow-xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{pendingCount}</div>
                  <div className="text-sm text-amber-100">Pending</div>
                </div>
                <div className="text-4xl">⏳</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-violet-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-violet-500/25 transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{Math.round(progressPercentage)}%</div>
                  <div className="text-sm text-violet-100">Progress</div>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        {homework.length > 0 && (
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-blue-200 dark:border-blue-700 shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-500">
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-700 dark:text-slate-300">Overall Progress</span>
                  <span className="text-blue-600 dark:text-blue-400">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Homework List */}
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-blue-200 dark:border-blue-700 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 delay-700">
          <CardHeader className="space-y-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              📝 Your Assignments
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              Check off tasks as you complete them and stay on track!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-100/50 via-indigo-100/50 to-purple-100/50 dark:from-slate-700/50 dark:via-indigo-800/30 dark:to-slate-700/50 rounded-xl animate-pulse">
                    <div className="h-5 w-5 bg-blue-300 dark:bg-blue-600 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-blue-300 dark:bg-blue-600 rounded w-3/4"></div>
                      <div className="h-3 bg-blue-200 dark:bg-blue-700 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : homework.length > 0 ? (
              <ul className="space-y-4">
                {homework.map((hw, index) => {
                  const isOverdue = new Date(hw.dueDate) < new Date() && !hw.completed;
                  return (
                    <li 
                      key={hw._id} 
                      className={`group flex items-center gap-4 rounded-xl border-2 p-4 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg animate-in fade-in-0 slide-in-from-left-4 duration-500 ${
                        hw.completed 
                          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700 shadow-emerald-100 dark:shadow-emerald-900/20' 
                          : isOverdue
                          ? 'bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-700 shadow-rose-100 dark:shadow-rose-900/20'
                          : 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700 shadow-blue-100 dark:shadow-blue-900/20'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative">
                        <Checkbox
                          id={hw._id}
                          checked={hw.completed}
                          onCheckedChange={(checked) => handleCheckChange(hw._id, checked)}
                          className={`h-5 w-5 transition-all duration-300 ${
                            hw.completed 
                              ? 'border-emerald-500 data-[state=checked]:bg-emerald-500' 
                              : 'border-blue-500 hover:border-blue-600'
                          }`}
                        />
                        {hw.completed && (
                          <div className="absolute -top-1 -right-1 text-emerald-500 text-xs animate-bounce">
                            ✨
                          </div>
                        )}
                      </div>
                      
                      <div className="grid gap-2 flex-1">
                        <label 
                          htmlFor={hw._id} 
                          className={`font-semibold text-lg cursor-pointer transition-all duration-300 ${
                            hw.completed 
                              ? 'line-through text-emerald-600 dark:text-emerald-400' 
                              : 'text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                          }`}
                        >
                          {hw.task}
                        </label>
                        <div className={`flex flex-wrap items-center gap-3 text-sm ${hw.completed ? 'line-through' : ''}`}>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full font-medium ${
                            hw.completed 
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          }`}>
                            📖 {hw.subject}
                          </span>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full font-medium ${
                            isOverdue && !hw.completed
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
                              : hw.completed 
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                          }`}>
                            📅 Due {new Date(hw.dueDate).toLocaleDateString()}
                            {isOverdue && !hw.completed && ' (Overdue)'}
                          </span>
                        </div>
                      </div>
                      
                      {hw.completed && (
                        <div className="text-2xl animate-pulse">
                          🎉
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <p className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
                  No homework assignments found!
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  Great job staying on top of your work!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}