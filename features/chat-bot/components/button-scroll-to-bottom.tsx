'use client'

import { ArrowDownIcon } from 'lucide-react'
import * as React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ButtonScrollToBottomProps extends ButtonProps {
  isAtBottom: boolean
}

export function ButtonScrollToBottom({
  className,
  isAtBottom,
  ...props
}: ButtonScrollToBottomProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'z-100 absolute right-4 top-1 bg-background transition-opacity duration-300 sm:right-8 md:top-2',
        isAtBottom ? 'opacity-0' : 'opacity-100',
        className,
      )}
      onClick={() => console.log('ButtonScrollToBottom')}
      {...props}
    >
      <ArrowDownIcon />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  )
}
