import { Metadata } from 'next'
import { FavoritesClient } from './client'
import { getDictionary } from '@/lib/dictionary'
import { type Locale } from '@/i18n.config'
import { mockCrosshairs } from '@/lib/crosshair/mockCrosshairs'

export const runtime = 'edge'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const dictionary = await getDictionary(locale)
  
  return {
    title: (dictionary.favorites?.title || 'My Favorites') + ' | ReticleLab',
    description: dictionary.favorites?.description || 'Your collection of favorite crosshairs',
    openGraph: {
      title: (dictionary.favorites?.title || 'My Favorites') + ' | ReticleLab',
      description: dictionary.favorites?.description || 'Your collection of favorite crosshairs',
    },
  }
}

export default async function FavoritesPage({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  const dictionary = await getDictionary(locale)
  
  return (
    <FavoritesClient 
      crosshairs={mockCrosshairs}
      locale={locale}
      dictionary={dictionary}
    />
  )
}