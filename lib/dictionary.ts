import type { Locale } from '@/i18n.config'

export interface Dictionary {
  header: {
    browse: string
    editor: string
    howTo: string
    favorites?: string
    search: string
  }
  hero: {
    badge: string
    title: string
    titleHighlight: string
    subtitle: string
    subtitleHighlight: string
    browseBtn: string
    customizeBtn: string
    stats: {
      users: string
      configs: string
      downloads: string
    }
  }
  features: {
    badge: string
    title: string
    subtitle: string
    pro: {
      title: string
      desc: string
      badge: string
    }
    editor: {
      title: string
      desc: string
      badge: string
    }
    copy: {
      title: string
      desc: string
      badge: string
    }
  }
  crosshairs: {
    title: string
    search: string
    sortBy: string
    sort: {
      popular: string
      copies: string
      likes: string
      newest: string
      verified: string
    }
    filter: {
      all: string
      professional: string
      community: string
      trending: string
    }
    results: string
    noResults: string
    clearFilters: string
  }
  card: {
    copies: string
    likes: string
    copy: string
    copied: string
  }
  detail: {
    notFound: string
    notFoundDesc: string
    backToCollection: string
    backToArsenal: string
    crosshairCode: string
    howToImport: string
    export: string
    edit: string
    techSpecs: string
    similarConfigs: string
    viewAll: string
  }
  editor: {
    title: string
    subtitle: string
    comingSoon: string
    features: {
      visual: string
      realtime: string
      export: string
    }
    back: string
    backDesc: string
  }
  howTo: {
    title: string
    subtitle: string
    steps: {
      title1: string
      desc1: string
      title2: string
      desc2: string
      title3: string
      desc3: string
      title4: string
      desc4: string
      title5: string
      desc5: string
    }
    ready: string
    browse: string
  }
  proCrosshairs: {
    badge: string
    title: string
    subtitle: string
    viewAll: string
  }
  popularCrosshairs: {
    badge: string
    title: string
    subtitle: string
    exploreMore: string
  }
  footer: {
    links: {
      browse: string
      editor: string
      howTo: string
    }
    copyright: string
  }
  toast: {
    copySuccess: string
    copyError: string
    likeAdd: string
    likeRemove: string
  }
  common?: {
    back: string
    search: string
    filter: string
    sort: string
    loading: string
    error: string
    retry: string
  }
  favorites?: {
    title: string
    description: string
    subtitle: string
    search?: string
    emptyTitle: string
    emptyDescription: string
    browseCrosshairs: string
    noResults: string
    tryDifferentSearch: string
    sortRecent: string
    sortName: string
    sortPlayer: string
    statsTitle: string
    totalFavorites: string
    proCrosshairs: string
    differentPlayers: string
    differentTeams: string
  }
  // Allow for additional properties with explicit type
  [key: string]: string | Record<string, unknown> | undefined
}

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default as unknown as Dictionary),
  zh: () => import('@/dictionaries/zh.json').then((module) => module.default as unknown as Dictionary),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.en()
}