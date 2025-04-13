import dbConnect from '@/lib/dbConnect'
import Comment from '@/models/Comment'
import Post from '@/models/Post'
import nodemailer from 'nodemailer'

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
    const { name, email, message, postSlug } = req.body

    try {
      const comment = await Comment.create({ name, email, message, postSlug })

      // Fetch post title
      const post = await Post.findOne({ slug: postSlug })

      // Create transporter
      const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      })

      // ✉️ Send email to admin
      await transporter.sendMail({
        from: `"Multigyan Comments" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `💬 New Comment on "${post?.title || postSlug}"`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message}</p>
          <p>Post: <a href="https://www.multigyan.in/blog/${postSlug}">View Post</a></p>
        `
      })

      // ✅ Auto-reply to commenter (if email provided)
      if (email) {
        await transporter.sendMail({
          from: `"Multigyan Team" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `Thanks for commenting on "${post?.title || postSlug}"`,
          html: `
            <p>Hi ${name},</p>
            <p>Thanks for your comment on <strong>${post?.title || postSlug}</strong>!</p>
            <p>We appreciate your thoughts and love hearing from readers like you.</p>
            <p>– Team Multigyan</p>
          `
        })
      }

      res.status(201).json({ success: true, data: comment })
    } catch (error) {
      res.status(500).json({ success: false, error: error.message })
    }
  }

  else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
