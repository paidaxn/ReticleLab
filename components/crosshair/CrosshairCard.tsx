'use client'

import { useState } from 'react'
import { CrosshairCanvas } from './CrosshairCanvas'
import { Copy, Heart, CheckCircle, Shield } from 'lucide-react'
import { CrosshairParams } from '@/types/crosshair'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { type Locale } from '@/i18n.config'

interface CrosshairCardProps {
  id: string
  name: string
  playerName?: string
  teamName?: string
  code: string
  params: CrosshairParams
  copies: number
  likes: number
  isVerified?: boolean
  locale: Locale
  dictionary: any
}

export function CrosshairCard({
  id,
  name,
  playerName,
  teamName,
  code,
  params,
  copies,
  likes,
  isVerified = false,
  locale,
  dictionary,
}: CrosshairCardProps) {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
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
      setTimeout(() => setCopied(false), 2500)
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

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const cardContent = (
    <div className={`bg-white border-2 rounded-xl group relative overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer flex flex-col h-[450px] ${
      isVerified && playerName ? 'border-blue-400 hover:border-blue-500' : 'border-gray-200 hover:border-valorant-red'
    }`}>
      {/* Header Badge */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        {isVerified && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500 text-white shadow-lg">
            <Shield className="h-3.5 w-3.5" />
            <span className="font-bold text-xs uppercase tracking-wider">Pro</span>
          </div>
        )}
      </div>

      {/* Crosshair Preview - Fixed Height */}
      <div className="h-[200px] bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative group-hover:scale-110 transition-transform duration-300">
          <CrosshairCanvas params={params} size={150} showBackground={false} />
        </div>
      </div>
      
      {/* Content - Flex Grow */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title and Player Info */}
        <div className="space-y-2 flex-1">
          <h3 className="text-lg font-black uppercase text-gray-900 line-clamp-1 group-hover:text-valorant-red transition-colors">
            {name}
          </h3>
          {playerName && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-valorant-red">{playerName}</span>
              {teamName && (
                <span className="text-xs font-bold uppercase px-2.5 py-1 bg-gray-100 rounded-full text-gray-600">
                  {teamName}
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Stats - Fixed at Bottom */}
        <div className="grid grid-cols-2 gap-3 text-center pt-4 mt-auto border-t border-gray-100">
          <div>
            <div className="flex items-center justify-center mb-1">
              <Copy className="h-4 w-4 text-gray-600" />
            </div>
            <div className="font-bold text-sm text-gray-900">
              {formatNumber(copies)}
            </div>
            <div className="text-xs text-gray-500 uppercase">{dictionary.card.copies}</div>
          </div>
          
          <div>
            <div className="flex items-center justify-center mb-1">
              <Heart className="h-4 w-4 text-gray-600" />
            </div>
            <div className="font-bold text-sm text-gray-900">
              {formatNumber(likes)}
            </div>
            <div className="text-xs text-gray-500 uppercase">{dictionary.card.likes}</div>
          </div>
        </div>
        
        {/* Actions - Fixed at Bottom */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleCopy}
            className={`flex-1 px-4 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-valorant-red hover:bg-red-600 text-white hover:shadow-lg'
            }`}
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>{dictionary.card.copied}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>{dictionary.card.copy}</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleLike}
            className={`px-3 rounded-lg border-2 transition-all duration-200 ${
              liked 
                ? 'bg-red-50 border-valorant-red text-valorant-red' 
                : 'bg-white border-gray-300 text-gray-600 hover:border-valorant-red hover:text-valorant-red'
            }`}
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Link href={`/${locale}/crosshairs/${id}`}>
      {cardContent}
    </Link>
  )
}