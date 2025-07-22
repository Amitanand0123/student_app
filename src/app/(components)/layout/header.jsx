"use client"
import Link from "next/link"
import { Bell, Home, BookOpen, BarChart3, Calendar, Menu, GraduationCap } from "lucide-react"
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
        toast.success('Successfully subscribed to notifications!');
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
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <MobileNav />
      <div className="relative ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleNotificationSubscribe}>
          <Bell className="h-5 w-5" />
          <span className="sr-only">Subscribe to notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {student.profilePicture ? <img src={student.profilePicture} alt={student.name} className="h-full w-full rounded-full object-cover" /> : getInitials(student.name)}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{student.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  Student
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}