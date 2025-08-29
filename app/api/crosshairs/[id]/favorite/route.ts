import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// Mock favorites state - in production this would be stored in database
const mockFavorites = new Map<string, Set<string>>()

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json().catch(() => ({}))
    const { userId, action = 'like' } = body

    // Mock response - database implementation pending
    const mockLikes = Math.floor(Math.random() * 500) + 50

    if (action === 'like') {
      // Track favorites in memory for this session
      if (userId) {
        if (!mockFavorites.has(userId)) {
          mockFavorites.set(userId, new Set())
        }
        mockFavorites.get(userId)?.add(id)
      }

      return NextResponse.json({ 
        success: true, 
        likes: mockLikes + 1,
        favorited: true 
      })
    } else {
      // Unlike
      if (userId) {
        mockFavorites.get(userId)?.delete(id)
      }

      return NextResponse.json({ 
        success: true, 
        likes: Math.max(0, mockLikes - 1),
        favorited: false 
      })
    }
  } catch (error) {
    console.error('Error updating favorite:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update favorite' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    // Mock response - database implementation pending
    const mockLikes = Math.floor(Math.random() * 500) + 50
    const mockCopies = Math.floor(Math.random() * 1000) + 100

    let favorited = false
    if (userId) {
      favorited = mockFavorites.get(userId)?.has(id) || false
    }

    return NextResponse.json({ 
      success: true,
      likes: mockLikes,
      copies: mockCopies,
      favorited
    })
  } catch (error) {
    console.error('Error getting favorite status:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get favorite status' },
      { status: 500 }
    )
  }
}