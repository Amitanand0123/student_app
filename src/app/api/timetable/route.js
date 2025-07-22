import { getTimetable } from '@/controllers/timetable.controller';

export async function GET() {
    return getTimetable();
}