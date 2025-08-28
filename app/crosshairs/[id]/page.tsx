'use client'

import { useState } from 'react'
import { CrosshairCanvas } from '@/components/crosshair/CrosshairCanvas'
import { CrosshairCard } from '@/components/crosshair/CrosshairCard'
import { mockCrosshairs } from '@/lib/crosshair/mock-data'
import { Copy, Heart, Eye, CheckCircle, ArrowLeft, Share2, Download, Shield, Settings, ExternalLink, Target, HelpCircle, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface CrosshairDetailPageProps {
  params: {
    id: string
  }
}

export default function CrosshairDetailPage({ params }: CrosshairDetailPageProps) {
  const crosshair = mockCrosshairs.find(c => c.id === params.id)
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!crosshair) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-valorant-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-valorant-black">Crosshair Not Found</h1>
          <p className="text-valorant-gray-600 mb-6">The crosshair you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/crosshairs" className="bg-valorant-red hover:bg-valorant-red-dark text-white px-6 py-3 rounded-lg font-bold tracking-wide uppercase transition-all duration-300 inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Collection
          </Link>
        </div>
      </div>
    )
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(crosshair.code)
      setCopied(true)
      toast.success('✅ Code copied! Now paste it in VALORANT settings.', {
        duration: 4000,
        style: {
          background: '#10B981',
          color: '#fff',
          fontWeight: 'bold',
        },
      })
      setTimeout(() => setCopied(false), 3000)
    } catch (error) {
      toast.error('Failed to copy code. Please copy manually.')
    }
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${crosshair.name} - ReticleLab`,
        text: `Check out this crosshair from ${crosshair.playerName || 'ReticleLab'}`,
        url: window.location.href,
      })
    } catch (error) {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const handleLike = () => {
    setLiked(!liked)
    toast.success(liked ? 'Removed from favorites' : 'Added to favorites')
  }

  const formatParameterValue = (key: string, value: unknown): string => {
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (key.includes('Color')) return String(value)
    if (key.includes('Opacity')) return `${value}%`
    if (key.includes('Thickness') || key.includes('Length') || key.includes('Offset') || key.includes('Size')) {
      return String(value)
    }
    return String(value)
  }

  const getParameterDisplayName = (key: string): string => {
    const displayNames: Record<string, string> = {
      color: 'Color',
      outlineColor: 'Outline Color',
      outlineThickness: 'Outline Thickness',
      outlineOpacity: 'Outline Opacity',
      centerDot: 'Center Dot',
      centerDotSize: 'Center Dot Size',
      centerDotOpacity: 'Center Dot Opacity',
      innerLineThickness: 'Inner Line Thickness',
      innerLineLength: 'Inner Line Length',
      innerLineOffset: 'Inner Line Offset',
      innerLineOpacity: 'Inner Line Opacity',
      innerLineMovement: 'Inner Line Movement',
      innerLineMovementError: 'Inner Movement Error',
      innerLineFiringError: 'Inner Firing Error',
      outerLineThickness: 'Outer Line Thickness',
      outerLineLength: 'Outer Line Length',
      outerLineOffset: 'Outer Line Offset',
      outerLineOpacity: 'Outer Line Opacity',
      outerLineMovement: 'Outer Line Movement',
      outerLineMovementError: 'Outer Movement Error',
      outerLineFiringError: 'Outer Firing Error',
    }
    return displayNames[key] || key
  }

  // Get similar crosshairs (excluding current one)
  const similarCrosshairs = mockCrosshairs
    .filter(c => c.id !== crosshair.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-valorant-white">
      {/* Header Navigation */}
      <div className="border-b-2 border-valorant-gray-200 bg-valorant-white">
        <div className="container mx-auto px-6 py-4">
          <Link href="/crosshairs" className="inline-flex items-center gap-2 font-bold tracking-wider uppercase text-valorant-gray-600 hover:text-valorant-black transition-colors">
            <ArrowLeft className="h-4 w-4" />
            BACK TO ARSENAL
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="relative grid grid-cols-1 xl:grid-cols-5 gap-12 items-start">
            {/* Left - Crosshair Preview */}
            <div className="xl:col-span-3">
              <div className="bg-valorant-white border-2 border-valorant-gray-200 rounded-xl p-8 mb-8 shadow-lg">
                <div className="aspect-video bg-valorant-gray-900 flex items-center justify-center rounded-xl">
                  <CrosshairCanvas params={crosshair.params} size={400} showBackground={true} />
                </div>
              </div>
            </div>

            {/* Right - Info and Actions */}
            <div className="xl:col-span-2 space-y-8">
              {/* Header Info */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h1 className="text-4xl xl:text-5xl font-black text-valorant-black tracking-wide uppercase">{crosshair.name}</h1>
                        {crosshair.isVerified && (
                          <div className="bg-valorant-blue text-white rounded-xl p-2 shadow-lg">
                            <Shield className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      
                      {crosshair.playerName && (
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-valorant-red">
                            {crosshair.playerName}
                          </span>
                          {crosshair.teamName && (
                            <span className="font-bold tracking-wider uppercase text-sm px-3 py-1 bg-valorant-blue/10 border border-valorant-blue rounded-full text-valorant-blue">
                              {crosshair.teamName}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleShare}
                        className="p-3 rounded-lg border-2 border-valorant-gray-200 bg-valorant-white hover:border-valorant-yellow hover:bg-valorant-yellow/10 transition-all duration-300"
                      >
                        <Share2 className="h-5 w-5 text-valorant-black" />
                      </button>
                      <button
                        onClick={handleLike}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                          liked 
                            ? 'border-valorant-red bg-valorant-red/10 text-valorant-red' 
                            : 'border-valorant-gray-200 bg-valorant-white hover:border-valorant-red hover:bg-valorant-red/10 text-valorant-black'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-valorant-white border-2 border-valorant-gray-200 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Eye className="h-4 w-4 text-valorant-blue" />
                      </div>
                      <div className="text-xl font-black text-valorant-blue">
                        {crosshair.views.toLocaleString()}
                      </div>
                      <div className="font-bold tracking-wider uppercase text-xs text-valorant-gray-600">VIEWS</div>
                    </div>
                    <div className="bg-valorant-white border-2 border-valorant-gray-200 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Copy className="h-4 w-4 text-valorant-green" />
                      </div>
                      <div className="text-xl font-black text-valorant-green">
                        {crosshair.copies.toLocaleString()}
                      </div>
                      <div className="font-bold tracking-wider uppercase text-xs text-valorant-gray-600">COPIES</div>
                    </div>
                    <div className="bg-valorant-white border-2 border-valorant-gray-200 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Heart className="h-4 w-4 text-valorant-red" />
                      </div>
                      <div className="text-xl font-black text-valorant-red">
                        {crosshair.likes.toLocaleString()}
                      </div>
                      <div className="font-bold tracking-wider uppercase text-xs text-valorant-gray-600">LIKES</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Copy Section */}
              <div className="bg-valorant-white border-2 border-valorant-gray-200 rounded-lg p-6 space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-valorant-red" />
                  <span className="text-lg font-black tracking-wide uppercase text-valorant-black">CROSSHAIR CODE</span>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={crosshair.code}
                      readOnly
                      className="w-full bg-valorant-gray-50 border-2 border-valorant-gray-200 rounded-lg px-4 py-4 font-mono text-sm focus:ring-2 focus:ring-valorant-red/30 focus:border-valorant-red outline-none text-valorant-black"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <button
                        onClick={handleCopy}
                        className={`px-4 py-2 rounded-lg font-bold tracking-wide uppercase text-sm transition-all duration-300 flex items-center gap-2 ${
                          copied ? 'bg-valorant-green text-white' : 'bg-valorant-red text-white hover:bg-valorant-red-dark'
                        }`}
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <Link href="/how-to-use" className="inline-flex items-center gap-1 text-valorant-red hover:text-red-600 font-semibold text-sm transition-colors">
                    <HelpCircle className="h-4 w-4" />
                    How to import this crosshair in VALORANT
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="border-2 border-valorant-black text-valorant-black hover:bg-valorant-black hover:text-white py-3 rounded-lg font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>EXPORT</span>
                </button>
                <Link href="/editor" className="border-2 border-valorant-black text-valorant-black hover:bg-valorant-black hover:text-white py-3 rounded-lg font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>EDIT</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-valorant-white border-2 border-valorant-gray-200 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="h-6 w-6 text-valorant-blue" />
            <h2 className="text-2xl font-black tracking-wide uppercase text-valorant-black">TECHNICAL SPECIFICATIONS</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(crosshair.params).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-4 px-6 rounded-lg bg-valorant-gray-50 border-2 border-valorant-gray-200">
                <span className="font-bold tracking-wider uppercase text-sm text-valorant-gray-700">
                  {getParameterDisplayName(key)}
                </span>
                <div className="flex items-center gap-3">
                  {key.includes('Color') && (
                    <div
                      className="w-6 h-6 rounded-lg border-2 border-valorant-gray-300 shadow-inner"
                      style={{ backgroundColor: value as string }}
                    />
                  )}
                  <span className="font-black text-valorant-black">
                    {formatParameterValue(key, value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Configurations */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-valorant-red" />
              <h2 className="text-3xl font-black tracking-wide uppercase text-valorant-black">SIMILAR CONFIGURATIONS</h2>
            </div>
            <Link href="/crosshairs" className="border-2 border-valorant-black text-valorant-black hover:bg-valorant-black hover:text-white px-4 py-2 rounded-lg font-bold tracking-wide uppercase transition-all duration-300 flex items-center gap-2">
              <span>VIEW ALL</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarCrosshairs.map((similarCrosshair) => (
              <div key={similarCrosshair.id}>
                <CrosshairCard
                  id={similarCrosshair.id}
                  name={similarCrosshair.name}
                  playerName={similarCrosshair.playerName}
                  teamName={similarCrosshair.teamName}
                  code={similarCrosshair.code}
                  params={similarCrosshair.params}
                  views={similarCrosshair.views}
                  copies={similarCrosshair.copies}
                  likes={similarCrosshair.likes}
                  isVerified={similarCrosshair.isVerified}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}