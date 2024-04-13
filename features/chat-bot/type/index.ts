import { ReactNode } from 'react'

import { StreamableValue } from '@/features/chat-bot/utils/stream/type'

export enum MessageRole {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
  TOOL = 'tool',
  FUNCTION = 'function', // not exist in OpenAi
}

export enum UIStateType {
  ASSISTANT = 'assistant',
  USER = 'user',
}

// export type BOT_MESSAGE_TYPE = StreamableValue | string

export type UIState = {
  id: string
  type: UIStateType
  content: ReactNode
  textContent: string
}

export type CHAT_LIST_UI = UIState[]
