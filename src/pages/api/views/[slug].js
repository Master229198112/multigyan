import dbConnect from '@/lib/dbConnect'
import Post from '@/models/Post'

export default async function handler(req, res) {
  const { slug } = req.query
  await dbConnect()

  if (req.method === 'POST') {
    try {
      const updated = await Post.findOneAndUpdate(
        { slug },
        { $inc: { views: 1 } },
        { new: true }
      )
      return res.status(200).json({ success: true, views: updated.views })
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message })
    }
  }

  res.status(405).end(`Method ${req.method} Not Allowed`)
}
