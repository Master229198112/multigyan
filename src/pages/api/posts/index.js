import dbConnect from '@/lib/dbConnect'
import Post from '@/models/Post'

export default async function handler(req, res) {
  const { method } = req
  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const { approved } = req.query
        const query = approved === 'true' ? { approved: true } : {}

        const posts = await Post.find(query).sort({ createdAt: -1 })
        res.status(200).json({ success: true, data: posts })
      } catch (error) {
        res.status(500).json({ success: false, error: error.message })
      }
      break

    case 'POST':
      try {
        const post = await Post.create(req.body)

        const nodemailer = require('nodemailer')

        const transporter = nodemailer.createTransport({
          host: 'smtpout.secureserver.net',
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        })

        if (!post.approved) {
          // Send notification to admin
          await transporter.sendMail({
            from: `"Multigyan" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `📝 New Blog Post Submitted for Review`,
            html: `
              <h3>Post Title: ${post.title}</h3>
              <p><strong>Slug:</strong> ${post.slug}</p>
              <p><strong>Category:</strong> ${post.category}</p>
              <p>This post is pending your approval in the admin dashboard.</p>
            `,
          })
        }

        if (post.email) {
          await transporter.sendMail({
            from: `"Multigyan" <${process.env.EMAIL_USER}>`,
            to: post.email,
            subject: `📬 Your blog post has been received!`,
            html: `
              <p>Hi there,</p>
              <p>Thanks for submitting your post titled <strong>${post.title}</strong> to Multigyan!</p>
              <p>Our editorial team will review it soon. You’ll be notified once it is published.</p>
              <p><em>– Team Multigyan</em></p>
            `,
          })
        }

        res.status(201).json({ success: true, data: post })
      } catch (error) {
        res.status(400).json({ success: false, error: error.message })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
