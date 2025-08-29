import { mockCrosshairs } from '@/lib/crosshair/mockCrosshairs'
import { getDictionary } from '@/lib/dictionary'
import { type Locale } from '@/i18n.config'
import { CrosshairsClient } from './client'
import { generatePageMetadata } from '@/lib/seo-metadata'
import type { Metadata } from 'next'

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