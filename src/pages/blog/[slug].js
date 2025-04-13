import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import Comments from '../../components/Comments'

export default function PostPage() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  // Safe window access
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  useEffect(() => {
    if (slug) {
      fetch(`/api/posts/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setPost(data.data)

            // 🔄 Increment views
            fetch(`/api/views/${slug}`, { method: 'POST' })
          }
          setLoading(false)
        })
    }
  }, [slug])

  if (loading) return <div className="p-6 text-center">Loading...</div>
  if (!post) return <div className="p-6 text-center">Post not found.</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        className="rounded mb-4"
      />
      <p className="text-sm text-blue-500 uppercase">{post.category}</p>
      <h1 className="text-3xl font-bold mt-2 mb-2">{post.title}</h1>
      
      {/* ✅ Updated with view count */}
      <p className="text-sm text-gray-500 mb-4">
        {post.date} • {post.readTime} • 👁️ {post.views || 0} views
      </p>

      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {/* Social Sharing */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">Share this post</h3>
        <div className="flex gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`}
            target="_blank" rel="noopener noreferrer"
            className="px-3 py-1 rounded bg-blue-500 text-white text-sm"
          >
            Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
            target="_blank" rel="noopener noreferrer"
            className="px-3 py-1 rounded bg-blue-700 text-white text-sm"
          >
            LinkedIn
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)} - ${encodeURIComponent(currentUrl)}`}
            target="_blank" rel="noopener noreferrer"
            className="px-3 py-1 rounded bg-green-600 text-white text-sm"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        {post && post.slug && <Comments slug={post.slug} />}
      </div>
    </div>
  )
}
