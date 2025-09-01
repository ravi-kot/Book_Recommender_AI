'use client'

import { Heart, Star, BookOpen, User } from 'lucide-react'
import { Book } from '../page'

interface BookCardProps {
  book: Book
  isFavorite: boolean
  onToggleFavorite: () => void
}

export default function BookCard({ book, isFavorite, onToggleFavorite }: BookCardProps) {
  const getEmotionScore = (tone: string) => {
    const emotionMap: { [key: string]: keyof Book } = {
      'Happy': 'joy',
      'Surprising': 'surprise',
      'Angry': 'anger',
      'Suspenseful': 'fear',
      'Sad': 'sadness'
    }
    
    const emotion = emotionMap[tone]
    return emotion && book[emotion] ? book[emotion] : 0
  }

  const getEmotionColor = (tone: string) => {
    const colors = {
      'Happy': 'text-green-600',
      'Surprising': 'text-purple-600',
      'Angry': 'text-red-600',
      'Suspenseful': 'text-orange-600',
      'Sad': 'text-blue-600'
    }
    return colors[tone as keyof typeof colors] || 'text-gray-600'
  }

  return (
    <div className="card overflow-hidden hover:shadow-lg transition-all duration-200 group">
      {/* Book Cover */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={book.thumbnail || '/cover_not_found.jpg'}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/cover_not_found.jpg'
          }}
        />
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite 
                ? 'text-red-500 fill-current' 
                : 'text-gray-400 hover:text-red-400'
            } transition-colors duration-200`}
          />
        </button>
      </div>

      {/* Book Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {book.title}
        </h3>

        {/* Author */}
        <div className="flex items-center text-gray-600 mb-3">
          <User className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{book.authors}</span>
        </div>

        {/* Rating and Pages */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">
              {book.average_rating?.toFixed(1) || 'N/A'}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm">{book.num_pages || 'N/A'} pages</span>
          </div>
        </div>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {book.simple_category || 'Uncategorized'}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {book.description || 'No description available.'}
        </p>

        {/* Emotion Scores */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2">
            {['Happy', 'Surprising', 'Angry', 'Suspenseful', 'Sad'].map((tone) => {
              const score = getEmotionScore(tone)
              if (score === 0) return null
              
              return (
                <div key={tone} className="flex items-center justify-between text-xs">
                  <span className={`font-medium ${getEmotionColor(tone)}`}>
                    {tone}
                  </span>
                  <div className="flex items-center space-x-1">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          score > 0.7 ? 'bg-green-500' :
                          score > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${score * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-500 w-8 text-right">
                      {(score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
