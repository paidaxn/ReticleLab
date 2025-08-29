import { NextRequest, NextResponse } from 'next/server'
import { mockCrosshairs } from '@/lib/crosshair/mockCrosshairs'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Mock response - database implementation pending
    // Find crosshair from mock data
    const crosshair = mockCrosshairs.find(c => c.id === id)

    if (!crosshair) {
      return NextResponse.json(
        { success: false, error: 'Crosshair not found' },
        { status: 404 }
      )
    }

    // Simulate incrementing view count
    const enhancedCrosshair = {
      ...crosshair,
      views: crosshair.views + 1
    }

    return NextResponse.json({
      success: true,
      crosshair: enhancedCrosshair
    })
  } catch (error) {
    console.error('Error fetching crosshair:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch crosshair' },
      { status: 500 }
    )
  }
}