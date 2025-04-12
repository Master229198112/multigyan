import { useEffect, useState } from 'react'

export default function Comments({ slug }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    if (slug) {
      fetch(`/api/comments?slug=${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setComments(data.data)
          setLoading(false)
        })
    }
  }, [slug])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, postSlug: slug })
    })

    const data = await res.json()

    if (res.ok) {
      alert('✅ Comment submitted!')
      setComments([data.data, ...comments])
      setFormData({ name: '', email: '', message: '' })
    } else {
      alert('❌ Failed: ' + data.error)
    }
  }

  return (
    <>
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet. Be the first!</p>
      ) : (
        <div className="space-y-4 mb-6">
          {comments.map((comment) => (
            <div key={comment._id} className="border p-3 rounded bg-gray-100 dark:bg-zinc-800">
              <p className="text-sm font-semibold">{comment.name}</p>
              <p className="text-sm">{comment.message}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email (optional)"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Leave a comment..."
          className="w-full border p-2 rounded h-24"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Comment
        </button>
      </form>
    </>
  )
}
