import dbConnect from '@/lib/dbConnect'
import Post from '@/models/Post'

export default async function handler(req, res) {
  const { method } = req
  const { id } = req.query

  await dbConnect()

  if (method === 'GET') {
    try {
      const post = await Post.findOne({ slug: id })
      if (!post) {
        console.warn('⚠️ Post not found (GET)')
        return res.status(404).json({ success: false, error: 'Post not found' })
      }
      return res.status(200).json({ success: true, data: post })
    } catch (error) {
      console.error('❌ Error in GET:', error)
      return res.status(500).json({ success: false, error: error.message })
    }
  }

  if (method === 'PUT') {
    try {
      const updated = await Post.findByIdAndUpdate(id, req.body, { new: true })

      if (!updated) {
        console.warn('⚠️ Post not found (PUT)')
        return res.status(404).json({ success: false, error: 'Post not found' })
      }

      return res.status(200).json({ success: true, data: updated })
    } catch (error) {
      console.error('❌ Error in PUT:', error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }

  if (method === 'DELETE') {
    try {
      await Post.findByIdAndDelete(id)
      return res.status(200).json({ success: true, message: 'Post deleted' })
    } catch (error) {
      console.error('❌ Error in DELETE:', error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }

  console.warn('🚫 Method not allowed:', method)
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  res.status(405).end(`Method ${method} Not Allowed`)
}
