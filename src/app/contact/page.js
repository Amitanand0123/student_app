"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

const teachers = [
    { id: 1, name: "Mr. Smith (Mathematics)", subject: "Mathematics", emoji: "🔢" },
    { id: 2, name: "Ms. Jones (Science)", subject: "Science", emoji: "🔬" },
    { id: 3, name: "Mr. Davis (English)", subject: "English", emoji: "📖" },
];

export default function ContactPage() {
    const [teacher, setTeacher] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Add a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const response = await fetch(`${BACKEND_URL}/api/teachers/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teacher, subject, message }),
            });

            if (response.ok) {
                toast.success("Your message has been sent! 🎉");
                setTeacher('');
                setSubject('');
                setMessage('');
            } else {
                toast.error("Failed to send message. Please try again. 😞");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later. 🔄");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-slate-900 dark:via-violet-900/20 dark:to-slate-900">
            <div className="p-4 sm:p-6 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
                
                {/* Header Section */}
                <div className="text-center space-y-6 animate-in fade-in-0 slide-in-from-top-4 duration-1000">
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-violet-100 via-purple-100 to-fuchsia-100 dark:from-violet-900/30 dark:via-purple-900/30 dark:to-fuchsia-900/30 rounded-2xl border border-violet-200 dark:border-violet-700 shadow-2xl backdrop-blur-sm">
                        <div className="text-3xl animate-bounce">📧</div>
                        <span className="text-violet-700 dark:text-violet-300 font-bold text-lg">Connect with Your Teachers</span>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
                            Contact a Teacher
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
                            Have questions about your coursework? Need clarification on assignments? Reach out to your teachers directly and get the help you need!
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Teachers typically respond within 24 hours</span>
                    </div>
                </div>

                {/* Teachers Grid */}
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-100 animate-in fade-in-0 duration-1000 delay-300">
                        Meet Your Teachers
                    </h2>
                    <div className="grid gap-6 md:grid-cols-3 animate-in fade-in-0 slide-in-from-bottom-6 duration-1000 delay-300">
                        {teachers.map((t, index) => (
                            <div 
                                key={t.id}
                                className="group relative overflow-hidden p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-violet-200 dark:border-violet-700 rounded-3xl hover:shadow-2xl hover:shadow-violet-500/20 hover:scale-105 transition-all duration-500 animate-in fade-in-0 zoom-in-95"
                                style={{ animationDelay: `${500 + (index * 150)}ms` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative text-center space-y-4">
                                    <div className="text-5xl mb-4 group-hover:animate-bounce transition-all duration-300">
                                        {t.emoji}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">
                                            {t.name.split('(')[0].trim()}
                                        </h3>
                                        <p className="text-violet-600 dark:text-violet-400 font-semibold">
                                            {t.subject}
                                        </p>
                                    </div>
                                    <div className="pt-2">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg group-hover:shadow-violet-500/50 transition-all duration-300">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            Available
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div className="max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 delay-600">
                    <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-fuchsia-500/5"></div>
                        <CardHeader className="relative text-center pb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 mx-auto shadow-2xl">
                                <div className="text-2xl text-white">✉️</div>
                            </div>
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                                Send Your Message
                            </CardTitle>
                            <CardDescription className="text-lg text-slate-600 dark:text-slate-300 mt-2">
                                Fill out the form below and we'll make sure your message reaches the right teacher
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative space-y-6 p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Teacher Selection */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                        👨‍🏫 Select Teacher
                                    </label>
                                    <Select value={teacher} onValueChange={setTeacher}>
                                        <SelectTrigger className="h-14 rounded-2xl border-violet-200 dark:border-violet-700 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-lg focus:ring-violet-500 focus:border-violet-500 transition-all duration-300">
                                            <SelectValue placeholder="Choose your teacher" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-2xl border-violet-200 dark:border-violet-700">
                                            {teachers.map((t) => (
                                                <SelectItem key={t.id} value={t.name} className="rounded-xl">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl">{t.emoji}</span>
                                                        <span>{t.name}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Subject */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                        📝 Subject
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="What's this about?"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="h-14 rounded-2xl border-violet-200 dark:border-violet-700 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-lg placeholder:text-slate-400 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300"
                                    />
                                </div>

                                {/* Message */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                        💬 Message
                                    </label>
                                    <Textarea
                                        placeholder="Type your message here... Be as detailed as you'd like!"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={6}
                                        className="rounded-2xl border-violet-200 dark:border-violet-700 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-lg placeholder:text-slate-400 focus:ring-violet-500 focus:border-violet-500 transition-all duration-300 resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={loading || !teacher || !subject || !message}
                                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 text-white rounded-2xl shadow-2xl hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Sending Message...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <span>Send Message</span>
                                            <div className="text-xl">🚀</div>
                                        </div>
                                    )}
                                </Button>
                            </form>

                            {/* Quick Tips */}
                            <div className="mt-8 p-6 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl border border-violet-200 dark:border-violet-700">
                                <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                                    💡 Quick Tips
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-violet-500 mt-1">•</span>
                                        Be specific about your question or concern
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-violet-500 mt-1">•</span>
                                        Include any relevant assignment or chapter details
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-violet-500 mt-1">•</span>
                                        Teachers typically respond within 24 hours during school days
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}