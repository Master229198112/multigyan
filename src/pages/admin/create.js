import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminCreatePost() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: '',
    tags: '',
    image: '',
  })

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        readTime: getReadTime(formData.content),
        approved: true // admin-created posts are immediately published
      })
    })

    const data = await res.json()
    if (res.ok) {
      alert('✅ Post created successfully!')
      router.push('/admin/posts')
    } else {
      alert('❌ Failed: ' + data.error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">📝 Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
        <input name="slug" onChange={handleChange} placeholder="Slug" className="w-full p-2 border rounded" required />
        <input name="category" onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" />
        <input name="tags" onChange={handleChange} placeholder="Tags (comma separated)" className="w-full p-2 border rounded" />
        <input name="image" onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
        <textarea name="content" onChange={handleChange} placeholder="Markdown Content" className="w-full h-40 p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Post</button>
      </form>
    </div>
  )
}

function getReadTime(content) {
  const words = content.trim().split(/\s+/).length || 0
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}
