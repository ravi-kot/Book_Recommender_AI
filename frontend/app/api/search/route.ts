import { NextRequest, NextResponse } from 'next/server'

/**
 * Book Search API Route
 * Calls the Python serverless function for book recommendations
 * Similar to Streamlit app: downloads from Google Drive and uses FAISS search
 */

export async function POST(request: NextRequest) {
  try {
    const { query, category, tone } = await request.json()

    // Validate input
    if (!query || typeof query !== 'string' || !query.trim()) {
      return NextResponse.json(
        { error: 'Query is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    // Call Python serverless function
    // In Vercel, Python serverless functions are accessible at /api/recommend
    // The Python function is at frontend/api/recommend/index.py
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || '/api/recommend'
    
    let response
    try {
      // Build the full URL for the Python serverless function
      let fullUrl: string
      
      if (backendUrl.startsWith('/')) {
        // Relative URL - construct full URL for Vercel
        const protocol = request.headers.get('x-forwarded-proto') || 'http'
        const host = request.headers.get('host') || request.headers.get('x-vercel-deployment-url') || 'localhost:3000'
        fullUrl = `${protocol}://${host}${backendUrl}`
      } else {
        // External URL - use as is
        fullUrl = backendUrl
      }
      
      console.log(`Calling backend at: ${fullUrl}`)
      
      response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: query.trim(), 
          category: category || 'All', 
          tone: tone || 'All' 
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Backend error (${response.status}):`, errorText)
        throw new Error(`Backend responded with ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      
      // Validate response structure
      if (!data.books || !Array.isArray(data.books)) {
        throw new Error('Invalid response format from backend')
      }

      return NextResponse.json({
        books: data.books,
        query: data.query || query,
        category: data.category || category || 'All',
        tone: data.tone || tone || 'All',
        total: data.total || data.books.length
      })

    } catch (fetchError) {
      console.error('Error calling backend:', fetchError)
      
      // Fallback: Return error with helpful message
      return NextResponse.json(
        { 
          error: 'Failed to get recommendations. Please ensure the Python backend is running and configured correctly.',
          details: process.env.NODE_ENV === 'development' ? fetchError.message : undefined
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// Example of how to connect to your actual backend:
/*
export async function POST(request: NextRequest) {
  try {
    const { query, category, tone } = await request.json()

    // Call your Python backend
    const response = await fetch('http://localhost:8000/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, category, tone }),
    })

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Failed to get recommendations' },
      { status: 500 }
    )
  }
}
*/
