import { getDashboardData } from '@/controllers/dashboard.controller';

export async function GET() {
    return getDashboardData();
}
