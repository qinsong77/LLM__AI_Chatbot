'use server'
import 'server-only'

import { logger } from 'lib/shared'

import { MessageRole } from '@/features/chat-bot/type'
import { createStreamableValue } from '@/features/chat-bot/utils/stream/createStreamableValue'
import { runAsyncFnWithoutBlocking } from '@/lib/shared'

import { getOpenaiClient, GPT_MODEL } from './openai-client'

// never trust user input from client call
export const SubmitMessage = async (userInput: string) => {
  const openaiClient = getOpenaiClient()
  const completions = await openaiClient.chat.completions.create({
    model: GPT_MODEL,
    max_tokens: 1024,
    stream: true,
    messages: [
      {
        role: MessageRole.SYSTEM,
        content: 'you are AI bot',
      },
      {
        role: MessageRole.USER,
        content: userInput,
      },
    ],
  })
  // const stream = new ReadableStream({
  //   async start(controller) {
  //     const encoder = new TextEncoder()
  //
  //     for await (const part of response) {
  //       logger.info(part)
  //       const text = part.choices[0]?.delta.content ?? ''
  //       const chunk = encoder.encode(text)
  //       controller.enqueue(chunk)
  //     }
  //     controller.close()
  //   },
  // })

  const valueStream = createStreamableValue('')
  runAsyncFnWithoutBlocking(async () => {
    for await (const chunk of completions) {
      logger.info(chunk.choices[0]?.delta?.content, 'content')
      valueStream.update(chunk.choices[0]?.delta?.content || '')
    }
    logger.info(completions, 'completions:')
    valueStream.done()
  })
  return {
    content: valueStream.value,
  }
}
