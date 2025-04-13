import dbConnect from '@/lib/dbConnect'
import Subscriber from '@/models/Subscriber'

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === 'POST') {
    const { name, email } = req.body

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' })
    }

    try {
      const subscriber = await Subscriber.create({ name, email })
      return res.status(201).json({ success: true, data: subscriber })
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ success: false, error: 'Already subscribed' })
      }
      return res.status(500).json({ success: false, error: err.message })
    }
  }

  return res.status(405).end('Method Not Allowed')
}
