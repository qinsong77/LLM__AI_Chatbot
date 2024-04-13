'use client'
import { ChatPanel } from './components/chat-panel'
import { EmptyScreen } from './components/empty-screen'
import { ExampleMessages } from './components/exampe-messages'
import { useSendMessage } from './hooks/use-send-message'
import { useChatUIListStore } from './store'

const exampleMessages = [
  {
    heading: 'hi',
    message: `Who are you?`,
  },
  {
    heading: 'two',
    message: 'What can you do?',
  },
] as const

export function Chat() {
  const uiList = useChatUIListStore((state) => state.uiList)
  const { sendMessage } = useSendMessage()

  return (
    <div className="mx-auto mb-20 w-full max-w-2xl overflow-auto xl:max-w-3xl">
      <ChatPanel
        EmptyScreen={<EmptyScreen />}
        ExampleMessages={
          <ExampleMessages
            exampleMessages={exampleMessages}
            onClick={sendMessage}
          />
        }
        messages={uiList}
        onSubmit={sendMessage}
      />
    </div>
  )
}
