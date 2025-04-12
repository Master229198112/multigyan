'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    }
  }, [])

  const toggleTheme = () => {
    const isDark = !darkMode
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <nav className="bg-white dark:bg-zinc-900 shadow px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">Multigyan</Link>
        <div className="space-x-4 flex items-center">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/admin">Admin</Link>
          <button
            onClick={toggleTheme}
            className="ml-2 px-2 py-1 border border-gray-400 rounded text-sm"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </nav>
  )
}
