"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

const teachers = [
    { id: 1, name: "Mr. Smith (Mathematics)" },
    { id: 2, name: "Ms. Jones (Science)" },
    { id: 3, name: "Mr. Davis (English)" },
];

export default function ContactPage() {
    const [teacher, setTeacher] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const BACKEND_URL=process.env.NEXT_PUBLIC_BACKEND_URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        

        try {
            const response = await fetch(`${BACKEND_URL}/api/teachers/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teacher, subject, message }),
            });

            if (response.ok) {
                toast.success("Your message has been sent!");
                setTeacher('');
                setSubject('');
                setMessage('');
            } else {
                toast.error("Failed to send message. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in-up">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Contact a Teacher</h1>
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Send a Message</CardTitle>
                    <CardDescription>Select a teacher and write your message below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="teacher">Teacher</label>
                            <Select onValueChange={setTeacher} value={teacher} required>
                                <SelectTrigger id="teacher">
                                    <SelectValue placeholder="Select a teacher..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {teachers.map(t => <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="subject">Subject</label>
                            <Input id="subject" placeholder="e.g., Question about homework" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message">Message</label>
                            <Textarea id="message" placeholder="Type your message here..." value={message} onChange={(e) => setMessage(e.target.value)} required rows={6} />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}