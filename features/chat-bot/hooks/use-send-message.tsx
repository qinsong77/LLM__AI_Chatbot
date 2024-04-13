import * as React from 'react'

import { BotStreamableText } from '@/features/chat-bot/components/bot-message'
import { SpinnerWithText } from '@/features/chat-bot/components/chat-messages'
import { useChatUIListStore } from '@/features/chat-bot/store'
import { UIStateType } from '@/features/chat-bot/type'
import { SubmitMessage } from '@/features/chat-bot/utils/actions'

export const useSendMessage = () => {
  const { add, replace } = useChatUIListStore()
  // use callback?
  const sendMessage = async (userMessage: string) => {
    const botMessageId = 'bot-' + Date.now().toString()
    add([
      {
        id: Date.now().toString(),
        type: UIStateType.USER,
        textContent: userMessage,
        content: userMessage,
      },
      {
        id: botMessageId,
        type: UIStateType.ASSISTANT,
        content: <SpinnerWithText />,
        textContent: '',
      },
    ])
    const resp = await SubmitMessage(userMessage)
    console.log(resp)
    replace(botMessageId, {
      type: UIStateType.ASSISTANT,
      content: <BotStreamableText content={resp.content} />,
      textContent: '',
    })
  }
  return {
    sendMessage,
  }
}
