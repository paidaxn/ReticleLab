import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sortBy = searchParams.get('sortBy') || 'popular'

    const skip = (page - 1) * limit

    let orderBy: any = {}
    switch (sortBy) {
      case 'popular':
        orderBy = { copies: 'desc' }
        break
      case 'likes':
        orderBy = { likes: 'desc' }
        break
      case 'recent':
        orderBy = { createdAt: 'desc' }
        break
      default:
        orderBy = { copies: 'desc' }
    }

    const where = category ? { category } : {}

    const [crosshairs, total] = await Promise.all([
      prisma.crosshair.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          player: true
        }
      }),
      prisma.crosshair.count({ where })
    ])

    return NextResponse.json({
      success: true,
      crosshairs,
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
    const { name, code, category, playerId, params, tags } = body

    const crosshair = await prisma.crosshair.create({
      data: {
        name,
        code,
        category,
        playerId,
        color: params.color,
        outlineColor: params.outlineColor,
        centerDot: params.centerDot,
        innerLines: JSON.stringify(params.innerLines),
        outerLines: JSON.stringify(params.outerLines),
        tags: tags.join(','),
        views: 0,
        copies: 0,
        likes: 0
      },
      include: {
        player: true
      }
    })

    return NextResponse.json({
      success: true,
      crosshair
    })
  } catch (error) {
    console.error('Error creating crosshair:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create crosshair' },
      { status: 500 }
    )
  }
}