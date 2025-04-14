import { v2 as cloudinary } from 'cloudinary'
import { IncomingForm } from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }

  const form = new IncomingForm({ keepExtensions: true })

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ success: false, error: 'Upload failed' })

    const file = files.file?.[0]
    if (!file) return res.status(400).json({ success: false, error: 'No file uploaded' })

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: 'multigyan',
        transformation: [{ width: 1200, crop: 'scale' }],
      })

      // generate thumbnail
      const thumbnail = cloudinary.url(result.public_id, {
        width: 400,
        crop: 'scale',
        secure: true,
      })

      return res.status(200).json({
        success: true,
        url: result.secure_url,
        thumbnail,
      })
    } catch (e) {
      console.error('Cloudinary error:', e)
      return res.status(500).json({ success: false, error: 'Cloudinary upload failed' })
    }
  })
}
