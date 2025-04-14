import { useState } from 'react'
import PageWrapper from '@/components/PageWrapper'
import Head from 'next/head'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    } else {
      alert('Something went wrong. Try again later.')
    }
  }

  return (
    <PageWrapper title="Contact">
      <Head>
        <title>Multigyan – Explore the World</title>
        <meta name="description" content="Multigyan is your one-stop multi-niche blogging platform. Explore tech, fashion, crypto, finance, and more." />
      </Head>
      <h1 className="text-2xl font-bold mb-4">📩 Contact Us</h1>

      {submitted ? (
        <p className="text-green-500">✅ Message sent! We’ll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            onChange={handleChange}
            value={form.name}
            className="w-full p-2 border rounded bg-transparent text-white placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            onChange={handleChange}
            value={form.email}
            className="w-full p-2 border rounded bg-transparent text-white placeholder-gray-400"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            onChange={handleChange}
            value={form.message}
            className="w-full p-2 border rounded h-32 bg-transparent text-white placeholder-gray-400"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Send
          </button>
        </form>
      )}
    </PageWrapper>
  )
}
