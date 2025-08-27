'use client'

import { useState } from 'react'
import { CrosshairCanvas } from './CrosshairCanvas'
import { Button } from '@/components/ui/button'
import { Copy, Heart, Eye, CheckCircle } from 'lucide-react'
import { CrosshairParams } from '@/types/crosshair'
import toast from 'react-hot-toast'

interface CrosshairCardProps {
  name: string
  playerName?: string
  teamName?: string
  code: string
  params: CrosshairParams
  views: number
  copies: number
  likes: number
  isVerified?: boolean
}

export function CrosshairCard({
  name,
  playerName,
  teamName,
  code,
  params,
  views,
  copies,
  likes,
  isVerified,
}: CrosshairCardProps) {
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success('准星代码已复制到剪贴板！')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('复制失败，请手动复制')
    }
  }

  const handleLike = () => {
    setLiked(!liked)
    if (!liked) {
      toast.success('已收藏准星')
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-200">
      <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 p-4 flex items-center justify-center">
        <CrosshairCanvas params={params} size={150} />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-sm line-clamp-1">{name}</h3>
            {playerName && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-muted-foreground">{playerName}</span>
                {isVerified && (
                  <CheckCircle className="h-3 w-3 text-blue-500" />
                )}
                {teamName && (
                  <span className="text-xs text-muted-foreground">• {teamName}</span>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Copy className="h-3 w-3" />
            {copies.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            {likes.toLocaleString()}
          </span>
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={copied ? "secondary" : "valorant"}
            className="flex-1"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                已复制
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                复制代码
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant={liked ? "secondary" : "outline"}
            onClick={handleLike}
          >
            <Heart className={`h-3 w-3 ${liked ? 'fill-current text-red-500' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  )
}