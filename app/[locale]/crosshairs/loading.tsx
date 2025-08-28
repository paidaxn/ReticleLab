import { SkeletonGrid } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header skeleton */}
        <div className="mb-8 space-y-4">
          <div className="h-12 w-64 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Tabs skeleton */}
        <div className="mb-8">
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>

        {/* Grid skeleton */}
        <SkeletonGrid count={9} />
      </div>
    </div>
  )
}