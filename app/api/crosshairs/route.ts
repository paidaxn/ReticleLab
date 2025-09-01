import { NextRequest, NextResponse } from 'next/server'
import { mockCrosshairs } from '@/lib/crosshair/mockCrosshairs'

// Removed Edge Runtime for Vercel compatibility
// export const runtime = 'edge'

// Use mock data for Edge Runtime compatibility
async function getCrosshairs() {
  console.log('[API] getCrosshairs called')
  console.log('[API] mockCrosshairs length:', mockCrosshairs.length)
  
  // In production, this would fetch from a database or external API
  // For now, return mock data with transformed dates
  const transformed = mockCrosshairs.map(crosshair => ({
    ...crosshair,
    createdAt: crosshair.createdAt?.toISOString(),
    updatedAt: crosshair.updatedAt?.toISOString()
  }))
  
  console.log('[API] Transformed crosshairs length:', transformed.length)
  console.log('[API] Sample transformed data:', transformed[0])
  
  return transformed
}

export async function GET(request: NextRequest) {
  console.log('[API Route] GET /api/crosshairs called')
  console.log('[API Route] URL:', request.url)
  console.log('[API Route] Headers host:', request.headers.get('host'))
  
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')?.toLowerCase()
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sortBy = searchParams.get('sortBy') || 'popular'

    // Get all crosshairs from JSON
    let crosshairs = await getCrosshairs()
    console.log('[API Route] Initial crosshairs count:', crosshairs.length)

    // Apply filters
    if (category) {
      if (category === 'professional') {
        crosshairs = crosshairs.filter(c => c.isVerified === true)
      } else if (category === 'community') {
        crosshairs = crosshairs.filter(c => c.isVerified === false)
      } else if (category === 'trending') {
        // Get top trending based on recent copies
        crosshairs = crosshairs.filter(c => c.copies > 100000)
      }
    }

    // Apply search
    if (search) {
      crosshairs = crosshairs.filter(c => 
        c.name?.toLowerCase().includes(search) ||
        c.playerName?.toLowerCase().includes(search) ||
        c.teamName?.toLowerCase().includes(search) ||
        c.code?.toLowerCase().includes(search)
      )
    }

    // Sort crosshairs
    switch (sortBy) {
      case 'popular':
      case 'copies':
        crosshairs.sort((a, b) => b.copies - a.copies)
        break
      case 'likes':
        crosshairs.sort((a, b) => b.likes - a.likes)
        break
      case 'newest':
      case 'recent':
        crosshairs.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA
        })
        break
      case 'verified':
        // Sort by verified status first, then by copies
        crosshairs.sort((a, b) => {
          if (a.isVerified === b.isVerified) {
            return b.copies - a.copies
          }
          return a.isVerified ? -1 : 1
        })
        break
      default:
        crosshairs.sort((a, b) => b.copies - a.copies)
    }

    // Calculate pagination
    const total = crosshairs.length
    const totalPages = Math.ceil(total / limit)
    const skip = (page - 1) * limit
    
    // Apply pagination
    const paginatedCrosshairs = crosshairs.slice(skip, skip + limit)

    const response = {
      success: true,
      data: paginatedCrosshairs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages
      }
    }
    
    console.log('[API Route] Returning response with', paginatedCrosshairs.length, 'crosshairs')
    console.log('[API Route] Response success:', response.success)
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('[API Route] Error fetching crosshairs:', error)
    console.error('[API Route] Error stack:', error instanceof Error ? error.stack : 'No stack')
    return NextResponse.json(
      { success: false, error: 'Failed to fetch crosshairs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, code, category, params, tags, playerName, teamName } = body

    // Get existing crosshairs
    const crosshairs = await getCrosshairs()
    
    // Create new crosshair
    const newCrosshair = {
      id: `custom-${Date.now()}`,
      name,
      code,
      playerName: playerName || 'Community',
      teamName: teamName || '',
      category: category || 'custom',
      params,
      tags: tags || [],
      views: 0,
      copies: 0,
      likes: 0,
      isVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Add to array (in-memory only for Edge Runtime)
    crosshairs.push(newCrosshair)
    
    // In production, this would save to a database
    // For now, the crosshair is only stored in memory

    return NextResponse.json({
      success: true,
      data: newCrosshair
    })
  } catch (error) {
    console.error('Error creating crosshair:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create crosshair' },
      { status: 500 }
    )
  }
}