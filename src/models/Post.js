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
      type: String, // We'll store as string (formatted) for frontend use
    },
    readTime: {
      type: String,
    }
  },
  { timestamps: true }
)

// Prevent model overwrite in dev
export default mongoose.models.Post || mongoose.model('Post', PostSchema)
