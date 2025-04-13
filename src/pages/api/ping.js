import dbConnect from '@/lib/dbConnect'

export default async function handler(req, res) {
  try {
    console.time('dbConnect')
    await dbConnect()
    console.timeEnd('dbConnect')
    res.status(200).json({ message: 'Connected to DB ✅' })
  } catch (err) {
    res.status(500).json({ error: '❌ DB connection failed', details: err.message })
  }
}
