import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import MarkdownPreview from '@/components/MarkdownPreview'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import 'easymde/dist/easymde.min.css'

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

  const [uploading, setUploading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

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
    const { name, value } = e.target
    const updated = { ...formData, [name]: value }

    if (name === 'title') {
      updated.slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '-')
    }

    setFormData(updated)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)

    const form = new FormData()
    form.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form
    })

    const data = await res.json()
    if (data.success) {
      setFormData(prev => ({ ...prev, image: data.thumbnail || data.url }))
    } else {
      alert('Image upload failed.')
    }

    setUploading(false)
  }

  const handleFinalSubmit = async () => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowPreview(true)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 pt-20">
      <Head>
        <title>Multigyan – Explore the World</title>
        <meta name="description" content="Multigyan is your one-stop multi-niche blogging platform. Explore tech, fashion, crypto, finance, and more." />
      </Head>
      <h1 className="text-xl font-bold mb-4">✏️ Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Title" />
        <input type="text" name="slug" value={formData.slug} disabled className="w-full border p-2 rounded bg-gray-100 text-gray-500" />
        <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Category" />
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Tags (comma separated)" />

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload New Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-2 rounded" />
          {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
          {formData.image && (
            <Image src={formData.image} alt="Cover Image" width={500} height={300} className="rounded mt-3" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Post Content (Markdown)</label>
          <SimpleMDE
            value={formData.content}
            onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
            options={{
              spellChecker: false,
              placeholder: 'Update your blog post in markdown...',
            }}
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Preview Changes</button>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-semibold mb-4">🔍 Preview Your Post</h2>

            {formData.image && (
              <Image src={formData.image} alt="cover" width={500} height={300} className="mb-4 rounded w-full h-64 object-cover" />
            )}

            <p className="text-xs text-blue-500 uppercase">{formData.category}</p>
            <h1 className="text-2xl font-bold mb-1">{formData.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
              {new Date().toLocaleDateString()} • {getReadTime(formData.content)}
            </p>

            <MarkdownPreview content={formData.content} />

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowPreview(false)} className="px-4 py-2 text-sm rounded border">
                Back to Edit
              </button>
              <button onClick={handleFinalSubmit} className="bg-green-600 text-white px-4 py-2 rounded text-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getReadTime(content) {
  const words = content?.trim().split(/\s+/).length || 0
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}
