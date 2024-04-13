'use client'
// todo => use server?
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IconOpenAI } from '@/features/chat-bot/components/icons'
import { cn } from '@/lib/utils'

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link
        href="/"
        className="mr-6 flex items-center"
      >
        <IconOpenAI />
        <span className="ml-1 inline-block font-bold">AI BOT</span>
      </Link>
      <nav className="hidden items-center gap-4 text-sm sm:flex lg:gap-6">
        <Link
          href="/simple-chat"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/simple-chat')
              ? 'text-foreground'
              : 'text-foreground/60',
          )}
        >
          simple chat
        </Link>
        <Link
          href="https://github.com/qinsong77"
          className={cn(
            'hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block',
          )}
        >
          GitHub
        </Link>
      </nav>
    </div>
  )
}
