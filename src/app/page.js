"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page just redirects to the main dashboard.
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p>Loading Dashboard...</p>
    </div>
  );
}