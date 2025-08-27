import { CrosshairCard } from '@/components/crosshair/CrosshairCard'
import { mockCrosshairs } from '@/lib/crosshair/mock-data'

export default function CrosshairsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">准星库</h1>
        <p className="text-muted-foreground">
          浏览所有准星配置，找到适合你的完美准星
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockCrosshairs.map((crosshair) => (
          <CrosshairCard
            key={crosshair.id}
            name={crosshair.name}
            playerName={crosshair.playerName}
            teamName={crosshair.teamName}
            code={crosshair.code}
            params={crosshair.params}
            views={crosshair.views}
            copies={crosshair.copies}
            likes={crosshair.likes}
            isVerified={crosshair.isVerified}
          />
        ))}
      </div>
    </div>
  )
}