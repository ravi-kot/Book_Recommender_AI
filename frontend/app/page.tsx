'use client'

import { useState } from 'react'
import { Search, BookOpen, Heart, Star, Filter, Sparkles } from 'lucide-react'
import BookCard from './components/BookCard'
import SearchForm from './components/SearchForm'
import FavoritesPanel from './components/FavoritesPanel'

export interface Book {
  isbn13: string
  title: string
  authors: string
  description: string
  thumbnail: string
  average_rating: number
  num_pages: number
  simple_category: string
  joy?: number
  surprise?: number
  anger?: number
  fear?: number
  sadness?: number
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showFavorites, setShowFavorites] = useState(false)

  const toggleFavorite = (isbn: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(isbn)) {
      newFavorites.delete(isbn)
    } else {
      newFavorites.add(isbn)
    }
    setFavorites(newFavorites)
  }

  const handleSearch = async (query: string, category: string, tone: string) => {
    setLoading(true)
    try {
      // This would be replaced with your actual API endpoint
      // For now, we'll simulate the search
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, category, tone }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setBooks(data.books || [])
      } else {
        console.error('Search failed')
        setBooks([])
      }
    } catch (error) {
      console.error('Search error:', error)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">BookLens</h1>
            </div>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Heart className={`w-5 h-5 ${favorites.size > 0 ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
              <span>Favorites ({favorites.size})</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Discover Your Next
                <span className="gradient-text"> Favorite Book</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Tell us what you're in the mood for, and our AI will find the perfect book recommendations for you.
              </p>
            </div>

            {/* Search Form */}
            <SearchForm onSearch={handleSearch} loading={loading} />

            {/* Results */}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="text-gray-600">Finding your perfect books...</span>
                </div>
              </div>
            )}

            {!loading && books.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
                  Recommended Books
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {books.map((book) => (
                    <BookCard
                      key={book.isbn13}
                      book={book}
                      isFavorite={favorites.has(book.isbn13)}
                      onToggleFavorite={() => toggleFavorite(book.isbn13)}
                    />
                  ))}
                </div>
              </div>
            )}

            {!loading && books.length === 0 && !loading && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No books found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or be more specific about what you're looking for.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FavoritesPanel
              favorites={favorites}
              books={books.filter(book => favorites.has(book.isbn13))}
              onRemoveFavorite={(isbn) => toggleFavorite(isbn)}
              isVisible={showFavorites}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
