import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        if (data.success) setPosts(data.data)
      })
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Post View Analytics</h1>
      <div className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}
