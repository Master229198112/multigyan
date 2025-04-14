import { useEffect, useState } from 'react'
import BlogCard from '@/components/BlogCard'
import Head from 'next/head'
import Image from 'next/image'

const categories = ['All', 'Technology', 'Health', 'Business']
const tags = ['All', 'AI', 'Innovation', 'Wellness', 'Fitness', 'Startup', 'Finance']

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [tagFilter, setTagFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  const POSTS_PER_PAGE = 6

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts?approved=true')
      const data = await res.json()
      if (data.success) {
        setPosts(data.data)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(post => {
    const categoryMatch = categoryFilter === 'All' || post.category === categoryFilter
    const tagMatch = tagFilter === 'All' || post.tags.includes(tagFilter)
    return categoryMatch && tagMatch
  })

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  const heroPost = filteredPosts[0]
  const restPosts = filteredPosts.slice(1)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-20">
      <Head>
        <title>Multigyan – Explore the World</title>
        <meta name="description" content="Multigyan is your one-stop multi-niche blogging platform. Explore tech, fashion, crypto, finance, and more." />
      </Head>
      {/* Hero Post */}
      {heroPost && (
        <div className="mb-12">
          <a href={`/blog/${heroPost.slug}`}>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={heroPost.image || 'https://picsum.photos/1200/600'}
                alt={heroPost.title}
                className="w-full h-full object-cover brightness-75"
                width={500}
                height={300}
              />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-sm uppercase text-blue-300">{heroPost.category}</span>
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mt-2">{heroPost.title}</h2>
                <p className="text-sm mt-2">{heroPost.date} • {heroPost.readTime}</p>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-4 py-1.5 rounded-full text-sm border ${categoryFilter === cat ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-zinc-800'}`}
            onClick={() => setCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {tags.map(tag => (
          <button
            key={tag}
            className={`px-4 py-1.5 rounded-full text-sm border ${tagFilter === tag ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-zinc-800'}`}
            onClick={() => setTagFilter(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : restPosts.length === 0 ? (
        <p className="text-center text-gray-500">No posts match the selected filters.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.slice(1).map(post => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}
