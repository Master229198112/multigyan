import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
    },
    date: {
      type: String,
    },
    readTime: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    approved: {
      type: Boolean,
      default: false
    },
    publishDate: {
      type: Date,
      default: Date.now
    }        
  },
  { timestamps: true }
)

export default mongoose.models.Post || mongoose.model('Post', PostSchema)
