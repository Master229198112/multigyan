import { useState } from 'react'
import PageWrapper from '@/components/PageWrapper'

export default function Subscribe() {
  const [form, setForm] = useState({ name: '', email: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      setStatus('success')
      setForm({ name: '', email: '' })

      // Optional: Auto-hide success message
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      const data = await res.json()
      alert(data.error || 'Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <PageWrapper title="Subscribe">
      <h1 className="text-2xl font-bold mb-4 text-white dark:text-white">
        📬 Subscribe to Multigyan
      </h1>
      <p className="mb-4 text-gray-300 dark:text-gray-300">
        Get the latest blog posts and updates directly in your inbox.
      </p>

      {status === 'success' ? (
        <p className="text-green-500 animate-success text-lg font-medium">
          ✅ Subscribed successfully!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-2 border rounded bg-transparent text-white placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-2 border rounded bg-transparent text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
    </PageWrapper>
  )
}
