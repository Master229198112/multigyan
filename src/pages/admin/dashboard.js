import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend
} from 'chart.js'
import Head from 'next/head'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [subscriberCount, setSubscriberCount] = useState(0)

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        if (data.success) setPosts(data.data)
      })

    fetch('/api/subscribers/count')
      .then(res => res.json())
      .then(data => setSubscriberCount(data.count))
  }, [])

  const chartData = {
    labels: posts.map(post => post.title),
    datasets: [{
      label: 'Views',
      data: posts.map(post => post.views || 0),
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
    }]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <Head>
        <title>Multigyan – Explore the World</title>
        <meta name="description" content="Multigyan is your one-stop multi-niche blogging platform. Explore tech, fashion, crypto, finance, and more." />
      </Head>
      <h1 className="text-2xl font-bold mb-6">📊 Post View Analytics</h1>

      {/* Download Button */}
      <div className="mb-4">
        <Link
          href="/api/subscribers/download"
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Download Subscribers CSV
        </Link>
      </div>

      {/* Subscriber Count Tile */}
      <div className="mb-6">
        <div className="bg-white dark:bg-zinc-800 shadow rounded p-4 text-center">
          <h3 className="text-lg font-semibold">Subscribers</h3>
          <p className="text-3xl font-bold text-blue-600">{subscriberCount}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}
