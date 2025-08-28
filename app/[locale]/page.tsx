import Link from 'next/link'
import { CrosshairCard } from '@/components/crosshair/CrosshairCard'
import { mockCrosshairs } from '@/lib/crosshair/mockCrosshairs'
import { ArrowRight, Target, Users, Zap, Trophy, Shield, Crosshair, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getDictionary } from '@/lib/dictionary'
import { type Locale } from '@/i18n.config'
import { generatePageMetadata } from '@/lib/seo-metadata'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const isZh = params.locale === 'zh'
  
  return generatePageMetadata(
    isZh ? 'RETICLELAB - 专业瓦罗兰特准星配置平台' : 'RETICLELAB - Professional VALORANT Crosshair Arsenal',
    isZh 
      ? '来自世界冠军级瓦罗兰特职业选手的专业准星配置。自定义、部署并主宰战场。'
      : 'Professional-grade crosshair configurations from championship-winning VALORANT players. Customize, deploy, and dominate with tactical precision.',
    `/${params.locale}`
  )
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const dictionary = await getDictionary(locale)
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
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-6xl text-center space-y-8 sm:space-y-12">
            <div className="space-y-6 sm:space-y-8">
              <Badge variant="valorant" className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm gap-2">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                {dictionary.hero.badge}
              </Badge>
              
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-tight">
                {dictionary.hero.title}
                <br />
                <span className="text-valorant-red">
                  {dictionary.hero.titleHighlight}
                </span>
              </h1>
              
              <p className="text-base sm:text-xl lg:text-2xl text-valorant-gray-300 max-w-4xl mx-auto leading-relaxed font-medium px-4">
                {dictionary.hero.subtitle}
                <span className="text-valorant-white font-semibold"> {dictionary.hero.subtitleHighlight}</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8 px-4">
              <Button asChild size="lg" className="w-full sm:w-auto" variant="valorant">
                <Link href={`/${locale}/crosshairs`} className="min-h-[44px] text-sm sm:text-base">
                  <Crosshair className="h-4 w-4 sm:h-5 sm:w-5" />
                  {dictionary.hero.browseBtn}
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="w-full sm:w-auto border-valorant-white text-valorant-white hover:bg-valorant-white hover:text-valorant-black min-h-[44px] text-sm sm:text-base" variant="valorant-outline">
                <Link href={`/${locale}/editor`}>
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                  {dictionary.hero.customizeBtn}
                  <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="pt-12 sm:pt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center px-4">
              <div className="space-y-2 sm:space-y-3 group">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-valorant-red">
                  500K+
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-valorant-gray-400">{dictionary.hero.stats.users}</div>
              </div>
              <div className="space-y-2 sm:space-y-3 group">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-valorant-blue">
                  1,000+
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-valorant-gray-400">{dictionary.hero.stats.configs}</div>
              </div>
              <div className="space-y-2 sm:space-y-3 group">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-valorant-yellow">
                  5M+
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-valorant-gray-400">{dictionary.hero.stats.downloads}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Light background with high contrast */}
      <section className="py-12 sm:py-24 bg-valorant-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <Badge variant="outline" className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm gap-2 border-valorant-blue text-valorant-blue mb-4 sm:mb-6">
              <Target className="h-3 w-3 sm:h-4 sm:w-4" />
              {dictionary.features.badge}
            </Badge>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-valorant-black mb-4 sm:mb-6 tracking-tight px-4">
              {dictionary.features.title}
            </h2>
            <p className="text-base sm:text-xl text-valorant-gray-600 max-w-3xl mx-auto px-4">
              {dictionary.features.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Pro Database */}
            <Card className="group border-2 border-valorant-gray-200 hover:border-valorant-red transition-all duration-300 hover:shadow-xl bg-valorant-white">
              <CardHeader className="pb-8">
                <div className="mb-6 w-16 h-16 bg-valorant-red/10 rounded-xl flex items-center justify-center group-hover:bg-valorant-red/20 transition-colors">
                  <Trophy className="h-8 w-8 text-valorant-red" />
                </div>
                <CardTitle className="text-2xl font-black text-valorant-black">{dictionary.features.pro.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base text-valorant-gray-700 leading-relaxed">
                  {dictionary.features.pro.desc}
                </CardDescription>
                <Badge variant="valorant" className="px-3 py-1 text-xs">
                  {dictionary.features.pro.badge}
                </Badge>
              </CardContent>
            </Card>

            {/* Tactical Editor */}
            <Card className="group border-2 border-valorant-gray-200 hover:border-valorant-blue transition-all duration-300 hover:shadow-xl bg-valorant-white">
              <CardHeader className="pb-8">
                <div className="mb-6 w-16 h-16 bg-valorant-blue/10 rounded-xl flex items-center justify-center group-hover:bg-valorant-blue/20 transition-colors">
                  <Settings className="h-8 w-8 text-valorant-blue" />
                </div>
                <CardTitle className="text-2xl font-black text-valorant-black">{dictionary.features.editor.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base text-valorant-gray-700 leading-relaxed">
                  {dictionary.features.editor.desc}
                </CardDescription>
                <Badge variant="outline" className="px-3 py-1 text-xs border-valorant-blue text-valorant-blue">
                  {dictionary.features.editor.badge}
                </Badge>
              </CardContent>
            </Card>

            {/* Instant Copy */}
            <Card className="group border-2 border-valorant-gray-200 hover:border-valorant-yellow transition-all duration-300 hover:shadow-xl bg-valorant-white">
              <CardHeader className="pb-8">
                <div className="mb-6 w-16 h-16 bg-valorant-yellow/10 rounded-xl flex items-center justify-center group-hover:bg-valorant-yellow/20 transition-colors">
                  <Zap className="h-8 w-8 text-valorant-yellow" />
                </div>
                <CardTitle className="text-2xl font-black text-valorant-black">{dictionary.features.copy.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base text-valorant-gray-700 leading-relaxed">
                  {dictionary.features.copy.desc}
                </CardDescription>
                <Badge variant="outline" className="px-3 py-1 text-xs border-valorant-yellow text-valorant-yellow">
                  {dictionary.features.copy.badge}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pro Crosshairs Preview - Subtle section with cards */}
      <section className="py-12 sm:py-24 bg-valorant-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <Badge variant="valorant" className="px-3 py-1.5 text-xs mb-4">
                <Trophy className="h-3 w-3" />
                PROFESSIONAL COLLECTION
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-valorant-black">
                Professional Player Crosshairs
              </h2>
              <p className="text-base sm:text-lg text-valorant-gray-600 mt-2">
                Battle-tested configurations from championship winners
              </p>
            </div>
            <Button asChild variant="outline" className="self-start sm:self-auto border-valorant-black text-valorant-black hover:bg-valorant-black hover:text-white">
              <Link href={`/${locale}/crosshairs`} className="min-h-[44px] text-sm">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {proCrosshairs.map((crosshair) => (
              <CrosshairCard
                key={crosshair.id}
                id={crosshair.id}
                name={crosshair.name}
                playerName={crosshair.playerName}
                teamName={crosshair.teamName}
                code={crosshair.code}
                params={crosshair.params}
                copies={crosshair.copies}
                likes={crosshair.likes}
                isVerified={crosshair.isVerified}
                locale={locale}
                dictionary={dictionary}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Crosshairs - Subtle section */}
      <section className="py-12 sm:py-24 bg-valorant-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <Badge variant="outline" className="px-3 py-1.5 text-xs mb-4 border-valorant-red text-valorant-red">
                <Users className="h-3 w-3" />
                TRENDING NOW
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-valorant-black">
                Community Favorites
              </h2>
              <p className="text-base sm:text-lg text-valorant-gray-600 mt-2">
                Most copied crosshairs by the VALORANT community
              </p>
            </div>
            <Button asChild variant="outline" className="self-start sm:self-auto border-valorant-black text-valorant-black hover:bg-valorant-black hover:text-white">
              <Link href={`/${locale}/crosshairs`} className="min-h-[44px] text-sm">
                Explore More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {popularCrosshairs.map((crosshair) => (
              <CrosshairCard
                key={crosshair.id}
                id={crosshair.id}
                name={crosshair.name}
                playerName={crosshair.playerName}
                teamName={crosshair.teamName}
                code={crosshair.code}
                params={crosshair.params}
                copies={crosshair.copies}
                likes={crosshair.likes}
                isVerified={crosshair.isVerified}
                locale={locale}
                dictionary={dictionary}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}