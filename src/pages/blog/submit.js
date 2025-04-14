import { useState } from 'react'
import Image from 'next/image'

export default function SubmitPost() {
  const [formData, setFormData] = useState({
    title: '', slug: '', content: '', category: '', tags: '', image: '', email: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleImageUpload = async e => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)

    const form = new FormData()
    form.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: form })
    const data = await res.json()

    if (data.success) {
      setFormData(prev => ({ ...prev, image: data.thumbnail }))
    } else {
      alert('❌ Image upload failed.')
    }
    setUploading(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        }),
        readTime: getReadTime(formData.content),
        approved: false
      })
    })

    if (res.ok) setSubmitted(true)
    else alert('❌ Submission failed.')
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

          <div>
            <label className="block text-sm font-medium mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full p-2 border rounded bg-white text-black"
            />
            {uploading && <p className="text-sm text-gray-500 mt-1">Uploading image...</p>}
            {formData.image && (
              <Image
                src={formData.image}
                alt="Preview"
                width={500}
                height={300}
                className="rounded shadow mt-3"
              />
            )}
          </div>

          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Your Email (optional)"
            className="w-full p-2 border rounded"
          />

          <textarea name="content" onChange={handleChange} className="w-full h-40 p-2 border rounded" placeholder="Markdown Content" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit for Review
          </button>
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
