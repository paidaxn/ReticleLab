import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
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
  title: 'RETICLELAB - Elite VALORANT Crosshair Arsenal',
  description: 'Professional-grade crosshair configurations from championship-winning VALORANT players. Customize, deploy, and dominate with tactical precision.',
  keywords: 'VALORANT,Crosshair,Professional,Elite,Gaming,FPS,Esports,Tactical,Configuration,Pro Player',
  authors: [{ name: 'ReticleLab Tactical Division' }],
  openGraph: {
    title: 'RETICLELAB - Elite VALORANT Crosshair Arsenal',
    description: 'Deploy professional-grade crosshair configurations and gain the tactical advantage. Your perfect aim starts here.',
    type: 'website',
    siteName: 'ReticleLab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RETICLELAB - Elite VALORANT Crosshair Arsenal',
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
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
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