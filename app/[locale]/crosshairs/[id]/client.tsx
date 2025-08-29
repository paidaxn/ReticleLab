'use client'

import { useState } from 'react'
import { CrosshairCanvas } from '@/components/crosshair/CrosshairCanvas'
import { CrosshairCard } from '@/components/crosshair/CrosshairCard'
import { Copy, Heart, CheckCircle, ArrowLeft, Share2, Download, Shield, Settings, ExternalLink, Target, HelpCircle, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { type Locale } from '@/i18n.config'
import { type Crosshair } from '@/types/crosshair'
import { type Dictionary } from '@/lib/dictionary'

interface CrosshairDetailClientProps {
  crosshair: Crosshair
  similarCrosshairs: Crosshair[]
  locale: Locale
  dictionary: Dictionary
}

export function CrosshairDetailClient({ 
  crosshair, 
  similarCrosshairs,
  locale,
  dictionary 
}: CrosshairDetailClientProps) {
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(crosshair.code)
      setCopied(true)
      toast.success(dictionary.toast.copySuccess, {
        duration: 4000,
        style: {
          background: '#10B981',
          color: '#fff',
          fontWeight: 'bold',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10B981',
        },
      })
      setTimeout(() => setCopied(false), 3000)
    } catch (error) {
      toast.error(dictionary.toast.copyError, {
        style: {
          background: '#EF4444',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#EF4444',
        },
      })
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
      toast.success(dictionary.toast.copySuccess, {
        style: {
          background: '#10B981',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10B981',
        },
      })
    }
  }

  const handleLike = () => {
    setLiked(!liked)
    toast.success(liked ? dictionary.toast.likeRemove : dictionary.toast.likeAdd, {
      style: {
        background: '#10B981',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10B981',
      },
    })
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

  return (
    <div className="min-h-screen bg-valorant-white">
      {/* Header Navigation */}
      <div className="border-b-2 border-valorant-gray-200 bg-valorant-white">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <Link href={`/${locale}/crosshairs`} className="inline-flex items-center gap-2 font-bold tracking-wider uppercase text-valorant-gray-600 hover:text-valorant-black transition-colors text-xs sm:text-sm">
            <ArrowLeft className="h-4 w-4" />
            {dictionary.detail.backToArsenal}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Hero Section */}
        <div className="relative mb-12 sm:mb-16">
          <div className="relative grid grid-cols-1 xl:grid-cols-5 gap-6 sm:gap-12 items-start">
            {/* Left - Crosshair Preview */}
            <div className="xl:col-span-3">
              <div className="bg-valorant-white border-2 border-valorant-gray-200 rounded-xl p-4 sm:p-8 mb-6 sm:mb-8 shadow-lg">
                <div className="aspect-video bg-valorant-gray-900 flex items-center justify-center rounded-xl">
                  <div className="w-full h-full flex items-center justify-center">
                    <CrosshairCanvas params={crosshair.params} size={320} showBackground={true} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Info and Actions */}
            <div className="xl:col-span-2 space-y-6 sm:space-y-8">
              {/* Header Info */}
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                        <h1 className="text-2xl sm:text-4xl xl:text-5xl font-black text-valorant-black tracking-wide uppercase break-words">{crosshair.name}</h1>
                        {crosshair.isVerified && (
                          <div className="bg-valorant-blue text-white rounded-xl p-2 shadow-lg flex-shrink-0">
                            <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                        )}
                      </div>
                      
                      {crosshair.playerName && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                          <span className="text-lg sm:text-2xl font-bold text-valorant-red">
                            {crosshair.playerName}
                          </span>
                          {crosshair.teamName && (
                            <span className="font-bold tracking-wider uppercase text-xs sm:text-sm px-2 sm:px-3 py-1 bg-valorant-blue/10 border border-valorant-blue rounded-full text-valorant-blue">
                              {crosshair.teamName}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 self-start">
                      <button 
                        onClick={handleShare}
                        className="p-2 sm:p-3 rounded-lg border-2 border-valorant-gray-200 bg-valorant-white hover:border-valorant-yellow hover:bg-valorant-yellow/10 transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-valorant-black" />
                      </button>
                      <button
                        onClick={handleLike}
                        className={`p-2 sm:p-3 rounded-lg border-2 transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                          liked 
                            ? 'border-valorant-red bg-valorant-red/10 text-valorant-red' 
                            : 'border-valorant-gray-200 bg-valorant-white hover:border-valorant-red hover:bg-valorant-red/10 text-valorant-black'
                        }`}
                      >
                        <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${liked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-valorant-white border-2 border-valorant-gray-200 rounded-lg p-3 sm:p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-valorant-green" />
                      </div>
                      <div className="text-lg sm:text-xl font-black text-valorant-green">
                        {crosshair.copies.toLocaleString()}
                      </div>
                      <div className="font-bold tracking-wider uppercase text-[10px] sm:text-xs text-valorant-gray-600">{dictionary.card.copies}</div>
                    </div>
                    <div className="bg-valorant-white border-2 border-valorant-gray-200 rounded-lg p-3 sm:p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-valorant-red" />
                      </div>
                      <div className="text-lg sm:text-xl font-black text-valorant-red">
                        {crosshair.likes.toLocaleString()}
                      </div>
                      <div className="font-bold tracking-wider uppercase text-[10px] sm:text-xs text-valorant-gray-600">{dictionary.card.likes}</div>
                    </div>
                  </div>
                  
                  {/* Last Updated Info */}
                  {crosshair.updatedAt && (
                    <div className="text-xs text-valorant-gray-500 font-semibold">
                      Last verified: {new Date(crosshair.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                  )}
                </div>
              </div>

              {/* Copy Section */}
              <div className="bg-valorant-white border-2 border-valorant-gray-200 rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 text-valorant-red" />
                  <span className="text-sm sm:text-lg font-black tracking-wide uppercase text-valorant-black">{dictionary.detail.crosshairCode}</span>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={crosshair.code}
                      readOnly
                      className="w-full bg-valorant-gray-50 border-2 border-valorant-gray-200 rounded-lg px-3 sm:px-4 py-3 sm:py-4 font-mono text-xs sm:text-sm focus:ring-2 focus:ring-valorant-red/30 focus:border-valorant-red outline-none text-valorant-black pr-20 sm:pr-24"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <button
                        onClick={handleCopy}
                        className={`px-2 sm:px-4 py-2 rounded-lg font-bold tracking-wide uppercase text-xs sm:text-sm transition-all duration-300 flex items-center gap-1 sm:gap-2 min-h-[36px] ${
                          copied ? 'bg-valorant-green text-white' : 'bg-valorant-red text-white hover:bg-valorant-red-dark'
                        }`}
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">{dictionary.card.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">{dictionary.card.copy}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <Link href={`/${locale}/how-to-use`} className="inline-flex items-center gap-1 text-valorant-red hover:text-red-600 font-semibold text-xs sm:text-sm transition-colors">
                    <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    {dictionary.detail.howToImport}
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button className="border-2 border-valorant-black text-valorant-black hover:bg-valorant-black hover:text-white py-3 rounded-lg font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px] text-xs sm:text-sm">
                  <Download className="h-4 w-4" />
                  <span>{dictionary.detail.export}</span>
                </button>
                <Link href={`/${locale}/editor`} className="border-2 border-valorant-black text-valorant-black hover:bg-valorant-black hover:text-white py-3 rounded-lg font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px] text-xs sm:text-sm">
                  <Settings className="h-4 w-4" />
                  <span>{dictionary.detail.edit}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-valorant-white border-2 border-valorant-gray-200 rounded-lg p-4 sm:p-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-valorant-blue" />
            <h2 className="text-xl sm:text-2xl font-black tracking-wide uppercase text-valorant-black">{dictionary.detail.techSpecs}</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-3 sm:gap-6">
            {Object.entries(crosshair.params).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-3 sm:py-4 px-3 sm:px-6 rounded-lg bg-valorant-gray-50 border-2 border-valorant-gray-200">
                <span className="font-bold tracking-wider uppercase text-xs sm:text-sm text-valorant-gray-700 flex-1 min-w-0 truncate pr-2">
                  {getParameterDisplayName(key)}
                </span>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  {key.includes('Color') && (
                    <div
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 border-valorant-gray-300 shadow-inner"
                      style={{ backgroundColor: value as string }}
                    />
                  )}
                  <span className="font-black text-valorant-black text-sm">
                    {formatParameterValue(key, value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Configurations */}
        <div className="mt-12 sm:mt-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-valorant-red" />
              <h2 className="text-2xl sm:text-3xl font-black tracking-wide uppercase text-valorant-black">{dictionary.detail.similarConfigs}</h2>
            </div>
            <Link href={`/${locale}/crosshairs`} className="border-2 border-valorant-black text-valorant-black hover:bg-valorant-black hover:text-white px-3 sm:px-4 py-2 rounded-lg font-bold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 min-h-[44px] text-xs sm:text-sm">
              <span>{dictionary.detail.viewAll}</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {similarCrosshairs.map((similarCrosshair) => (
              <div key={similarCrosshair.id}>
                <CrosshairCard
                  id={similarCrosshair.id}
                  name={similarCrosshair.name}
                  playerName={similarCrosshair.playerName}
                  teamName={similarCrosshair.teamName}
                  code={similarCrosshair.code}
                  params={similarCrosshair.params}
                  copies={similarCrosshair.copies}
                  likes={similarCrosshair.likes}
                  isVerified={similarCrosshair.isVerified}
                  locale={locale}
                  dictionary={dictionary}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}