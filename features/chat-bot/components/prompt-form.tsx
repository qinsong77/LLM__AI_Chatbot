// 'use client' add this, onSubmit has hint: TS71007: Props must be serializable for components in the "use client" entry file, "onSubmit" is invalid https://github.com/vercel/next.js/discussions/46795
import * as React from 'react'
import { FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/hooks/client'

import { IconArrowElbow, IconPlus } from './icons'

export function PromptForm({
  onSubmit,
}: {
  onSubmit: (message: string) => void
}) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const message = formData.get('message') as string
    onSubmit(message)
    inputRef.current && (inputRef.current.value = '')
  }
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      ref={formRef}
      onSubmit={handleOnSubmit}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
              onClick={(event) => {
                event.preventDefault()
                window.open(
                  window.location.href,
                  '_blank',
                  'noopener,noreferrer',
                )
              }}
            >
              <IconPlus />
              <span className="sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none border-0 bg-transparent px-4 py-[1.3rem] focus-within:outline-none focus:ring-0 sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          id="message"
          rows={1}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={false}
              >
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
