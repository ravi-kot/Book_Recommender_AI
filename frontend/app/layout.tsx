import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BookLens - AI Book Recommender',
  description: 'Discover your next favorite book with AI-powered recommendations based on your preferences and mood.',
  keywords: 'book recommendations, AI, machine learning, reading, books',
  authors: [{ name: 'BookLens Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {children}
      </body>
    </html>
  )
}
