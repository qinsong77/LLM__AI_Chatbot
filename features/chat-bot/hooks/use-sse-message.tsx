import { fetchEventSource } from '@microsoft/fetch-event-source'
import { LoaderIcon } from 'lucide-react'
import { useEffect, useRef, useState, useTransition } from 'react'

import { CHAT_LIST_UI, UIStateType } from '@/features/chat-bot/type'

type Props = {
  sendMessages: { content: string; role: UIStateType }[]
  ctrlSSEReq: AbortController
  onCloseUpdateAssistantContent: (text: string) => void
}

// todo: extract
const SSEBotMessage = ({
  sendMessages,
  ctrlSSEReq,
  onCloseUpdateAssistantContent,
}: Props) => {
  const [text, setText] = useState('')
  const start = useRef(false)
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    if (start.current || !sendMessages) return
    start.current = true
    let cbText = ''
    fetchEventSource('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: sendMessages,
      }),
      signal: ctrlSSEReq.signal,
      onopen: async (res) => {
        if (res.ok && res.status === 200) {
          console.log('Connection made ', res)
        } else if (
          res.status >= 400 &&
          res.status < 500 &&
          res.status !== 429
        ) {
          console.log('Client side error ', res)
        }
      },
      onerror: (e) => {
        console.log(e)
      },
      onmessage: (ev) => {
        console.log(ev)
        cbText = cbText + ev.data
        startTransition(() => {
          setText((prev) => prev + ev.data)
        })
      },
      onclose: () => {
        console.log(cbText)
        onCloseUpdateAssistantContent(cbText)
        console.log('close')
      },
    })
  }, [])
  return (
    <div>
      {text ? (
        text
      ) : (
        <LoaderIcon
          className="mt-1 animate-spin"
          size={20}
        />
      )}
    </div>
  )
}

export const useSseMessage = () => {
  const [messages, setMessages] = useState<CHAT_LIST_UI>([])
  const ctrlSSEReq = new AbortController()
  const onSubmit = (inputMessage: string) => {
    setMessages((prevState) => {
      const AssistantMsgId = Date.now().toString() + 'ass_id'
      const sendMessages = [
        ...prevState.map(({ textContent, type }) => ({
          content: textContent,
          role: type,
        })),
        {
          role: UIStateType.USER,
          content: inputMessage,
        },
      ]
      const onCloseUpdateAssistantContent = (text: string) => {
        setMessages((prevState) =>
          prevState.map((item) => {
            if (item.id === AssistantMsgId)
              return {
                ...item,
                textContent: text,
              }
            return item
          }),
        )
      }
      return [
        ...prevState,
        {
          type: UIStateType.USER,
          content: inputMessage,
          textContent: inputMessage,
          id: Date.now().toString(),
        },
        {
          id: AssistantMsgId,
          type: UIStateType.ASSISTANT,
          textContent: '',
          content: (
            <SSEBotMessage
              sendMessages={sendMessages}
              ctrlSSEReq={ctrlSSEReq}
              onCloseUpdateAssistantContent={onCloseUpdateAssistantContent}
            />
          ),
        },
      ]
    })
  }
  return {
    messages,
    onSubmit,
    ctrlSSEReq,
  }
}
