import { LoaderIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { IconAI, IconSpinner, IconUser } from './icons'

export function BotMessageContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('group flex items-start', className)}>
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <IconAI />
      </div>
      <div className="ml-4 flex-1 overflow-hidden px-1">{children}</div>
    </div>
  )
}

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group flex items-start">
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
        <IconUser />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {children}
      </div>
    </div>
  )
}

export function SpinnerWithText({ text }: { text?: React.ReactNode }) {
  return (
    <div className="mt-1 flex items-center">
      <LoaderIcon
        className="mr-2 animate-spin"
        size={20}
      />
      <span className="ml-1.5 text-sm text-gray-700">{text}</span>
    </div>
  )
}
