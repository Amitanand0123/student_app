"use client";

import React, { useEffect, useState } from 'react';
import { DashboardHeader } from './(components)/dashboard/dashboard-header';
import { DashboardNav } from './(components)/dashboard/dashboard-nav';
import { AttendanceCard } from './(components)/dashboard/attendance-card';
import { HomeworkCard } from './(components)/dashboard/homework-card';
import { QuickLinks } from './(components)/dashboard/quick-links';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Register service worker for PWA capabilities
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('Service Worker registered:', registration))
        .catch(error => console.error('Service Worker registration failed:', error));
    }

    // Fetch dashboard data from our API
    async function fetchData() {
      try {
        const response = await fetch('/api/dashboard-data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashboardNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader studentName={loading ? 'Loading...' : data?.name || 'Student'} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {loading ? (
                <>
                  <Skeleton className="h-[150px] w-full" />
                  <Skeleton className="h-[150px] w-full" />
                </>
              ) : error ? (
                <div className="col-span-2 text-destructive">Failed to load data: {error}</div>
              ) : (
                <>
                  <AttendanceCard percentage={data?.attendancePercentage || 0} />
                  <HomeworkCard
                    pending={data?.homework?.pending || 0}
                    overdue={data?.homework?.overdue || 0}
                  />
                </>
              )}
            </div>
            {/* You can add more components like recent grades or events here */}
          </div>
          <QuickLinks />
        </main>
      </div>
    </div>
  );
}