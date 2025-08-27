import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ReticleLab - 瓦罗兰特准星大全',
  description: '瓦罗兰特玩家的准星配置中心，提供职业选手准星库、可视化编辑器和一键复制功能',
  keywords: 'Valorant,瓦罗兰特,准星,Crosshair,职业选手,FPS',
  authors: [{ name: 'ReticleLab Team' }],
  openGraph: {
    title: 'ReticleLab - 瓦罗兰特准星大全',
    description: '瓦罗兰特玩家的准星配置中心',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
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
              background: '#363636',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#FF4655',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}