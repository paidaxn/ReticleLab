import { prisma } from '../lib/prisma'

async function testAPIs() {
  console.log('🧪 Testing API functionality...\n')

  try {
    // Get a test crosshair
    const crosshair = await prisma.crosshair.findFirst()
    if (!crosshair) {
      console.error('❌ No crosshairs found in database')
      return
    }

    console.log(`📌 Testing with crosshair: ${crosshair.name} (ID: ${crosshair.id})`)
    console.log(`   Initial copies: ${crosshair.copies}`)
    console.log(`   Initial likes: ${crosshair.likes}\n`)

    // Test copy API
    console.log('📋 Testing copy tracking...')
    const copyResponse = await fetch(`http://localhost:3000/api/crosshairs/${crosshair.id}/copy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
    const copyData = await copyResponse.json()
    console.log('   Copy API response:', copyData)

    // Test favorite API - Like
    console.log('\n❤️ Testing favorite (like)...')
    const likeResponse = await fetch(`http://localhost:3000/api/crosshairs/${crosshair.id}/favorite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'like' })
    })
    const likeData = await likeResponse.json()
    console.log('   Like API response:', likeData)

    // Test favorite API - Unlike
    console.log('\n💔 Testing favorite (unlike)...')
    const unlikeResponse = await fetch(`http://localhost:3000/api/crosshairs/${crosshair.id}/favorite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'unlike' })
    })
    const unlikeData = await unlikeResponse.json()
    console.log('   Unlike API response:', unlikeData)

    // Test stats API
    console.log('\n📊 Testing stats retrieval...')
    const statsResponse = await fetch(`http://localhost:3000/api/crosshairs/${crosshair.id}/favorite`)
    const statsData = await statsResponse.json()
    console.log('   Stats API response:', statsData)

    // Verify database update
    const updatedCrosshair = await prisma.crosshair.findUnique({
      where: { id: crosshair.id }
    })
    console.log('\n✅ Final database state:')
    console.log(`   Copies: ${crosshair.copies} → ${updatedCrosshair?.copies}`)
    console.log(`   Likes: ${crosshair.likes} → ${updatedCrosshair?.likes}`)

    console.log('\n🎉 All tests completed!')

  } catch (error) {
    console.error('❌ Test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Check if dev server is running
fetch('http://localhost:3000')
  .then(() => {
    console.log('✅ Dev server is running\n')
    testAPIs()
  })
  .catch(() => {
    console.error('❌ Dev server is not running. Please run "npm run dev" first.')
    process.exit(1)
  })
