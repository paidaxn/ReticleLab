import { NextRequest, NextResponse } from 'next/server'
import { mockCrosshairs } from '@/lib/crosshair/mockCrosshairs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sortBy = searchParams.get('sortBy') || 'popular'

    const skip = (page - 1) * limit

    // Filter crosshairs by category if provided
    let filteredCrosshairs = [...mockCrosshairs]
    if (category) {
      filteredCrosshairs = filteredCrosshairs.filter(c => c.category === category)
    }

    // Sort crosshairs
    switch (sortBy) {
      case 'popular':
        filteredCrosshairs.sort((a, b) => b.copies - a.copies)
        break
      case 'likes':
        filteredCrosshairs.sort((a, b) => b.likes - a.likes)
        break
      case 'recent':
        filteredCrosshairs.sort((a, b) => {
          const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt)
          const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt)
          return dateB.getTime() - dateA.getTime()
        })
        break
      default:
        filteredCrosshairs.sort((a, b) => b.copies - a.copies)
    }

    // Paginate results
    const total = filteredCrosshairs.length
    const paginatedCrosshairs = filteredCrosshairs.slice(skip, skip + limit)

    return NextResponse.json({
      success: true,
      crosshairs: paginatedCrosshairs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching crosshairs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch crosshairs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, code, category, params, tags } = body

    // Mock response - database implementation pending
    // In production, this would create a new crosshair in the database
    const newCrosshair = {
      id: `custom-${Date.now()}`,
      name,
      code,
      category: category || 'custom',
      params,
      tags: tags || [],
      views: 0,
      copies: 0,
      likes: 0,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return NextResponse.json({
      success: true,
      crosshair: newCrosshair
    })
  } catch (error) {
    console.error('Error creating crosshair:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create crosshair' },
      { status: 500 }
    )
  }
}