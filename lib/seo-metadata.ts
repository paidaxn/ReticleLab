import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reticle-lab.vercel.app'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Valorant Crosshair Settings - Pro Player Configs | RETICLELAB',
    template: '%s - Valorant Crosshair | RETICLELAB'
  },
  description: 'Best Valorant crosshair settings and codes from pro players like TenZ, Aspas, and Demon1. Copy professional Valorant crosshairs instantly with our visual editor and database.',
  keywords: [
    'valorant crosshair',
    'valorant crosshair codes',
    'valorant crosshair settings',
    'best valorant crosshair',
    'valorant pro crosshair',
    'tenz valorant crosshair',
    'aspas valorant crosshair',
    'valorant crosshair generator',
    'valorant crosshair database',
    'valorant crosshair copy',
    'valorant crosshair import',
    'valorant aim settings',
    'valorant pro player settings',
    'valorant crosshair editor',
    'valorant crosshair customization'
  ],
  authors: [{ name: 'ReticleLab', url: siteUrl }],
  creator: 'ReticleLab Team',
  publisher: 'ReticleLab',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Valorant Crosshair Settings - Pro Player Configs | RETICLELAB',
    description: 'Best Valorant crosshair settings from pro players. Copy TenZ, Aspas, Demon1 crosshairs instantly. Free Valorant crosshair generator and database.',
    url: siteUrl,
    siteName: 'ReticleLab',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['zh_CN'],
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ReticleLab - VALORANT Crosshair Arsenal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valorant Crosshair Settings - Pro Player Configs',
    description: 'Best Valorant crosshair codes from pro players. Copy and customize crosshairs instantly.',
    creator: '@reticlelab',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': `${siteUrl}/en`,
      'zh-CN': `${siteUrl}/zh`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },
  category: 'gaming',
  classification: 'Gaming Tools',
}

// Generate structured data for organization
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ReticleLab',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      'https://twitter.com/reticlelab',
      'https://github.com/reticlelab',
    ],
    description: 'Professional VALORANT crosshair configurations and tools',
  }
}

// Generate structured data for website
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ReticleLab',
    url: siteUrl,
    description: 'Professional VALORANT crosshair arsenal and configuration tools',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/crosshairs?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// Generate structured data for software application
export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ReticleLab Crosshair Editor',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    description: 'Professional crosshair editor and configuration tool for VALORANT',
  }
}

// Generate structured data for FAQ
export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is ReticleLab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ReticleLab is a professional VALORANT crosshair configuration platform where you can browse, customize, and save crosshairs used by pro players.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I use a crosshair code in VALORANT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Copy the crosshair code from ReticleLab, open VALORANT settings, navigate to Crosshair settings, and click Import Profile Code to paste and apply the crosshair.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these real pro player crosshairs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our crosshair configurations are collected from professional VALORANT players streams, tournament settings, and official profiles.',
        },
      },
    ],
  }
}

// Generate metadata for specific pages
export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string
): Metadata {
  const url = `${siteUrl}${path}`
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: image ? [image] : undefined,
    },
    twitter: {
      title,
      description,
      images: image ? [image] : undefined,
    },
    alternates: {
      canonical: url,
    },
  }
}