import { useState } from 'react'

export default function Subscribe() {
  const [form, setForm] = useState({ name: '', email: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

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
    } else {
      const data = await res.json()
      alert(data.error || 'Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 pt-20">
      <h1 className="text-2xl font-bold mb-4">📬 Subscribe to Multigyan</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">Get the latest blog posts and updates directly in your inbox.</p>

      {status === 'success' ? (
        <p className="text-green-600">✅ Subscribed successfully!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className="w-full p-2 border rounded" />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" required className="w-full p-2 border rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  )
}
