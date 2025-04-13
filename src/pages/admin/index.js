import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

function getReadTime(content) {
  const words = content?.trim().split(/\s+/).length || 0
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: '',
    tags: '',
    image: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        readTime: getReadTime(formData.content)
      })
    })

    const data = await response.json()

    if (response.ok) {
      alert('✅ Post saved successfully!')
      setFormData({
        title: '',
        slug: '',
        content: '',
        category: '',
        tags: '',
        image: ''
      })
    } else {
      alert('❌ Failed to save post: ' + data.error)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pt-20">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Create New Post</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-semibold">Title</label>
          <input type="text" name="title" onChange={handleChange} value={formData.title}
            className="w-full border p-2 rounded" required />

          <label className="block mt-4 mb-2 text-sm font-semibold">Slug (URL part)</label>
          <input type="text" name="slug" onChange={handleChange} value={formData.slug}
            className="w-full border p-2 rounded" required />

          <label className="block mt-4 mb-2 text-sm font-semibold">Category</label>
          <input type="text" name="category" onChange={handleChange} value={formData.category}
            className="w-full border p-2 rounded" placeholder="e.g., Technology" />

          <label className="block mt-4 mb-2 text-sm font-semibold">Tags (comma-separated)</label>
          <input type="text" name="tags" onChange={handleChange} value={formData.tags}
            className="w-full border p-2 rounded" placeholder="e.g., AI, Innovation" />

          <label className="block mt-4 mb-2 text-sm font-semibold">Image URL</label>
          <input type="text" name="image" onChange={handleChange} value={formData.image}
            className="w-full border p-2 rounded" placeholder="https://..." />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold">Content (Markdown)</label>
          <textarea name="content" onChange={handleChange} value={formData.content}
            className="w-full h-72 border p-2 rounded font-mono text-sm" required />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Post
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Live Preview</h2>
        <div className="prose dark:prose-invert max-w-none border rounded p-4">
          <ReactMarkdown>{formData.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
