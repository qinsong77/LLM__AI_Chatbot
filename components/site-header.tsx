import { GithubIcon, RssIcon } from 'lucide-react'
import Link from 'next/link'

import { MainNav } from '@/components/main-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <nav className="flex flex-1 items-center justify-end space-x-2">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                }),
                'w-9 px-0',
              )}
            >
              <GithubIcon className="size-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link
            href={siteConfig.links.blog}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                }),
                'w-9 px-0',
              )}
            >
              <RssIcon className="size-3 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
