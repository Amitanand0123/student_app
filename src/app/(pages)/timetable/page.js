"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const dayEmojis = ["🌟", "🔥", "⚡", "🚀", "🎯"];
const dayColors = [
  "from-rose-400 to-pink-500",
  "from-orange-400 to-red-500", 
  "from-amber-400 to-yellow-500",
  "from-emerald-400 to-teal-500",
  "from-blue-400 to-indigo-500"
];

export default function TimetablePage() {
    const [timetable, setTimetable] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTimetable() {
            try {
                const response = await fetch(`/api/student/timetable`);
                const data = await response.json();
                
                const groupedByDay = data.reduce((acc, entry) => {
                    (acc[entry.day] = acc[entry.day] || []).push(entry);
                    return acc;
                }, {});
                setTimetable(groupedByDay);

            } finally {
                setLoading(false);
            }
        }
        fetchTimetable();
    }, []);

    const getCurrentDay = () => {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        return daysOfWeek.includes(today) ? today : null;
    };

    const currentDay = getCurrentDay();

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 dark:from-slate-900 dark:via-sky-900/20 dark:to-slate-900">
            <div className="space-y-8 p-6 animate-in slide-in-from-bottom-4 duration-700">
                
                {/* Header Section */}
                <div className="space-y-4 animate-in fade-in-0 slide-in-from-left-4 duration-1000">
                    <h1 className="text-4xl font-bold flex items-center gap-2">
                        <span className="text-black">📅</span>
                        <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 bg-clip-text text-transparent">
                            Class Timetable
                        </span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-300 text-lg">
                        Your weekly class schedule at a glance
                    </p>
                    {currentDay && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-100 to-sky-100 dark:from-cyan-900/30 dark:to-sky-900/30 rounded-full border border-cyan-200 dark:border-cyan-700">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                            <span className="text-cyan-700 dark:text-cyan-300 font-medium">
                                Today is {currentDay}
                            </span>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {daysOfWeek.map((day, index) => (
                            <div key={day} className="animate-in fade-in-0 duration-1000" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="h-80 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-2xl animate-pulse shadow-lg"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {daysOfWeek.map((day, index) => {
                            const isToday = day === currentDay;
                            const dayClasses = timetable[day] || [];
                            
                            return (
                                <Card 
                                    key={day} 
                                    className={`relative overflow-hidden border-2 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4 ${
                                        isToday 
                                            ? 'bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-900/30 dark:to-sky-900/30 border-cyan-300 dark:border-cyan-600 shadow-cyan-200 dark:shadow-cyan-900/30 ring-2 ring-cyan-300 dark:ring-cyan-600' 
                                            : 'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-700'
                                    }`}
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    {/* Day Header */}
                                    <CardHeader className={`text-center relative overflow-hidden bg-gradient-to-r ${dayColors[index]} text-white`}>
                                        <div className="absolute inset-0 bg-black/10"></div>
                                        <div className="relative z-10">
                                            <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
                                                <span className="text-2xl">{dayEmojis[index]}</span>
                                                {day}
                                            </CardTitle>
                                            {isToday && (
                                                <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
                                            )}
                                        </div>
                                        {/* Decorative elements */}
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full"></div>
                                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/20 rounded-full"></div>
                                    </CardHeader>

                                    <CardContent className="p-4 space-y-3 min-h-[250px]">
                                        {dayClasses.length > 0 ? (
                                            dayClasses
                                                .sort((a, b) => a.period.localeCompare(b.period))
                                                .map((entry, entryIndex) => (
                                                    <div 
                                                        key={entry._id} 
                                                        className={`group rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-in fade-in-0 slide-in-from-left-4 ${
                                                            isToday 
                                                                ? 'bg-gradient-to-br from-cyan-100 to-sky-100 dark:from-cyan-900/40 dark:to-sky-900/40 border border-cyan-200 dark:border-cyan-700' 
                                                                : 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50 hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20'
                                                        }`}
                                                        style={{ animationDelay: `${(index * 150) + (entryIndex * 100)}ms` }}
                                                    >
                                                        <div className="space-y-2">
                                                            <div className="flex items-center justify-between">
                                                                <p className={`font-bold text-lg ${
                                                                    isToday 
                                                                        ? 'text-cyan-700 dark:text-cyan-300' 
                                                                        : 'text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                                                }`}>
                                                                    📚 {entry.subject}
                                                                </p>
                                                                {isToday && (
                                                                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                                                                )}
                                                            </div>
                                                            
                                                            <div className="flex items-center gap-2">
                                                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                                    isToday 
                                                                        ? 'bg-cyan-200 text-cyan-800 dark:bg-cyan-800/50 dark:text-cyan-200' 
                                                                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                                                                }`}>
                                                                    🕐 {entry.period}
                                                                </div>
                                                            </div>
                                                            
                                                            <p className={`text-sm ${
                                                                isToday 
                                                                    ? 'text-cyan-600 dark:text-cyan-400' 
                                                                    : 'text-slate-600 dark:text-slate-400'
                                                            }`}>
                                                                👨‍🏫 {entry.teacher}
                                                            </p>
                                                        </div>
                                                        
                                                        {/* Hover effect decoration */}
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                                    </div>
                                                ))
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                                <div className="text-4xl mb-3 opacity-50">😴</div>
                                                <p className="text-slate-500 dark:text-slate-400 font-medium">
                                                    No classes
                                                </p>
                                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                                    Enjoy your free day!
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                    
                                    {/* Bottom decoration */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-60" style={{ background: `linear-gradient(to right, ${dayColors[index].replace('from-', '').replace(' to-', ', ')})` }}></div>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* Weekly Stats */}
                <div className="grid gap-6 md:grid-cols-4 animate-in fade-in-0 slide-in-from-bottom-6 duration-1000 delay-1000">
                    <Card className="bg-gradient-to-br from-purple-500 to-violet-600 text-white border-0 shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold">
                                        {Object.values(timetable).flat().length}
                                    </div>
                                    <div className="text-sm text-purple-100">Total Classes</div>
                                </div>
                                <div className="text-4xl">📚</div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold">
                                        {daysOfWeek.filter(day => timetable[day]?.length > 0).length}
                                    </div>
                                    <div className="text-sm text-emerald-100">Active Days</div>
                                </div>
                                <div className="text-4xl">📅</div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold">
                                        {currentDay && timetable[currentDay] ? timetable[currentDay].length : 0}
                                    </div>
                                    <div className="text-sm text-orange-100">Today&apos;s Classes</div>
                                </div>
                                <div className="text-4xl">⭐</div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold">
                                        {new Set(Object.values(timetable).flat().map(entry => entry.subject)).size}
                                    </div>
                                    <div className="text-sm text-blue-100">Subjects</div>
                                </div>
                                <div className="text-4xl">🎯</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}