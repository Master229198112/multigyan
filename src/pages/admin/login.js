import { useState } from 'react'
import { useRouter } from 'next/router'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function AdminLogin() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    const data = await res.json()
    if (res.ok) {
      router.push('/admin/posts')
    } else {
      alert(data.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="w-full max-w-md p-6 border rounded shadow bg-black/50 dark:bg-white/5 backdrop-blur-md">
        <h1 className="text-xl font-bold mb-4 text-white dark:text-white">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className="w-full border p-2 rounded bg-transparent text-white dark:text-white placeholder-gray-400"
            placeholder="Email"
            required
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              className="w-full border p-2 pr-10 rounded bg-transparent text-white dark:text-white placeholder-gray-400"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-300 hover:text-white transition duration-200 ease-in-out"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5 transition-transform duration-200 transform hover:scale-110" />
              ) : (
                <EyeIcon className="w-5 h-5 transition-transform duration-200 transform hover:scale-110" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
