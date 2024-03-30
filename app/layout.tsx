import '../styles/globals.css'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { Providers } from '@/components/providers'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'Boilerplate', 'Tailwind CSS', 'shadcn.ui'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <div className="relative flex min-h-screen flex-col bg-background">
          <Providers>
            <SiteHeader />
            <main className="container flex-1 pb-4 pt-6">{children}</main>
            <SiteFooter />
          </Providers>
        </div>
      </body>
    </html>
  )
}
