import dbConnect from '@/lib/dbConnect'
import Subscriber from '@/models/Subscriber'
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === 'POST') {
    const { name, email } = req.body

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' })
    }

    try {
      // Save new subscriber
      const subscriber = await Subscriber.create({ name, email })

      // Setup mailer
      const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })

      // Send styled welcome email to the user
      await transporter.sendMail({
        from: `"Multigyan" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `👋 Welcome to Multigyan`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; color: #333;">
            <h2 style="color: #2c3e50;">👋 Welcome to <span style="color: #e67e22;">Multigyan</span>, ${name || 'Explorer'}!</h2>
            <p>We're excited to have you on board. <strong>Multigyan</strong> is your gateway to exploring the world through insightful blogs, fresh perspectives, and stories that ignite curiosity.</p>

            <p>Here’s what you can expect:</p>
            <ul style="padding-left: 20px;">
              <li>📬 Thought-provoking blog posts delivered to your inbox</li>
              <li>🌍 Insights into culture, life, and learning</li>
              <li>✨ Exclusive subscriber content (coming soon!)</li>
            </ul>

            <p>In the meantime, feel free to explore our site and catch up on popular reads.</p>

            <p style="margin-top: 30px;">Stay curious,<br/><strong>– Team Multigyan</strong></p>

            <hr style="margin: 40px 0; border: none; border-top: 1px solid #ccc;" />

            <p style="font-size: 12px; color: #888;">
              You received this email because you subscribed to Multigyan.<br/>
              If this wasn't you or you’d prefer not to receive emails, you can <a href="#" style="color: #e74c3c; text-decoration: none;">unsubscribe</a>.
            </p>
          </div>
        `
      })

      // Get latest list of subscribers
      const allSubscribers = await Subscriber.find().sort({ subscribedAt: -1 })

      // Format list as HTML
      const listHtml = allSubscribers
        .map((s, i) => `<li>${i + 1}. ${s.name || 'Anonymous'} – ${s.email}</li>`)
        .join('')

      // Send email to both Vishal & Admin
      await transporter.sendMail({
        from: `"Multigyan Subscriptions" <${process.env.EMAIL_USER}>`,
        to: 'vishal@multigyan.in,admin@multigyan.in',
        subject: `📬 New Subscriber: ${name || email}`,
        html: `
          <p><strong>A new user subscribed:</strong></p>
          <p>Name: ${name || 'N/A'}<br>Email: ${email}</p>
          <hr/>
          <p><strong>📋 All Subscribers:</strong></p>
          <ul>${listHtml}</ul>
        `
      })

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
