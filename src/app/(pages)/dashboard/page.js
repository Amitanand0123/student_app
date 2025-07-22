"use client";

import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { AttendanceCard } from '@/app/(components)/dashboard/attendance-card';
import { HomeworkCard } from '@/app/(components)/dashboard/homework-card';
import { RecentGradesCard } from '@/app/(components)/dashboard/recent-grades-card';
import { QuickLinks } from '@/app/(components)/dashboard/quick-links';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/student/dashboard-data`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900">
        <div className="p-6 space-y-8">
          {/* Header Skeleton */}
          <div className="space-y-4 animate-in fade-in-0 duration-1000">
            <div className="h-10 w-80 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-lg animate-pulse"></div>
            <div className="h-6 w-60 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg animate-pulse"></div>
          </div>
          
          {/* Cards Skeleton */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="h-40 bg-gradient-to-br from-slate-200 via-purple-200 to-pink-200 dark:from-slate-700 dark:via-purple-800 dark:to-pink-800 rounded-2xl animate-pulse shadow-lg"
                style={{ animationDelay: `${i * 100}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 dark:from-slate-900 dark:via-red-900/20 dark:to-slate-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4 animate-in fade-in-0 zoom-in-95 duration-1000">
            <div className="text-6xl mb-4">😞</div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              Oops! Something went wrong
            </div>
            <div className="text-red-500 dark:text-red-300 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
              Failed to load dashboard: {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900">
      <div className="space-y-8 p-6 animate-in slide-in-from-bottom-4 duration-700">
        
        {/* Welcome Header */}
        <div className="space-y-4 animate-in fade-in-0 slide-in-from-left-4 duration-1000">
          <div className="flex items-center gap-3">
            <div className="text-4xl animate-bounce">👋</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {getCurrentGreeting()}!
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Welcome back to your learning dashboard. Here&apos;s what&apos;s happening today.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Dashboard • Last updated just now</span>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid auto-rows-max items-start gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in-0 slide-in-from-bottom-6 duration-1000 delay-300">
          
          {/* Left Column - Main Stats */}
          <div className="grid gap-6 lg:col-span-2">
            
            {/* Top Row - Key Metrics */}
            <div className="grid gap-6 sm:grid-cols-2">
              
              {/* Enhanced Attendance Card */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-500 animate-in fade-in-0 zoom-in-95 delay-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">📊 Attendance</h3>
                    <div className="text-3xl">✅</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">
                      {data?.attendancePercentage || 0}%
                    </div>
                    <div className="text-emerald-100 text-sm">
                      Keep up the great work!
                    </div>
                    <div className="w-full bg-emerald-200/30 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${data?.attendancePercentage || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/10 rounded-full"></div>
              </div>

              {/* Enhanced Homework Card */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl shadow-2xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all duration-500 animate-in fade-in-0 zoom-in-95 delay-700">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">📝 Homework</h3>
                    <div className="text-3xl">📚</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-amber-100">Pending</span>
                      <span className="text-2xl font-bold">{data?.homework?.pending || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-amber-100">Overdue</span>
                      <span className="text-2xl font-bold text-red-200">{data?.homework?.overdue || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -left-2 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>
              
            </div>

            {/* Recent Grades Section */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-purple-200 dark:border-purple-700 rounded-2xl shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-8 delay-900">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <div className="text-white text-xl">🏆</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Recent Grades</h3>
                    <p className="text-slate-600 dark:text-slate-300">Your latest academic achievements</p>
                  </div>
                </div>
                
                {data?.recentGrades && data.recentGrades.length > 0 ? (
                  <div className="space-y-3">
                    {data.recentGrades.slice(0, 5).map((grade, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl hover:scale-105 transition-all duration-300 animate-in fade-in-0 slide-in-from-left-4"
                        style={{ animationDelay: `${1000 + (index * 100)}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <div>
                            <div className="font-semibold text-slate-800 dark:text-slate-100">
                              {grade.subject}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              {grade.assignment}
                            </div>
                          </div>
                        </div>
                        <div className={`text-2xl font-bold px-3 py-1 rounded-lg ${
                          grade.score >= 90 ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' :
                          grade.score >= 80 ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' :
                          grade.score >= 70 ? 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' :
                          'text-red-600 bg-red-100 dark:bg-red-900/30'
                        }`}>
                          {grade.score}%
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📚</div>
                    <p className="text-slate-500 dark:text-slate-400">No recent grades available</p>
                  </div>
                )}
              </div>
            </div>
            
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-1000 delay-1100">
            
            {/* Quick Links Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                  🚀 Quick Actions
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: "📊", label: "View Grades", color: "from-blue-500 to-indigo-600" },
                    { icon: "📝", label: "Homework", color: "from-emerald-500 to-teal-600" },
                    { icon: "📅", label: "Timetable", color: "from-purple-500 to-violet-600" },
                    { icon: "👨‍🏫", label: "Contact Teacher", color: "from-orange-500 to-red-600" }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`group flex items-center gap-4 p-4 bg-gradient-to-r ${item.color} rounded-xl text-white cursor-pointer hover:scale-105 transform transition-all duration-300 animate-in fade-in-0 slide-in-from-right-4`}
                      style={{ animationDelay: `${1200 + (index * 100)}ms` }}
                    >
                      <div className="text-2xl group-hover:animate-bounce">{item.icon}</div>
                      <div className="font-semibold">{item.label}</div>
                      <div className="ml-auto text-xl group-hover:translate-x-1 transition-transform duration-300">→</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Today's Stats */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-indigo-200 dark:border-indigo-700 rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                📈 Today&apos;s Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-300">Classes Today</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-300">Completed Tasks</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">3/7</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-300">Study Hours</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">4.2h</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}