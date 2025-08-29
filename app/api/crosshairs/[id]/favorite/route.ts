import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json().catch(() => ({}))
    const { userId, action = 'like' } = body

    if (action === 'like') {
      // Increment likes count
      const crosshair = await prisma.crosshair.update({
        where: { id },
        data: {
          likes: { increment: 1 }
        }
      })

      // Add to favorites if user is provided
      if (userId) {
        await prisma.favorite.create({
          data: {
            userId,
            crosshairId: id
          }
        }).catch(() => {
          // Ignore if already favorited
        })

        await prisma.usageHistory.create({
          data: {
            userId,
            crosshairId: id,
            action: 'favorite'
          }
        })
      }

      return NextResponse.json({ 
        success: true, 
        likes: crosshair.likes,
        favorited: true 
      })
    } else {
      // Unlike - decrement likes count
      const crosshair = await prisma.crosshair.update({
        where: { id },
        data: {
          likes: { decrement: 1 }
        }
      })

      // Remove from favorites if user is provided
      if (userId) {
        await prisma.favorite.delete({
          where: {
            userId_crosshairId: {
              userId,
              crosshairId: id
            }
          }
        }).catch(() => {
          // Ignore if not favorited
        })
      }

      return NextResponse.json({ 
        success: true, 
        likes: crosshair.likes,
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

    const crosshair = await prisma.crosshair.findUnique({
      where: { id },
      select: {
        likes: true,
        copies: true
      }
    })

    let favorited = false
    if (userId) {
      const favorite = await prisma.favorite.findUnique({
        where: {
          userId_crosshairId: {
            userId,
            crosshairId: id
          }
        }
      })
      favorited = !!favorite
    }

    return NextResponse.json({ 
      success: true,
      likes: crosshair?.likes || 0,
      copies: crosshair?.copies || 0,
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