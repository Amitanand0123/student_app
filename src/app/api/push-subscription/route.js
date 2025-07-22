import { NextResponse } from 'next/server';
import webpush from 'web-push';
import dbConnect from '@/lib/db';
import PushSubscription from '@/models/PushSubscription';

const vapidKeys = {
    publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
    `mailto:${process.env.VAPID_EMAIL || 'test@example.com'}`,
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

export async function POST(request) {
    await dbConnect();
    try {
        const subscriptionData = await request.json();

        // Use updateOne with upsert to avoid creating duplicate subscriptions
        await PushSubscription.updateOne(
            { endpoint: subscriptionData.endpoint },
            { $set: subscriptionData },
            { upsert: true }
        );

        // Send a welcome notification
        const payload = JSON.stringify({
            title: 'Welcome to the Student App!',
            body: 'You are now subscribed to notifications.',
            icon: '/icons/icon-192x192.png',
        });

        await webpush.sendNotification(subscriptionData, payload);

        return NextResponse.json({ success: true, message: 'Subscribed successfully.' }, { status: 201 });

    } catch (error) {
        console.error('Error in push subscription:', error);
        // Differentiate between client and server errors
        if (error.statusCode) {
             return NextResponse.json({ success: false, message: error.body }, { status: error.statusCode });
        }
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}