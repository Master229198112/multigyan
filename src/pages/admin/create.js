import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import MarkdownPreview from '@/components/MarkdownPreview'

// Dynamically load the markdown editor to avoid SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

import 'easymde/dist/easymde.min.css' // Editor styles

export default function AdminCreatePost() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: '',
    tags: '',
    image: ''
  })

  const [uploading, setUploading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    const updated = { ...formData, [name]: value }

    if (name === 'title') {
      updated.slug = value.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-')
    }

    setFormData(updated)
  }

  const handleImageUpload = async e => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)

    const form = new FormData()
    form.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: form })
    const data = await res.json()

    if (data.success) {
      setFormData(prev => ({ ...prev, image: data.thumbnail || data.url }))
    } else {
      alert('Image upload failed.')
    }

    setUploading(false)
  }

  const handleFinalSubmit = async () => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        }),
        readTime: getReadTime(formData.content),
        approved: true
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

  const handleSubmit = e => {
    e.preventDefault()
    setShowPreview(true)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <h1 className="text-xl font-bold mb-4">📝 Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" onChange={handleChange} value={formData.title} placeholder="Title" className="w-full p-2 border rounded" required />
        <input name="slug" value={formData.slug} disabled className="w-full p-2 border rounded bg-gray-100 text-gray-600" />
        <input name="category" onChange={handleChange} value={formData.category} placeholder="Category" className="w-full p-2 border rounded" />
        <input name="tags" onChange={handleChange} value={formData.tags} placeholder="Tags (comma separated)" className="w-full p-2 border rounded" />

        <div>
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full p-2 border rounded bg-white text-black" />
          {uploading && <p className="text-sm text-gray-500 mt-1">Uploading image...</p>}
          {formData.image && (
            <Image src={formData.image} alt="Preview" width={500} height={300} className="rounded shadow mt-3" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Post Content (Markdown)</label>
          <SimpleMDE
            value={formData.content}
            onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
            options={{
              placeholder: 'Write your post in markdown...',
              spellChecker: false
            }}
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Preview Post</button>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-semibold mb-4">📖 Preview Your Post</h2>

            {formData.image && (
              <Image src={formData.image} alt="cover" width={500} height={300} className="mb-4 rounded w-full h-64 object-cover" />
            )}

            <p className="text-xs text-blue-500 uppercase">{formData.category}</p>
            <h1 className="text-2xl font-bold mb-1">{formData.title}</h1>
            <p className="text-sm text-gray-500 mb-4">{new Date().toLocaleDateString()} • {getReadTime(formData.content)}</p>

            <MarkdownPreview content={formData.content} />

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowPreview(false)} className="px-4 py-2 text-sm rounded border">Back to Edit</button>
              <button onClick={handleFinalSubmit} className="bg-green-600 text-white px-4 py-2 rounded text-sm">Confirm & Publish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getReadTime(content) {
  const words = content.trim().split(/\s+/).length || 0
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}
