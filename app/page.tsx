import Link from 'next/link'
import { CrosshairCard } from '@/components/crosshair/CrosshairCard'
import { mockCrosshairs } from '@/lib/crosshair/mock-data'
import { ArrowRight, Target, Users, Zap, Trophy, Shield, Crosshair, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  const popularCrosshairs = mockCrosshairs.slice(0, 3)
  const proCrosshairs = mockCrosshairs.filter(c => c.playerName).slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* Hero Section - Dark emphasis section */}
      <section className="min-h-screen flex items-center justify-center bg-valorant-black text-valorant-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-valorant-black via-valorant-gray-900 to-valorant-black" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(255,70,85,0.3)_0%,_transparent_50%),_radial-gradient(circle_at_75%_75%,_rgba(0,102,204,0.2)_0%,_transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="mx-auto max-w-6xl text-center space-y-12">
            <div className="space-y-8">
              <Badge variant="valorant" className="px-4 py-2 text-sm gap-2">
                <Shield className="h-4 w-4" />
                TACTICAL ADVANTAGE
              </Badge>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tight">
                PERFECT YOUR
                <br />
                <span className="text-valorant-red">
                  AIM
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-valorant-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
                Professional crosshair configurations from the world&apos;s elite VALORANT players. 
                <span className="text-valorant-white font-semibold"> Customize, copy, and dominate.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button asChild size="xl" variant="valorant">
                <Link href="/crosshairs">
                  <Crosshair className="h-5 w-5" />
                  BROWSE ARSENAL
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="valorantOutline" className="border-valorant-white text-valorant-white hover:bg-valorant-white hover:text-valorant-black">
                <Link href="/editor">
                  <Settings className="h-5 w-5" />
                  CUSTOMIZE NOW
                  <Target className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3 group">
                <div className="text-4xl md:text-5xl font-black text-valorant-red">
                  500K+
                </div>
                <div className="text-sm font-bold tracking-wider uppercase text-valorant-gray-400">ACTIVE USERS</div>
              </div>
              <div className="space-y-3 group">
                <div className="text-4xl md:text-5xl font-black text-valorant-blue">
                  1,000+
                </div>
                <div className="text-sm font-bold tracking-wider uppercase text-valorant-gray-400">PRO CONFIGS</div>
              </div>
              <div className="space-y-3 group">
                <div className="text-4xl md:text-5xl font-black text-valorant-yellow">
                  5M+
                </div>
                <div className="text-sm font-bold tracking-wider uppercase text-valorant-gray-400">DOWNLOADS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Light background with high contrast */}
      <section className="py-24 bg-valorant-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="outline" className="px-4 py-2 text-sm gap-2 border-valorant-blue text-valorant-blue mb-6">
              <Target className="h-4 w-4" />
              TACTICAL ARSENAL
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-valorant-black mb-6 tracking-tight">
              ELITE PRECISION TOOLS
            </h2>
            <p className="text-xl text-valorant-gray-600 max-w-3xl mx-auto">
              Professional-grade utilities designed for competitive excellence and tactical superiority
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <Card className="border-2 hover:border-valorant-red hover:shadow-xl transition-all duration-300 h-full">
              <CardHeader className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-valorant-red text-valorant-white mb-4">
                  <Trophy className="h-12 w-12" />
                </div>
                <CardTitle className="text-2xl font-black tracking-wide uppercase">PRO DATABASE</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  Verified crosshair configurations from world-class professional players, 
                  meticulously curated and regularly updated for competitive authenticity.
                </CardDescription>
                <Badge variant="elite" className="gap-2">
                  <Shield className="h-4 w-4" />
                  VERIFIED AUTHENTIC
                </Badge>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-valorant-blue hover:shadow-xl transition-all duration-300 h-full">
              <CardHeader className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-valorant-blue text-valorant-white mb-4">
                  <Settings className="h-12 w-12" />
                </div>
                <CardTitle className="text-2xl font-black tracking-wide uppercase">TACTICAL EDITOR</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  Advanced configuration interface with real-time preview, 
                  precision controls, and tactical presets for optimal combat performance.
                </CardDescription>
                <Badge variant="outline" className="gap-2 border-valorant-blue text-valorant-blue">
                  <Target className="h-4 w-4" />
                  REAL-TIME PREVIEW
                </Badge>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-valorant-yellow hover:shadow-xl transition-all duration-300 h-full">
              <CardHeader className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-valorant-yellow text-valorant-black mb-4">
                  <Zap className="h-12 w-12" />
                </div>
                <CardTitle className="text-2xl font-black tracking-wide uppercase">INSTANT COPY</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  Lightning-fast configuration copying with one-click commands, 
                  seamless integration, and instant battlefield implementation.
                </CardDescription>
                <Badge variant="pro" className="gap-2">
                  <Zap className="h-4 w-4" />
                  ONE-CLICK COPY
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pro Crosshairs Section - Light gray background */}
      <section className="py-24 bg-valorant-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-8">
            <div className="space-y-4">
              <Badge variant="valorant" className="px-4 py-2 text-sm gap-2 bg-valorant-red/10 text-valorant-red border border-valorant-red">
                <Trophy className="h-4 w-4" />
                PROFESSIONAL GRADE
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-valorant-black tracking-tight">ELITE CONFIGURATIONS</h2>
              <p className="text-xl text-valorant-gray-600 max-w-2xl">
                Battle-tested crosshairs from championship-winning professionals in competitive VALORANT
              </p>
            </div>
            <Button asChild size="lg" variant="outline" className="border-2 border-valorant-black text-valorant-black hover:bg-valorant-black hover:text-valorant-white self-start lg:self-center">
              <Link href="/crosshairs/pro">
                VIEW COMPLETE ARSENAL
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {proCrosshairs.map((crosshair) => (
              <div key={crosshair.id}>
                <CrosshairCard
                  id={crosshair.id}
                  name={crosshair.name}
                  playerName={crosshair.playerName}
                  teamName={crosshair.teamName}
                  code={crosshair.code}
                  params={crosshair.params}
                  copies={crosshair.copies}
                  likes={crosshair.likes}
                  isVerified={crosshair.isVerified}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Crosshairs Section - White background */}
      <section className="py-24 bg-valorant-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-8">
            <div className="space-y-4">
              <Badge variant="pro" className="px-4 py-2 text-sm gap-2 bg-valorant-yellow/10 text-valorant-yellow-dark border border-valorant-yellow">
                <Users className="h-4 w-4" />
                COMMUNITY APPROVED
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-valorant-black tracking-tight">POPULAR CONFIGURATIONS</h2>
              <p className="text-xl text-valorant-gray-600 max-w-2xl">
                Most downloaded configurations by the tactical community worldwide
              </p>
            </div>
            <Button asChild size="lg" variant="outline" className="border-2 border-valorant-black text-valorant-black hover:bg-valorant-black hover:text-valorant-white self-start lg:self-center">
              <Link href="/crosshairs">
                EXPLORE ALL CONFIGS
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {popularCrosshairs.map((crosshair) => (
              <div key={crosshair.id}>
                <CrosshairCard
                  id={crosshair.id}
                  name={crosshair.name}
                  playerName={crosshair.playerName}
                  teamName={crosshair.teamName}
                  code={crosshair.code}
                  params={crosshair.params}
                  copies={crosshair.copies}
                  likes={crosshair.likes}
                  isVerified={crosshair.isVerified}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dark emphasis section */}
      <section className="py-24 bg-valorant-red text-valorant-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-valorant-red via-valorant-red-dark to-valorant-red opacity-90" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-12">
            <div className="space-y-6">
              <Badge variant="outline" className="px-4 py-2 text-sm gap-2 bg-valorant-white/10 border-valorant-white/20 text-white">
                <Target className="h-4 w-4" />
                MISSION READY
              </Badge>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
                DOMINATE THE
                <br />
                <span className="text-valorant-white">
                  BATTLEFIELD
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-valorant-white/90 max-w-4xl mx-auto leading-relaxed font-medium">
                Get professional-grade crosshair configurations and gain the tactical advantage. 
                <span className="text-valorant-white font-semibold">Your perfect aim starts here.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button asChild size="xl" className="bg-valorant-white text-valorant-red hover:bg-valorant-gray-100">
                <Link href="/editor">
                  <Settings className="h-5 w-5" />
                  LAUNCH EDITOR
                  <Target className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild size="xl" variant="outline" className="border-2 border-valorant-white text-valorant-white hover:bg-valorant-white hover:text-valorant-red">
                <Link href="/crosshairs">
                  <Crosshair className="h-5 w-5" />
                  VIEW ARSENAL
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}