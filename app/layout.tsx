import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Carbyn — UAE Carbon Accounting & ESG Compliance Platform',
  description: 'Enterprise-grade Scope 1, 2, and 3 carbon accounting tailored for UAE businesses. Audit-ready GHG reports aligned with DEWA, ADDC, and UAE Net Zero 2050.',
  keywords: ['carbon accounting UAE', 'DEWA emission factors', 'ESG compliance Dubai', 'Scope 1 2 3 emissions UAE', 'GHG protocol UAE', 'Carbyn ESG'],
  authors: [{ name: 'Carbyn' }],
  icons: {
    icon: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#047857',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} font-sans scroll-smooth`}>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-200">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

