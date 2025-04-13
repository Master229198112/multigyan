import { useState } from 'react'

export default function SubmitPost() {
  const [formData, setFormData] = useState({
    title: '', slug: '', content: '', category: '', tags: '', image: '', email: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        readTime: getReadTime(formData.content),
        approved: false // public posts need admin approval
      })
    })
    setSubmitted(true)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold mb-4">Submit Your Blog Post</h1>
      {submitted ? (
        <p className="text-green-600">✅ Submitted for review. Awaiting admin approval.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" onChange={handleChange} className="w-full p-2 border rounded" placeholder="Title" required />
          <input name="slug" onChange={handleChange} className="w-full p-2 border rounded" placeholder="Slug" required />
          <input name="category" onChange={handleChange} className="w-full p-2 border rounded" placeholder="Category" />
          <input name="tags" onChange={handleChange} className="w-full p-2 border rounded" placeholder="Tags (comma separated)" />
          <input name="image" onChange={handleChange} className="w-full p-2 border rounded" placeholder="Image URL" />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Your Email (optional)"
            className="w-full p-2 border rounded"
          />
          <textarea name="content" onChange={handleChange} className="w-full h-40 p-2 border rounded" placeholder="Markdown Content" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit for Review</button>
        </form>
      )}
    </div>
  )
}

function getReadTime(content) {
  const words = content?.trim().split(/\s+/).length || 0
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}
