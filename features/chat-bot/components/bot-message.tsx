// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx
'use client'
import React from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { BotMessageContainer } from '@/features/chat-bot/components/chat-messages'
import { CodeBlock } from '@/features/chat-bot/components/codeblock'
import { IconUser } from '@/features/chat-bot/components/icons'
import { useStreamableValue } from '@/features/chat-bot/utils/stream/streamable'
import { StreamableValue } from '@/features/chat-bot/utils/stream/type'
import { cn } from '@/lib/utils'

import { MemoizedReactMarkdown } from './markdown'

export function BotMessage({
  content,
  className,
}: {
  content: string
  className?: string
}) {
  // const text = useStreamableText(content)

  return (
    <BotMessageContainer className={className}>
      <MemoizedReactMarkdown
        className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            return <p className="mb-2 last:mb-0">{children}</p>
          },
          // @ts-ignore
          code({ node, inline, className, children, ...props }) {
            // @ts-ignore
            if (children.length) {
              // @ts-ignore
              if (children[0] == '▍') {
                return (
                  <span className="mt-1 animate-pulse cursor-default">▍</span>
                )
              }
              // @ts-ignore
              children[0] = (children[0] as string).replace('`▍`', '▍')
            }

            const match = /language-(\w+)/.exec(className || '')

            if (inline) {
              return (
                <code
                  className={className}
                  {...props}
                >
                  {children}
                </code>
              )
            }

            return (
              <CodeBlock
                key={Math.random()}
                language={(match && match[1]) || ''}
                value={String(children).replace(/\n$/, '')}
                {...props}
              />
            )
          },
        }}
      >
        {content}
      </MemoizedReactMarkdown>
    </BotMessageContainer>
  )
}

export function BotStreamableText({
  content,
}: {
  content: StreamableValue<string>
}) {
  const [data, error, pending] = useStreamableValue<string>(content)
  console.log(data)
  console.log(pending)
  if (error) return 'Rendering error when show bot message'
  else return data
}
