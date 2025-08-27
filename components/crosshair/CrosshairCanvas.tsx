'use client'

import { useEffect, useRef } from 'react'
import { CrosshairParams } from '@/types/crosshair'

interface CrosshairCanvasProps {
  params: CrosshairParams
  size?: number
  showBackground?: boolean
}

export function CrosshairCanvas({
  params,
  size = 200,
  showBackground = true,
}: CrosshairCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size for high DPI displays
    const scale = window.devicePixelRatio || 1
    canvas.width = size * scale
    canvas.height = size * scale
    ctx.scale(scale, scale)

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw background if enabled
    if (showBackground) {
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      )
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.2)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size, size)
    }

    const centerX = size / 2
    const centerY = size / 2

    // Helper function to convert hex to rgba
    const hexToRgba = (hex: string, opacity: number) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`
    }

    // Draw outer lines
    if (params.outerLineLength > 0) {
      ctx.strokeStyle = hexToRgba(params.color, params.outerLineOpacity)
      ctx.lineWidth = params.outerLineThickness
      ctx.lineCap = 'square'

      const outerOffset = params.outerLineOffset + params.innerLineLength
      const outerLength = params.outerLineLength

      // Top line
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - outerOffset)
      ctx.lineTo(centerX, centerY - outerOffset - outerLength)
      ctx.stroke()

      // Bottom line
      ctx.beginPath()
      ctx.moveTo(centerX, centerY + outerOffset)
      ctx.lineTo(centerX, centerY + outerOffset + outerLength)
      ctx.stroke()

      // Left line
      ctx.beginPath()
      ctx.moveTo(centerX - outerOffset, centerY)
      ctx.lineTo(centerX - outerOffset - outerLength, centerY)
      ctx.stroke()

      // Right line
      ctx.beginPath()
      ctx.moveTo(centerX + outerOffset, centerY)
      ctx.lineTo(centerX + outerOffset + outerLength, centerY)
      ctx.stroke()
    }

    // Draw inner lines
    if (params.innerLineLength > 0) {
      ctx.strokeStyle = hexToRgba(params.color, params.innerLineOpacity)
      ctx.lineWidth = params.innerLineThickness
      ctx.lineCap = 'square'

      const innerOffset = params.innerLineOffset
      const innerLength = params.innerLineLength

      // Top line
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - innerOffset)
      ctx.lineTo(centerX, centerY - innerOffset - innerLength)
      ctx.stroke()

      // Bottom line
      ctx.beginPath()
      ctx.moveTo(centerX, centerY + innerOffset)
      ctx.lineTo(centerX, centerY + innerOffset + innerLength)
      ctx.stroke()

      // Left line
      ctx.beginPath()
      ctx.moveTo(centerX - innerOffset, centerY)
      ctx.lineTo(centerX - innerOffset - innerLength, centerY)
      ctx.stroke()

      // Right line
      ctx.beginPath()
      ctx.moveTo(centerX + innerOffset, centerY)
      ctx.lineTo(centerX + innerOffset + innerLength, centerY)
      ctx.stroke()
    }

    // Draw outlines
    if (params.outlineThickness > 0) {
      ctx.strokeStyle = hexToRgba(params.outlineColor, params.outlineOpacity)
      ctx.lineWidth = params.outlineThickness * 2
      ctx.globalCompositeOperation = 'destination-over'

      // Redraw all lines with outline
      if (params.outerLineLength > 0) {
        const outerOffset = params.outerLineOffset + params.innerLineLength
        const outerLength = params.outerLineLength

        ctx.beginPath()
        ctx.moveTo(centerX, centerY - outerOffset)
        ctx.lineTo(centerX, centerY - outerOffset - outerLength)
        ctx.moveTo(centerX, centerY + outerOffset)
        ctx.lineTo(centerX, centerY + outerOffset + outerLength)
        ctx.moveTo(centerX - outerOffset, centerY)
        ctx.lineTo(centerX - outerOffset - outerLength, centerY)
        ctx.moveTo(centerX + outerOffset, centerY)
        ctx.lineTo(centerX + outerOffset + outerLength, centerY)
        ctx.stroke()
      }

      if (params.innerLineLength > 0) {
        const innerOffset = params.innerLineOffset
        const innerLength = params.innerLineLength

        ctx.beginPath()
        ctx.moveTo(centerX, centerY - innerOffset)
        ctx.lineTo(centerX, centerY - innerOffset - innerLength)
        ctx.moveTo(centerX, centerY + innerOffset)
        ctx.lineTo(centerX, centerY + innerOffset + innerLength)
        ctx.moveTo(centerX - innerOffset, centerY)
        ctx.lineTo(centerX - innerOffset - innerLength, centerY)
        ctx.moveTo(centerX + innerOffset, centerY)
        ctx.lineTo(centerX + innerOffset + innerLength, centerY)
        ctx.stroke()
      }

      ctx.globalCompositeOperation = 'source-over'
    }

    // Draw center dot
    if (params.centerDot) {
      ctx.fillStyle = hexToRgba(params.color, params.centerDotOpacity)
      ctx.beginPath()
      ctx.arc(centerX, centerY, params.centerDotSize / 2, 0, Math.PI * 2)
      ctx.fill()

      // Draw center dot outline
      if (params.outlineThickness > 0) {
        ctx.strokeStyle = hexToRgba(params.outlineColor, params.outlineOpacity)
        ctx.lineWidth = params.outlineThickness
        ctx.stroke()
      }
    }
  }, [params, size, showBackground])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="crosshair-canvas"
    />
  )
}