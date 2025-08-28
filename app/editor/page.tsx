import { Settings, Sparkles, Clock } from 'lucide-react'
import Link from 'next/link'

export default function EditorPage() {
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
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">COMING SOON</h1>
            <p className="text-2xl font-bold text-valorant-red">CROSSHAIR EDITOR</p>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              We&apos;re building an advanced crosshair editor with real-time preview, 
              precise parameter control, and instant code generation.
            </p>
          </div>
          
          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <div className="text-valorant-red font-bold text-sm uppercase mb-1">Visual Editor</div>
              <div className="text-xs text-gray-600">Drag & adjust in real-time</div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <div className="text-valorant-red font-bold text-sm uppercase mb-1">Map Previews</div>
              <div className="text-xs text-gray-600">Test on game backgrounds</div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <div className="text-valorant-red font-bold text-sm uppercase mb-1">Save & Share</div>
              <div className="text-xs text-gray-600">Build your collection</div>
            </div>
          </div>
          
          {/* Launch Timeline */}
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Expected Launch: Q1 2025</span>
          </div>
          
          {/* CTA */}
          <div className="space-y-4">
            <p className="text-gray-600">
              Meanwhile, explore our collection of professional crosshairs
            </p>
            <Link href="/crosshairs" className="inline-flex items-center gap-2 bg-valorant-red hover:bg-red-600 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl">
              Browse Crosshairs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}