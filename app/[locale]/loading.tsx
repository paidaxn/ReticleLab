export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-valorant-black">
      <div className="space-y-8 text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-valorant-red border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="absolute inset-0 w-20 h-20 border-4 border-valorant-red opacity-20 rounded-full mx-auto" />
        </div>
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-800 rounded-lg animate-pulse mx-auto" />
          <div className="h-4 w-32 bg-gray-800 rounded-lg animate-pulse mx-auto" />
        </div>
      </div>
    </div>
  )
}