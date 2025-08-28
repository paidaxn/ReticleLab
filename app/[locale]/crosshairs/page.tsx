import { mockCrosshairs } from '@/lib/crosshair/mockCrosshairs'
import { getDictionary } from '@/lib/dictionary'
import { type Locale } from '@/i18n.config'
import { CrosshairsClient } from './client'
import { generatePageMetadata } from '@/lib/seo-metadata'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const isZh = params.locale === 'zh'
  
  return generatePageMetadata(
    isZh ? '职业选手准星合集 - RETICLELAB' : 'Pro Player Crosshairs Collection - RETICLELAB',
    isZh 
      ? '浏览TenZ、Aspas、Demon1等职业选手的瓦罗兰特准星配置。一键复制代码，立即在游戏中使用。'
      : 'Browse VALORANT crosshair configurations from pro players like TenZ, Aspas, and Demon1. Copy codes and use them in-game instantly.',
    `/${params.locale}/crosshairs`
  )
}

export default async function CrosshairsPage({ 
  params 
}: { 
  params: { locale: Locale } 
}) {
  const dictionary = await getDictionary(params.locale)

  return (
    <CrosshairsClient 
      crosshairs={mockCrosshairs}
      locale={params.locale}
      dictionary={dictionary}
    />
  )
}