"use client"
import Link from "next/link"
import { Bell, Home, BookOpen, BarChart3, Calendar, Menu, GraduationCap, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MobileNav } from "./mobile-nav"
import { ThemeToggle } from "../theme-toggle"
import { toast } from "sonner"
import { useEffect, useState } from "react"

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function Header() {
  const [student, setStudent] = useState({ name: 'Student', profilePicture: null });
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    // In a real app, you'd fetch this from a user context or API
    async function fetchUser() {
        const res = await fetch('api/student/dashboard-data'); // Reuse dashboard data for name
        const data = await res.json();
        if (data.success) {
            setStudent({ name: data.data.name, profilePicture: data.data.profilePicture });
        }
    }
    fetchUser();
  }, []);

  const handleNotificationSubscribe = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        toast.warning('Push notifications are not supported by your browser.');
        return;
    }
    try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') throw new Error('Permission not granted for Notification');
        
        const swRegistration = await navigator.serviceWorker.ready;
        const subscription = await swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
        });
        
        await fetch('/api/push-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription),
        });
        toast.success('Successfully subscribed to notifications! 🔔');
    } catch (error) {
        console.error('Failed to subscribe to notifications:', error);
        toast.error('Failed to subscribe. Please check console for details.');
    }
  };

  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '?';
    const names = name.split(' ');
    return names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}` : name.substring(0, 2);
  }

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center gap-4 border-b border-violet-200/50 dark:border-violet-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg px-4 sm:px-6 shadow-lg">
      <MobileNav />
      
      {/* Logo/Brand - Hidden on mobile, shown on larger screens */}
      <div className="hidden sm:flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 shadow-lg">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <div className="hidden lg:block">
          <h1 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            StudentHub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Learning Platform</p>
        </div>
      </div>

      {/* Center - Quick Search (hidden on mobile) */}
      <div className="hidden md:flex flex-1 items-center justify-center max-w-md mx-auto">
        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search assignments, grades..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* Right side controls */}
      <div className="ml-auto flex items-center gap-3">
        
        {/* Theme Toggle */}
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
        
        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative rounded-2xl h-10 w-10 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-all duration-200" 
          onClick={handleNotificationSubscribe}
        >
          <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-all duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white shadow-lg hover:shadow-violet-500/25 transition-all duration-300">
                {student.profilePicture ? (
                  <img
                    src={student.profilePicture}
                    alt={student.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </div>
            </Button>

          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 rounded-2xl border-violet-200 dark:border-violet-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg shadow-2xl" align="end" forceMount>
            <DropdownMenuLabel className="font-normal p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 font-bold text-white shadow-lg">
                  {student.profilePicture ? (
                    <img src={student.profilePicture} alt={student.name} className="h-full w-full rounded-2xl object-cover" />
                  ) : (
                    <span className="text-sm">{getInitials(student.name)}</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{student.name}</p>
                  <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">Student Account</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Online</span>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-violet-200 dark:bg-violet-700" />
            
            <DropdownMenuItem className="rounded-xl m-1 hover:bg-violet-50 dark:hover:bg-violet-900/30 cursor-pointer transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400">👤</span>
                </div>
                <span>Profile Settings</span>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="rounded-xl m-1 hover:bg-violet-50 dark:hover:bg-violet-900/30 cursor-pointer transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400">⚙️</span>
                </div>
                <span>Preferences</span>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="rounded-xl m-1 hover:bg-violet-50 dark:hover:bg-violet-900/30 cursor-pointer transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                  <span className="text-amber-600 dark:text-amber-400">📊</span>
                </div>
                <span>Academic Progress</span>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-violet-200 dark:bg-violet-700" />
            
            <DropdownMenuItem className="rounded-xl m-1 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer transition-colors duration-200 text-red-600 dark:text-red-400">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400">🚪</span>
                </div>
                <span>Sign Out</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}