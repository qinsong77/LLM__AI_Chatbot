import {
  EventStreamContentType,
  fetchEventSource,
} from '@microsoft/fetch-event-source'
import { useRef, useState } from 'react'

import { ReceiveSseText } from '@/features/chat-bot/components/receive-sse-text'
import { CHAT_LIST_UI, UIStateType } from '@/features/chat-bot/type'

class RetriableError extends Error {}
class FatalError extends Error {}

export const useSseMessage = () => {
  const [messages, setMessages] = useState<CHAT_LIST_UI>([])
  const ctrlSSEReq = new AbortController()
  const receiveSseTextRef = useRef<HTMLDivElement>(null)

  const onSubmit = (inputMessage: string) => {
    if (ctrlSSEReq) {
      ctrlSSEReq.abort()
    }
    const postMessages = messages.map(({ textContent, type }) => ({
      content: textContent,
      role: type,
    }))

    postMessages.push({
      role: UIStateType.USER,
      content: inputMessage,
    })

    const AssistantMsgId = Date.now().toString() + 'ass_id'
    setMessages((prevState) => {
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
          content: <ReceiveSseText ref={receiveSseTextRef} />,
        },
      ]
    })

    let cbText = ''

    fetchEventSource('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: postMessages,
      }),
      openWhenHidden: true,
      signal: ctrlSSEReq.signal,
      onopen: async (res) => {
        if (
          res.ok &&
          res.status === 200 &&
          res.headers.get('content-type')?.includes(EventStreamContentType)
        ) {
          console.log('Connection made ', res)
          return
        } else if (
          res.status >= 400 &&
          res.status < 500 &&
          res.status !== 429
        ) {
          console.log('Client side error ', res)
        }
        // currently just stop retry for response is not right
        throw new FatalError('sse connection error')
      },
      onerror: (err) => {
        console.log(err)
        if (err instanceof FatalError) {
          throw err // rethrow to stop the operation
        } else {
          // do nothing to automatically retry. You can also
          // return a specific retry interval here.
        }
      },
      onmessage: (ev) => {
        console.log(ev)
        cbText = cbText + ev.data
        // @ts-ignore todo fix type
        receiveSseTextRef?.current.setText(ev.data)
      },
      onclose: () => {
        console.log(cbText)
        console.log('close')
        cbText &&
          setMessages((prevState) =>
            prevState.map((item) => {
              if (item.id === AssistantMsgId)
                return {
                  ...item,
                  textContent: cbText,
                }
              return item
            }),
          )
      },
    }).catch((e) => {
      // @ts-ignore
      receiveSseTextRef?.current.setText('Oops, connection error')
    })
  }
  return {
    messages,
    onSubmit,
    ctrlSSEReq,
  }
}
