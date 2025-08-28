'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyLoadProps {
  children: React.ReactNode
  rootMargin?: string
  threshold?: number
  placeholder?: React.ReactNode
  onIntersect?: () => void
}

export function LazyLoad({
  children,
  rootMargin = '50px',
  threshold = 0.01,
  placeholder = <div className="h-full w-full animate-pulse bg-gray-200 rounded-lg" />,
  onIntersect,
}: LazyLoadProps) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isIntersecting) {
            setIsIntersecting(true)
            onIntersect?.()
            observer.disconnect()
          }
        })
      },
      {
        rootMargin,
        threshold,
      }
    )

    const currentTarget = targetRef.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [isIntersecting, onIntersect, rootMargin, threshold])

  return (
    <div ref={targetRef} className="h-full w-full">
      {isIntersecting ? children : placeholder}
    </div>
  )
}