import { getHomework, updateHomework } from '@/controllers/homework.controller';

export async function GET() {
    return getHomework();
}

export async function PUT(request) {
    return updateHomework(request);
}