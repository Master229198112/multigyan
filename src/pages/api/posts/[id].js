import dbConnect from '@/lib/dbConnect'
import Post from '@/models/Post'

export default async function handler(req, res) {
  const { method } = req
  const { id } = req.query

  await dbConnect()

  if (method === 'PUT') {
    try {
      const updated = await Post.findByIdAndUpdate(id, req.body, { new: true })
      if (!updated) return res.status(404).json({ success: false, error: 'Post not found' })
      res.status(200).json({ success: true, data: updated })
    } catch (error) {
      res.status(400).json({ success: false, error: error.message })
    }
  }

  else if (method === 'DELETE') {
    try {
      await Post.findByIdAndDelete(id)
      res.status(200).json({ success: true, message: 'Post deleted' })
    } catch (error) {
      res.status(400).json({ success: false, error: error.message })
    }
  }

  else {
    res.setHeader('Allow', ['PUT', 'DELETE'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
