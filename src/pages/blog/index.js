import { useEffect, useState } from 'react'
import BlogCard from '@/components/BlogCard'
import Head from 'next/head'

export default function BlogPage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/posts?approved=true') // ✅ Only fetch approved posts
      .then(res => res.json())
      .then(data => {
        if (data.success) setPosts(data.data)
      })
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 pt-20">
      <Head>
        <title>Multigyan – Explore the World</title>
        <meta name="description" content="Multigyan is your one-stop multi-niche blogging platform. Explore tech, fashion, crypto, finance, and more." />
      </Head>
      <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
