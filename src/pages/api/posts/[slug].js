import dbConnect from '@/lib/dbConnect'
import Post from '@/models/Post'

export default async function handler(req, res) {
  const { method } = req
  const { slug } = req.query

  await dbConnect()

  if (method === 'GET') {
    try {
      const post = await Post.findOne({ slug })

      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' })
      }

      res.status(200).json({ success: true, data: post })
    } catch (error) {
      res.status(500).json({ success: false, error: error.message })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
