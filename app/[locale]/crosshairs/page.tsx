import { getDictionary } from '@/lib/dictionary'
import { type Locale } from '@/i18n.config'
import { CrosshairsClient } from './client'
import { generatePageMetadata } from '@/lib/seo-metadata'
import type { Metadata } from 'next'

// Removed Edge Runtime for Vercel compatibility
// export const runtime = 'edge'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const isZh = params.locale === 'zh'
  
  return generatePageMetadata(
    isZh ? 'Valorant职业选手准星大全 - 准星代码库' : 'All Valorant Pro Crosshairs - Codes & Settings Database',
    isZh 
      ? '最全的Valorant准星数据库。浏览并复制TenZ、Aspas、Demon1等职业选手的Valorant准星设置和代码。包含1000+专业准星配置。'
      : 'Complete Valorant crosshair database. Browse and copy Valorant crosshair settings from TenZ, Aspas, Demon1 and more pro players. 1000+ professional crosshair codes.',
    `/${params.locale}/crosshairs`
  )
}

// Fetch crosshairs - directly import mock data during build time
async function fetchCrosshairs() {
  console.log('[Page] fetchCrosshairs called')
  console.log('[Page] Environment:', {
    CF_PAGES_URL: process.env.CF_PAGES_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NODE_ENV: process.env.NODE_ENV
  })
  
  // During build time or when API is not available, use mock data directly
  // This avoids the issue of API routes not being available during static generation
  try {
    // Import mock data directly instead of fetching from API
    const { mockCrosshairs } = await import('@/lib/crosshair/mockCrosshairs')
    
    console.log('[Page] Using direct mock data import')
    console.log('[Page] Mock crosshairs count:', mockCrosshairs.length)
    
    // Transform dates to ISO strings for serialization
    const crosshairs = mockCrosshairs.map(crosshair => ({
      ...crosshair,
      createdAt: crosshair.createdAt?.toISOString(),
      updatedAt: crosshair.updatedAt?.toISOString()
    }))
    
    console.log('[Page] Returning', crosshairs.length, 'crosshairs from mock data')
    return crosshairs
  } catch (error) {
    console.error('[Page] Error loading crosshairs:', error)
    console.error('[Page] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    
    // Return empty array as fallback
    console.log('[Page] Returning empty array due to error')
    return []
  }
}

export default async function CrosshairsPage({ 
  params 
}: { 
  params: { locale: Locale } 
}) {
  console.log('[Page] CrosshairsPage rendering, locale:', params.locale)
  
  const dictionary = await getDictionary(params.locale)
  const crosshairs = await fetchCrosshairs()
  
  console.log('[Page] Final crosshairs count to render:', crosshairs.length)

  return (
    <CrosshairsClient 
      initialCrosshairs={crosshairs}
      locale={params.locale}
      dictionary={dictionary}
    />
  )
}