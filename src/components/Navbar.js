'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Head from 'next/head'



export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = document.cookie.includes('admin=loggedin')
      setIsAdmin(isLoggedIn)
    }

    checkAuth()
    window.addEventListener('focus', checkAuth)

    return () => {
      window.removeEventListener('focus', checkAuth)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await fetch('/api/admin/logout')
    window.location.href = '/admin/login'
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300
      ${isScrolled ? 'bg-white/80 dark:bg-zinc-900/80 py-2 shadow-sm' : 'bg-white dark:bg-zinc-900 py-4'}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <Head>
          <title>Multigyan – Explore the World</title>
          <meta name="description" content="Multigyan is your one-stop multi-niche blogging platform. Explore tech, fashion, crypto, finance, and more." />
        </Head>
        {/* Logo and Brand Name */}
        <Link href="/" className="flex items-center transition-opacity duration-300 hover:opacity-80">
          <Image
            src="/Multigyan_Logo.png"
            alt="Multigyan Logo"
            width={isScrolled ? 120 : 160}
            height={isScrolled ? 30 : 40}
            className={`object-contain transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'}`}
          />
        </Link>


        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/blog" className="hover:text-blue-600 transition">Blog</Link>
          <Link href="/subscribe" className="hover:text-blue-600 transition">Subscribe</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>

          {!isAdmin && (
            <Link
              href="/blog/submit"
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Submit Blog
            </Link>
          )}

          {isAdmin ? (
            <>
              <Link href="/admin/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
              <Link href="/admin/posts" className="hover:text-blue-600 transition">Admin</Link>
              <button
                onClick={handleLogout}
                className="px-2 py-1 border border-red-500 text-red-600 rounded hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/admin/login" className="hover:text-blue-600 transition">Admin Login</Link>
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
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const enableDark = !dark
    setDark(enableDark)

    if (enableDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button onClick={toggleTheme} className="px-2 py-1 border rounded text-sm transition">
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
