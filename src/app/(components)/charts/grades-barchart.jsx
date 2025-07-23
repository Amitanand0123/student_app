"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

export function GradesBarChart({ data }) {
    const { theme } = useTheme();
    const primaryColor = theme === 'dark' ? '#38bdf8' : '#0ea5e9';

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="subject" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: theme === 'dark' ? '#020617' : '#ffffff',
                        borderColor: theme === 'dark' ? '#1e293b' : '#e2e8f0',
                    }}
                />
                <Bar dataKey="score" fill={primaryColor} radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}