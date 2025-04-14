import dbConnect from '@/lib/dbConnect'
import Subscriber from '@/models/Subscriber'
import { Parser } from 'json2csv'

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === 'GET') {
    try {
      const subscribers = await Subscriber.find().sort({ subscribedAt: -1 })

      const fields = ['name', 'email', 'subscribedAt']
      const parser = new Parser({ fields })
      const csv = parser.parse(subscribers)

      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv')
      return res.status(200).send(csv)

    } catch (error) {
      return res.status(500).json({ error: 'Failed to generate CSV' })
    }
  }

  return res.status(405).end('Method Not Allowed')
}
