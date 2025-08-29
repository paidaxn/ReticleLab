import { PrismaClient } from '@prisma/client'
import { mockCrosshairs } from '../lib/crosshair/mock-data'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.usageHistory.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.crosshair.deleteMany()
  await prisma.player.deleteMany()
  await prisma.user.deleteMany()

  console.log('🗑️ Cleared existing data')

  // Create players
  const playersData = [
    { name: 'TenZ', team: 'Sentinels', region: 'NA', isVerified: true },
    { name: 'Aspas', team: 'LOUD', region: 'BR', isVerified: true },
    { name: 'Demon1', team: 'NRG', region: 'NA', isVerified: true },
    { name: 'Derke', team: 'Fnatic', region: 'EU', isVerified: true },
    { name: 'yay', team: 'C9', region: 'NA', isVerified: true },
    { name: 'Chronicle', team: 'Fnatic', region: 'EU', isVerified: true },
    { name: 'f0rsakeN', team: 'PRX', region: 'APAC', isVerified: true },
    { name: 'ScreaM', team: 'Karmine Corp', region: 'EU', isVerified: true },
  ]

  const players = await Promise.all(
    playersData.map(player =>
      prisma.player.create({ data: player })
    )
  )

  console.log(`✅ Created ${players.length} players`)

  // Create crosshairs
  const crosshairsToCreate = mockCrosshairs.map((crosshair: any) => {
    const player = players.find(p => p.name === crosshair.playerName)
    
    return {
      name: crosshair.name,
      code: crosshair.code,
      category: crosshair.isVerified ? 'pro' : 'community',
      playerId: player?.id,
      color: crosshair.params.color,
      outlineColor: crosshair.params.outlineColor,
      centerDot: crosshair.params.centerDot,
      innerLines: JSON.stringify(crosshair.params.innerLines || {}),
      outerLines: JSON.stringify(crosshair.params.outerLines || {}),
      views: crosshair.copies * Math.floor(Math.random() * 5 + 2),
      copies: crosshair.copies,
      likes: crosshair.likes,
      tags: Array.isArray(crosshair.tags) ? crosshair.tags.join(',') : 'community',
      isVerified: crosshair.isVerified || false
    }
  })

  const crosshairs = await Promise.all(
    crosshairsToCreate.map(crosshair =>
      prisma.crosshair.create({ data: crosshair })
    )
  )

  console.log(`✅ Created ${crosshairs.length} crosshairs`)

  // Create a demo user
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@reticlelab.com',
      username: 'demo',
      passwordHash: 'demo', // In production, this should be properly hashed
      role: 'user',
      subscriptionTier: 'free'
    }
  })

  console.log('✅ Created demo user')

  // Add some favorites for the demo user
  const favoriteCrosshairs = crosshairs.slice(0, 5)
  await Promise.all(
    favoriteCrosshairs.map(crosshair =>
      prisma.favorite.create({
        data: {
          userId: demoUser.id,
          crosshairId: crosshair.id
        }
      })
    )
  )

  console.log('✅ Added favorites for demo user')

  // Add some usage history
  await Promise.all(
    crosshairs.slice(0, 10).map(crosshair =>
      prisma.usageHistory.create({
        data: {
          userId: demoUser.id,
          crosshairId: crosshair.id,
          action: Math.random() > 0.5 ? 'copy' : 'view'
        }
      })
    )
  )

  console.log('✅ Added usage history')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })