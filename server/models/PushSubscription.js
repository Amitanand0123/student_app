import mongoose from 'mongoose';

const PushSubscriptionSchema = new mongoose.Schema({
  endpoint: { type: String, required: true, unique: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true },
  },
  // You can add a user reference here to link subscriptions to users
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
}, { timestamps: true });

export default mongoose.models.PushSubscription || mongoose.model('PushSubscription', PushSubscriptionSchema);