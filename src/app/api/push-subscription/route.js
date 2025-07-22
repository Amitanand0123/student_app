import { handlePushSubscription } from '@/controllers/push.controller';

export async function POST(request) {
    return handlePushSubscription(request);
}