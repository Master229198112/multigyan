import { useEffect, useState } from 'react'
import BlogCard from '@/components/BlogCard'

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
      const res = await fetch('/api/posts?approved=true') // ✅ Updated URL
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-3 py-1 text-sm rounded border ${categoryFilter === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-zinc-700'}`}
            onClick={() => setCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map(tag => (
          <button
            key={tag}
            className={`px-3 py-1 text-sm rounded border ${tagFilter === tag ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-zinc-700'}`}
            onClick={() => setTagFilter(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500">No posts match the selected filters.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map(post => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}
