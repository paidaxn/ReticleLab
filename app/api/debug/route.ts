import { NextRequest, NextResponse } from 'next/server'

// DO NOT use Edge Runtime for debugging
// export const runtime = 'edge' // REMOVED

export async function GET(request: NextRequest) {
  console.log('[DEBUG API] Called at:', new Date().toISOString())
  
  const diagnostics = {
    timestamp: new Date().toISOString(),
    platform: {
      isVercel: !!process.env.VERCEL,
      isCloudflare: !!process.env.CF_PAGES_URL,
      nodeVersion: process.version,
    },
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      VERCEL_REGION: process.env.VERCEL_REGION,
      CF_PAGES_URL: process.env.CF_PAGES_URL,
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
    urls: {
      requestUrl: request.url,
      nextUrl: request.nextUrl.toString(),
      origin: request.nextUrl.origin,
      pathname: request.nextUrl.pathname,
    },
    headers: {
      host: request.headers.get('host'),
      xForwardedHost: request.headers.get('x-forwarded-host'),
      xForwardedProto: request.headers.get('x-forwarded-proto'),
      xVercelId: request.headers.get('x-vercel-id'),
    },
    computedBaseUrl: (() => {
      if (process.env.CF_PAGES_URL) return process.env.CF_PAGES_URL
      if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
      if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL
      return 'http://localhost:3000'
    })(),
    dataTest: {
      canImportMockData: false,
      mockDataLength: 0,
      sampleData: null,
      error: null
    }
  }
  
  // Test data import
  try {
    const { mockCrosshairs } = await import('@/lib/crosshair/mockCrosshairs')
    diagnostics.dataTest.canImportMockData = true
    diagnostics.dataTest.mockDataLength = mockCrosshairs.length
    diagnostics.dataTest.sampleData = mockCrosshairs.slice(0, 2).map(c => ({
      id: c.id,
      name: c.name,
      hasParams: !!c.params,
      hasCreatedAt: !!c.createdAt,
      createdAtType: typeof c.createdAt,
      createdAtValue: c.createdAt
    }))
  } catch (error) {
    diagnostics.dataTest.error = error instanceof Error ? error.message : String(error)
    console.error('[DEBUG API] Error importing mock data:', error)
  }
  
  console.log('[DEBUG API] Diagnostics:', JSON.stringify(diagnostics, null, 2))
  
  return NextResponse.json(diagnostics, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Content-Type': 'application/json',
    }
  })
}