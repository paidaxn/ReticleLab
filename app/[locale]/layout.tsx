import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { i18n, type Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  const dictionary = await getDictionary(params.locale)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header locale={params.locale} dictionary={dictionary} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}