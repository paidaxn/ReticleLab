import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Increment view count
    await prisma.crosshair.update({
      where: { id },
      data: {
        views: { increment: 1 }
      }
    })

    const crosshair = await prisma.crosshair.findUnique({
      where: { id },
      include: {
        player: true
      }
    })

    if (!crosshair) {
      return NextResponse.json(
        { success: false, error: 'Crosshair not found' },
        { status: 404 }
      )
    }

    // Parse JSON fields
    const formattedCrosshair = {
      ...crosshair,
      innerLines: JSON.parse(crosshair.innerLines),
      outerLines: JSON.parse(crosshair.outerLines),
      tags: crosshair.tags.split(',').filter(Boolean)
    }

    return NextResponse.json({
      success: true,
      crosshair: formattedCrosshair
    })
  } catch (error) {
    console.error('Error fetching crosshair:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch crosshair' },
      { status: 500 }
    )
  }
}