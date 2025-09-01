import { NextRequest, NextResponse } from 'next/server'

// Test endpoint with simple hardcoded data to isolate issues
// DO NOT use Edge Runtime
// export const runtime = 'edge' // REMOVED

export async function GET(request: NextRequest) {
  console.log('[TEST API] /api/crosshairs-test called')
  
  // Simple hardcoded test data
  const testCrosshairs = [
    {
      id: 'test-1',
      name: 'Test Crosshair 1',
      playerName: 'Test Player',
      teamName: 'Test Team',
      code: '0;P;c;1;o;1',
      params: {
        color: { r: 255, g: 255, b: 255, a: 1 },
        innerLines: { show: true, thickness: 2, length: 6, offset: 3, opacity: 1 },
        outerLines: { show: true, thickness: 2, length: 2, offset: 5, opacity: 0.5 },
        centerDot: { show: true, thickness: 2, opacity: 1 },
        movementError: { show: false, value: 0.5 },
        firingError: { show: false, value: 0.3 }
      },
      copies: 1000,
      likes: 100,
      views: 5000,
      isVerified: true,
      category: 'pro',
      tags: ['test', 'pro'],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-03T00:00:00.000Z'
    },
    {
      id: 'test-2',
      name: 'Test Crosshair 2',
      playerName: 'Community',
      teamName: '',
      code: '0;P;c;2;o;1',
      params: {
        color: { r: 0, g: 255, b: 0, a: 1 },
        innerLines: { show: true, thickness: 1, length: 4, offset: 2, opacity: 1 },
        outerLines: { show: false, thickness: 0, length: 0, offset: 0, opacity: 0 },
        centerDot: { show: false, thickness: 0, opacity: 0 },
        movementError: { show: true, value: 1 },
        firingError: { show: true, value: 0.5 }
      },
      copies: 500,
      likes: 50,
      views: 2500,
      isVerified: false,
      category: 'community',
      tags: ['test', 'community'],
      createdAt: '2024-01-04T00:00:00.000Z',
      updatedAt: '2024-01-06T00:00:00.000Z'
    }
  ]
  
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    
    const data = testCrosshairs.slice(0, limit)
    
    const response = {
      success: true,
      data: data,
      pagination: {
        page: 1,
        limit: limit,
        total: testCrosshairs.length,
        totalPages: 1,
        hasMore: false
      },
      debug: {
        message: 'This is test data from /api/crosshairs-test',
        timestamp: new Date().toISOString(),
        dataCount: data.length
      }
    }
    
    console.log('[TEST API] Returning', data.length, 'test crosshairs')
    
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    console.error('[TEST API] Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Test endpoint error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}