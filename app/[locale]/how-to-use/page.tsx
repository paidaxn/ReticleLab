import { Copy, AlertCircle, ChevronRight, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { getDictionary } from '@/lib/dictionary'
import { type Locale } from '@/i18n.config'

export const runtime = 'edge'

export default async function HowToUsePage({ 
  params 
}: { 
  params: { locale: Locale } 
}) {
  const dictionary = await getDictionary(params.locale)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white shadow-lg border-2 border-valorant-red mb-4 sm:mb-6">
            <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-valorant-red" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-valorant-red">USER GUIDE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mb-3 sm:mb-4 px-4">{dictionary.howTo.title}</h1>
          <p className="text-base sm:text-xl text-gray-700 px-4">
            {dictionary.howTo.subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-valorant-red to-red-600 px-4 sm:px-8 py-3 sm:py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-black text-white text-base sm:text-lg">1</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-white">{dictionary.howTo.steps.title1}</h2>
              </div>
            </div>
            <div className="p-4 sm:p-8 space-y-3 sm:space-y-4">
              <p className="text-gray-700 text-base sm:text-lg">
                {dictionary.howTo.steps.desc1}
              </p>
              <Link href={`/${params.locale}/crosshairs`} className="inline-flex items-center gap-2 text-valorant-red hover:text-red-600 font-bold transition-colors text-sm sm:text-base min-h-[44px] py-2">
                {dictionary.header.browse} <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-8 py-3 sm:py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-black text-white text-base sm:text-lg">2</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-white">{dictionary.howTo.steps.title2}</h2>
              </div>
            </div>
            <div className="p-4 sm:p-8 space-y-3 sm:space-y-4">
              <p className="text-gray-700 text-base sm:text-lg">
                {dictionary.howTo.steps.desc2}
              </p>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Copy className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  <span className="font-bold text-gray-900 text-sm sm:text-base">Example:</span>
                </div>
                <code className="block bg-white rounded p-2 sm:p-3 font-mono text-xs sm:text-sm text-gray-800 border border-blue-200 break-all">
                  0;P;c;5;h;0;0l;4;0o;2;0a;1;1b;0
                </code>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 sm:px-8 py-3 sm:py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-black text-white text-base sm:text-lg">3</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-white">{dictionary.howTo.steps.title3}</h2>
              </div>
            </div>
            <div className="p-4 sm:p-8 space-y-3 sm:space-y-4">
              <p className="text-gray-700 text-base sm:text-lg">
                {dictionary.howTo.steps.desc3}
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 sm:px-8 py-3 sm:py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-black text-white text-base sm:text-lg">4</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-white">{dictionary.howTo.steps.title4}</h2>
              </div>
            </div>
            <div className="p-4 sm:p-8 space-y-3 sm:space-y-4">
              <p className="text-gray-700 text-base sm:text-lg">
                {dictionary.howTo.steps.desc4}
              </p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Pro Tips
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Experiment with different crosshairs for different agents
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Save multiple crosshair profiles for quick switching
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Adjust based on your monitor and resolution
                  </p>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Practice in the range after changing crosshairs
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-6 sm:py-8">
            <Link href={`/${params.locale}/crosshairs`} className="inline-flex items-center gap-2 bg-valorant-red hover:bg-red-600 text-white px-6 sm:px-8 py-3 rounded-lg font-bold uppercase tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px] text-sm sm:text-base">
              {dictionary.header.browse}
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}