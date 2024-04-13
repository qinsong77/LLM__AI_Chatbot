'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { logger } from '@/lib/shared'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const onClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    logger.trace('themeToggle')
  }
  return (
    <Button
      variant="ghost"
      className="w-9 px-0"
      onClick={onClick}
    >
      <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
