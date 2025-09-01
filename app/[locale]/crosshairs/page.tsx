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

// Fetch crosshairs from API
async function fetchCrosshairs() {
  console.log('[Page] fetchCrosshairs called')
  console.log('[Page] Environment:', {
    CF_PAGES_URL: process.env.CF_PAGES_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NODE_ENV: process.env.NODE_ENV
  })
  
  try {
    // Automatically detect the deployment platform
    // Vercel provides VERCEL_URL, Cloudflare provides CF_PAGES_URL
    const baseUrl = process.env.CF_PAGES_URL || 
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
                    process.env.NEXT_PUBLIC_BASE_URL || 
                    'http://localhost:3000'
    
    console.log('[Page] Using baseUrl:', baseUrl)
    
    const url = `${baseUrl}/api/crosshairs?limit=500`
    console.log('[Page] Fetching from:', url)
    
    const response = await fetch(url, {
      next: { revalidate: 60 } // Cache for 60 seconds
    })
    
    console.log('[Page] Response status:', response.status)
    console.log('[Page] Response ok:', response.ok)

    if (!response.ok) {
      throw new Error('Failed to fetch crosshairs')
    }

    const data = await response.json()
    console.log('[Page] Response data:', {
      success: data.success,
      dataLength: data.data?.length,
      hasPagination: !!data.pagination
    })
    
    const crosshairs = data.data || []
    console.log('[Page] Returning', crosshairs.length, 'crosshairs')
    return crosshairs
  } catch (error) {
    console.error('[Page] Error fetching crosshairs:', error)
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