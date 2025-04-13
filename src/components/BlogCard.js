import Link from 'next/link'
import Image from 'next/image'

export default function BlogCard({ post }) {
  const { title, slug, excerpt, image, category, date, readTime } = post

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <div className="overflow-hidden rounded-lg shadow-sm bg-white dark:bg-zinc-900 hover:shadow-xl transition duration-300 ease-in-out">
        <div className="relative h-52 sm:h-60 lg:h-56 overflow-hidden">
          <Image
            src={image || 'https://picsum.photos/800/400'}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <span className="text-xs uppercase text-blue-500 tracking-wide">{category}</span>
          <h2 className="text-lg sm:text-xl font-semibold mt-1 group-hover:text-blue-600 transition-colors">
            {title}
          </h2>
          {excerpt && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-3">
              {excerpt}
            </p>
          )}
          <div className="text-xs text-gray-500 mt-3">
            {date} • {readTime}
          </div>
        </div>
      </div>
    </Link>
  )
}
