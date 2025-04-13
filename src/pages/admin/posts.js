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

  const updateApproval = async (id, status) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved: status })
    })
    if (res.ok) {
      alert(status ? '✅ Approved!' : '❌ Rejected')
      setPosts(posts.map(p => (p._id === id ? { ...p, approved: status } : p)))
    } else {
      alert('⚠️ Failed to update approval')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Posts</h1>
        <Link href="/admin/create" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
          ➕ Add New Post
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {posts
              .filter(post => post.approved)
              .map(post => (
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

          {/* Pending Section */}
          <h2 className="text-lg font-semibold mt-8 mb-2">⏳ Pending Approval</h2>
          <ul className="space-y-4">
            {posts
              .filter(post => !post.approved)
              .map(post => (
                <li key={post._id} className="border p-4 rounded bg-white dark:bg-zinc-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-medium">{post.title}</h2>
                      <p className="text-xs text-gray-500">{post.date} • {post.readTime}</p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => updateApproval(post._id, true)}
                        className="px-2 py-1 text-sm border rounded bg-green-500 text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => deletePost(post._id)}
                        className="px-2 py-1 text-sm border rounded bg-red-500 text-white"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  )
}
