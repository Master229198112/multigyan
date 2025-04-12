import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
  {
    postSlug: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: String, // optional
    message: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
)

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema)
