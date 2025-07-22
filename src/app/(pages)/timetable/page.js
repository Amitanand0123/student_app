"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function TimetablePage() {
    const [timetable, setTimetable] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTimetable() {
            try {
                const response = await fetch('/api/timetable');
                const data = await response.json();
                if (data.success) {
                    // Group timetable entries by day
                    const groupedByDay = data.data.reduce((acc, entry) => {
                        (acc[entry.day] = acc[entry.day] || []).push(entry);
                        return acc;
                    }, {});
                    setTimetable(groupedByDay);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchTimetable();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Class Timetable</h1>
            {loading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {daysOfWeek.map(day => <Skeleton key={day} className="h-64 w-full" />)}
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {daysOfWeek.map(day => (
                        <Card key={day}>
                            <CardHeader>
                                <CardTitle className="text-center">{day}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {timetable[day] ? timetable[day]
                                .sort((a,b) => a.period.localeCompare(b.period))
                                .map(entry => (
                                    <div key={entry._id} className="rounded-lg bg-muted p-3 text-sm">
                                        <p className="font-semibold text-primary">{entry.subject}</p>
                                        <p className="text-muted-foreground">{entry.period}</p>
                                        <p className="text-xs text-muted-foreground">{entry.teacher}</p>
                                    </div>
                                )) : <p className="text-center text-muted-foreground py-4">No classes</p>}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}