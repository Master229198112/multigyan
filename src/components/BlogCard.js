import Link from 'next/link'
import Image from 'next/image'

export default function BlogCard({ post }) {
  const { title, slug, excerpt, image, category, date, readTime } = post

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <Link href={`/blog/${slug}`}>
        <div>
          <Image
            src={image || 'https://picsum.photos/800/400'}
            alt={title}
            width={800}
            height={400}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <span className="text-sm text-blue-500 uppercase">{category}</span>
            <h2 className="text-xl font-semibold mt-2 mb-2">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{excerpt}</p>
            <div className="text-xs text-gray-500 mt-3">
              {date} • {readTime}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
