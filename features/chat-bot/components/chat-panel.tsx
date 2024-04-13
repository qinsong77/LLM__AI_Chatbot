import { CHAT_LIST_UI } from '@/features/chat-bot/type'
import { logger } from '@/lib/shared'

import { ChatList } from './chat-list'
import { FooterText } from './footer'
import { PromptForm } from './prompt-form'

type ChatPanelProps = {
  EmptyScreen: React.ReactNode
  ExampleMessages: React.ReactNode
  messages: CHAT_LIST_UI
  onSubmit: (message: string) => void
}

export function ChatPanel({
  EmptyScreen,
  ExampleMessages,
  messages,
  onSubmit,
}: ChatPanelProps) {
  logger.trace('ChatPanel render')
  return (
    <div>
      {messages.length === 0 ? EmptyScreen : <ChatList messages={messages} />}
      {/*todo add auto scroll when sse streaming*/}
      <div className="h-px w-full" />
      <div className="fixed inset-x-0 bottom-0 z-20 w-full bg-background px-4">
        <div className="mx-auto max-w-2xl xl:max-w-3xl">
          {messages.length === 0 && ExampleMessages}
          <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
            <PromptForm onSubmit={onSubmit} />
            <FooterText className="hidden sm:block" />
          </div>
        </div>
      </div>
    </div>
  )
}
