import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import Comments from '@/components/Comments'

export default function PostPage() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  // Safe window access
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  // Scroll progress bar
  useEffect(() => {
    const progress = document.getElementById('scroll-progress')
    const updateScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      if (progress) progress.style.width = `${scrollPercent}%`
    }

    window.addEventListener('scroll', updateScroll)
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  useEffect(() => {
    if (slug) {
      fetch(`/api/posts/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setPost(data.data)
            fetch(`/api/views/${slug}`, { method: 'POST' }) // increment view count
          }
          setLoading(false)
        })
    }
  }, [slug])

  if (loading) return <div className="p-6 text-center">Loading...</div>
  if (!post) return <div className="p-6 text-center">Post not found.</div>

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-blue-600 z-50" id="scroll-progress" />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Cover Image */}
        <div className="relative h-72 sm:h-96 mb-6 rounded-lg overflow-hidden shadow">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover w-full h-full"
          />
        </div>

        {/* Post Metadata */}
        <div className="mb-4">
          <p className="text-xs text-blue-500 uppercase">{post.category}</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{post.title}</h1>
          <p className="text-sm text-gray-500">
            {post.date} • {post.readTime} • 👁️ {post.views || 0} views
          </p>
        </div>

        {/* Markdown Content */}
        <div className="prose dark:prose-invert max-w-none prose-lg">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Share Buttons */}
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

        {/* Comments */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          {post && post.slug && <Comments slug={post.slug} />}
        </div>
      </div>
    </>
  )
}
