import { Crosshair, CrosshairParams } from '@/types/crosshair'
import { mockCrosshairs as rawMockCrosshairs } from './mock-data'

interface RawMockCrosshair {
  id: string
  name: string
  playerName?: string
  teamName?: string
  code: string
  params: CrosshairParams
  copies: number
  likes: number
  isVerified?: boolean
}

// Helper function to add missing fields to mock data
function enhanceMockCrosshair(crosshair: RawMockCrosshair): Crosshair {
  const now = new Date()
  const createdDate = new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000) // Random date within last 90 days
  
  return {
    ...crosshair,
    category: crosshair.isVerified ? 'pro' : 'community' as 'pro' | 'popular' | 'community' | 'custom',
    views: crosshair.copies * Math.floor(Math.random() * 5 + 2), // Views are 2-7x copies
    tags: crosshair.playerName ? ['pro', 'verified', crosshair.teamName?.toLowerCase() || ''] : ['community'],
    isVerified: crosshair.isVerified ?? false, // Ensure isVerified is always boolean
    createdAt: createdDate,
    updatedAt: new Date(createdDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000), // Updated within 7 days of creation
  }
}

// Export enhanced mock crosshairs
export const mockCrosshairs: Crosshair[] = rawMockCrosshairs.map(enhanceMockCrosshair)