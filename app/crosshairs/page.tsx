import { CrosshairCard } from '@/components/crosshair/CrosshairCard'
import { mockCrosshairs } from '@/lib/crosshair/mock-data'
import { Search, Filter, TrendingUp, Users, Shield, Target, Crosshair } from 'lucide-react'

export default function CrosshairsPage() {
  return (
    <div className="min-h-screen bg-valorant-white">
      {/* Header Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-lg border-2 border-valorant-red mb-8">
              <Target className="h-5 w-5 text-valorant-red" />
              <span className="text-sm font-bold tracking-wider uppercase text-valorant-red">TACTICAL ARSENAL</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
              CROSSHAIR CONFIGURATIONS
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Professional-grade crosshair configurations from championship-winning players, 
              community favorites, and tactical innovations. Copy with precision.
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-6 py-12">
        {/* Filter and Search Section */}
        <div className="mb-12 space-y-8">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-valorant-gray-500" />
            <input
              type="search"
              placeholder="Search by player, team, or crosshair name..."
              className="w-full h-14 rounded-xl border-2 border-gray-300 bg-white px-14 text-base font-medium outline-none transition-all duration-300 focus:ring-4 focus:ring-valorant-red/10 focus:border-valorant-red placeholder:text-gray-500 hover:border-gray-400 shadow-sm"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-valorant-red/10 transition-colors">
              <Filter className="h-4 w-4 text-valorant-gray-500" />
            </button>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-3">
              <button className="bg-valorant-red text-valorant-white px-6 py-3 rounded-lg font-bold tracking-wide uppercase text-sm transition-all duration-300 hover:bg-valorant-red-dark flex items-center gap-2">
                <Crosshair className="h-4 w-4" />
                <span>ALL CONFIGS</span>
              </button>
              <button className="border-2 border-valorant-blue text-valorant-blue hover:bg-valorant-blue hover:text-valorant-white px-6 py-3 rounded-lg font-bold tracking-wide uppercase text-sm transition-all duration-300 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>ELITE</span>
              </button>
              <button className="border-2 border-valorant-yellow text-valorant-yellow-dark hover:bg-valorant-yellow hover:text-valorant-black px-6 py-3 rounded-lg font-bold tracking-wide uppercase text-sm transition-all duration-300 flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>COMMUNITY</span>
              </button>
              <button className="border-2 border-valorant-green text-valorant-green hover:bg-valorant-green hover:text-valorant-white px-6 py-3 rounded-lg font-bold tracking-wide uppercase text-sm transition-all duration-300 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>TRENDING</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-600 text-sm uppercase tracking-wide">Sort by:</span>
              <select className="bg-white border-2 border-gray-300 rounded-xl px-4 py-2.5 font-medium text-gray-700 text-sm focus:ring-4 focus:ring-valorant-red/10 focus:border-valorant-red outline-none cursor-pointer hover:border-gray-400 transition-all shadow-sm">
                <option value="popular">Most Popular</option>
                <option value="copies">Most Copied</option>
                <option value="newest">Newest</option>
                <option value="likes">Most Liked</option>
                <option value="verified">Verified First</option>
              </select>
            </div>
          </div>
          
          {/* Results Counter */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="font-semibold text-gray-700">
              <span className="text-2xl font-bold text-gray-900">{mockCrosshairs.length}</span> configurations available
            </div>
            <div className="text-sm text-gray-500">
              Updated: 2 hours ago
            </div>
          </div>
        </div>
        
        {/* Crosshair Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {mockCrosshairs.map((crosshair) => (
            <div key={crosshair.id}>
              <CrosshairCard
                id={crosshair.id}
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
            </div>
          ))}
        </div>
        
        {/* Load More Section */}
        <div className="text-center mt-20">
          <button className="border-2 border-valorant-black text-valorant-black hover:bg-valorant-black hover:text-valorant-white px-12 py-4 rounded-lg font-bold tracking-wide uppercase text-base transition-all duration-300">
            <span>LOAD MORE CONFIGS</span>
          </button>
          <div className="font-bold tracking-wider uppercase text-sm text-valorant-gray-500 mt-4">
            SHOWING {mockCrosshairs.length} OF 2,847 CONFIGURATIONS
          </div>
        </div>
      </div>
    </div>
  )
}