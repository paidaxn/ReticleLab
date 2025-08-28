'use client'

import React from 'react'

interface ReticleLabLogoProps {
  className?: string
  showText?: boolean
}

export function ReticleLabLogo({ className = '', showText = true }: ReticleLabLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Outer Hexagon Frame */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
        >
          {/* Hexagon Background */}
          <path
            d="M20 2L36 10V30L20 38L4 30V10L20 2Z"
            fill="url(#hexGradient)"
            stroke="url(#borderGradient)"
            strokeWidth="1.5"
          />
          
          {/* Crosshair Design */}
          {/* Center Dot */}
          <circle cx="20" cy="20" r="2" fill="#FF4655" />
          
          {/* Crosshair Lines */}
          <g stroke="#FF4655" strokeWidth="2" strokeLinecap="square">
            {/* Top Line */}
            <line x1="20" y1="8" x2="20" y2="14" />
            {/* Bottom Line */}
            <line x1="20" y1="26" x2="20" y2="32" />
            {/* Left Line */}
            <line x1="8" y1="20" x2="14" y2="20" />
            {/* Right Line */}
            <line x1="26" y1="20" x2="32" y2="20" />
          </g>
          
          {/* Corner Accents */}
          <g fill="#FF4655" opacity="0.6">
            <rect x="10" y="10" width="2" height="2" />
            <rect x="28" y="10" width="2" height="2" />
            <rect x="10" y="28" width="2" height="2" />
            <rect x="28" y="28" width="2" height="2" />
          </g>
          
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F1923" />
              <stop offset="100%" stopColor="#1A2332" />
            </linearGradient>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4655" />
              <stop offset="50%" stopColor="#FF6B7A" />
              <stop offset="100%" stopColor="#FF4655" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-lg font-black tracking-wider">
            <span className="text-valorant-black dark:text-valorant-white">RETICLE</span>
            <span className="text-valorant-red">LAB</span>
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-valorant-gray-600 dark:text-valorant-gray-400 uppercase -mt-1">
            Tactical Division
          </span>
        </div>
      )}
    </div>
  )
}

// Alternative Minimalist Logo
export function ReticleLabLogoMinimal({ className = '' }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Diamond Shape Background */}
      <path
        d="M16 1L31 16L16 31L1 16L16 1Z"
        fill="#0F1923"
        stroke="#FF4655"
        strokeWidth="1"
      />
      
      {/* Crosshair */}
      <g stroke="#FF4655" strokeWidth="2" strokeLinecap="square">
        <line x1="16" y1="6" x2="16" y2="11" />
        <line x1="16" y1="21" x2="16" y2="26" />
        <line x1="6" y1="16" x2="11" y2="16" />
        <line x1="21" y1="16" x2="26" y2="16" />
      </g>
      
      {/* Center Dot */}
      <circle cx="16" cy="16" r="1.5" fill="#FF4655" />
    </svg>
  )
}

// Icon-only version for favicons
export function ReticleLabIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="4" fill="#0F1923" />
      <g stroke="#FF4655" strokeWidth="1.5" strokeLinecap="square">
        <line x1="12" y1="4" x2="12" y2="8" />
        <line x1="12" y1="16" x2="12" y2="20" />
        <line x1="4" y1="12" x2="8" y2="12" />
        <line x1="16" y1="12" x2="20" y2="12" />
      </g>
      <circle cx="12" cy="12" r="1" fill="#FF4655" />
    </svg>
  )
}