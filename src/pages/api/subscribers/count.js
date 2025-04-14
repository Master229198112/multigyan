import dbConnect from '@/lib/dbConnect'
import Subscriber from '@/models/Subscriber'

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === 'GET') {
    const count = await Subscriber.countDocuments()
    return res.status(200).json({ count })
  }

  return res.status(405).end('Method Not Allowed')
}
