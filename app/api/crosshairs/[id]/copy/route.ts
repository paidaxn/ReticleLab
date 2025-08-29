import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Increment copy count
    const crosshair = await prisma.crosshair.update({
      where: { id },
      data: {
        copies: { increment: 1 }
      }
    })

    // Track usage history if user is provided
    const body = await request.json().catch(() => ({}))
    if (body.userId) {
      await prisma.usageHistory.create({
        data: {
          userId: body.userId,
          crosshairId: id,
          action: 'copy'
        }
      })
    }

    return NextResponse.json({ 
      success: true, 
      copies: crosshair.copies 
    })
  } catch (error) {
    console.error('Error updating copy count:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update copy count' },
      { status: 500 }
    )
  }
}