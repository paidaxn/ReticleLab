import { Copy, Settings, Keyboard, Check, AlertCircle, ChevronRight, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function HowToUsePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-lg border-2 border-valorant-red mb-6">
            <HelpCircle className="h-5 w-5 text-valorant-red" />
            <span className="text-sm font-bold tracking-wider uppercase text-valorant-red">USER GUIDE</span>
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">HOW TO USE</h1>
          <p className="text-xl text-gray-700">
            Learn how to import and use professional crosshair configurations in VALORANT
          </p>
        </div>

        {/* Steps Grid */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-valorant-red to-red-600 px-8 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="font-black text-white text-lg">1</span>
                </div>
                <h2 className="text-2xl font-bold text-white">FIND YOUR CROSSHAIR</h2>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <p className="text-gray-700 text-lg">
                Browse our collection of professional crosshairs and find one that suits your playstyle.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-valorant-red mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Browse by Player:</strong> Find crosshairs used by your favorite pros
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-valorant-red mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Filter by Style:</strong> Choose between Elite, Community, or Trending
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-valorant-red mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    <strong>Search:</strong> Look up specific players or teams
                  </p>
                </div>
              </div>
              <Link href="/crosshairs" className="inline-flex items-center gap-2 text-valorant-red hover:text-red-600 font-bold transition-colors">
                Browse Crosshairs <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="font-black text-white text-lg">2</span>
                </div>
                <h2 className="text-2xl font-bold text-white">COPY THE CODE</h2>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <p className="text-gray-700 text-lg">
                Click the COPY button on any crosshair card to copy its code to your clipboard.
              </p>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Copy className="h-6 w-6 text-blue-600" />
                  <span className="font-bold text-gray-900">Example Code:</span>
                </div>
                <code className="block bg-white rounded p-3 font-mono text-sm text-gray-800 border border-blue-200">
                  0;P;c;5;h;0;0l;4;0o;2;0a;1;1b;0
                </code>
                <p className="text-sm text-gray-600 mt-3 flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  The code will be automatically copied to your clipboard
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="font-black text-white text-lg">3</span>
                </div>
                <h2 className="text-2xl font-bold text-white">OPEN VALORANT SETTINGS</h2>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <p className="text-gray-700 text-lg">
                Launch VALORANT and navigate to the crosshair settings.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Settings className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900 mb-1">In-Game Path:</p>
                    <p className="text-gray-700">
                      Settings → Crosshair → Crosshair Profile
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Keyboard className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Quick Access:</p>
                    <p className="text-gray-700">
                      Press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">ESC</kbd> in-game → Settings → Crosshair
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="font-black text-white text-lg">4</span>
                </div>
                <h2 className="text-2xl font-bold text-white">IMPORT THE CROSSHAIR</h2>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <p className="text-gray-700 text-lg">
                Import the copied crosshair code into VALORANT.
              </p>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">A</div>
                    <p className="text-gray-900 font-semibold">Click &quot;Import Profile Code&quot;</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">B</div>
                    <p className="text-gray-900 font-semibold">Paste the code (Ctrl+V or Cmd+V)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">C</div>
                    <p className="text-gray-900 font-semibold">Click &quot;Import&quot; to apply</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">
                  <strong className="text-gray-900">Success!</strong> Your new crosshair is now active and ready to use in-game.
                </p>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-yellow-400" />
                PRO TIPS
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">Save Multiple Profiles:</strong> Create different crosshair profiles for different agents or maps
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">Test in Range:</strong> Always test your new crosshair in the practice range before competitive play
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">Adjust to Your Screen:</strong> You may need to fine-tune thickness based on your resolution
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">Color Matters:</strong> Choose colors that contrast well with common map backgrounds
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Can I modify the crosshair after importing?</h3>
                <p className="text-gray-700">
                  Yes! After importing, you can adjust any parameter in the VALORANT settings. The imported code is just a starting point.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Why doesn&apos;t my crosshair look exactly like the preview?</h3>
                <p className="text-gray-700">
                  Screen resolution, graphics settings, and monitor type can affect appearance. You may need minor adjustments for your setup.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Can I share my custom crosshair?</h3>
                <p className="text-gray-700">
                  Currently, ReticleLab showcases pro player crosshairs. Community sharing features are coming soon!
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Do crosshair codes work across all game modes?</h3>
                <p className="text-gray-700">
                  Yes, your crosshair settings apply to all game modes including Competitive, Unrated, and custom games.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <p className="text-gray-600 mb-6">Ready to upgrade your aim?</p>
            <Link href="/crosshairs" className="inline-flex items-center gap-2 bg-valorant-red hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl">
              Browse Crosshairs
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}