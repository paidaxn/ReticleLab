import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FF4655',
}

export const metadata: Metadata = {
  title: 'RETICLELAB - Professional VALORANT Crosshair Arsenal',
  description: 'Professional-grade crosshair configurations from championship-winning VALORANT players. Customize, deploy, and dominate with tactical precision.',
  keywords: 'VALORANT,Crosshair,Professional,Gaming,FPS,Esports,Tactical,Configuration,Pro Player',
  authors: [{ name: 'ReticleLab Tactical Division' }],
  openGraph: {
    title: 'RETICLELAB - Professional VALORANT Crosshair Arsenal',
    description: 'Deploy professional-grade crosshair configurations and gain the tactical advantage. Your perfect aim starts here.',
    type: 'website',
    siteName: 'ReticleLab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RETICLELAB - Professional VALORANT Crosshair Arsenal',
    description: 'Deploy professional-grade crosshair configurations and gain the tactical advantage.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
              border: '1px solid hsl(var(--border))',
            },
            success: {
              iconTheme: {
                primary: '#FF4655',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF4655',
                secondary: '#fff',
              },
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}