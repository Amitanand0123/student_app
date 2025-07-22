"use client";

import React, { useEffect, useState } from 'react';
import { AttendanceCard } from '@/components/dashboard/attendance-card';
import { HomeworkCard } from '@/components/dashboard/homework-card';
import { QuickLinks } from '@/components/dashboard/quick-links';
import { RecentGradesCard } from '@/components/dashboard/recent-grades-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/dashboard-data');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result.data);
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-96 rounded-xl lg:col-span-1 md:col-span-2" />
        <Skeleton className="h-64 rounded-xl md:col-span-2" />
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive">Failed to load dashboard: {error}</div>;
  }

  return (
    <div className="grid auto-rows-max items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="grid gap-6 lg:col-span-2">
        <div className="grid gap-6 sm:grid-cols-2">
          <AttendanceCard percentage={data?.attendancePercentage || 0} />
          <HomeworkCard pending={data?.homework?.pending || 0} overdue={data?.homework?.overdue || 0} />
        </div>
        <RecentGradesCard grades={data?.recentGrades || []} />
      </div>
      <QuickLinks />
    </div>
  );
}