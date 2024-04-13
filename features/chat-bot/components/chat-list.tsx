import { Separator } from '@/components/ui/separator'
import { CHAT_LIST_UI, UIStateType } from '@/features/chat-bot/type'

import { BotMessageContainer, UserMessage } from './chat-messages'

export interface ChatList {
  messages: CHAT_LIST_UI
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="px-4">
      {messages.map((message, index: number) => {
        const { id, type, content } = message
        return (
          <div key={id}>
            {type === UIStateType.USER ? (
              <UserMessage>{content}</UserMessage>
            ) : (
              <BotMessageContainer>{content}</BotMessageContainer>
            )}
            {index < messages.length - 1 && <Separator className="my-4" />}
          </div>
        )
      })}
    </div>
  )
}
