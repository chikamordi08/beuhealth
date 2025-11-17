'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('beuhealthUser')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  const toggleMobile = () => setMobileOpen(!mobileOpen)

  const handleLogout = () => {
    localStorage.removeItem('beuhealthUser')
    setUser(null)
    router.push('/login')
  }

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Heart className="w-6 h-6 text-blue-600" strokeWidth={2.5} />
            <span className="font-semibold text-lg text-gray-900">BeuHealth</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* When logged in show Dashboard */}
            {user && (
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Dashboard
              </Link>
            )}

            {/* Login / Logout buttons */}
            {!user ? (
              <Link
                href="/login"
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMobile}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-semibold text-lg text-gray-900">Menu</span>
          <button onClick={toggleMobile} className="p-1 rounded-md hover:bg-gray-100">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col mt-4 space-y-2 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {user && (
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Dashboard
            </Link>
          )}

          {!user ? (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout()
                setMobileOpen(false)
              }}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={toggleMobile}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}
    </nav>
  )
}
