import dbConnect from '@/lib/dbConnect'
import Comment from '@/models/Comment'

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()

  if (method === 'GET') {
    const { slug } = req.query
    if (!slug) return res.status(400).json({ success: false, error: 'Missing post slug' })

    try {
      const comments = await Comment.find({ postSlug: slug }).sort({ createdAt: -1 })
      res.status(200).json({ success: true, data: comments })
    } catch (error) {
      res.status(500).json({ success: false, error: error.message })
    }
  }

  else if (method === 'POST') {
    try {
      const comment = await Comment.create(req.body)
      res.status(201).json({ success: true, data: comment })
    } catch (error) {
      res.status(400).json({ success: false, error: error.message })
    }
  }

  else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
