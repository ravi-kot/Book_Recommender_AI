'use client'

import { useState } from 'react'
import { Search, Filter } from 'lucide-react'

interface SearchFormProps {
  onSearch: (query: string, category: string, tone: string) => void
  loading: boolean
}

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [tone, setTone] = useState('All')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim(), category, tone)
    }
  }

  const categories = [
    'All',
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Mystery',
    'Romance',
    'Fantasy',
    'Biography',
    'History',
    'Self-Help',
    'Business',
    'Technology'
  ]

  const tones = [
    'All',
    'Happy',
    'Surprising',
    'Angry',
    'Suspenseful',
    'Sad'
  ]

  return (
    <div className="card p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Search Input */}
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
            Describe the book you're craving
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., A thrilling mystery with unexpected plot twists, or a heartwarming story about friendship..."
              className="input-field pl-10 text-lg"
              disabled={loading}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="inline w-4 h-4 mr-1" />
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
              disabled={loading}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="inline w-4 h-4 mr-1" />
              Emotional Tone
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="input-field"
              disabled={loading}
            >
              {tones.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Finding books...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Get Recommendations</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
