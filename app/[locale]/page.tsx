import Link from 'next/link'
import { CrosshairCard } from '@/components/crosshair/CrosshairCard'
import { mockCrosshairs } from '@/lib/crosshair/mock-data'
import { ArrowRight, Target, Users, Zap, Trophy, Shield, Crosshair, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getDictionary } from '@/lib/dictionary'
import { type Locale } from '@/i18n.config'

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
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="mx-auto max-w-6xl text-center space-y-12">
            <div className="space-y-8">
              <Badge variant="valorant" className="px-4 py-2 text-sm gap-2">
                <Shield className="h-4 w-4" />
                {dictionary.hero.badge}
              </Badge>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tight">
                {dictionary.hero.title}
                <br />
                <span className="text-valorant-red">
                  {dictionary.hero.titleHighlight}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-valorant-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
                {dictionary.hero.subtitle}
                <span className="text-valorant-white font-semibold"> {dictionary.hero.subtitleHighlight}</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button asChild size="xl" variant="valorant">
                <Link href={`/${locale}/crosshairs`}>
                  <Crosshair className="h-5 w-5" />
                  {dictionary.hero.browseBtn}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="valorant-outline" className="border-valorant-white text-valorant-white hover:bg-valorant-white hover:text-valorant-black">
                <Link href={`/${locale}/editor`}>
                  <Settings className="h-5 w-5" />
                  {dictionary.hero.customizeBtn}
                  <Target className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3 group">
                <div className="text-4xl md:text-5xl font-black text-valorant-red">
                  500K+
                </div>
                <div className="text-sm font-bold tracking-wider uppercase text-valorant-gray-400">{dictionary.hero.stats.users}</div>
              </div>
              <div className="space-y-3 group">
                <div className="text-4xl md:text-5xl font-black text-valorant-blue">
                  1,000+
                </div>
                <div className="text-sm font-bold tracking-wider uppercase text-valorant-gray-400">{dictionary.hero.stats.configs}</div>
              </div>
              <div className="space-y-3 group">
                <div className="text-4xl md:text-5xl font-black text-valorant-yellow">
                  5M+
                </div>
                <div className="text-sm font-bold tracking-wider uppercase text-valorant-gray-400">{dictionary.hero.stats.downloads}</div>
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
              {dictionary.features.badge}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-valorant-black mb-6 tracking-tight">
              {dictionary.features.title}
            </h2>
            <p className="text-xl text-valorant-gray-600 max-w-3xl mx-auto">
              {dictionary.features.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
      <section className="py-24 bg-valorant-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge variant="valorant" className="px-3 py-1.5 text-xs mb-4">
                <Trophy className="h-3 w-3" />
                PROFESSIONAL COLLECTION
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black text-valorant-black">
                Professional Player Crosshairs
              </h2>
              <p className="text-lg text-valorant-gray-600 mt-2">
                Battle-tested configurations from championship winners
              </p>
            </div>
            <Button asChild variant="outline" className="hidden md:inline-flex border-valorant-black text-valorant-black hover:bg-valorant-black hover:text-white">
              <Link href={`/${locale}/crosshairs`}>
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="py-24 bg-valorant-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge variant="outline" className="px-3 py-1.5 text-xs mb-4 border-valorant-red text-valorant-red">
                <Users className="h-3 w-3" />
                TRENDING NOW
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black text-valorant-black">
                Community Favorites
              </h2>
              <p className="text-lg text-valorant-gray-600 mt-2">
                Most copied crosshairs by the VALORANT community
              </p>
            </div>
            <Button asChild variant="outline" className="hidden md:inline-flex border-valorant-black text-valorant-black hover:bg-valorant-black hover:text-white">
              <Link href={`/${locale}/crosshairs`}>
                Explore More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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