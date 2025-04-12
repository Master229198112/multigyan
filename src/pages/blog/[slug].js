import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import Comments from '../../components/Comments' // Make sure this path is correct based on your project structure

export default function PostPage() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetch(`/api/posts/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setPost(data.data)
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
      <div className="text-sm text-gray-500 mb-4">{post.date} • {post.readTime}</div>

      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {/* Comments Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        {/* Display comments */}
        {post && post.slug && <Comments slug={post.slug} />}
      </div>
    </div>
  )
}
