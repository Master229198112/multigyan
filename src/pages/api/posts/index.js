import dbConnect from '@/lib/dbConnect'
import Post from '@/models/Post'

export default async function handler(req, res) {
  const { method } = req

  console.time('API handler')
  try {
    await dbConnect()
    console.timeLog('API handler', 'MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection failed:', err)
    return res.status(500).json({ error: 'DB connection failed' })
  }

  switch (method) {
    case 'GET':
      try {
        console.log('Fetching posts...')
        const posts = await Post.find({}).sort({ createdAt: -1 }).lean()
        console.log('Posts fetched:', posts.length)
        res.status(200).json({ success: true, data: posts })
      } catch (error) {
        console.error('GET error:', error)
        res.status(500).json({ success: false, error: error.message })
      }
      break

    case 'POST':
      try {
        const post = await Post.create(req.body)
        res.status(201).json({ success: true, data: post })
      } catch (error) {
        console.error('POST error:', error)
        res.status(400).json({ success: false, error: error.message })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

  console.timeEnd('API handler')
}
