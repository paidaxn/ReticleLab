import { mockCrosshairs } from '@/lib/crosshair/mockCrosshairs'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getDictionary } from '@/lib/dictionary'
import { type Locale } from '@/i18n.config'
import { CrosshairDetailClient } from './client'

export default async function CrosshairDetailPage({ 
  params 
}: { 
  params: { id: string; locale: Locale } 
}) {
  const dictionary = await getDictionary(params.locale)
  const crosshair = mockCrosshairs.find(c => c.id === params.id)

  if (!crosshair) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-valorant-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-valorant-black">{dictionary.detail.notFound}</h1>
          <p className="text-valorant-gray-600 mb-6">{dictionary.detail.notFoundDesc}</p>
          <Link href={`/${params.locale}/crosshairs`} className="bg-valorant-red hover:bg-valorant-red-dark text-white px-6 py-3 rounded-lg font-bold tracking-wide uppercase transition-all duration-300 inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {dictionary.detail.backToCollection}
          </Link>
        </div>
      </div>
    )
  }

  // Get similar crosshairs (excluding current one)
  const similarCrosshairs = mockCrosshairs
    .filter(c => c.id !== crosshair.id)
    .slice(0, 4)

  return (
    <CrosshairDetailClient 
      crosshair={crosshair}
      similarCrosshairs={similarCrosshairs}
      locale={params.locale}
      dictionary={dictionary}
    />
  )
}