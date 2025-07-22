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
        const response = await fetch('/api/homework');
        const data = await response.json();
        if (data.success) {
          setHomework(data.data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchHomework();
  }, []);

  const handleCheckChange = async (id, completed) => {
    // Optimistically update UI
    setHomework(homework.map(hw => hw._id === id ? { ...hw, completed } : hw));

    const response = await fetch('/api/homework', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed }),
    });

    if (response.ok) {
      toast.success(`Assignment marked as ${completed ? 'complete' : 'incomplete'}.`);
    } else {
      toast.error('Failed to update assignment.');
      // Revert UI on failure
      setHomework(homework.map(hw => hw._id === id ? { ...hw, completed: !completed } : hw));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Homework</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Assignments</CardTitle>
          <CardDescription>Check off tasks as you complete them.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <ul className="space-y-4">
              {homework.map((hw) => (
                <li key={hw._id} className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                  <Checkbox
                    id={hw._id}
                    checked={hw.completed}
                    onCheckedChange={(checked) => handleCheckChange(hw._id, checked)}
                  />
                  <div className="grid gap-1">
                    <label htmlFor={hw._id} className={`font-medium ${hw.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {hw.task}
                    </label>
                    <p className={`text-sm text-muted-foreground ${hw.completed ? 'line-through' : ''}`}>
                      <span className="font-semibold">{hw.subject}</span> - Due {new Date(hw.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}