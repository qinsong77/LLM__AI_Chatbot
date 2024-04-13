'use client'
import { ChatPanel } from '@/features/chat-bot/components/chat-panel'
import { EmptyScreen } from '@/features/chat-bot/components/empty-screen'
import { ExampleMessages } from '@/features/chat-bot/components/exampe-messages'
import { useSseMessage } from '@/features/chat-bot/hooks/use-sse-message'

const exampleMessages = [
  {
    heading: 'one',
    message: `Hello`,
  },
  {
    heading: 'two',
    message: 'What can you do?',
  },
  {
    heading: 'three',
    message: `Tell me a joke`,
  },
  {
    heading: 'four',
    message: `Explain what is LLM`,
  },
] as const

export function SimpleSseChat() {
  const { messages, onSubmit } = useSseMessage()
  return (
    <div className="mx-auto mb-20 w-full max-w-2xl overflow-auto xl:max-w-3xl">
      <ChatPanel
        EmptyScreen={<EmptyScreen />}
        ExampleMessages={
          <ExampleMessages
            exampleMessages={exampleMessages}
            onClick={onSubmit}
          />
        }
        messages={messages}
        onSubmit={onSubmit}
      />
    </div>
  )
}
