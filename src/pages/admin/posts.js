import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        if (data.success) setPosts(data.data)
        setLoading(false)
      })
  }, [])

  const deletePost = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    if (res.ok) {
      alert('✅ Post deleted')
      setPosts(posts.filter(p => p._id !== id))
    } else {
      alert('❌ Failed to delete post')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Manage Posts</h1>

      {loading ? <p>Loading...</p> : posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post._id} className="border p-4 rounded bg-white dark:bg-zinc-800">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <p className="text-sm text-gray-500">{post.date} • {post.readTime}</p>
                </div>
                <div className="space-x-2">
                  <Link
                    href={`/admin/edit/${post._id}`}
                    className="px-2 py-1 text-sm border rounded hover:bg-blue-500 hover:text-white"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deletePost(post._id)}
                    className="px-2 py-1 text-sm border rounded hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
