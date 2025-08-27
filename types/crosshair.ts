export interface CrosshairParams {
  // 基础设置
  color: string
  outlineColor: string
  outlineThickness: number
  outlineOpacity: number
  centerDot: boolean
  centerDotSize: number
  centerDotOpacity: number
  
  // 内线设置
  innerLineThickness: number
  innerLineLength: number
  innerLineOffset: number
  innerLineOpacity: number
  innerLineMovement: boolean
  innerLineMovementError: number
  innerLineFiringError: number
  
  // 外线设置
  outerLineThickness: number
  outerLineLength: number
  outerLineOffset: number
  outerLineOpacity: number
  outerLineMovement: boolean
  outerLineMovementError: number
  outerLineFiringError: number
}

export interface Crosshair {
  id: string
  name: string
  code: string
  category: 'pro' | 'popular' | 'community' | 'custom'
  params: CrosshairParams
  playerId?: string
  playerName?: string
  teamName?: string
  views: number
  copies: number
  likes: number
  tags: string[]
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Player {
  id: string
  name: string
  team?: string
  region: string
  avatarUrl?: string
  isVerified: boolean
  socialLinks?: {
    twitter?: string
    twitch?: string
    youtube?: string
  }
}