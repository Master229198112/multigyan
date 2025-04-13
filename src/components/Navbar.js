'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false)

  const checkAuth = () => {
    const loggedIn = document.cookie.includes('admin=loggedin')
    setIsAdmin(loggedIn)
  }

  useEffect(() => {
    checkAuth()
    window.addEventListener('focus', checkAuth)
    return () => window.removeEventListener('focus', checkAuth)
  }, [])

  const logout = async () => {
    await fetch('/api/admin/logout')
    window.location.href = '/admin/login'
  }

  return (
    <nav className="bg-white dark:bg-zinc-900 shadow px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Multigyan
        </Link>

        <div className="space-x-4 flex items-center">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/subscribe">Subscribe</Link>

          {/* ✅ Only show Submit Blog button if NOT admin */}
          {!isAdmin && (
            <Link
              href="/blog/submit"
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
            >
              Submit Blog
            </Link>
          )}

          {isAdmin ? (
            <>
              <Link href="/admin/posts">Admin</Link>
              <button
                onClick={logout}
                className="px-2 py-1 text-sm border rounded hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/admin/login">Admin Login</Link>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const enable = !dark
    setDark(enable)

    if (enable) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button onClick={toggleTheme} className="px-2 py-1 border rounded text-sm">
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
