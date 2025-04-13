import { useState } from 'react'

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
    <div className="max-w-2xl mx-auto p-6 py-6 pt-20">
      <h1 className="text-2xl font-bold mb-4">📩 Contact Us</h1>

      {submitted ? (
        <p className="text-green-600">✅ Message sent! We’ll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} value={form.name} className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Your Email" required onChange={handleChange} value={form.email} className="w-full p-2 border rounded" />
          <textarea name="message" placeholder="Your Message" required onChange={handleChange} value={form.message} className="w-full p-2 border rounded h-32" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        </form>
      )}
    </div>
  )
}
