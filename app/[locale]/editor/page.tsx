import { Settings, Sparkles, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getDictionary } from '@/lib/dictionary'
import { type Locale } from '@/i18n.config'

export default async function EditorPage({ 
  params 
}: { 
  params: { locale: Locale } 
}) {
  const dictionary = await getDictionary(params.locale)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-valorant-red to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Settings className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="bg-yellow-400 rounded-full p-2">
                  <Sparkles className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">{dictionary.editor.comingSoon}</h1>
            <p className="text-2xl font-bold text-valorant-red">{dictionary.editor.title}</p>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              {dictionary.editor.description}
            </p>
          </div>
          
          {/* Features Preview */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">{dictionary.editor.features.title}</h3>
            <div className="text-left max-w-lg mx-auto space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-valorant-red">•</span>
                <span className="text-gray-600">{dictionary.editor.features['1']}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-valorant-red">•</span>
                <span className="text-gray-600">{dictionary.editor.features['2']}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-valorant-red">•</span>
                <span className="text-gray-600">{dictionary.editor.features['3']}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-valorant-red">•</span>
                <span className="text-gray-600">{dictionary.editor.features['4']}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-valorant-red">•</span>
                <span className="text-gray-600">{dictionary.editor.features['5']}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-valorant-red">•</span>
                <span className="text-gray-600">{dictionary.editor.features['6']}</span>
              </div>
            </div>
          </div>
          
          {/* Launch Timeline */}
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Q1 2025</span>
          </div>
          
          {/* CTA */}
          <div className="space-y-4">
            <Link href={`/${params.locale}/crosshairs`} className="inline-flex items-center gap-2 bg-valorant-red hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl">
              <ArrowLeft className="h-5 w-5" />
              {dictionary.editor.backBtn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}