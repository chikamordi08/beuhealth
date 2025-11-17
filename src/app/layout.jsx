'use client'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProtectedRoute from '@/components/ProtectedRoute'
import { usePathname } from 'next/navigation'

const metadata = {
  title: 'BeuHealth',
  description: 'Community health education — Pidgin & English',
}

export default function RootLayout({ children }) {
  const pathname = usePathname()

  // Define public routes
  const publicRoutes = ['/login', '/privacy', '/terms']

  const isPublic = publicRoutes.some(route => pathname.startsWith(route))

  return (
    <html lang="en">
      <body>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
          <main className="mt-6 bg-blue-50/50">
            {isPublic ? children : <ProtectedRoute>{children}</ProtectedRoute>}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
