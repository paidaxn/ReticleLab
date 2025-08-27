import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CrosshairCard } from '@/components/crosshair/CrosshairCard'
import { mockCrosshairs } from '@/lib/crosshair/mock-data'
import { ArrowRight, Target, Users, Zap, Trophy } from 'lucide-react'

export default function HomePage() {
  const popularCrosshairs = mockCrosshairs.slice(0, 3)
  const proCrosshairs = mockCrosshairs.filter(c => c.playerName).slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-valorant-dark to-gray-900 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container relative py-24 md:py-32">
          <div className="mx-auto max-w-[800px] text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              瓦罗兰特准星
              <span className="text-valorant-red">大全</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              探索职业选手准星配置，使用可视化编辑器自定义，一键复制应用到游戏中
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="valorant" asChild>
                <Link href="/crosshairs">
                  浏览准星库
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
                <Link href="/editor">
                  准星编辑器
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-valorant-red/10 text-valorant-red mb-4">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">职业选手准星</h3>
              <p className="text-muted-foreground">
                收录全球顶级职业选手的准星配置，实时更新
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-valorant-red/10 text-valorant-red mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">可视化编辑器</h3>
              <p className="text-muted-foreground">
                直观的界面调整每个参数，实时预览准星效果
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-valorant-red/10 text-valorant-red mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">一键复制</h3>
              <p className="text-muted-foreground">
                轻松复制准星代码，快速应用到游戏设置中
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Crosshairs Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">职业选手准星</h2>
              <p className="text-muted-foreground mt-2">向最优秀的选手学习</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/crosshairs/pro">
                查看全部
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proCrosshairs.map((crosshair) => (
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
      </section>

      {/* Popular Crosshairs Section */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">热门准星</h2>
              <p className="text-muted-foreground mt-2">社区最受欢迎的配置</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/crosshairs">
                查看全部
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularCrosshairs.map((crosshair) => (
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
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-valorant-red to-red-600 text-white">
        <div className="container">
          <div className="text-center max-w-[600px] mx-auto">
            <h2 className="text-3xl font-bold mb-4">开始自定义你的准星</h2>
            <p className="text-white/90 mb-8">
              使用我们的编辑器创建完美的准星配置，提升你的游戏体验
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/editor">
                打开编辑器
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}