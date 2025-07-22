import { getGrades } from '@/controllers/grades.controller';

export async function GET() {
    return getGrades();
}