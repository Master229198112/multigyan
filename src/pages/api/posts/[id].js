import dbConnect from '@/lib/dbConnect'
import Post from '@/models/Post'

export default async function handler(req, res) {
  const { method } = req
  const { id } = req.query

  await dbConnect()

  if (method === 'GET') {
    try {
      // GET by slug
      const post = await Post.findOne({ slug: id })  // slug === id
      if (!post) return res.status(404).json({ success: false, error: 'Post not found' })
      return res.status(200).json({ success: true, data: post })
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message })
    }
  }

  if (method === 'PUT') {
    try {
      const updated = await Post.findByIdAndUpdate(id, req.body, { new: true })
      if (!updated) return res.status(404).json({ success: false, error: 'Post not found' })
      return res.status(200).json({ success: true, data: updated })
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message })
    }
  }

  if (method === 'DELETE') {
    try {
      await Post.findByIdAndDelete(id)
      return res.status(200).json({ success: true, message: 'Post deleted' })
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message })
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  res.status(405).end(`Method ${method} Not Allowed`)
}
