import mongoose from 'mongoose'

const SubscriberSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema)
