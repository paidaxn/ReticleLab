import { getDictionary } from '@/lib/dictionary'
import { type Locale } from '@/i18n.config'
import { CrosshairsClient } from './client'
import { generatePageMetadata } from '@/lib/seo-metadata'
import type { Metadata } from 'next'

export const runtime = 'edge'

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
  try {
    // In production, use the full URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
    
    const response = await fetch(`${baseUrl}/api/crosshairs?limit=500`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    })

    if (!response.ok) {
      throw new Error('Failed to fetch crosshairs')
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching crosshairs:', error)
    // Return empty array as fallback
    return []
  }
}

export default async function CrosshairsPage({ 
  params 
}: { 
  params: { locale: Locale } 
}) {
  const dictionary = await getDictionary(params.locale)
  const crosshairs = await fetchCrosshairs()

  return (
    <CrosshairsClient 
      initialCrosshairs={crosshairs}
      locale={params.locale}
      dictionary={dictionary}
    />
  )
}