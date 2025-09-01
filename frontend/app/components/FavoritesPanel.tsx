'use client'

import { Heart, X, BookOpen, User } from 'lucide-react'
import { Book } from '../page'

interface FavoritesPanelProps {
  favorites: Set<string>
  books: Book[]
  onRemoveFavorite: (isbn: string) => void
  isVisible: boolean
}

export default function FavoritesPanel({ 
  favorites, 
  books, 
  onRemoveFavorite, 
  isVisible 
}: FavoritesPanelProps) {
  if (!isVisible) return null

  return (
    <div className="card p-6 sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Heart className="w-5 h-5 text-red-500 mr-2" />
          Favorites ({favorites.size})
        </h3>
      </div>

      {favorites.size === 0 ? (
        <div className="text-center py-8">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            No favorites yet. Click the heart icon on any book to save it here.
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {books.map((book) => (
            <div key={book.isbn13} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
              {/* Book Cover Thumbnail */}
              <div className="flex-shrink-0">
                <img
                  src={book.thumbnail || '/cover_not_found.jpg'}
                  alt={`Cover of ${book.title}`}
                  className="w-16 h-20 object-cover rounded-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/cover_not_found.jpg'
                  }}
                />
              </div>

              {/* Book Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                  {book.title}
                </h4>
                <div className="flex items-center text-gray-600 text-xs mb-1">
                  <User className="w-3 h-3 mr-1" />
                  <span className="line-clamp-1">{book.authors}</span>
                </div>
                <div className="flex items-center text-gray-500 text-xs">
                  <BookOpen className="w-3 h-3 mr-1" />
                  <span>{book.num_pages || 'N/A'} pages</span>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => onRemoveFavorite(book.isbn13)}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                title="Remove from favorites"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      {favorites.size > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="space-y-2">
            <button className="w-full btn-secondary text-sm py-2">
              Export Favorites
            </button>
            <button className="w-full btn-secondary text-sm py-2">
              Share List
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
