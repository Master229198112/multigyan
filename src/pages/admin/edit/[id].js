import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function EditPost() {
  const router = useRouter()
  const { id } = router.query

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: '',
    tags: '',
    image: ''
  })

  useEffect(() => {
    if (id) {
      fetch(`/api/posts`)
        .then(res => res.json())
        .then(data => {
          const post = data.data.find(p => p._id === id)
          if (post) {
            setFormData({
              ...post,
              tags: post.tags.join(', ')
            })
          }
        })
    }
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim())
      })
    })

    const data = await res.json()
    if (res.ok) {
      alert('✅ Post updated!')
      router.push('/admin/posts')
    } else {
      alert('❌ Failed: ' + data.error)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Title" />
        <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Slug" />
        <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Category" />
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Tags (comma separated)" />
        <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Image URL" />
        <textarea name="content" value={formData.content} onChange={handleChange} className="w-full border p-2 rounded h-40" placeholder="Markdown content" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Post</button>
      </form>
    </div>
  )
}
