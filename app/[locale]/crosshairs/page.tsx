import { mockCrosshairs } from '@/lib/crosshair/mock-data'
import { getDictionary } from '@/lib/dictionary'
import { type Locale } from '@/i18n.config'
import { CrosshairsClient } from './client'

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