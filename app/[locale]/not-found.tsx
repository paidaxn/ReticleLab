'use client'

import Link from 'next/link'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-valorant-black to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-valorant-red/10 rounded-2xl flex items-center justify-center">
              <FileQuestion className="h-12 w-12 text-valorant-red" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-7xl font-black text-valorant-red">404</h1>
            <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
            <p className="text-gray-400">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/"
            className="flex-1 px-6 py-3 bg-valorant-red hover:bg-red-600 text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}