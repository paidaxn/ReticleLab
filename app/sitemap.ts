import { MetadataRoute } from 'next'
import { i18n } from '@/i18n.config'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reticle-lab.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()
  
  // Static pages for each locale
  const staticPages = [
    '',
    '/crosshairs',
    '/editor',
    '/how-to-use',
  ]
  
  // Generate URLs for all locales
  const localeUrls = i18n.locales.flatMap(locale => 
    staticPages.map(page => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: currentDate,
      changeFrequency: page === '' ? 'daily' as const : 'weekly' as const,
      priority: page === '' ? 1 : page === '/crosshairs' ? 0.9 : 0.8,
    }))
  )
  
  // Add crosshair detail pages (for pro player crosshairs)
  // In production, this would be generated from database
  const crosshairIds = [
    'tenz-red-cross',
    'aspas-green-dot',
    'demon1-white-plus',
    'yay-cyan-classic',
    'chronicle-yellow-square',
    'f0rsaken-purple-circle',
    'something-pink-star',
    'derke-orange-diamond',
  ]
  
  const crosshairUrls = i18n.locales.flatMap(locale =>
    crosshairIds.map(id => ({
      url: `${baseUrl}/${locale}/crosshairs/${id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )
  
  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...localeUrls,
    ...crosshairUrls,
  ]
}